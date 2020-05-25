const authResolver = require('./auth');
const scheduleResolver = require('./schedule');
const weekdaysResolver = require('./days');
// const fileResolver = require('./file');

const { users, getUser } = authResolver.Query;
const { addUser, signIn, updateUser, disableUser } = authResolver.Mutation;
const { getUserSchedule, schedule } = scheduleResolver.Query;
const { createSchedule, updateUserSchedule } = scheduleResolver.Mutation;
// const { addFile } = fileResolver.Mutation;

const { weekdays } = weekdaysResolver.Query;
const { addDays } = weekdaysResolver.Mutation;

const Resolver = {
    Query: {
        users,
        getUser,
        schedule,
        getUserSchedule,
        weekdays
    },
    Mutation: {
        addUser,
        disableUser,
        signIn,
        updateUser,
        createSchedule,
        addDays,
        // addFile
    }

}

module.exports = Resolver;