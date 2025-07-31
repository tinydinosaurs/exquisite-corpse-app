import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

export enum UserRole {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	USER = 'user',
}

@ObjectType()
@Entity('users')
export class User {
	/** Unique identifier for the user */
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	/** User's unique username used for display and identification */
	@Field()
	@Column({ unique: true })
	username!: string;

	/** User's unique email address for account recovery and notifications */
	@Field()
	@Column({ unique: true })
	email!: string;

	/** Hashed password for secure authentication */
	@Column()
	password_hash!: string;

	/** User's role in the system (e.g., 'user', 'admin', 'moderator') */
	@Field()
	@Column({
		type: 'enum',
		enum: UserRole,
	})
	role!: UserRole;

	/** Timestamp when the user account was created */
	@Field()
	@CreateDateColumn()
	created_at!: Date;

	/** Timestamp of the user's last successful login */
	@Field({ nullable: true })
	@Column({ nullable: true })
	last_login!: Date;

	/** Flag indicating whether the user account is active or disabled */
	@Field()
	@Column({ default: true })
	is_active!: boolean;
}

/** TODO: Add a field for the user's profile picture */
/** TODO: Add a field for the user's bio */
/** TODO: Add a field for the user's location */
/** TODO: Add a field for the user's website */
/** TODO: Add a field for the user's social media links */
/** TODO: Add a date field for the last activitiy */
