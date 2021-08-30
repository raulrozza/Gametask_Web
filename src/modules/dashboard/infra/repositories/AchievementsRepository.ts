import ICreateAchievementDTO from 'modules/dashboard/dtos/ICreateAchievementDTO';
import IEditAchievementDTO from 'modules/dashboard/dtos/IEditAchievementDTO';
import IAchievement from 'modules/dashboard/entities/IAchievement';
import IAchievementsRepository from 'modules/dashboard/repositories/IAchievementsRepository';
import makeHttpProvider from 'shared/domain/providers/factories/makeHttpProvider';

export default class AchievementsRepository implements IAchievementsRepository {
  private httpProvider = makeHttpProvider();

  public async findAll(): Promise<IAchievement[]> {
    const response = await this.httpProvider.get<IAchievement[]>(
      'achievements',
    );

    return response;
  }

  public async create({
    name,
    description,
    title,
    image,
  }: ICreateAchievementDTO): Promise<IAchievement> {
    const payload: Omit<ICreateAchievementDTO, 'image'> = { name, description };
    if (title) payload.title = title;

    const achievement = await this.httpProvider.post<IAchievement>(
      'achievements',
      payload,
    );

    if (!image || typeof image === 'string') return achievement;

    const data = new FormData();
    data.append('image', image);

    const response = await this.httpProvider.patch<IAchievement>(
      `achievements/${achievement.id}/avatar`,
      data,
    );

    return response;
  }

  public async delete(id: string): Promise<void> {
    return this.httpProvider.delete(`achievements/${id}`);
  }

  public async edit({
    id,
    name,
    description,
    title,
    image,
  }: IEditAchievementDTO): Promise<IAchievement> {
    const payload: Omit<ICreateAchievementDTO, 'image'> = {
      name,
      description,
      title: title || undefined,
    };

    const achievement = await this.httpProvider.put<IAchievement>(
      `achievements/${id}`,
      payload,
    );

    if (!image || typeof image === 'string') return achievement;

    const data = new FormData();
    data.append('image', image);

    const response = await this.httpProvider.patch<IAchievement>(
      `achievements/${id}/avatar`,
      data,
    );

    return response;
  }
}
