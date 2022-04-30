import { ApolloServer } from 'apollo-server'
import { buildSchema } from "type-graphql";
import { resolvers as resolversAuth  } from "@emourinho/authenticator";

(async () => {
  const schema = await buildSchema({ resolvers: [
    ...resolversAuth,
  ] })
  const server = new ApolloServer({ schema });
  const port = process.env.PORT || 4000
  server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Port ready at ${port}`);
    console.log(`🚀  Server ready at ${url}`);
  });
})()
