import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { EntityManager } from '@mikro-orm/mongodb';
import { Role } from 'src/users/enums/role.enum';
import { CartStatus } from 'src/common/cart/Enums/cart-status.enum';
import { Cart } from 'src/common/cart/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { ListAllDto } from 'src/dto/list-all.dto';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly em: EntityManager,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto,orderId: string, userId: string) {
    const { message, overAllRating, cashirRating } = createFeedbackDto;
    const order =await this.em.findOneOrFail<Cart>('Cart', { id: orderId, status: { $ne: CartStatus.Draft } });
    const user = await this.em.findOneOrFail<User>('User', { id: userId, role: Role.Customer });
    if (order.customer.id !== user.id) {
    const feedback = this.em.create('Feedback', { message, overAllRating, cashirRating, user, order });
    this.em.persistAndFlush(feedback);

    return { message: 'Feedback created successfully' };
  }
  }

  async findAll(findAll: ListAllDto) {
    const offset = findAll.page * findAll.limit;
    const feedbacks = await this.em.find('Feedback', {}, { limit: findAll.limit, offset: offset });
    return feedbacks;
  }

  async findOne(feedbackId: string, userId: string) {
    const feedback = await this.em.findOneOrFail('Feedback', { id: feedbackId, customer: { id: userId } });
    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto, userId: string) {
    const feedback = await this.em.findOneOrFail('Feedback', { id, customer: { id: userId } });
    await this.em.assign(feedback, updateFeedbackDto);
    await this.em.persistAndFlush(feedback);
    return { message: 'Feedback updated successfully' };
  }

  async remove(id: string, userId: string) {
    const feedback = await this.em.findOneOrFail('Feedback', { id, customer: { id: userId } });
    this.em.remove(feedback);
    await this.em.flush();
    return { message: `Feedback #${id} removed successfully` };
  }
}
