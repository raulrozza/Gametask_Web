import crypto from 'crypto-js';
import ICryptoProvider from 'modules/user/providers/CryptoProvider/models/ICryptoProvider';

const SECRET = String(process.env.REACT_APP_SECRET);

export default class CryptoJSCryptoProvider implements ICryptoProvider {
  public encrypt(data: unknown): string {
    const jsonData = JSON.stringify(data);

    const encryptedArray = crypto.AES.encrypt(jsonData, SECRET);

    const cipher = encryptedArray.toString();

    return cipher;
  }
}
