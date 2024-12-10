import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { EntityManager, FilterQuery, MikroORM } from '@mikro-orm/mongodb';
import { NotFoundException } from '@nestjs/common';
import { format } from 'path';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
  create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.em.create('Supplier', createSupplierDto);
    this.em.persistAndFlush(supplier);
    return supplier;
  }

  findAll(page: number = 1, limit: number = 10, search: string) {
    const offset = (page - 1) * limit;
    const criteria = this.getSearchCriteria(search);
    const suppliers = this.em.find('Supplier', criteria, { limit, offset });
    return suppliers;
  }

  findOne(id: string) {
    const supplier = this.em.findOneOrFail('Supplier', { id });
    return supplier;
  }

  update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = this.em.findOneOrFail('Supplier', { id });
    this.em.assign(supplier, updateSupplierDto);
    this.em.persistAndFlush(supplier);
    return supplier;
  }

  async remove(id: string) {
    const result = await this.em.nativeDelete('Item', { id });
    if (result === 0) {
        throw new NotFoundException(`Item #${id} not found`);
    }
    return `Item #${id} removed`;
  }
    private async getSearchCriteria(search: string): Promise<FilterQuery<Supplier>> {
      if (!search) return {};
      
      const isNumeric = /^\d+$/.test(search);
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      if (!isNumeric) {
          return {
              $or: [
                  { email: new RegExp(escapedSearch, 'i') },
                  { name: new RegExp(escapedSearch, 'i') }
              ]
          };
      }
      
      return {
          $or: [
              { email: new RegExp(escapedSearch, 'i') },
              { name: new RegExp(escapedSearch, 'i') },
              { 
                  phone: new RegExp(
                      search.length >= 3 
                          ? search.split('').join('[(-) ]?') 
                          : escapedSearch, 
                      'i'
                  ) 
              }
          ]
      };
  }
}
