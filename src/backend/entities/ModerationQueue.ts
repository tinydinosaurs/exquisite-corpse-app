import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { StorySegment } from './StorySegment';

export enum ModerationQueueStatus {
	PENDING = 'pending',
	APPROVED = 'approved',
	REJECTED = 'rejected',
	FLAGGED = 'flagged',
}

export enum ModerationReason {
	HATE_SPEECH = 'hate_speech',
	HARASSMENT = 'harassment',
	EXPLICIT_CONTENT = 'explicit_content',
	SPAM = 'spam',
	OFFENSIVE_LANGUAGE = 'offensive_language',
	OTHER = 'other',
}

@ObjectType()
@Entity('moderation_queue')
export class ModerationQueue {
	/** Unique identifier for the moderation queue entry */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** Segment that was reported */
	@Field(() => StorySegment)
	@ManyToOne(() => StorySegment)
	@JoinColumn()
	segment!: StorySegment;

	/** User who reported the content */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	reported_by!: User;

	/** Reason for moderation action */
	@Field()
	@Column({
		type: 'enum',
		enum: ModerationReason,
	})
	reason!: ModerationReason;

	/** Status of moderation action */
	@Field()
	@Column({
		type: 'enum',
		enum: ModerationQueueStatus,
	})
	status!: ModerationQueueStatus;

	/** Timestamp when the moderation action was taken */
	@Field()
	@CreateDateColumn()
	created_at!: Date;

	/** User who resolved the moderation */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	resolved_by!: User;

	/** Timestamp when the moderation was resolved */
	@Field({ nullable: true })
	@Column({ nullable: true })
	resolved_at!: Date;
}
