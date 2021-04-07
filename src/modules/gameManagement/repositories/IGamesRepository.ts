import IUpdateGameDTO from 'modules/gameManagement/dtos/IUpdateGameDTO';

export default interface IGamesRepository {
  update(payload: IUpdateGameDTO): Promise<void>;
}
