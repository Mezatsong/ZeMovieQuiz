import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Actor, Movie } from "../types";


/**
 * movie and actor are not persisted, 
 * we only need hash and wether it is correct
 * createdAt is here in case we want to flush database
 */
@ObjectType()
@Entity()
export class Question extends BaseEntity {
	@Field(() => ID)
	@PrimaryColumn()
	hash!: string;

	@Field(() => Movie)
	movie: Movie;

	@Field(() => Actor)
	actor: Actor;

	@Column()
	isInCast!: boolean;

	@CreateDateColumn()
	createdAt: Date;
}
