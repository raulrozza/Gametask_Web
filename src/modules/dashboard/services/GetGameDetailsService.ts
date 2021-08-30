import IGame from 'shared/domain/entities/IGame';
import IGamesRepository from 'shared/domain/repositories/IGamesRepository';

interface IExecute {
  game?: IGame;
  error?: string;
  shouldLogout?: boolean;
}

export default class GetGameDetailsService {
  constructor(private gamesRepository: IGamesRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const game = await this.gamesRepository.findOne();

      return { game };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
