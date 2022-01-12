const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hasBeenRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

module.exports = Message;
