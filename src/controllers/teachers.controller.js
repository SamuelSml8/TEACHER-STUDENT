const Teacher = require("../models/teacher.model.js");

const createTeacher = async (req, res) => {
  try {
    const data = req.body;
    const newTeacher = new Teacher(data);
    const emailExist = await Teacher.findOne({ email: req.body.email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
        data: null,
      });
    }

    const saveTeacher = await newTeacher.save();
    return res.status(201).json({
      ok: true,
      message: "Teacher created",
      data: saveTeacher,
    });
  } catch (error) {
    console.log("Error creating teacher", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    res.status(200).json({
      ok: true,
      message: "teachers found",
      data: teachers,
    });
  } catch (error) {
    console.log("Error getting teachers ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const getTeacherById = async (req, res) => {
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

    res.status(200).json({
      ok: true,
      message: "Teacher found",
      data: teacherFound,
    });
  } catch (error) {
    console.log("Error getting teacher by id ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const emailExist = await Teacher.findOne({ email: req.body.email });

    if (emailExist && id != id) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
        data: null,
      });
    }

    const teacherFound = await Teacher.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!teacherFound) {
      return res.status(400).json({
        ok: false,
        message: "Teacher not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Teacher updated",
      data: teacherFound,
    });
  } catch (error) {
    console.log("Error updatting teacher ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherFound = await Teacher.findByIdAndDelete(id);

    if (!teacherFound) {
      return res.status(404).json({
        ok: false,
        message: "Teacher not found",
        data: null,
      });
    }

    res.status(200).json({
      ok: true,
      message: "Teacher deleted",
      data: teacherFound,
    });
  } catch (error) {
    console.log("Error deleting teacher ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
