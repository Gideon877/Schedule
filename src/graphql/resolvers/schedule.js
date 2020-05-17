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
                await Schedule.findOneAndDelete({ user: userId });
                const user = await User.updateOne({ _id: userId }, { schedule: ids })
                schedule.save();
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