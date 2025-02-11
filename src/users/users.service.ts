import * as schema from './schema';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-conection';


@Injectable()
export class UsersService {

    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>
    ){}

    getUsers(){
        return this.database.query.users.findMany({
            with: {posts: true, profile: true}
        })
    }

    createUser(user: typeof schema.users.$inferInsert){
        return this.database.insert(schema.users).values(user)
    }

    createProfile(profile: typeof schema.profile.$inferInsert){
        return this.database.insert(schema.profile).values(profile)
    }

}
