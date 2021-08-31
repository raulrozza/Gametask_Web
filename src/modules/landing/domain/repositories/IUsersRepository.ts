import IUserLoginDTO from 'modules/landing/domain/dtos/IUserLoginDTO';
import IUserSignupDTO from 'modules/landing/domain/dtos/IUserSignupDTO';
import IUserAuthentication from 'modules/landing/domain/entities/IUserAuthentication';
import IUser from 'shared/domain/entities/IUser';

export default interface IUsersRepository {
  create(values: IUserSignupDTO): Promise<IUser>;
  validate(credentials: IUserLoginDTO): Promise<IUserAuthentication>;
}
