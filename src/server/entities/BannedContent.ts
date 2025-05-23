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

export enum BannedContentType {
	WORD = 'word',
	PHRASE = 'phrase',
	REGEX = 'regex',
}

export enum UserRole {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	USER = 'user',
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
@Entity('banned_content')
export class BannedContent {
	/** Unique identifier for the banned content entry */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** Type of banned content (word, phrase, or regex pattern) */
	@Field()
	@Column({
		type: 'enum',
		enum: BannedContentType,
	})
	type!: BannedContentType;

	/** The actual content that is banned */
	@Field()
	@Column()
	content!: string;

	/** User who banned this content */
	@Field(() => User)
	@ManyToOne(() => User)
	@JoinColumn()
	banned_by!: User;

	/** Timestamp when the content was banned */
	@Field()
	@CreateDateColumn()
	banned_at!: Date;

	/** Flag indicating whether the ban is currently active */
	@Field()
	@Column({ default: true })
	is_active!: boolean;

	/** Reason for banning the content */
	@Field()
	@Column({
		type: 'enum',
		enum: BanReason,
	})
	reason!: BanReason;

	/** Role of the user who banned the content */
	@Field()
	@Column({
		type: 'enum',
		enum: UserRole,
	})
	banned_by_role!: UserRole;
}
