import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-conection';
import * as schema from "./schema";

@Injectable()
export class CategoriesService {

    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>
    ){}

    async createCategory(category: typeof schema.categories.$inferInsert){
        return this.database.insert(schema.categories).values(category).returning({id: schema.categories.id})
    }

    addToPost(
        postToCategory: typeof schema.postsToCategories.$inferInsert
    ){
        return this.database.insert(schema.postsToCategories).values(postToCategory)
    }

    getCategories(){
        return this.database.query.categories.findMany({
            with: {
                postsToCategories: true
            }
        })
    }

}
