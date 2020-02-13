import {
  Resolver, Query, Args, Mutation, ResolveProperty, Parent
} from '@nestjs/graphql'
import { AuthorService } from './author.service'
import { Author, AuthorInput } from 'src/graphql'

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService
  ) {}

  @Query('author')
  author(@Args('authorID') authorID: string) {
    return this.authorService.findOne(authorID)
  }

  @Query('authors')
  authors() {
    return this.authorService.findAll()
  }

  @Mutation('createAuthor')
  createAuthor(@Args('input') input: AuthorInput) {
    return this.authorService.createAuthor(input)
  }
}
