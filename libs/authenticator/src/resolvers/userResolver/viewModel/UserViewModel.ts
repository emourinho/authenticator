import { ObjectType, Field, InputType } from 'type-graphql';


@ObjectType()
export class UserPageViewModel {
  @Field(() => [UserViewModel])
  rows: UserViewModel[];

  @Field({ nullable: true })
  count: number;
}

@ObjectType()
export class UserViewModel {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  avatar: string;
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

@InputType()
export class UserFilterInput {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}

@InputType({ description: 'Received your token' })
export class AuthInput {
  @Field()
  remember: boolean;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType({ description: 'Received your token' })
export class AuthViewModal {
  @Field()
  user: UserViewModel;

  @Field()
  token: string;
}
