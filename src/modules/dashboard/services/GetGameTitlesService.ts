import ITitle from 'modules/dashboard/domain/entities/ITitle';
import ITitlesRepository from 'modules/dashboard/domain/repositories/ITitlesRepository';

interface IExecute {
  titles?: ITitle[];
  error?: string;
  shouldLogout?: boolean;
}

export default class GetGameTitlesService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute(name?: string): Promise<IExecute> {
    try {
      const titles = await this.titlesRepository.findAllWithName(name);

      return { titles };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
