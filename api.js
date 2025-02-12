import fetch from 'node-fetch';
import randomUseragent from 'random-useragent';
import log from './logger.mjs';
import { newAgent } from './helper.mjs';

const userAgent = randomUseragent.getRandom();
const headers = {
    'accept': 'application/json',
    'user-agent': userAgent,
    'Content-Type': 'application/json'
};

const fetchWithTimeout = async (url, options = {}, timeout = 60000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response;
    } catch (error) {
        clearTimeout(id);
        log.error(`Fetch failed for ${url}: ${error.message}`);
        return null;
    }
};

export const registerUser = async (email, password, proxy = null) => {
    const agent = newAgent(proxy);
    const url = 'https://api.depined.org/api/user/register';
    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, password }),
            agent
        });
        return response ? await response.json() : null;
    } catch (error) {
        log.error('Error registering user:', error.message);
        return null;
    }
};

export const confirmUserRef = async (token, referral_code, proxy = null) => {
    const agent = newAgent(proxy);
    const url = 'https://api.depined.org/api/access-code/referal';
    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ referral_code }),
            agent
        });
        return response ? await response.json() : null;
    } catch (error) {
        log.error('Error confirming referral:', error.message);
        return null;
    }
};

export const createUserProfile = async (token, payload, proxy = null) => {
    const agent = newAgent(proxy);
    const url = 'https://api.depined.org/api/user/profile-creation';
    try {
        const response = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload),
            agent
        });
        return response ? await response.json() : null;
    } catch (error) {
        log.error('Error creating profile:', error.message);
        return null;
    }
};

export const getUserRef = async (token, proxy = null) => {
    const agent = newAgent(proxy);
    const url = 'https://api.depined.org/api/referrals/stats';
    try {
        const response = await fetchWithTimeout(url, {
            method: 'GET',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            agent
        });
        return response ? await response.json() : null;
    } catch (error) {
        log.error('Error fetching referral stats:', error.message);
        return null;
    }
};
