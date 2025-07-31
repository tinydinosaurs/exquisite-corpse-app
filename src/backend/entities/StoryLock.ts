import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Story } from './Story';

@ObjectType()
@Entity('story_locks')
export class StoryLock {
	/** Unique identifier for the story lock */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** The story that is currently locked */
	@Field(() => Story)
	@ManyToOne(() => Story)
	@JoinColumn()
	story!: Story;

	/** User who currently holds the lock on the story */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	user!: User;

	/** Timestamp when the story was locked */
	@Field()
	@CreateDateColumn()
	locked_at!: Date;

	/** Timestamp when the lock will expire */
	@Field()
	@Column()
	expires_at!: Date;
}
