import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { AuthorModule } from '../author/author.module'

@Module({
  imports: [AuthorModule],
  providers: [PostService, PostResolver]
})
export class PostModule {}
