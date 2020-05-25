const Chats = require('../../models/chats');

module.exports = {
    Query: {
        chats: async () => await Chats
            .find()
            .populate('messages')
            .populate('sender')
            .populate('receiver')
            .exec(),

        getUserChats: async (parent, params) => {
            try {
                const userId = params.userId;
                return await Chats.findOne({ sender: userId })
                    .populate('messages')
                    .populate('sender')
                    .populate('receiver')
                    .exec();
            } catch (error) {
                throw error;
            }
        }
    },

    Mutation: {
        createChat: async (parent, params) => {
            try {
                const { sender, receiver } = params;
                const userChat = new Chats({
                    sender, receiver, message: []
                });
                return await userChat.save();
            } catch (error) {
                throw error;
            }
        }
    }
}