import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private authService: PostsService) {}

  @Post()
  getPosts(@Body() { email }) {
    return this.authService.getPosts({ email });
  }

  @Post('my-posts')
  getMyPosts(@Body() { email }) {
    return this.authService.getMyPosts({ email });
  }

  @Post('like')
  likePost(@Body() { email, postId }) {
    return this.authService.likePost({ email, postId });
  }

  @Post('liked-posts')
  getLikedPost(@Body() { email }) {
    return this.authService.getLikedPost({ email });
  }
}
