import jwt from 'jsonwebtoken';
import { IJwtProvider } from 'shared/domain/providers/IJwtProvider';

export default class JsonwebtokenJwtProvider implements IJwtProvider {
  public async decode<T = unknown>(token: string): Promise<T | null> {
    try {
      const decoded = jwt.decode(token, { json: true });

      if (!decoded) return null;

      return decoded as T;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}
