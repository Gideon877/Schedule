const authResolver = require('./auth');
const scheduleResolver = require('./schedule');
const weekdaysResolver = require('./days');
const messageResolver = require('./message');
const chatsResolver = require('./chats');
const { userType, EventTypes } = require('../helpers/constants');

const { users, getUser, findUsers } = authResolver.Query;
const { addUser, signIn, updateUser, disableUser } = authResolver.Mutation;
const { getUserSchedule, schedule } = scheduleResolver.Query;
const { createSchedule, updateUserSchedule } = scheduleResolver.Mutation;
const { messages } = messageResolver.Query;
const { createMessage } = messageResolver.Mutation;
const { chats, getUserChats } = chatsResolver.Query;
const { createChat } = chatsResolver.Mutation;

const { weekdays } = weekdaysResolver.Query;
const { addDays } = weekdaysResolver.Mutation;

const Resolver = {
    Query: {
        users,
        findUsers,
        getUser,
        schedule,
        getUserSchedule,
        weekdays,
        messages,
        chats,
        getUserChats
    },
    Mutation: {
        addUser,
        disableUser,
        signIn,
        updateUser,
        createSchedule,
        addDays,
        createMessage,
        createChat
    },
    Subscription: {
        onUpdateSchedule: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(EventTypes.UpdateSchedule)
        }
    }

}

module.exports = Resolver;