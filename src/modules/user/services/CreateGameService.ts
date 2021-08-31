import ICreateGameDTO from 'modules/user/domain/dtos/ICreateGameDTO';
import IGame from 'shared/domain/entities/IGame';
import IGamesRepository from 'shared/domain/repositories/IGamesRepository';

interface IExecute {
  game?: IGame;
  error?: string;
  shouldLogout?: boolean;
}

export default class CreateGameService {
  constructor(private gamesRepository: IGamesRepository) {}

  public async execute({
    name,
    description,
    image,
  }: ICreateGameDTO): Promise<IExecute> {
    try {
      const game = await this.gamesRepository.create({
        name,
        description,
        image,
      });

      return { game };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
