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

export enum ModerationAction {
	APPROVE = 'approve',
	REJECT = 'reject',
	FLAG = 'flag',
	UNFLAG = 'unflag',
	EDIT = 'edit',
}

export enum BanReason {
	HATE_SPEECH = 'hate_speech',
	HARASSMENT = 'harassment',
	EXPLICIT_CONTENT = 'explicit_content',
	SPAM = 'spam',
	OFFENSIVE_LANGUAGE = 'offensive_language',
	OTHER = 'other',
}

@ObjectType()
@Entity('moderation_history')
export class ModerationHistory {
	/** Unique identifier for the moderation history entry */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** The story segment that was moderated */
	@Field(() => StorySegment)
	@ManyToOne(() => StorySegment)
	@JoinColumn()
	segment!: StorySegment;

	/** User who performed the moderation action */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	moderator!: User;

	/** The type of moderation action taken */
	@Field()
	@Column({
		type: 'enum',
		enum: ModerationAction,
	})
	action!: ModerationAction;

	/** Explanation for the moderation action */
	@Field()
	@Column({
		type: 'enum',
		enum: BanReason,
	})
	reason!: BanReason;

	/** Timestamp when the moderation action was taken */
	@Field()
	@CreateDateColumn()
	created_at!: Date;

	/** Previous content of the segment before moderation (if edited) - currently not in DB */
	@Field({ nullable: true })
	@Column('text', { nullable: true })
	previous_content!: string;
}
