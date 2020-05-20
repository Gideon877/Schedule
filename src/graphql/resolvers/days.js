const Days = require('../../models/days');
const { createWeek, shift } = require('./merge')

module.exports = {
    Query: {
        weekdays: async (parent, params, context) => await Days.find()
    },

    Mutation: {
        addDays: async (parent, params, context) => {
            try {
                await createWeek();
                return true;
            } catch (error) {
                throw error
                return false;
            }
        }
    }
}