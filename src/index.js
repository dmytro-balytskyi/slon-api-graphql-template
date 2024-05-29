import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './resolvers.js'

var typeDefs = readFileSync('./src/schema.graphql', 'utf-8')

var yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  healthCheckEndpoint: '/live'
})

var server = createServer(yoga)

server.listen(8000, () => {
  console.info('GraphQL server is running on http://localhost:8000/graphql')
})
