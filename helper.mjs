import fs from 'fs/promises';

export const delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const saveToFile = async (fileName, content) => {
    await fs.appendFile(fileName, `${content}\n`, 'utf-8');
};

export const readFile = async (fileName) => {
    try {
        const content = await fs.readFile(fileName, 'utf-8');
        return content.split('\n').filter(Boolean);
    } catch {
        return [];
    }
};
