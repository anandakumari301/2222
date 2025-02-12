import fs from 'fs/promises';
import { createWriteStream } from 'fs';

export const saveToFile = async (filePath, data) => {
    try {
        const stream = createWriteStream(filePath, { flags: 'a' });
        stream.write(data + '\n');
        stream.end();
    } catch (error) {
        console.error(`Failed to write to file ${filePath}:`, error.message);
    }
};

export const delay = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));

export const readFile = async (filePath) => {
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        return fileData.split('\n').filter((line) => line.trim() !== '');
    } catch (error) {
        console.error(`Failed to read file ${filePath}:`, error.message);
        return [];
    }
};
