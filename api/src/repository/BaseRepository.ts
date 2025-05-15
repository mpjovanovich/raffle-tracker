import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<PrismaType, DTO> {
  constructor(protected prisma: PrismaClient, protected modelName: string) {}

  async fetchAll(): Promise<DTO[]> {
    const items = await this.prisma[this.modelName].findMany();
    return items.map((item: PrismaType) => this.toDTO(item));
  }

  protected abstract toDTO(item: PrismaType): DTO;
  protected abstract toPrisma(item: DTO): PrismaType;
}
