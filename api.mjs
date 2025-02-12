import fetch from 'node-fetch';
import { delay } from './helper.mjs';

const headers = {
    'accept': 'application/json',
    'user-agent': 'Mozilla/5.0',
    'Content-Type': 'application/json',
};

export const fetchWithTimeout = async (url, options = {}, timeout = 60000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
    } catch (error) {
        clearTimeout(id);
        console.error(`Fetch failed for ${url}: ${error.message}`);
        return null;
    }
};

export const registerUser = async (email, password) => {
    const url = 'https://api.depined.org/api/user/register';
    return fetchWithTimeout(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    });
};

export const createUserProfile = async (token, payload) => {
    const url = 'https://api.depined.org/api/user/profile-creation';
    return fetchWithTimeout(url, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
    });
};

export const confirmUserRef = async (token, referral_code) => {
    const url = 'https://api.depined.org/api/access-code/referal';
    return fetchWithTimeout(url, {
        method: 'POST',
        headers: { ...headers, 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ referral_code }),
    });
};

export const getUserRef = async (token) => {
    const url = 'https://api.depined.org/api/referrals/stats';
    return fetchWithTimeout(url, {
        method: 'GET',
        headers: { ...headers, 'Authorization': `Bearer ${token}` },
    });
};
