const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        thoughts: [Thought]
        friends: [User]
        friendCount: Int
    }

    type Thought {
        _id: ID!
        thoughtText: String!
        createdAt: String
        username: String!
        reactions: [Reaction]
        reactionCount: Int
    }

    type Reaction {
        reactionId: ID!
        reactionBody: String!
        username: String!
        createdAt: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        thoughts: [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        addUser(username: String!, email: String!): User
        updateUser(_id: ID!, username: String, email: String): User
        removeUser(_id: ID!): User
        addFriend(userId: ID!, friendId: ID!): User
        removeFriend(userId: ID!, friendId: ID!): User
        addThought(thoughtText: String!, username: String!): Thought
        updateThought(_id: ID!, thoughtText: String!): Thought
        removeThought(_id: ID!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!, username: String!): Thought
        removeReaction(thoughtId: ID!, reactionId: ID!): Thought
    }
`;

module.exports = typeDefs;