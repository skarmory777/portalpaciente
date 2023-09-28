import { AppConfig } from '../config/config.model';
import { ConfigService } from '../config/config.service';

export abstract class Entity {
  static config: AppConfig;
  codColigada: number;
  _messages?: any;
  constructor() {
    if (!Entity.config) {
      Entity.config = new ConfigService().get();
    }

    this.codColigada = Entity.config.codColigada;
  }
}
