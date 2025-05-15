import { PrismaClient } from '.prisma/client';

export abstract class BaseRepository<PrismaType, DTO> {
  constructor(
    protected prisma: PrismaClient,
    protected modelName: string
  ) {}

  async getAll(): Promise<DTO[]> {
    const items = await this.getModel().findMany();
    return items.map((item: PrismaType) => this.toDTO(item));
  }

  async upsert(id: number, item: Partial<DTO>): Promise<DTO> {
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

  protected abstract toDTO(item: PrismaType): DTO;
  protected abstract toPrisma(item: DTO): PrismaType;
}
