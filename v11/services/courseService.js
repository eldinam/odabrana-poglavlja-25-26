const courseDao = require("../dao/courseDao");

module.exports = {
  async listCourses() {
    return await courseDao.getAll();
  },

  async getCourse(id) {
    return await courseDao.getById(id);
  },

  async createCourse(data) {
    return await courseDao.create(data);
  },

  async updateCourse(id, data) {
    return await courseDao.update(id, data);
  },

  async deleteCourse(id) {
    return await courseDao.delete(id);
  },
};
