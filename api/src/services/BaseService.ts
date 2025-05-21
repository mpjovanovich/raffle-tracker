import { BaseRepository } from '../repository/BaseRepository.js';

// This makes it easier to access the types on the BaseRepository.
// It will create a "type object", which is just like any other object,
// but it holds types and is used for TS typing.

// Create a new type named RepositoryType that takes a Repo type parameter.
// Repo must be type that extends (inherits from) BaseRepository.
type RepositoryTypes<Repo extends BaseRepository<any, any>> =
  // Now to define the type:
  // Use the "extands" conditional to access the type parameter from
  // BaseRepository - P and D. Because we can get these types by using this
  // conditional, we have to cover the "else" with a "never" type. In other
  // words - it's a useless type put in to satisfy the TS compiler.
  Repo extends BaseRepository<infer P, infer D> ? { prisma: P; dto: D } : never;

export abstract class BaseService<Repo extends BaseRepository<any, any>> {
  constructor(protected repo: Repo) {}

  // To break this down:
  // RepositoryTypes<Repo> = a type object, { prisma: P; dto: D }
  // RepositoryTypes<Repo>["dto"] = The DTO type from this object
  // RepositoryTypes<Repo>["dto"][] = an array of these.
  // E.g. - Event[]
  async getAll(): Promise<RepositoryTypes<Repo>['dto'][]> {
    return this.repo.getAll();
  }

  async getById(id: number): Promise<RepositoryTypes<Repo>['dto']> {
    return this.repo.getById(id);
  }

  async insert(
    item: RepositoryTypes<Repo>['dto']
  ): Promise<RepositoryTypes<Repo>['dto']> {
    return this.repo.insert(item);
  }

  async update(
    id: number,
    item: Partial<RepositoryTypes<Repo>['dto']>
  ): Promise<RepositoryTypes<Repo>['dto']> {
    return this.repo.update(id, item);
  }
}
