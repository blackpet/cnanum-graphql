import { client } from '$lib/ApolloClient.js';
import { gql } from '@apollo/client/core/core.cjs.js';

export const post = async request => {
  // mitigate the body parsing bug
  if (typeof request.body === 'string') request.body = JSON.parse(request.body);

  const { num } = request.body;

  try {
    const GET_USERS = gql`
        query users {
            id
            name
            username
        }
    `;
    const result = await client.query({
      GET_USERS,
      variables: { x: num }
    });

    return {
      status: 200,
      body: {
        nodes: result.data.double
      }
    }
  } catch (err) {
    return {
      status: 500,
      error: 'Error retrieving data'
    }
  }
}
