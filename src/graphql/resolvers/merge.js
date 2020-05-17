const Days = require('../../models/days');
const User = require('../../models/user');
const Schedule = require('../../models/schedule');
const { dateToString } = require('../helpers/date');
const _ = require('lodash')

exports.createAndUpdateSchedule = async (params) => {
    try {
        const { userId, ids } = params;
        await removeUsers(params)
        const updated = ids.map(async (id) => {
            const day = await getDayById(id);
            day.users.push(userId)
            day.save()
        })

        return updated;


    } catch (error) {
        console.log(error);
        throw error
    }
}

const removeUsers = async (params) => {
    const days = await Days.find();
    await days.forEach(day => {
        let users = day.users;
        [...new Set(users)]
        users = users.filter((item, index) => users.indexOf(item) == index);
        users = users.reduce((unique, item) => 
            unique.includes(item) ? unique : [...unique, item], [])

        day.users = users;
        day.save();
    })
    // console.log({ days }, 'removeUsers -> eachdays')
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

const createWeek = async (params) => {
    try {
        const weekDays = params.map(day => {
            return new Days({
                name: day
            })
        })
        await Days.insertMany(weekDays);
        const weekSchedule = weekDays.map(day => {
            return new Schedule({
                day
            })
        });
        await Schedule.insertMany(weekSchedule);
    } catch (error) {
        throw new Error('Failed to create week days')
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

