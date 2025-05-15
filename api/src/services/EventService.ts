import { BaseService } from "./BaseService.js";
import { EventRepository } from "../repository/EventRepository.js";

export class EventService extends BaseService<EventRepository> {
  constructor(repo: EventRepository) {
    super(repo);
  }
}
