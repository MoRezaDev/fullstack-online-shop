import { Module } from '@nestjs/common';
import { InitService } from './init.service';
import { InitController } from './init.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [InitController],
  providers: [InitService],
  imports: [DatabaseModule],
})
export class InitModule {}
