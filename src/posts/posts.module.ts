import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [DatabaseModule, CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
