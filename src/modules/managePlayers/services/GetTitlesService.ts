import ITitle from 'modules/managePlayers/entities/ITitle';
import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';

interface IExecute {
  titles?: ITitle[];
  error?: string;
  shouldLogout?: boolean;
}

export default class GetTitlesService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute(): Promise<IExecute> {
    try {
      const titles = await this.titlesRepository.findAll();

      return { titles };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
