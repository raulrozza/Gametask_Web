import IUserSignupDTO from 'modules/landing/domain/dtos/IUserSignupDTO';
import IUsersRepository from 'modules/landing/domain/repositories/IUsersRepository';
import IUser from 'shared/domain/entities/IUser';

interface IExecute {
  user?: IUser;
  error?: string;
}

export default class SignUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(values: IUserSignupDTO): Promise<IExecute> {
    try {
      const user = await this.usersRepository.create(values);

      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }
}
