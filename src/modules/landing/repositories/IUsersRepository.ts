import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUser from 'modules/landing/entities/IUser';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import IUserAuthentication from 'modules/landing/entities/IUserAuthentication';

export default interface IUsersRepository {
  create(values: IUserSignupDTO): Promise<IUser>;
  validate(credentials: IUserLoginDTO): Promise<IUserAuthentication>;
}
