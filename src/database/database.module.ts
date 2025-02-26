import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database-conection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from 'src/users/schema';
import * as postSchema from 'src/posts/schema';
import * as categoriesSchema from "src/categories/schema";

@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL')
                });
                return drizzle(pool, {
                    schema: {
                        ...userSchema,
                        ...postSchema,
                        ...categoriesSchema
                    }
                })
            },
            inject: [ConfigService]
        },
    ],
    exports: [DATABASE_CONNECTION]
})
export class DatabaseModule {}
