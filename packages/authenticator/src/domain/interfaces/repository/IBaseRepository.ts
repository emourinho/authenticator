export interface readByPageReturn<T> {
  rows: T[];
  count: number;
}

export interface IBaseRepository<T> {
  create(model: T): Promise<T>;
  readOne(filter: any, select?: string): Promise<T>;
  readOneById(id: string): Promise<T>;
  readByPage(filter: any): Promise<readByPageReturn<T>>;
  readAll(filter: any): Promise<T[]>;
  updateById(id: string, model: any): Promise<T>;
  update(filter: any, model: any): Promise<T>;
  delete(id: string): Promise<boolean>;
}
