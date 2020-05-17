const Days = require('../../models/days');
const User = require('../../models/user');
const Schedule = require('../../models/schedule');
const { dateToString } = require('../helpers/date');


exports.createAndUpdateSchedule = async (params) => {
    try {
        const { userId, ids } = params;
        await removeUsers(params)
        const updated = ids.map(async (id) => {
            const day = await getDayById(id);
            console.log({ day })
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
    const eachdays = days.filter(day => {
        day.users.filter(id => id !== params.userId)
        day.save();
    })
}

exports.shift = async () => {
    try {
        const events = await findWeekDays();
        return events.map(event => {
            return transformWeekDays(event);
        })
    } catch (error) {
        throw error;
    }
}

const transformWeekDays = event => {
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

// const singleEvent = async (eventId) => {
//     try {
//         const event = await Event.findById(eventId);
//         return transformEvent(event);
//     } catch (error) {
//         throw new Error('Event not found')
//     }
// }

// const events = async (ids) => {
//     try {
//         const events = await Event.find({ _id: { $in: ids } });
//         return events.map(event => {
//             return transformEvent(event);
//         })
//     } catch (error) {
//         throw error;
//     }
// }





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
// exports.findAllSchedules = findAllSchedules;



// const user = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         return {
//             ...user._doc,
//             // schedule: movies.bind(this, user._doc.createdMovies)
//         }
//     } catch (error) {
//         throw new Error('User not found')
//     }
// }


// const movies = async (ids) => {
//     try {
//         const movies = await Movie.find({ _id: { $in: ids } });
//         return movies.map(movie => {
//             return transformMovie(movie);
//         })
//     } catch (error) {
//         throw error;
//     }
// }

// exports.transformMovie = transformMovie;
// exports.user = user;
