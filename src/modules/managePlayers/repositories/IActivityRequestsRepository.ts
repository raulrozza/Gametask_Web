import { IActivityRequest } from 'modules/managePlayers/view/pages/General/types';

export default interface IActivityRequestsRepository {
  accept(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findAllFromGame(): Promise<IActivityRequest[]>;
}
