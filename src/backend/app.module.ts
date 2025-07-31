// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from './entities/User';
import { Story } from './entities/Story';
import { StorySegment } from './entities/StorySegment';
import { ModerationQueue } from './entities/ModerationQueue';
import { ModerationHistory } from './entities/ModerationHistory';
import { BannedContent } from './entities/BannedContent';
import { UserStatistic } from './entities/UserStatistic';

@Module({
	imports: [
		// Database configuration will go here
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'your_username',
			password: 'your_password',
			database: 'exquisite_corpse',
			entities: [
				User,
				Story,
				StorySegment,
				ModerationQueue,
				ModerationHistory,
				BannedContent,
				UserStatistic,
			],
			autoLoadEntities: true,
			synchronize: true, // Set to false in production
		}),
		// GraphQL configuration
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true, // Automatically generate schema
		}),
	],
})
export class AppModule {}
