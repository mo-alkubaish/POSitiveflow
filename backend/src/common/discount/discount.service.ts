import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { EntityManager } from '@mikro-orm/mongodb';
import { Cart } from '../cart/entities/cart.entity';
import { Discount } from './entities/discount.entity';
import { Loyalty } from 'src/users/entities/loyalty.entity';

@Injectable()
export class DiscountService {
  constructor(
    private readonly em: EntityManager,
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const discount = await this.em.create('Discount', createDiscountDto);
    await this.em.persistAndFlush(discount);
    return { message: 'Discount created successfully' };
  }

  async findAll(limit: number, offset: number, filter: string) {
    if (filter) {
      return await this.em.find('Discount', { name: { $regex: filter, $options: 'i' } }, { limit, offset });
    }
    return await this.em.find('Discount', {}, { limit, offset });
  }

  async findActiveDiscounts() {
    return await this.em.find('Discount', { endDate: { $gte: new Date() }, startDate: { $lte: new Date() } });
  }

  async findOne(id: string) {
    const discount = await this.em.findOneOrFail('Discount', { id });
    return discount;
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.em.findOneOrFail('Discount', { id });
    this.em.assign(discount, updateDiscountDto);
    await this.em.persistAndFlush(discount);

    return { message: 'Discount updated successfully' };
  }

  async remove(id: string) {
    const discount = await this.em.findOneOrFail('Discount', { id });
    this.em.remove(discount);
    await this.em.flush();
    return { message: `Discount #${id} removed successfully` };
  }
}
