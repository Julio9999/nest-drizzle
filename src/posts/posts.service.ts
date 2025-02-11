import { Inject, Injectable } from '@nestjs/common';
import * as schema from './schema'
import { DATABASE_CONNECTION } from 'src/database/database-conection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class PostsService {

    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>
    ){}

    getPosts(){
        return this.database.query.posts.findMany({
            with: {user: true}
        })
    }

    createPost(post: typeof schema.posts.$inferInsert){
        return this.database.insert(schema.posts).values(post)
    }

}
