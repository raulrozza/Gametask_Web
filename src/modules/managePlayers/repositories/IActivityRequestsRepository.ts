import IActivityRequest from 'modules/managePlayers/entities/IActivityRequest';

export default interface IActivityRequestsRepository {
  accept(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findAllFromGame(): Promise<IActivityRequest[]>;
}
