import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import { Post } from './Post';

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(type => Post, post => post.tags)
  post: number;

  @Field()
  @Column({length: 100})
  tagContent: string;

  @Field()
  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;

}
