import chalk from 'chalk';

const logger = {
    log: (level, message, value = '') => {
        const now = new Date().toLocaleString();
        const colors = {
            info: chalk.cyanBright,
            warn: chalk.yellow,
            error: chalk.red,
            success: chalk.green,
            debug: chalk.magenta,
        };
        const color = colors[level] || chalk.white;
        console.log(`${chalk.blue("[DePINedBot]")} ${chalk.grey(`[${now}]`)} ${color(`[${level.toUpperCase()}]`)} ${message}`, value ? chalk.green(value) : '');
    },
    info: (msg, val = '') => logger.log('info', msg, val),
    warn: (msg, val = '') => logger.log('warn', msg, val),
    error: (msg, val = '') => logger.log('error', msg, val),
    success: (msg, val = '') => logger.log('success', msg, val),
    debug: (msg, val = '') => logger.log('debug', msg, val),
};

export default logger;
