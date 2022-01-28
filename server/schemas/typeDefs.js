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
`;

module.exports = typeDefs;