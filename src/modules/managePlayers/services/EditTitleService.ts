import IEditTitleDTO from 'modules/managePlayers/domain/dtos/IEditTitleDTO';
import ITitle from 'modules/managePlayers/domain/entities/ITitle';
import ITitlesRepository from 'modules/managePlayers/domain/repositories/ITitlesRepository';

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
