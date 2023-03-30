import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async getPosts({ email }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: {
          not: user.id,
        },
      },
    });
    return posts;
  }

  async getMyPosts({ email }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const posts = await this.prisma.post.findMany({
      where: {
        authorId: user.id,
      },
    });
    return posts;
  }
}
