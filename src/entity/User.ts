import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from "type-graphql";
import { UserFile } from './UserFile';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({length: 200 , unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({length: 20})
  name: string;

  @Field()
  @Column({length: 6})
  gender: string;

  @Field()
  @Column({length: 200})
  aboutTile: string;

  @Field()
  @Column("text")
  aboutContent: string;

  @Field()
  @Column({type: 'int', width: 3})
  age: number;

  @Field()
  @Column({type: 'int', width: 3})
  level: number;

  @OneToOne(type => UserFile)
  @JoinColumn()
  userImg: UserFile

  @Field()
  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;



  // @Field()
  // @Column()
  // firstName: string;

  // @Field()
  // @Column()
  // lastName: string;

  // @Field()
  // name(@Root() parent: User): string {
  //   return `${parent.firstName} ${parent.lastName}`;
  // }

}
