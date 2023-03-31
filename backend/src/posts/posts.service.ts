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

  async getLikedPost({ email }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const likedposts = await this.prisma.like.findMany({
      where: {
        userId: user.id,
      },
    });

    const postIds = likedposts.map((post) => post.postId);

    const posts = await this.prisma.post.findMany({
      where: {
        id: { in: postIds },
      },
    });
    return posts;
  }

  async likePost({ postId, email }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    const isLiked = await this.prisma.like.findMany({
      where: {
        userId: user.id,
        postId: post.id,
      },
    });
    console.log(isLiked);
    if (isLiked.length > 0) {
      await this.prisma.like.deleteMany({
        where: {
          userId: user.id,
          postId: post.id,
        },
      });
      return null;
    }
    const like = await this.prisma.like.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });
    return like;
  }
}
