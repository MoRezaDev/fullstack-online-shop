import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../../database/database.service';
import { randomInt } from 'crypto';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const otp = {
      code: randomInt(10000, 99999),
      expires_at: new Date(Date.now() + 1 * 60 * 1000),
    };
    return await this.databaseService.user.create({
      data: {
        ...createUserDto,
        otp: {
          create: otp,
        },
      },
    });
  }

  async findAll() {
    return await this.databaseService.user.findMany({
      include: { address: true, cart: { include: { cart_items: true } } },
    });
  }

  async findOne(id: string) {
    return await this.databaseService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.user.delete({ where: { id } });
  }

  async checkUserExists(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: {
        address: true,
        orders: {
          include: {
            order_items: true,
            address: true,
            payment_details: { include: { transaction_history: true } },
          },
        },
        cart: { include: { cart_items: true } },
      },
    });

    if (!user) throw new NotFoundException('یوزر پیدا نشد');
    return user;
  }
  async checkUserExistsByMobile(mobile: string) {
    const user = await this.databaseService.user.findUnique({
      where: { mobile },
      include: { otp: true },
    });

    if (!user) throw new NotFoundException('یوزر پیدا نشد');
    return user;
  }
}
