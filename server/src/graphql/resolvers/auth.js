const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userType } = require('../helpers/constants');
// const { user } = require('./merge');


module.exports = {
    Query: {
        users: async (parent, params, context) => {
            try {
                const users = await User.find().populate('schedule')
                return users.map(user => {
                    return {
                        ...user._doc
                    }
                })
            } catch (error) {
                throw error;
            }
        },

        getUser: async (parent, params) => await User.findById(params.userId)

    },

    Mutation: {
        addUser: async (parent, params) => {
            // add work flow => create schedule before
            try {
                const { username, password } = params.user;
                const existingUser = await User.findOne({ username })

                if (existingUser) {
                    throw new Error('A user with the same username already exists. Specify another username.')
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const user = new User({
                    ...params.user,
                    password: hashedPassword,
                    lastSeen: new Date(),
                })
                await user.save();
                return true;
            } catch (error) {
                throw error;
                return false;
            }

        },

        disableUser: async (parent, params) => {
            try {
                const { userId, active } = params;
                await User.findByIdAndUpdate({ _id: userId }, { active });
                return true;
            } catch (error) {
                return false;
            }

        },

        signIn: async (parent, params) => {
            const { username, password } = params;
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User does not exist!');
            }

            const isEqual = await bcrypt.compare(password, user.password);

            if (!isEqual) {
                throw new Error('Password is incorrect!');
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, "somesupersecretkey", { expiresIn: '1h' });

            return {
                userId: user.id,
                token,
                tokenExpiration: 1
            }
        },

        updateUser: async (parent, params, context) => {
            try {
                if (context.code === 404) throw new Error(context.message);
                // todo: use auth token to get userId
                await User.findOneAndUpdate({ username: params.user.username }, params.user);
                return true;
            } catch (error) {
                throw new Error(error);
                return false;
            }
        },
    }
}