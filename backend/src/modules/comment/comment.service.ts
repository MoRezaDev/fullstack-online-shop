import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { SubmitCommentDto } from './dto/submit-comment.dto';
import { toPersianDateTime } from '../../common/helper/functions';

@Injectable()
export class CommentService {
  constructor(private readonly databaseService: DatabaseService) {}

  async submitComment(submitCommentDto: SubmitCommentDto) {
    const isUserBuyer = await this.databaseService.orderItem.findFirst({
      where: {
        productId: submitCommentDto.productId,
        order: {
          userId: submitCommentDto.userId,
          status: { not: 'pending' },
        },
      },
      select: { id: true, sellerId: true },
    });

    const isBuyer = Boolean(isUserBuyer);

    if (isBuyer) {
      return await this.databaseService.comment.create({
        data: {
          productId: submitCommentDto.productId,
          text: submitCommentDto.text,
          userId: submitCommentDto.userId,
          is_buyer: true,
          reaction: {
            create: {},
          },
          comment_date: toPersianDateTime('long').date,
          buyer_detail: {
            create: {
              productId: submitCommentDto.productId,
              userId: submitCommentDto.userId,
              sellerId: isUserBuyer!.sellerId,
            },
          },
          rate: submitCommentDto.rate || 0,
        },
      });
    } else {
      return await this.databaseService.comment.create({
        data: {
          productId: submitCommentDto.productId,
          text: submitCommentDto.text,
          userId: submitCommentDto.userId,
          reaction: {
            create: {},
          },
          comment_date: toPersianDateTime('long').date,
          rate: submitCommentDto.rate || 0,
        },
      });
    }
  }

  // for admin
  async approveComment(commentId: string) {
    const comment = await this.checkCommentExists(commentId);

    await this.databaseService.comment.update({
      where: { id: comment.id },
      data: { approved: true },
    });

    return {
      success: true,
    };
  }

  //utility
  async checkCommentExists(commentId: string) {
    const comment = await this.databaseService.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('کامنتی با این آیدی وجود ندارد');
    return comment;
  }
}
