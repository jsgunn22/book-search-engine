const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(userId: ID!): User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(userId: ID!, book: String!): User
    deleteBook(userId: ID!, book: String!): User
}

`;

module.exports = typeDefs;
