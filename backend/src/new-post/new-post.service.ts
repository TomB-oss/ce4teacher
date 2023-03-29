import { Injectable, ForbiddenException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class NewPostService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async newPost(dto: PostDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('No user found');
    }
    await this.prisma.post
      .create({
        data: {
          title: dto.title,
          authorId: user.id,
          description: dto.description,
          category: dto.category,
          location: dto.location,
          image: dto.image,
          price: dto.price,
        },
      })
      .catch((error) => {
        throw error;
      });
    return { message: 'New post added successfully' };
  }
}
