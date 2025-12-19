// dao/studentDao.js
const Student = require("../models/Student");

module.exports = {
  getAll() {
    return Student.findAll({ order: [["id", "ASC"]] });
  },

  getById(id) {
    return Student.findByPk(id);
  },

  create(data) {
    return Student.create(data);
  },

  update(id, data) {
    return Student.update(data, { where: { id } });
  },

  delete(id) {
    return Student.destroy({ where: { id } });
  },
};
