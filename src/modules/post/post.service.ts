import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PostInput, Post } from 'src/graphql'
import * as uuid from 'uuid'
import * as moment from 'moment'


@Injectable()
export class PostService {
  private readonly post: Post[] = []

  findOne(postID: string) {
    const existedPost = this.post.find((i) => i.id === postID)
    if (!existedPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    return existedPost
  }

  findAll() {
    return this.post
  }

  createPost(input: PostInput, context: any) {
    const newPost = {
      id: uuid.v4(),
      ...input,
      createdAt: moment().valueOf(),
      createdBy: context.authorID
    }
    this.post.push(newPost)
    return newPost
  }
}
