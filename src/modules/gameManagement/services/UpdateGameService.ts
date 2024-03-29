import IUpdateGameDTO from 'modules/gameManagement/domain/dtos/IUpdateGameDTO';
import IGamesRepository from 'modules/gameManagement/domain/repositories/IGamesRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class UpdateGameService {
  constructor(private gamesRepository: IGamesRepository) {}

  public async execute(data: IUpdateGameDTO): Promise<IExecute> {
    try {
      await this.gamesRepository.update(data);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
