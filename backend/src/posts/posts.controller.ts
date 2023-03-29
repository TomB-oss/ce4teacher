import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private authService: PostsService) {}

  @Get()
  getPosts() {
    return this.authService.getPosts();
  }

  @Post('my-posts')
  getMyPosts(@Body() { email }) {
    return this.authService.getMyPosts({ email });
  }
}
