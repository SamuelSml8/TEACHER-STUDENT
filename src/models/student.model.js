const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  teacherId: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("students", studentSchema);

module.exports = Student;
