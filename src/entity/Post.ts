import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from './Comment';
import { Tag } from './Tag';
import { PostFile } from './PostFile';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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
  subMenuId: number;

  @OneToMany(type => Comment, comment => comment.id)
  comments: Comment[];

  @OneToMany(type => Tag, tag => tag.id)
  tags: Tag[];

  @OneToOne(type => PostFile)
  @JoinColumn()
  thumbnail: PostFile

  @Field()
  @Column({type: 'int', width: 3})
  level: number;

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
