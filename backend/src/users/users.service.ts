import { EntityManager, FilterQuery,  } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { Loyalty } from './entities/loyalty.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    constructor(
        private readonly em: EntityManager,
    ) {}

    async findOne(credentials: string): Promise<User | undefined> {
        const user = await this.em.findOne<User>('User', { $or: [ { email: credentials }, { phone: credentials } ] });   
        return user;
    }

    async summery(id: string): Promise<User> {
        const user = await this.em.findOneOrFail<User>('User', id);
        const loyalty = await this.em.findOne<Loyalty>('Loyalty', { customer: user });
        user['loyalty'] = loyalty;
        return user;
    }

    async comparePassword(user: User, password: string): Promise<boolean> {
        return user && await user.validatePassword(password);
    }
    async create(phone: string, email: string, password: string, role: Role): Promise<User> {
            const user = this.em.create<User>('User', { phone, email, password, role });
            await this.em.persistAndFlush(user);
            return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.em.findOneOrFail<User>('User', id);
        this.em.assign(user, updateUserDto);
        await this.em.persistAndFlush(user);
        return user;
    }

    async remove(id: string): Promise<string> {
        const user = await this.em.findOneOrFail<User>('User', id);
        await this.em.removeAndFlush(user);
        return `User #${id} removed successfully`;
    }

    async findAll(page: number, limit: number, search: string, isCustomers: boolean): Promise<[User[], number]> {
        const offset = (page - 1) * limit;
        let criteria = await this.getSearchCriteria(search);
        if (isCustomers) {
            criteria = {$and: [criteria, { role: Role.Customer }]};
        }else{
            criteria = {$and: [criteria, { role: { $ne: Role.Customer } }]};
        }
        const users = await this.em.findAndCount<User>('User', criteria, { limit, offset });
        return users;
    }


 

    async addLoyalPoints(id: string, points: number): Promise<void> {

        const user = await this.em.findOneOrFail<User>('User', id);
        let loyalty = await this.em.findOne<Loyalty>('Loyalty', { customer: user });
        if (loyalty) {
            loyalty.points += points;
        } else {
            loyalty = this.em.create<Loyalty>('Loyalty', { points, customer: user });
        }
        await this.em.persistAndFlush(loyalty);

        await this.em.persistAndFlush(user);
    }

    private async getSearchCriteria(search: string): Promise<FilterQuery<User>> {
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
