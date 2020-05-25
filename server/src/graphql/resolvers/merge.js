const Days = require('../../models/days');
const User = require('../../models/user');
const Schedule = require('../../models/schedule');
const { dateToString } = require('../helpers/date');
const _ = require('lodash')
const mongoose = require('mongoose');

exports.createAndUpdateSchedule = async (params) => {
    try {
        const { userId, ids } = params;
        await removeUsersFromWeekDays(userId);
        return await updateUsersList(userId, ids);
    } catch (error) {
        console.log(error);
        throw error
    }
}

const updateUsersList = async (userId, dayListIds) => {
    return await dayListIds.forEach(async (_id) => {
        const current = await Days.findOne({ _id });
        current.users.pull(userId)
        current.users.push(userId)
        await current.save();
    });

}

const removeUsersFromWeekDays = async (userId) => {
    const days = await Days.find(async (err, days) => {
        if (err) throw err;
        await days.forEach(day => {
            day.users.pull(userId)
            day.save()
        })
    })
    return Promise.all(days)
}

exports.shift = async () => await findWeekDays()

const transformWeekDays = event => {
    console.log('Event transform', event._doc)
    return {
        ...event._doc,
        users: findUsersByIds.bind(this, event._doc.users)
    }
}
const transformSchedule = event => {
    return {
        ...event._doc,
        day: getDayById.bind(this, event._doc.day),
        users: findUsersByIds.bind(this, event._doc.users)
    }
}

const createWeek = async () => {
    try {
        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const isAdded = await Days.find();
        if (isAdded.length) throw new Error('Week days already created')
        const weekDays = weekDay.map(day => {
            return new Days({
                name: day
            })
        })
        // console.log({ weekDays })

        await Days.insertMany(weekDays);
    } catch (error) {
        throw new Error('Failed to create week days\n' + error)
    }
}

/**
 * 
 * @param {String} ids - day _id
 */
const addUserSchedule = async (params) => {
    try {
        const { ids, userId } = params;
        const events = await Schedule.find({ day: { $in: ids } });
        // const _prevEvents = await Schedule.find({ day: { $ne: ids } });
        console.log({ events })
        return {
            events,
            // _prevEvents
            // prevSchedule: removePrevUserSchedule.bind(this, {schedules: _prevEvents, userId}),
            newSchedule: updateUserSchedule.bind(this, { schedules: events, userId })
        }
    } catch (error) {
        console.log(error, '----- addUserSchedule')
        throw error
    }


}

const removePrevUserSchedule = async (schedules, userId) => {
    console.log('removePrevUserSchedule')
    schedules.map(event => {
        event.users.filter(user => user !== userId)
        event.save();
        console.log('......: schedules.map after save -> removePrevUserSchedule')

    });
}

const updateUserSchedule = async ({ schedules, userId }) => {
    console.log('updateUserSchedule')
    return await schedules.map(schedule => {
        schedule.users.push(userId);
        schedule.save();
        console.log('......: schedules.map after save -> updateUserSchedule', schedule)
    });
}

const getScheduleById = async (id) => await Schedule.findById(id)
const getUserById = async (id) => await User.findById(id)
const getDayById = async (id) => await Days.findById(id)


const getSchedule = async () => await Schedule.find()
const findUsersByIds = async (ids) => await Schedule.find({ _id: { $in: ids } });
const findWeekDays = async () => await Days.find().populate('users');

exports.createWeek = createWeek;
exports.addUserSchedule = addUserSchedule;