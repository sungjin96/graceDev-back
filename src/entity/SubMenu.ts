import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class SubMenu extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  menuName: string;

  @Field()
  @Column()
  level: number;

  @Field()
  @Column()
  ord: number;

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
