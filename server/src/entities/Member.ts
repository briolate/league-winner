// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
//   CreateDateColumn,
//   BaseEntity,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from "typeorm";
// import { ObjectType, Field } from "type-graphql";
// import { League } from "./League";
// import { Draft } from "./Draft";

// @ObjectType()
// @Entity()
// export class Member extends BaseEntity {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Field()
//   @Column()
//   name: string;

//   @ManyToOne(() => League, (league) => league.members)
//   league: League;

//   @OneToMany(() => Draft, (draft) => draft.member)
//   drafts: Draft[];

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt = Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt = Date;
// }
