const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//ROUTES//
//
app.post("/create", async (req, res) => {
  try {
    const {
      name,
      email,
      number,
      gender,
      qualification,
      totalExperience,
      yrOfJoining,
    } = req.body;
    const createuser = await pool.query(
      "INSERT INTO users (name,email,number,gender,qualification,totalExperience,yrOfJoining) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [name, email, number, gender, qualification, totalExperience, yrOfJoining]
    );
    res.json(createuser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const allusers = await pool.query("SELECT * FROM users");
    res.json(allusers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
