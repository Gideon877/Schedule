const bcrypt = require('bcrypt');

const Schedule = require('../../models/schedule');
const Days = require('../../models/days');
const User = require('../../models/user');
// const PlayList = require('../../models/playlist');
const { addUserSchedule, createAndUpdateSchedule } = require('./merge');


module.exports = {
    Query: {
        schedule: async (args, req) => {
            if (!req.isAuth) {
                throw new Error('Unauthencticated');
            }

            try {
                return true // await findAllSchedules();
            } catch (error) {
                throw error
            }
        },

    },

    Mutation: {
        createSchedule: async (parent, params, context) => {
            const { ids, userId } = params;
            const schedule = new Schedule({
                user: userId,
                days: ids
            })

            try {
                const day = await Schedule.findOne({ user: userId });
                console.log('Got schedule', day)

                if(day) throw new Error('No duplicates')
                
                const user = await User.updateOne({ _id: userId }, { schedule: ids })
                const results = await createAndUpdateSchedule(params);
                schedule.save();

                // todo: think about how u gonna create a shift
                // const __sched = await addUserSchedule(params)
                // console.log(__sched.newSchedule());

                // add user to each day and days to each user

                console.log({ user, results })
                return true;
            } catch (error) {
                throw error;
            }

        },

        // updateUserSchedule: async (args, req) => {
        //     return true;
        // }
    }

    // addToList: async (args, req) => {
    //     if(!req.isAuth) {
    //         throw new Error('Unauthencticated');
    //     }
    // try {
    //     const fetchedEvent = await Event.findOne({ _id: args.eventId });
    //     const booking = new Booking({
    //         user: req.userId,
    //         event: fetchedEvent
    //     })

    //     const result = await PlayList.save();
    //     return transformBooking(result);
    // } catch (error) {
    //     throw error;
    // }
    // },

    // removeFromList: async (args, req) => {
    //     if(!req.isAuth) {
    //         throw new Error('Unauthencticated');
    //     }
    // try {
    //     const booking = await Booking
    //         .findById(args.bookingId)
    //         .populate('event');

    //     const event = transformEvent(PlayList.event)

    //     await PlayList.deleteOne({ _id: args.bookingId })
    //     return event;

    // } catch (error) {
    //     throw error;
    // }
    // },



}