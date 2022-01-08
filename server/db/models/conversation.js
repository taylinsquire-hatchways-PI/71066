const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const { User } = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (users) {
  const conversation = await Conversation.findOne({
    where: {
      '$users.id$': {
        [Op.in]: [users],
      },
    },
    include: { model: User },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;