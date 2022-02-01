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
    type Auth {
        token: ID!
        user: User
    }
    input BookInput {
        bookId: String!
        authors: String
        description: String
        title: String
        image: String
        link: String
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }
    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;