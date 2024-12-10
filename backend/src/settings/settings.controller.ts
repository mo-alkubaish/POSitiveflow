import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Settings } from './entities/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}



  @Get()
  @ApiOperation({ summary: 'Get current settings' })
  @ApiResponse({ status: 200, description: 'Return the current settings.', type: Settings })
  /**
   * Get the current settings.
   *
   * @returns The current settings
   *  
   */
  find() {
    return this.settingsService.getSettings();
  }


  @Patch('')
  @ApiOperation({ summary: 'Update settings' })
  @ApiResponse({ status: 200, description: 'Return the updated settings.', type: Settings })
  @ApiBody({ type: UpdateSettingDto })
  /**
   * Update the settings.
   *
   * @param updateSettingDto The new settings to be saved in the database.
   * @returns The updated settings.
   */
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.updateSettings(updateSettingDto);
  }

}
