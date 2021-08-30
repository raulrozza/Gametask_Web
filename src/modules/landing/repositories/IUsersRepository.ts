import IUser from 'shared/domain/entities/IUser';
import IUserSignupDTO from 'modules/landing/dtos/IUserSignupDTO';
import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import IUserAuthentication from 'modules/landing/entities/IUserAuthentication';

export default interface IUsersRepository {
  create(values: IUserSignupDTO): Promise<IUser>;
  validate(credentials: IUserLoginDTO): Promise<IUserAuthentication>;
}
