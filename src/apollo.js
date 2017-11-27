import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { GRAPHCOOL_ENDPOINT, GRAPHCOOL_SUBSCRIPTION_ENDPOINT } from './const'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: GRAPHCOOL_ENDPOINT
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: GRAPHCOOL_SUBSCRIPTION_ENDPOINT,
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' &&
      operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default apolloProvider
