import LocalStorageProvider from 'shared/infra/providers/LocalStorageProvider';
import IStorageProvider from 'shared/domain/providers/IStorageProvider';

export default function makeStorageProvider(): IStorageProvider {
  const storageProvider = new LocalStorageProvider();

  return storageProvider;
}
