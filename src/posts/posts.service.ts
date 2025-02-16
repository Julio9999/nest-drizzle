import { Inject, Injectable } from "@nestjs/common";
import * as schema from "./schema";
import { DATABASE_CONNECTION } from "src/database/database-conection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { CategoriesService } from "src/categories/categories.service";

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly categoriesService: CategoriesService,
  ) {}

  getPosts() {
    return this.database.query.posts.findMany({
      with: { user: true, postsToCategories: true },
    });
  }

  async createPost(post: typeof schema.posts.$inferInsert, category?: string) {
    await this.database.transaction(async (tx) => {
        const posts = await tx
          .insert(schema.posts)
          .values(post)
          .returning({ id: schema.posts.id });
    
        if (category) {
          const [res] = await this.categoriesService.createCategory({
            name: category,
          });
          await this.categoriesService.addToPost({
            postId: posts[0].id,
            categoryId: res.id,
          });
        }
        return posts;
    })
  }

  getPost(postId: number) {
    return this.database.query.posts.findFirst({
      where: eq(schema.posts.id, postId),
      with: {postsToCategories: true}
    });
  }

  updatePost(postId: number, post: typeof schema.posts.$inferInsert) {
    return this.database
      .update(schema.posts)
      .set(post)
      .where(eq(schema.posts.id, postId));
  }
}
