import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Root } from 'type-graphql';

@ObjectType()
@Entity()
export class UserFile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({length: 100})
  originFileName: string;

  @Field()
  @Column({length: 100})
  fileName: string;

  @Field()
  @Column()
  fileSize: number;

  @Field()
  @Column()
  filePath: string;

  @Field()
  fullPath(@Root() parent: UserFile): string {
    return `${parent.filePath} ${parent.fileName}`;
  }

  @Field()
  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  regDt: Date;

  @Field()
  @Column()
  updDt: Date;
}
