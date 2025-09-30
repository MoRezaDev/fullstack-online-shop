import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [DatabaseModule,UserModule]
})
export class AddressModule {}
