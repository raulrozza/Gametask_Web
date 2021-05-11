import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';
import IEditTitleDTO from 'modules/managePlayers/dtos/IEditTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';

interface IExecute {
  title?: ITitle;
  error?: string;
  shouldLogout?: boolean;
}

export default class EditTitleService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute(data: IEditTitleDTO): Promise<IExecute> {
    try {
      const title = await this.titlesRepository.edit(data);

      return { title };
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
