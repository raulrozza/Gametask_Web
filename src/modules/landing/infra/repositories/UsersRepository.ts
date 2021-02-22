import Http from 'config/http';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUser from 'modules/landing/entities/IUser';
import IUserAuthentication from 'modules/landing/entities/IUserAuthentication';
import IUsersRepository from 'modules/landing/repositories/IUsersRepository';
import RequestError from 'shared/errors/entities/RequestError';

export default class UsersRepository implements IUsersRepository {
  public async create({
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  }: IUserSignupDTO): Promise<IUser> {
    try {
      const response = await Http.instance.post<IUser>('users/signup', {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      });

      return response.data;
    } catch (error) {
      throw new RequestError(error);
    }
  }

  public async validate({
    email,
    password,
  }: IUserLoginDTO): Promise<IUserAuthentication> {
    try {
      const response = await Http.instance.post<IUserAuthentication>(
        'users/login',
        { email, password },
      );

      return response.data;
    } catch (error) {
      throw new RequestError(error);
    }
  }
}
