import { Module } from '@nestjs/common';
import { NewPostService } from './new-post.service';
import { NewPostController } from './new-post.controller';

@Module({
  providers: [NewPostService],
  controllers: [NewPostController],
})
export class NewPostModule {}
