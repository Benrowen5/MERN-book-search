const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
    type User {
       _id: ID
       username: String
       email: String
       bookCount: Int 
       savedBooks: [Book]
    }
    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Query {
        me: User
        user(username: String!): User
    }
    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!): User        
        removeBook(bookId: String!): User
    }
    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;