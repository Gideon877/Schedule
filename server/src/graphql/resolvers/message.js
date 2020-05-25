const Message = require('../../models/message')
const Chats = require('../../models/chats')
const { handleCreateChats } = require('./merge');

module.exports = {
    Query: {
        messages: async () => await Message.find().populate('sender').populate('receiver').exec()
    },

    Mutation: {
        createMessage: async (parent, { sender, receiver, message }) => {
            const userChat = await handleCreateChats(sender);
            const userText = new Message({ sender, receiver, message });
            if (userChat) {
                userChat.messages.push(userText._id);
                userChat.save();
            }
            if (!userChat) {
                const newChat = new Chats({ sender, receiver, messages: [userText._id] });
                newChat.save();
            }
            await userText.save();

            // 
            // pubsub.publish("newMessage", {
            //     newMessage: userText,
            //     receiverId
            // });
            return userText;
        },

    }
}
