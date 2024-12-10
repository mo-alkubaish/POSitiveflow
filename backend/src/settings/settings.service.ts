import { Injectable } from '@nestjs/common';
import { Settings } from './entities/settings.entity'; // Your existing entity
import { EntityManager } from '@mikro-orm/mongodb';

@Injectable()
export class SettingsService {
  private static instance: SettingsService;
  private settingsCache: Settings | null = null;

  constructor(
    private readonly em: EntityManager,
  ) {}

  public static initialize(em: EntityManager): void {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService(em);
    }
  }

  public static async getSettingsStatic(): Promise<Settings> {
    if (!SettingsService.instance) {
      throw new Error('SettingsService must be initialized first');
    }
    return SettingsService.instance.getSettings();
  }

  // Get cached or fetch settings
  async getSettings(): Promise<Settings> {
    // If settings are already cached, return them
    if (this.settingsCache) {
      return this.settingsCache;
    }

    // Try to find existing settings
    let settings: Settings[] = await this.em.find<Settings>("Settings", {});
    let currentSettings: Settings;

    

    // If no settings exist, create default settings
    if (settings.length === 0) {
      currentSettings =this.em.create<Settings>("Settings", {
        storeName: 'My Store',
        currency: 'SAR',
        vatRate: 15,
        lowStockAlert: 10,
        isWhatsAppEnabled: false,
        isLoyaltyEnabled: false,
        backUpFrequency: 'daily',
        retentionPeriod: 30
      });
      this.em.persist(settings);
      await this.em.flush();
    }else
    {
      currentSettings = settings[0];
    }

    // Cache the settings
    this.settingsCache = currentSettings;

    return currentSettings;
  }

  // Update settings
  async updateSettings(newSettings: Partial<Settings>): Promise<Settings> {
    // Ensure we have the current settings
    let settings = await this.getSettings();

    // Update the settings
    Object.assign(settings, newSettings);

    // Persist changes

    this.em.persist(settings);
    await this.em.flush();

    // Update cache
    this.settingsCache = settings;

    return settings;
  }

  // Reset cache (useful for testing or when you suspect data might have changed externally)
  resetCache(): void {
    this.settingsCache = null;
  }
}