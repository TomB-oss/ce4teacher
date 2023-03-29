import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NewPostController } from './new-post/new-post.controller';
import { NewPostService } from './new-post/new-post.service';
import { NewPostModule } from './new-post/new-post.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, NewPostModule, PostsModule],
  controllers: [AppController, NewPostController],
  providers: [AppService, PrismaService, NewPostService],
})
export class AppModule {}
