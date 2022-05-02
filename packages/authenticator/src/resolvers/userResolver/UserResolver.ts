import { Mutation, Query, Resolver, Arg, Ctx, ArgsType, Field, Authorized } from 'type-graphql';
import { AuthInput, AuthViewModal, UserFilterInput, UserInput, UserPageViewModel, UserViewModel } from './viewModel/UserViewModel';
import { UserApplication } from '../../application';
import { container } from 'tsyringe';
import { PaginationInput } from '../shared/PaginationInput';

@Resolver()
export class UserResolver {
  constructor(
    private _userApplication = container.resolve(UserApplication)
  ) { }

  @Authorized("SUPER_ADMIN")
  @Query(() => UserPageViewModel)
  async users(
    @Arg("filter") filter: UserFilterInput,
    @Arg("pagination") pagination: PaginationInput
  ) {
    return this._userApplication.findAll(filter, pagination);
  }

  @Mutation(() => UserViewModel)
  async createUser(
    @Arg("data") brandData: UserInput,
    @Arg("provider") provider: "facebook" | "local"
  ) {
    return await this._userApplication.createUser(brandData, provider);
  }

  @Mutation(() => Boolean)
  async confirmRegister(@Arg("hash") hash: number) {
    return this._userApplication.confirmRegister(hash);
  }

  @Mutation(() => AuthViewModal)
  async login(@Arg("data") data: AuthInput) {
    const user = await this._userApplication.findOneByEmailAndPassword(data.email, data.password);
    const token = user.generateToken(data.remember ? "1 year" : "20h")
    return { user, token }
  }

}
