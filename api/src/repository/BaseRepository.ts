import { PrismaClient } from '.prisma/client';

export abstract class BaseRepository<
  PrismaType extends { id: number },
  DTO extends { id: number },
> {
  constructor(
    protected prisma: PrismaClient,
    protected modelName: string
  ) {
    // Runtime check for static methods.
    // There's no way to make an abstract static method, so we do this here.
    if (
      !(this.constructor as any).toDTO ||
      !(this.constructor as any).toPrisma
    ) {
      throw new Error(
        'Repository must implement static toDTO and toPrisma methods'
      );
    }
  }

  async getAll(): Promise<DTO[]> {
    const items = await this.getModel().findMany();
    return items.map((item: PrismaType) => this.toDTO(item));
  }

  async getById(id: number): Promise<DTO> {
    const item = await this.getModel().findUnique({ where: { id } });
    return this.toDTO(item);
  }

  async insert(item: DTO): Promise<DTO> {
    const prismaItem = this.toPrisma(item as DTO);
    const { id, ...dataWithoutId } = prismaItem;
    const newItem = await this.getModel().create({
      data: dataWithoutId,
    });
    return this.toDTO(newItem);
  }

  async update(id: number, item: Partial<DTO>): Promise<DTO> {
    const prismaItem = this.toPrisma(item as DTO);
    const updatedItem = await this.getModel().update({
      where: { id },
      data: prismaItem,
    });
    return this.toDTO(updatedItem);
  }

  protected getModel() {
    return this.prisma[this.modelName as keyof PrismaClient] as any;
  }

  public toDTO(item: PrismaType): DTO {
    return (this.constructor as any).toDTO(item);
  }

  protected toPrisma(item: DTO): PrismaType {
    return (this.constructor as any).toPrisma(item);
  }
}
