const Days = require('../../models/days');
const { createWeek, shift } = require('./merge')

module.exports = {
    Query: {
        weekdays: async (parent, params, context) => {
            try {
                const days = await shift();
                console.log({ days })
                return days;

            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        addDays: async (parent, params, context) => {
            try {
                const days = params.days;
                await createWeek(days);
                console.log({ days })

                return true;
            } catch (error) {
                throw error
                return false;
            }
        }
    }
}