import { buildSchema } from "type-graphql"
import { NonEmptyArray } from "type-graphql"
import { UserResolver } from "./userResolver/UserResolver"

export const resolvers: NonEmptyArray<any> = [
  UserResolver
]

 export async function bootstrap(){
  return await buildSchema({ resolvers })
}

