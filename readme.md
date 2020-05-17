# Waiter Schedule App

- Apollo GraphQL
- Bcrypt
- Json Web Token
- MongoDB (Mongg]oose)
- NodeJS
- React 

### Apollo GraphQL
### Bcrypt
### Json Web Token
### MongoDB (Mongoose)
### NodeJS
### React



##### Schema
  
```gql

type Schedule {
    _id: ID!
    day: Day!
    users: [User!]!
    createdAt: String!
    updatedAt: String!
}

type Chats {
    owner: User! //logged user
    participant: User!
    texts: [Message!]!
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
    days: [Day!]
}
```
> **Results**

```json
{
    _id: "50fae900c12ecd550001",
    day: "Monday",
    users: [
        {
            firstName: "John",
            lastName: "Smith"
        },
        {
            firstName: "Victor",
            lastName: "Moses"
        }
    ]
}


/** schedule */

{
    userId: 9fec8234eab99c,
    dayIds: ["9fec8234eab99c", "9fec8234eab99c", "9fec8234eab99c"]
}

// result

## findAll = ()=> 

[
    {
        _id: "9fec8234eab99c",
        day: "Monday",
        createdAt: ""...
        users: [
            {
                "firstName": "Cod Er", 
                ...
            }
        ]
    }, 
    {..},...
]



```# Schedule
