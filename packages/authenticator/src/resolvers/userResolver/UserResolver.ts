import { Mutation, Query, Resolver, Arg, Ctx, ArgsType, Field } from 'type-graphql';
import { UserInput, UserPageViewModel, UserViewModel } from './viewModel/UserViewModel';
import { UserApplication } from '../../application';
import { container } from 'tsyringe';


@ArgsType()
class BrandArgs {
  @Field()
  name: string;

  @Field()
  _id: string;
}

@Resolver()
export class UserResolver {
  constructor(
    private _userApplication = container.resolve(UserApplication)
  ) { }

  @Query(() => UserPageViewModel)
  async users() {
    return this._userApplication.findAll({});
  }

  @Mutation(() => UserViewModel)
  async addOrCreateUser(
    @Arg("data") brandData: UserInput,
    @Arg("provider") provider: "facebook" | "local"
  ) {
    return await this._userApplication.createOrUpdate(brandData, provider);
  }

}
