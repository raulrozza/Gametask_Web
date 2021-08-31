import IUpdateGameDTO from 'modules/gameManagement/domain/dtos/IUpdateGameDTO';

export default interface IGamesRepository {
  update(payload: IUpdateGameDTO): Promise<void>;
}
