import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Draft extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date;

  @Field(() => String)
  @Column()
  year!: string;

  @Field(() => String)
  @Column()
  qb!: string;

  @Field(() => String)
  @Column()
  rb1!: string;

  @Field(() => String)
  @Column()
  rb2!: string;

  @Field(() => String)
  @Column()
  rb3!: string;

  @Field(() => String)
  @Column()
  wr1!: string;

  @Field(() => String)
  @Column()
  wr2!: string;

  @Field(() => String)
  @Column()
  wr3!: string;
}
