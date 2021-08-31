import IActivityRequest from 'modules/managePlayers/domain/entities/IActivityRequest';

export default interface IActivityRequestsRepository {
  accept(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findAllFromGame(): Promise<IActivityRequest[]>;
}
