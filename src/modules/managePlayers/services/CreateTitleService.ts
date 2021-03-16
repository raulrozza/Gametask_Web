import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';
import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';

interface IExecute {
  title?: ITitle;
  error?: string;
  shouldLogout?: boolean;
}

export default class CreateTitleService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute({ name }: ICreateTitleDTO): Promise<IExecute> {
    if (!name) return {};

    try {
      const title = await this.titlesRepository.create({ name });

      return { title };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
