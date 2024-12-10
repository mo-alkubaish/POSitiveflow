import { PartialType } from '@nestjs/swagger';
import { Settings } from '../entities/settings.entity';

export class UpdateSettingDto extends PartialType(Settings) {}
