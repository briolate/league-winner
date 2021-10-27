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
  UseMiddleware,
} from "type-graphql";
import { League } from "../entities/League";

@InputType()
class LeagueInput {
  @Field()
  name: string;
  @Field()
  memberCount: number;
}

@Resolver()
export class LeagueResolver {
  @Query(() => [League])
  async leagues(): Promise<League[]> {
    return League.find();
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
  async updateLeague(
    @Arg("id") id: number,
    @Arg("name", () => String, { nullable: true }) name: string
  ): Promise<League | undefined> {
    const league = League.findOne(id);
    if (!league) {
      return undefined;
    }
    if (typeof name !== "undefined") {
      await League.update({ id }, { name });
    }
    return league;
  }

  @Mutation(() => Boolean)
  async deleteLeague(@Arg("id") id: number): Promise<boolean> {
    await League.delete(id);
    return true;
  }
}
