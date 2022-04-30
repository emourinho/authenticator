import { IBaseRepository, readByPageReturn } from '../../../domain';
import { Model } from 'mongoose';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private readonly _model: Model<T>) {}

  async create(model: T) {
    return await this._model.create(model);
  }

  async readOne(filter: any, select = '') {
    return await this._model.findOne(filter).select(select);
  }

  async readOneById(id: string) {
    const ret = await this._model.findById(id);
    const ret2 = ret.toObject()
    return ret2 as T
  }

  async readByPage(filter: any) {
    const skip = parseInt(filter.offset) || 0;
    const limit = parseInt(filter.limit) || 10;
    let sort = filter.sort;
    if (sort) {
      const [field, order] = sort.split('-');
      sort = { [field]: order };
    }

    filter.offset = undefined;
    filter.sort = undefined;
    filter.limit = undefined;

    const count = await this._model.countDocuments(filter);
    const rows = await this._model.find(filter, null, { skip, limit, sort });
    return { count, rows };
  }

  async readAll(filter: any) {
    return await this._model.find(filter);
  }

  async updateById(id: string, model: any) {
    const res = await this._model.findByIdAndUpdate(id, model);
    return await this.readOneById(id);
  }

  async update(filter: any, model: any) {
    const res = await this._model.findOneAndUpdate(filter, model);
    return res;
  }

  async delete(id: string) {
    const res = await this._model.deleteOne({ id });
    return res.deletedCount === 1;
  }
}
