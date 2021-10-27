import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
  // ManyToOne,
  // OneToMany,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
// import { User } from "./User";
// import { Member } from "./Member";

@ObjectType()
@Entity()
export class League extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  memberCount: number;

  @Field()
  @Column()
  creatorId: number;

  // @ManyToOne(() => User, (user) => user.leagues)
  // user: User;

  // @OneToMany(() => Member, (member) => member.league)
  // members: Member[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
