import { saveToFile, delay, readFile } from './utils/helper.mjs';
import log from './utils/logger.mjs';
import Mailjs from '@cemalgnlts/mailjs';
import banner from './utils/banner.mjs';

import {
    registerUser,
    createUserProfile,
    confirmUserRef,
    getUserRef,
} from './utils/api.mjs';

const mailjs = new Mailjs();

const main = async () => {
    log.info(banner);
    log.info(`Processing auto register... (CTRL + C to exit)`);
    await delay(3);

    const tokens = await readFile("tokens.txt");
    if (tokens.length === 0) {
        log.warn("No tokens found in tokens.txt. Exiting...");
        return;
    }

    for (let i = 0; i < 5; i++) {
        for (const token of tokens) {
            const response = await getUserRef(token);
            if (!response?.data?.is_referral_active) continue;

            const reffCode = response?.data?.referral_code;
            if (!reffCode) {
                log.warn('No referral code found for this account');
                continue;
            }

            log.info(`Found new active referral code:`, reffCode);

            try {
                let account = await mailjs.createOneAccount();
                while (!account?.data?.username) {
                    log.warn('Failed to generate new email, retrying...');
                    await delay(3);
                    account = await mailjs.createOneAccount();
                }

                const email = account.data.username;
                const password = account.data.password;
                log.info(`Trying to register email: ${email}`);

                let regResponse = await registerUser(email, password, null);
                let retryCount = 0;
                while (!regResponse?.data?.token && retryCount < 5) {
                    log.warn(`Failed to register (${retryCount + 1}/5), retrying...`);
                    await delay(3);
                    regResponse = await registerUser(email, password, null);
                    retryCount++;
                }

                if (!regResponse?.data?.token) {
                    log.error(`Registration failed for ${email}, skipping...`);
                    continue;
                }

                const userToken = regResponse.data.token;

                log.info(`Creating profile for ${email}`);
                await createUserProfile(userToken, { step: 'username', username: email });
                await createUserProfile(userToken, { step: 'description', description: "AI Startup" });

                let confirm = await confirmUserRef(userToken, reffCode);
                retryCount = 0;
                while (!confirm?.data?.token && retryCount < 5) {
                    log.warn(`Failed to confirm referral (${retryCount + 1}/5), retrying...`);
                    await delay(3);
                    confirm = await confirmUserRef(userToken, reffCode);
                    retryCount++;
                }

                if (!confirm?.data?.token) {
                    log.error(`Failed to confirm referral for ${email}, skipping...`);
                    continue;
                }

                await saveToFile("accounts.txt", `${email}|${password}`);
                await saveToFile("tokens.txt", `${confirm.data.token}`);

            } catch (err) {
                log.error('Error creating account:', err.message);
            }
        }
    }
};

process.on('SIGINT', () => {
    log.warn('SIGINT received. Exiting...');
    process.exit();
});

process.on('uncaughtException', (err) => {
    log.error('Uncaught exception:', err);
    process.exit(1);
});

main();
