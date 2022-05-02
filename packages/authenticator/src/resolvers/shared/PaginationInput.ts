import { Field, InputType } from "type-graphql";

@InputType()
export class PaginationInput {
  @Field()
  limit: number;

  @Field()
  offset: number;

  @Field({ nullable: true })
  sort: string;
}
