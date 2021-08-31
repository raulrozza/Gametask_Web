import ICreateActivityDTO from 'modules/dashboard/domain/dtos/ICreateActivityDTO';
import IEditActivityDTO from 'modules/dashboard/domain/dtos/IEditActivityDTO';
import IActivity from 'modules/dashboard/domain/entities/IActivity';

export default interface IActivitiesRepository {
  findAll(): Promise<IActivity[]>;
  create(data: ICreateActivityDTO): Promise<IActivity>;
  delete(id: string): Promise<void>;
  edit(data: IEditActivityDTO): Promise<IActivity>;
}
