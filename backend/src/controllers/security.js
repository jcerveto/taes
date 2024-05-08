import crypto from 'crypto'


/**
 * Encripta un mensaje de manera irreversible. 
 * @param {string} message 
 * @returns 
 */
export function hashPassword(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

