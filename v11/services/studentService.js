// services/studentService.js
const studentDao = require("../dao/studentDao");

module.exports = {
  listStudents() {
    return studentDao.getAll();
  },

  getStudent(id) {
    return studentDao.getById(id);
  },

  createStudent(data) {
    return studentDao.create(data);
  },

  updateStudent(id, data) {
    return studentDao.update(id, data);
  },

  deleteStudent(id) {
    return studentDao.delete(id);
  },
};
