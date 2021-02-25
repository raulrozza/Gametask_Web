import IGame from 'shared/entities/IGame';
import IGamesRepository from '../repositories/IGamesRepository';

interface IExecute {
  games?: IGame[];
  error?: string;
  shouldLogout?: boolean;
}

export default class ListAllGamesService {
  constructor(private gamesRepository: IGamesRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const games = await this.gamesRepository.findAll();

      return { games };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
