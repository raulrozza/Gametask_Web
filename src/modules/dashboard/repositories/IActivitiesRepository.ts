import IActivity from 'modules/dashboard/entities/IActivity';

export default interface IActivitiesRepository {
  findAll(): Promise<IActivity[]>;
}
