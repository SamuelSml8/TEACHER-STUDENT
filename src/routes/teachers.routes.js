const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers.controller.js");

router.post("/create", createTeacher);
router.get("/all", getTeachers);
router.get("/:id", getTeacherById);
router.put("/update/:id", updateTeacher);
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
