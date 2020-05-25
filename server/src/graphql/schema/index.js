const { gql } = require('apollo-server');

module.exports = gql`
    
    type Schedule {
        _id: ID!
        name: String!
        users: [User!]
        createdAt: String!
        updatedAt: String!
    }

    type UserSchedule {
        _id: ID!
        days: [Day!]
        user: ID!
        createdAt: String!
        updatedAt: String!

    }

    type Chats {
        createdAt: String!
        messages: [Message!]!
        owner: User! 
        participant: User!
        updatedAt: String!
    }

    type Connection {
        _id: ID!
        owner: User!
        friend: User!
        createdAt: String!
    }

    type Day {
        _id: ID!
        name: String!
        # users: [User!]
    }

    type Message {
        _id: ID!
        text: String!
        sentBy: User!
        sentTo: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String
        active: Boolean!
        lastSeen: String!
        createdAt: String!
        updatedAt: String!
        userType: String
        schedule: [Schedule!]
    }

    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String
    }

    type Auth {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type File {
        _id: ID!
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query {
        users: [User!]!
        weekdays: [Day!]!
        getUser(userId: ID!): User!
        schedule: [Schedule]
        getUserSchedule(userId: ID!): UserSchedule
    }

    type Mutation {
        addUser(user: UserInput): Boolean
        addDays: Boolean
        disableUser(userId: ID!, active: Boolean): Boolean 
        signIn(username: String!, password: String!): Auth!
        updateUser(user: UserInput): Boolean
        createSchedule(ids: [ID!]!, userId: ID!): Boolean
        # addFile(file: Upload!): File
    }
    schema {
        query: Query,
        mutation: Mutation
    }
`