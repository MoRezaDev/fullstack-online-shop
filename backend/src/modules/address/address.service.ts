import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from '../../database/database.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressService {
  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const user = await this.userService.checkUserExists(
      createAddressDto.userId,
    );

    return await this.databaseService.address.create({
      data: {
        ...createAddressDto,
        mobile: user.mobile,
        full_name: user.full_name ?? '',
      },
    });
  }

  async findAll() {
    return this.databaseService.address.findMany()
  }

  async findOne(id: string) {
    return this.databaseService.address.findUnique({where: {id}})
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.databaseService.address.update({where: {id},data: updateAddressDto})
  }

  async remove(id: string) {
    return await this.databaseService.address.delete({where: {id}})
  }
}
