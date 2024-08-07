import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './resolvers.js'
import config from './config.js'

var __filename = fileURLToPath(import.meta.url)
var __dirname = path.dirname(__filename)
var schemaPath = path.join(__dirname, 'schema.graphql');

var typeDefs = readFileSync(schemaPath, 'utf-8')

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
