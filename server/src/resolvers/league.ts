import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { League } from "../entities/League";

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
  async createLeague(@Arg("name") name: string): Promise<League> {
    return League.create({ name }).save();
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
