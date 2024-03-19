const express = require("express");
const connectDB = require("./config/db.js");
const teacherRoutes = require("./routes/teachers.routes.js");

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/teachers", teacherRoutes);

app.listen(port, () => {
  console.log("Server on port ", port);
});
