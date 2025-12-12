// services/subjectService.js
const subjectDao = require("../dao/subjectDao");

module.exports = {
  listSubjects() {
    return subjectDao.getAll();
  },

  getSubject(id) {
    return subjectDao.getById(id);
  },

  createSubject(data) {
    return subjectDao.create(data);
  },

  updateSubject(id, data) {
    return subjectDao.update(id, data);
  },

  deleteSubject(id) {
    return subjectDao.delete(id);
  },
};
