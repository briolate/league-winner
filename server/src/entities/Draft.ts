// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
//   CreateDateColumn,
//   Column,
//   BaseEntity,
//   // ManyToOne,
// } from "typeorm";
// import { ObjectType, Field } from "type-graphql";
// // import { Member } from "./Member";

// @ObjectType()
// @Entity()
// export class Draft extends BaseEntity {
//   @Field()
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Field()
//   @Column()
//   year!: string;

//   @Field()
//   @Column()
//   qb!: string;

//   @Field()
//   @Column()
//   rb1!: string;

//   @Field()
//   @Column()
//   rb2!: string;

//   @Field()
//   @Column()
//   rb3!: string;

//   @Field()
//   @Column()
//   wr1!: string;

//   @Field()
//   @Column()
//   wr2!: string;

//   @Field()
//   @Column()
//   wr3!: string;

//   @Field()
//   @Column()
//   te!: string;

//   // @ManyToOne(() => Member, (member) => member.drafts)
//   // member: Member;

//   @Field(() => String)
//   @CreateDateColumn()
//   createdAt = Date;

//   @Field(() => String)
//   @UpdateDateColumn()
//   updatedAt = Date;
// }
