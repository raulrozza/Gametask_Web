import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';

interface IExecute {
  error?: string;
  shouldLogout?: boolean;
}

export default class DeleteTitleService {
  constructor(private titlesRepository: ITitlesRepository) {}

  public async execute(id: string): Promise<IExecute> {
    try {
      await this.titlesRepository.delete(id);

      return {};
    } catch (error) {
      return { error: error.message, shouldLogout: error.shouldLogout };
    }
  }
}
