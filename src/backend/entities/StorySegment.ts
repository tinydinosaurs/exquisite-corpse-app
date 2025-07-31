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

export enum SegmentStatus {
	DRAFT = 'draft',
	SUBMITTED = 'submitted',
	APPROVED = 'approved',
	REJECTED = 'rejected',
}

@ObjectType()
@Entity('story_segments')
export class StorySegment {
	/** Unique identifier for the story segment */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** The story this segment belongs to */
	@Field(() => Story)
	@ManyToOne(() => Story)
	@JoinColumn()
	story!: Story;

	/** The position of this segment in the story sequence */
	@Field()
	@Column()
	segment_number!: number;

	/** User who wrote this segment */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	author!: User;

	/** The actual text content of the segment */
	@Field()
	@Column('text')
	content!: string;

	/** Number of words in the segment */
	@Field()
	@Column()
	word_count!: number;

	/** Current status of the segment (draft, submitted, approved, rejected) */
	@Field()
	@Column({
		type: 'enum',
		enum: SegmentStatus,
		default: SegmentStatus.DRAFT,
	})
	status!: SegmentStatus;

	/** Timestamp when the segment was created */
	@Field()
	@CreateDateColumn()
	created_at!: Date;

	/** Timestamp of the last update to the segment */
	@Field()
	@CreateDateColumn()
	last_updated!: Date;

	/** Timestamp of the last automatic save */
	@Field({ nullable: true })
	@Column({ nullable: true })
	last_autosave!: Date;

	/** Content of the last automatic save */
	@Field({ nullable: true })
	@Column('text', { nullable: true })
	autosave_content!: string;
}
