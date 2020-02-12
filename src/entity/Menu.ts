import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Menu extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  menuName: string;

  @Field()
  @Column({type: 'int', width: 3})
  level: number;

  @Field()
  @Column({type: 'int', width: 3})
  ord: number;

  @ManyToOne(type => Menu, menu => menu.childMenus)
  parentMenu: Menu;
  
  @OneToMany(type => Menu, menu => menu.parentMenu)
  childMenus: Menu[];

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
