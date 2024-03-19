const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;
