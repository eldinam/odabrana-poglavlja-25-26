const Course = require("../models/Course");

module.exports = {
  getAll() {
    return Course.findAll({ order: [["id", "ASC"]] });
  },

  getById(id) {
    return Course.findByPk(id);
  },

  create(data) {
    return Course.create(data);
  },

  async update(id, data) {
    await Course.update(data, { where: { id } });
    return Course.findByPk(id);
  },

  delete(id) {
    return Course.destroy({ where: { id } });
  },
};
