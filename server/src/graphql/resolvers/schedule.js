const bcrypt = require('bcrypt');

const Schedule = require('../../models/schedule');
const Days = require('../../models/days');
const User = require('../../models/user');
const _ = require('lodash')
// const PlayList = require('../../models/playlist');
const { addUserSchedule, createAndUpdateSchedule } = require('./merge');
const { sortWeekDays } = require('../helpers/sortWeekDays')

module.exports = {
    Query: {
        getUserSchedule: async (_, params, context) => {
            try {
                // if (!context.isAuth) throw new Error('Unauthencticated');
                return await Schedule.findOne({ user: params.userId }).populate('days')
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        schedule: async (args, req) => {
            try {
                // if (!req.isAuth) throw new Error('Unauthencticated');
                const days = await Days.find().populate('users')
                return sortWeekDays(days)
            } catch (error) {
                throw error
            }
        },

    },

    Mutation: {
        createSchedule: async (parent, params, context) => {
            const { ids, userId } = params;

            try {
                // if (!context.isAuth) throw new Error(context.message);
                let schedule = await Schedule.findOneAndUpdate({ user: userId }, { days: ids });
                
                if (_.isNull(schedule)) {
                    schedule = new Schedule({ user: userId, days: ids })
                    await schedule.save();
                }

                await User.updateOne({ _id: userId }, { schedule: ids });
                await createAndUpdateSchedule(params)
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