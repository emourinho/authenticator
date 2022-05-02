import { ApolloServer } from 'apollo-server'
import { buildSchema } from "type-graphql";
import { customAuthChecker, resolvers as resolversAuth } from "@emourinho/authenticator";
import { verify } from 'jsonwebtoken';
(async () => {
  let counter = 0
  const schema = await buildSchema({
    authChecker: customAuthChecker,
    resolvers: [
      ...resolversAuth,
    ]
  })

  const server = new ApolloServer({
    schema,
    cors: {
      origin: "*",
      credentials: true
    },
    context: ({ req }) => {
      const accessToken = req.get('Authorization') || "";
      counter++
      console.log(counter)
      if (accessToken) {
        const [type, token] = accessToken.split(" ")
        const userDecoded = verify(token, process.env.NX_JWT_SECRET)
        return { user: userDecoded };
      }
      return { user: {} }
    }
  });
  const port = process.env.PORT || 4000
  server.listen({ port })
    .then(({ url }) => {
      console.log(`🚀  Port ready at ${port}`);
      console.log(`🚀  Server ready at ${url}`);
    })
    .catch(console.error)
})()
