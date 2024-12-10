import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, MikroORM } from '@mikro-orm/mongodb';
import { NotFoundException } from '@nestjs/common';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class ItemsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    private readonly settings: SettingsService
  ) {}
  /**
   * Creates a new item and persists it to the database.
   *
   * @param createItemDto Item data to be saved in the database.
   * @returns The newly created item with its ID.
   */
  async create(createItemDto: CreateItemDto) {
    const item = this.em.create('Item', createItemDto);
    await this.em.persistAndFlush(item);
    return item;
  }


  /**
   * Finds all items with the given pagination options.
   *
   * @param page The page number to be retrieved, the first page is 1
   * @param limit The number of items per page, the maximum is 100
   * @param search The search term to filter items
   * @param category The category of the item
   * @returns An array of items with the given pagination options.
   */
  async findAll(page: number = 1, limit: number = 10, search: string, category: string) {
    const offset = (page - 1) * limit;
    const criteria = await this.getSearchCriteria(search, category);
    const items = await this.em.findAndCount('Item', criteria, { limit, offset });
    return items;
  }

  /**
   * Finds an item by its ID.
   *
   * @param id The ID of the item to be found.
   * @returns The item with the given ID,
   * @throws NotFoundException if no item with the given ID is found.
   */
  async findOne(id: string) {
    const item = await this.em.findOneOrFail('Item', { id });
    return item;
  }

  /**
   * Updates an existing item in the database with new data.
   *
   * @param id The identifier for the item to be updated.
   * @param updateItemDto The data transfer object containing updated item information.
   * @returns The updated item after changes have been persisted.
   * @throws NotFoundException if no item with the given ID is found.
   */
  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.em.findOneOrFail('Item', { id });
    this.em.assign(item, updateItemDto);
    await this.em.persistAndFlush(item);
    return item;
  }

  /**
   * Deletes an item from the database.
   *
   * @param id The ID of the item to be deleted.
   * @returns A string indicating that the item was removed.
   * @throws NotFoundException if no item with the given ID is found.
   */
  async remove(id: string) {
    const result = await this.em.nativeDelete('Item', { id });
    if (result === 0) {
        throw new NotFoundException(`Item #${id} not found`);
    }
    return `Item #${id} removed`;
  }

  /**
   * Builds a MongoDB search criteria object based on the given query string.
   *
   * If the query string is numeric, the search criteria will include numeric
   * fields in addition to the text fields. If the query string is not numeric,
   * the search criteria will only include text fields.
   *
   * @param search The query string to build the search criteria from.
   * @returns A MongoDB search criteria object.
   */
  private async getSearchCriteria(search: string, category: string) {
    let searchCriteria: { $or: any[] };
    if (!search) return {};

    if (search.match(/^[0-9]+$/)) {
      // If the query is numeric, include numeric fields in the search criteria
      searchCriteria = { $or: [
        { name: { $regex: search, $options: 'i' } },
        { SKU: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { image: { $regex: search, $options: 'i' } },
        { price: parseInt(search) },
        { stock: parseInt(search) }
      ]};
    } else {
      // If the query is not numeric, use the existing search criteria
      searchCriteria = { $or: [
        { name: { $regex: search, $options: 'i' } },
        { SKU: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { image: { $regex: search, $options: 'i' } }
      ]};
    }

    return {$and: [searchCriteria, {category: category}]};
  } 


/**
 * Retrieves items with stock levels at or below a specified limit.
 *
 * @returns A promise that resolves to a list of items with stock levels less than or equal to the given limit.
 */
  async lowStock() {
    const setting = await this.settings.getSettings();
    const items = await this.em.find('Item', { stock: { $lte: setting.lowStockAlert } });
    return items;
  }

  async getSummery() {
    // gets one of each stock level  (in stock, low stock, out of stock)
    const setting = await this.settings.getSettings();
    const [inStock, lowStock, outOfStock] = await Promise.all([
      this.em.findAndCount('Item', { stock: { $gte: setting.lowStockAlert } }),
      this.em.findAndCount('Item', { stock: { $gte: 1, $lte: setting.lowStockAlert } }),
      this.em.findAndCount('Item', { stock: { $lte: 0 } }),
    ]);
    return { inStock, lowStock, outOfStock };
  }
}
