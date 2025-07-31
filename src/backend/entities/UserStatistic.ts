import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity('user_statistics')
export class UserStatistic {
	/** Unique identifier for the user statistics record */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** The user these statistics belong to */
	@Field(() => User)
	@OneToOne(() => User)
	@JoinColumn()
	user!: User;

	/** Total number of stories created by the user */
	@Field()
	@Column({ default: 0 })
	stories_started!: number;

	/** Total number of segments written by the user */
	@Field()
	@Column({ default: 0 })
	segments_contributed!: number;

	/** Timestamp when the last contribution was made */
	@Field({ nullable: true })
	@Column({ nullable: true })
	last_contribution!: Date;
}
