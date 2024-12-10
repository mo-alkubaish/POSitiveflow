import { Module, OnModuleInit } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { EntityManager } from '@mikro-orm/core';
import { MongoDriver, MongoEntityManager } from '@mikro-orm/mongodb';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService]
})
export class SettingsModule implements OnModuleInit {
  constructor(
    private readonly em: MongoEntityManager<MongoDriver>,
    private readonly settingsService: SettingsService
  ) {}

  onModuleInit() {
    SettingsService.initialize(this.em);
  }
}
