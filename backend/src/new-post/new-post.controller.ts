import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { NewPostService } from './new-post.service';
import { PostDto } from './dto';

@Controller('new-post')
export class NewPostController {
  constructor(private authService: NewPostService) {}

  @Post('create')
  newPost(@Body() dto: PostDto) {
    return this.authService.newPost(dto);
  }
}
