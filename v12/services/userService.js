// services/userService.js
const bcrypt = require("bcrypt");
const userDao = require("../dao/userDao");

const saltRound = 10;

module.exports = {
  async registerUser({ first_name, last_name, email, password, age }) {
    const existing = await userDao.getByEmail(email);
    if (existing) {
      throw new Error("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const user = await userDao.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
    });

    return user;
  },

  async loginUser(email, password) {
    const user = await userDao.getByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    return user;
  },
};
