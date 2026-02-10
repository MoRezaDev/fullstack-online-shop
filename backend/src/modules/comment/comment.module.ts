import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [DatabaseModule, UserModule],
})
export class CommentModule {}
