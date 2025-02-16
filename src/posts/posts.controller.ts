import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostRequest } from "./dto/create-post-request";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  createPost(@Body() request: CreatePostRequest) {
    return this.postsService.createPost(
      {
        content: request.content,
        userId: request.userId,
      },
      request.category,
    );
  }

  @Get(":id")
  getPost(@Param("id") id: string) {
    return this.postsService.getPost(parseInt(id));
  }

  @Patch(":id")
  updatePost(
    @Param("id") postId: string,
    @Body() request: { content: string },
  ) {
    return this.postsService.updatePost(parseInt(postId), request);
  }
}
