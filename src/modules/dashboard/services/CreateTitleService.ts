import ICreateTitleDTO from 'modules/dashboard/dtos/ICreateTitleDTO';
import ITitle from 'modules/dashboard/entities/ITitle';
import ITitlesRepository from 'modules/dashboard/repositories/ITitlesRepository';

interface IExecute {
  title?: ITitle;
  error?: string;
  shouldLogout?: boolean;
}

export default class CreateTitleService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute(data: ICreateTitleDTO): Promise<IExecute> {
    try {
      const title = await this.titlesRepository.create(data);

      return { title };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
