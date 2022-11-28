import { Server } from "std/http/server.ts";
import { GraphQLHTTP } from "gql";
import  { makeExecutableSchema } from "graphql_tools";

import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { Chaining } from "./resolvers/chaining.ts";
import { typeDefs } from "./schema_gql.ts";

const resolvers = {
    Query,
    Mutation,
    Chaining,
};


const port = Number(Deno.env.get("PORT"));


const s = new Server({
    handler: async (req) => {
      const { pathname } = new URL(req.url);
  
      return pathname === "/graphql"
        ? await GraphQLHTTP<Request>({
            schema: makeExecutableSchema({ resolvers, typeDefs }),
            graphiql: true,
          })(req)
        : new Response("Not Found", { status: 404 });
    },
    port: port,
  });
  
  s.listenAndServe();
  
 
console.log(`Server running on: http://localhost:${port}/graphql`);