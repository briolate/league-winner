import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  Int,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { League } from "../entities/League";
import { getConnection } from "typeorm";

@InputType()
class LeagueInput {
  @Field()
  name: string;
  @Field()
  memberCount: number;
  @Field()
  description: string;
}

@Resolver(League)
export class LeagueResolver {
  @FieldResolver(() => String)
  descriptionSnippet(@Root() root: League) {
    return root.description.slice(0, 50);
  }

  @Query(() => [League])
  async leagues(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<League[]> {
    const realLimit = Math.min(10, limit);
    const qb = getConnection()
      .getRepository(League)
      .createQueryBuilder("l")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Query(() => League, { nullable: true })
  league(@Arg("id") id: number): Promise<League | undefined> {
    return League.findOne(id);
  }

  @Mutation(() => League, { nullable: true })
  @UseMiddleware(isAuth)
  async createLeague(
    @Arg("input") input: LeagueInput,
    @Ctx() { req }: MyContext
  ): Promise<League> {
    return League.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Mutation(() => League, { nullable: true })
  @UseMiddleware(isAuth)
  async updateLeague(
    @Arg("id", () => Int) id: number,
    @Arg("name") name: string,
    @Arg("memberCount", () => Int) memberCount: number,
    @Arg("description") description: string,
    @Ctx() { req }: MyContext
  ): Promise<League | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(League)
      .set({ name, description, memberCount })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteLeague(@Arg("id") id: number): Promise<boolean> {
    await League.delete(id);
    return true;
  }
}
