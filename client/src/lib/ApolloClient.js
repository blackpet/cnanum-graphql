import { ApolloClient, HttpLink } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';

class Client {
  constructor() {
    if (Client._instance) {
      return Client._instance
    }
    Client._instance = this;

    this.client = this.setupClient();
  }

  setupClient() {
    const link = new HttpLink({
      uri: 'http://localhost:4000',
      fetch
    });

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
    return client;
  }
}

export const client = (new Client()).client;
