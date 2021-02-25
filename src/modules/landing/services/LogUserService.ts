import IUserLoginDTO from 'modules/landing/dtos/IUserLoginDTO';
import IUsersRepository from '../repositories/IUsersRepository';

interface IExecute {
  result?: string;
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
        result: authentication.token,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
