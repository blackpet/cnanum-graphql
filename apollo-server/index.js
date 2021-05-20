const database = require('./database');
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
      users: [User]
      posts: [Post]
  }
  type User {
      id: Int!
      name: String!
      username: String!
      email: String
      posts: [Post]!
  }
  type Post {
      userId: Int!
      id: Int!
      title: String!
      body: String!
      user: User!
  }
`;

const resolvers = {
  Query: {
    users: () => database.users,
    posts: () => database.posts,
  },
  User: {
    posts: ({id: userId}) => database.posts.filter(p => p.userId === userId),
  },
  Post: {
    user: ({userId}) => database.users.find(u => u.id === userId),
  }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
})
