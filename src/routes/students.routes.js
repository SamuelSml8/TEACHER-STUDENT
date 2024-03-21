const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  teacherAlumns,
} = require("../controllers/students.controller.js");

router.post("/create", createStudent);
router.get("/all", getStudents);
router.get("/:id", getStudentById);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/with/teacher/:id", teacherAlumns);

module.exports = router;
