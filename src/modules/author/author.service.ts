import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import * as uuid from 'uuid'
import { Author, AuthorInput } from 'src/graphql'

@Injectable()
export class AuthorService {
  private readonly authors: Author[] = []

  findOne(authorID: string) {
    const existedAuthor = this.authors.find((i) => i.id === authorID)
    if (!existedAuthor) throw new HttpException('Author not found', HttpStatus.NOT_FOUND)
    return existedAuthor
  }

  findAll() {
    return this.authors
  }

  createAuthor(input: AuthorInput) {
    const newAuthor = {
      id: uuid.v4(),
      ...input
    }
    this.authors.push(newAuthor)
    return newAuthor
  }
}
