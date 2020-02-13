import {
  Resolver, Query, Args, Mutation, ResolveProperty, Parent, Context
} from '@nestjs/graphql'
import { PostService } from './post.service'
import { AuthorService } from '../author/author.service'
import { AuthGuard } from 'src/common/auth.guard'
import { UseGuards } from '@nestjs/common'
import { PostInput } from 'src/graphql'

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly authorService: AuthorService

  ) {}

  @Query('post')
  post(@Args('postID') postID: string) {
    return this.postService.findOne(postID)
  }

  @Query('posts')
  posts() {
    return this.postService.findAll()
  }

  @ResolveProperty('createdBy')
  getAuthor(@Parent() post) {
    const { createdBy: authorID } = post
    return this.authorService.findOne(authorID)
  }

  // @UseGuards(AuthGuard)
  @Mutation('createPost')
  createPost(@Args('input') input: PostInput, @Context() context: any) {
    console.log(input, context)
    return this.postService.createPost(input, context)
  }
}
