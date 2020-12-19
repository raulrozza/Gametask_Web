import crypto from 'crypto-js';

function encrypt(data: unknown, secret: string): string {
  const jsonData = JSON.stringify(data);

  const encryptedArray = crypto.AES.encrypt(jsonData, secret);

  const cipher = encryptedArray.toString();

  return cipher;
}

export default {
  encrypt,
};
