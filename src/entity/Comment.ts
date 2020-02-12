import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import { Post } from './Post';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @ManyToOne(type => Post, post => post.comments)
  post: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column({ length: 200 })
  write: string;

  @Field()
  @Column()
  password: string;

  @ManyToOne(type => Comment, comment => comment.childComments)
  parentComment: Comment;
  
  @OneToMany(type => Comment, comment => comment.parentComment)
  childComments: Comment[];

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
