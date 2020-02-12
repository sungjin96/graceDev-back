import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class SubComment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  content: string;

  @Field()
  @Column({ length: 200 })
  write: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
