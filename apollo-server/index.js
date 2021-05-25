const database = require('./database');
const {ApolloServer, gql} = require('apollo-server');

const typeDefs = gql`
  type Query {
      "전체 사용자 목록"
      users: [User]
      
      "사용자"
      user(id: Int): User
      
      "사용자 + 최근 앨범 정보"
      userRecentAlbums(id: Int, search: String): [Album]
      
      "전체 게시물 목록"
      posts: [Post]
  }
  
  "사용자"
  type User {
      "ID"
      id: Int!
      "이름"
      name: String!
      "별칭(표시 이름, 닉네임)"
      username: String!
      "이메일"
      email: String
      "주소"
      address: Address
      "작성한 게시물 목록"
      posts: [Post]
      "사용자이 앨범"
      albums: [Album]
  }
  
  type Album {
      userId: String
      id: Int
      title: String
  }
  
  "주소"
  type Address {
      street: String
      suite: String
      city: String
      zipcode: String
  }
  
  "게시물"
  type Post {
      userId: Int!
      id: Int!
      title: String!
      body: String!
      user: User!
  }
  
  type Mutation {
      "사용자 추가"
      addUser(
          "이름"
          name: String, 
          "별칭(표시 이름, 닉네임)"
          username: String, 
          "이메일"
          email: String
      ): User
      
      addPost(request: CreatePostInput): Post
  }
  
  "게시물 등록 파라메터"
  input CreatePostInput {
      userId: Int
      title: String
      body: String
  }
`;

const resolvers = {
  Query: {
    users: () => database.users,
    user: (_, {id}) => database.users.find(u => u.id === id),
    posts: () => database.posts,
    userRecentAlbums: (_, {id, search}) => database.albums.filter(ab => ab.userId === id && ab.title.startsWith('search')),
  },
  User: {
    posts: ({id: userId}) => database.posts.filter(p => p.userId === userId),
    albums: ({id: userId}) => database.albums.filter(a => a.userId === userId),
  },
  Post: {
    user: ({userId}) => database.users.find(u => u.id === userId),
  },

  Mutation: {
    addUser: (parent, args, context, info) => {
      const newUser = {
        id: database.users.length + 1,
        ...args
      };
      database.users.push(newUser);

      return newUser;
    },

    addPost: (_, args) => {
      console.log('addPost', args);
      const newPost = {
        id: database.posts.length + 1,
        ...args.request
      };
      database.posts.push(newPost);

      return newPost;
    }
  }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`);
})
