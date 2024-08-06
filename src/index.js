import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './resolvers.js'
import config from './config.js'

var typeDefs = readFileSync('./src/schema.graphql', 'utf-8')

var yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  }),
  healthCheckEndpoint: '/live'
})

var server = createServer(yoga)

server.listen(config.PORT, () => {
  console.info(`GraphQL server is running on http://localhost:${config.PORT}/graphql`)
})
