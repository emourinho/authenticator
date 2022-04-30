import { ObjectType, Field, ID, InputType } from 'type-graphql';


@ObjectType()
export class UserPageViewModel {
  @Field(() => [UserViewModel])
  rows: UserViewModel[];

  @Field({ nullable: true })
  count: number;
}

@ObjectType()
export class UserViewModel {
  @Field({ nullable: true })
  _id: string;

  @Field()
  email: string;
}

@InputType({ description: 'New User' })
export class UserInput {
  @Field({ nullable: true })
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
