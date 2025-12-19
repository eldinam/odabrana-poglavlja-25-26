// dao/userDao.js
const User = require("../models/User");

module.exports = {
  getByEmail(email) {
    return User.findOne({ where: { email } });
  },

  getById(id) {
    return User.findByPk(id);
  },

  create(userData) {
    return User.create(userData);
  },
};
