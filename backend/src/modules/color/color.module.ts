import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [ColorController],
  providers: [ColorService],
  imports: [DatabaseModule]
})
export class ColorModule {}
