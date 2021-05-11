import ICreateTitleDTO from 'modules/managePlayers/dtos/ICreateTitleDTO';
import IEditTitleDTO from 'modules/managePlayers/dtos/IEditTitleDTO';
import ITitle from 'modules/managePlayers/entities/ITitle';
import ITitlesRepository from 'modules/managePlayers/repositories/ITitlesRepository';
import { makeHttpProvider } from 'shared/container/providers';

export default class TitlesRepository implements ITitlesRepository {
  private httpProvider = makeHttpProvider();

  public async create({ name }: ICreateTitleDTO): Promise<ITitle> {
    const response = await this.httpProvider.post<ITitle>('titles', {
      name,
    });

    return response;
  }

  public async edit({ id, name }: IEditTitleDTO): Promise<ITitle> {
    const response = await this.httpProvider.put<ITitle>(`titles/${id}`, {
      name,
    });

    return response;
  }

  public async delete(id: string): Promise<void> {
    await this.httpProvider.delete(`titles/${id}`);
  }

  public async findAll(): Promise<ITitle[]> {
    const response = await this.httpProvider.get<ITitle[]>('titles');

    return response;
  }
}
