// api/src/services/HorseService.ts
import { Horse, PrismaClient } from '.prisma/client';
import { CreateHorseRequest, Horse as HorseDTO } from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class HorseService extends BaseService<Horse, HorseDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'horse');
  }

  public static toDTO(horse: Horse): HorseDTO {
    return {
      id: horse.id,
      contestId: horse.contest_id,
      number: horse.number,
      winner: horse.winner,
      scratch: horse.scratch,
    };
  }

  protected static toPrisma(horse: HorseDTO): Horse {
    return {
      id: horse.id,
      contest_id: horse.contestId,
      number: horse.number,
      winner: horse.winner,
      scratch: horse.scratch,
    };
  }

  public async createHorse(
    createHorseRequest: CreateHorseRequest
  ): Promise<HorseDTO> {
    const horse = await this.insert({
      id: 0,
      contestId: createHorseRequest.contestId,
      number: createHorseRequest.number,
      winner: false,
      scratch: false,
    });
    return horse;
  }

  public async delete(id: number): Promise<void> {
    if (await this.hasTickets(id)) {
      throw new Error('Cannot delete horse that has tickets');
    }
    await this.prisma.horse.delete({ where: { id } });
  }

  public async toggleScratch(id: number): Promise<HorseDTO> {
    let horse = await this.getById(id);
    if (!horse) {
      throw new Error('Horse not found');
    }
    if (horse.winner) {
      throw new Error('Winner horse cannot be scratched');
    }
    horse.scratch = !horse.scratch;
    horse = await this.update(id, horse);
    return horse;
  }

  private async hasTickets(horseId: number): Promise<boolean> {
    const ticketCount = await this.prisma.ticket.count({
      where: { horse_id: horseId },
    });
    return ticketCount > 0;
  }

  public async toggleWinner(id: number): Promise<HorseDTO> {
    let horse = await this.getById(id);
    if (!horse) {
      throw new Error('Horse not found');
    }
    if (horse.scratch) {
      throw new Error('Scratched horse cannot be winner');
    }

    return this.prisma.$transaction(async tx => {
      // Clear all winners in the contest
      await tx.horse.updateMany({
        where: { contest_id: horse.contestId },
        data: { winner: false },
      });

      // Set this horse as winner
      const updatedHorse = await tx.horse.update({
        where: { id: horse.id },
        data: { winner: !horse.winner },
      });

      return this.toDTO(updatedHorse);
    });
  }
}
