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

export enum StoryStatus {
	DRAFT = 'draft',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	ABANDONED = 'abandoned',
	MODERATED = 'moderated',
}

@ObjectType()
@Entity('stories')
export class Story {
	/** Unique identifier for the story */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** Title of the story */
	@Field()
	@Column()
	title!: string;

	/** Current status of the story (draft, in progress, completed, etc.) */
	@Field()
	@Column({
		type: 'enum',
		enum: StoryStatus,
		default: StoryStatus.DRAFT,
	})
	status!: StoryStatus;

	/** Number of segments currently added to the story */
	@Field()
	@Column({ default: 0 })
	current_segment_count!: number;

	/** Minimum number of segments required to complete the story */
	@Field()
	@Column({ default: 0 })
	min_segments!: number;

	/** Maximum number of segments allowed in the story */
	@Field()
	@Column({ default: 0 })
	max_segments!: number;

	/** User who created the story */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	created_by!: User;

	/** Timestamp when the story was created */
	@Field()
	@CreateDateColumn()
	created_at!: Date;

	/** Timestamp of the last update to the story */
	@Field()
	@CreateDateColumn()
	last_updated!: Date;

	/** Flag indicating whether the story is visible to all users */
	@Field()
	@Column({ default: true })
	is_public!: boolean;

	/** Timestamp when the story was completed (null if not completed) */
	@Field({ nullable: true })
	@Column({ nullable: true })
	completed_at!: Date;
}
