import "reflect-metadata";
import "./crossCutting"
import { connect } from "mongoose";
import { AuthChecker } from "type-graphql";

connect(process.env.NX_URI_MONGO)
  .then(res => {
    console.log(`🚀  MongoDB Connected: Port ready at ${res.connections.map(c => c.port).join()}`);
  })
  .catch(console.error)

type ContextType = {
  user: {
    roles: string[]
  }
}

export const customAuthChecker: AuthChecker<ContextType> = ({
  root, args, context, info }, roles
) => {
  if (roles.length == 0) return true
  for (const role of roles)
    if (context?.user?.roles?.includes(role)) return true
  return false
};

export * from './resolvers';
