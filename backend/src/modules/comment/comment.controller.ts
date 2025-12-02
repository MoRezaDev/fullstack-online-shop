import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { VerifyJwtGurd } from '../../common/gurds/verify-jwt.gurd';
import { SubmitCommentDto } from './dto/submit-comment.dto';
import { VerifyJwtAndRole } from '../../common/decorators/auth-role.decorator';

@UseGuards(VerifyJwtGurd)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  async submitComment(@Body() submitCommentDto: SubmitCommentDto) {
    return await this.commentService.submitComment(submitCommentDto);
  }

  @Patch('approve/:id')
  @VerifyJwtAndRole('admin')
  async approveComment(@Param('id') commentId: string) {
    await this.commentService.approveComment(commentId);
  }
}
