import ICryptoProvider from 'modules/user/domain/providers/ICryptoProvider';
import CryptoJSCryptoProvider from 'modules/user/infra/providers/CryptoJSCryptoProvider';

export default function makeCryptoProvider(): ICryptoProvider {
  const crypto = new CryptoJSCryptoProvider();

  return crypto;
}
