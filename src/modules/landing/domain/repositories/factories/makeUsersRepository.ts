import UsersRepository from 'modules/landing/infra/repositories/UsersRepository';
import IUsersRepository from 'modules/landing/domain/repositories/IUsersRepository';

export default function makeUsersRepository(): IUsersRepository {
  const usersRepository = new UsersRepository();

  return usersRepository;
}
