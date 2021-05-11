import CryptoJSCryptoProvider from './implementations/CryptoJSCryptoProvider';
import ICryptoProvider from './models/ICryptoProvider';

export default function makeCryptoProvider(): ICryptoProvider {
  const crypto = new CryptoJSCryptoProvider();

  return crypto;
}
