import IUserLoginDTO from 'modules/landing/domain/dtos/IUserLoginDTO';
import IUsersRepository from 'modules/landing/domain/repositories/IUsersRepository';

interface IExecute {
  token?: string;
  error?: string;
}

export default class LogUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IUserLoginDTO): Promise<IExecute> {
    try {
      const authentication = await this.usersRepository.validate({
        email,
        password,
      });

      return {
        token: authentication.token,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
