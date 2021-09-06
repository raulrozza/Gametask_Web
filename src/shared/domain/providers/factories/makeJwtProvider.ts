import { IJwtProvider } from 'shared/domain/providers/IJwtProvider';
import JsonwebtokenJwtProvider from 'shared/infra/providers/JsonwebtokenJwtProvider';

export default function makeJwtProvider(): IJwtProvider {
  const jwtProvider = new JsonwebtokenJwtProvider();

  return jwtProvider;
}
