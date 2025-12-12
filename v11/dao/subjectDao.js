// dao/subjectDao.js
const Subject = require("../models/Subject");

module.exports = {
  getAll() {
    return Subject.findAll({ order: [["id", "ASC"]] });
  },

  getById(id) {
    return Subject.findByPk(id);
  },

  create(data) {
    return Subject.create(data);
  },

  async update(id, data) {
    await Subject.update(data, { where: { id } });
    return Subject.findByPk(id);
  },

  delete(id) {
    return Subject.destroy({ where: { id } });
  },
};
