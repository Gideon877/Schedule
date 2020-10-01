const { gql } = require('apollo-server');

module.exports = gql`
    
    type Schedule {
        _id: ID!
        name: String!
        users: [User!]
        createdAt: String!
        updatedAt: String!
        count: Int
        percentage: Int
    }

    type UserSchedule {
        _id: ID!
        days: [Day!]
        user: ID!
        createdAt: String!
        updatedAt: String!

    }

    type Chat {
        _id: ID!
        messages: [Message!]
        sender: User! 
        receiver: User!
        createdAt: String!
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
        message: String!
        sender: User!
        receiver: User!
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
        findUsers(userId: ID): [User!]!
        
        weekdays: [Day!]!
        getUser(userId: ID!): User!
        schedule: [Schedule]
        getUserSchedule(userId: ID!): UserSchedule
        messages: [Message!]!
        chats: [Chat!]!
        getUserChats(userId: ID!): Chat!
    }

    type Mutation {
        addUser(user: UserInput): Boolean
        addDays: Boolean
        disableUser(userId: ID!, active: Boolean): Boolean 
        signIn(username: String!, password: String!): Auth!
        updateUser(user: UserInput): Boolean
        createSchedule(ids: [ID!]!, userId: ID!): Boolean
        createMessage(sender: ID! receiver: ID! message: String!): Message!
        createChat(sender: ID! receiver: ID!): Chat!
    }
    schema {
        query: Query,
        mutation: Mutation
    }
`