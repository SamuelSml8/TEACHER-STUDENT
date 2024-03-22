const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");

const createStudent = async (req, res) => {
  try {
    const data = req.body;
    const newStudent = new Student(data);
    const emailExistent = await Student.findOne({ email: req.body.email });

    if (emailExistent) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
        data: null,
      });
    }

    const saveStudent = await newStudent.save();
    return res.status(201).json({
      ok: true,
      message: "Student saved",
      data: saveStudent,
    });
  } catch (error) {
    console.log("Error ______ student ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("teacherId");

    res.status(200).json({
      ok: true,
      message: "Students found",
      data: students,
    });
  } catch (error) {
    console.log("Error ______ student ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const studentFound = await Student.findById({ _id: req.params.id }).populate("teacherId");

    if (!studentFound) {
      return res.status(404).json({
        ok: false,
        message: "Student not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Student found",
      data: studentFound,
    });
  } catch (error) {
    console.log("Error ______ student ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentFound = await Student.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!studentFound) {
      return res.status(404).json({
        ok: false,
        message: "Student not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Student updated",
      data: studentFound,
    });
  } catch (error) {
    console.log("Error ______ student ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentFound = await Student.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!studentFound) {
      res.status(404).json({
        ok: false,
        message: "Student not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: false,
      message: "Student deleted",
      data: studentFound,
    });
  } catch (error) {
    console.log("Error ______ student ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const teacherAlumns = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherFound = await Teacher.findById(id);

    if (!teacherFound) {
      return res.status(404).json({
        ok: false,
        message: "Teacher not found",
        data: null,
      });
    }

    const studentsFound = await Student.find({
      teacherId: teacherFound._id,
    });

    res.status(200).json({
      ok: true,
      message: `${teacherFound.name}'s Students`,
      data: studentsFound,
    });
  } catch (error) {
    console.log("Error getting teacher's alumns ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  teacherAlumns,
};
