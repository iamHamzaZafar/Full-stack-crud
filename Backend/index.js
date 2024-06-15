import db_connection from "./dbConnect.js";
import express from "express";
import { User } from "./model/user.model.js";
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

db_connection();

// get all the users data from the database
app.get("/", async (req, res) => {
  const data = await User.find({});
  res.json({ msg: "success", data: data });
});

// create data || save data in the data base
app.post("/create", async (req, res) => {
  const { name, email, contact } = req.body;
  // checks name email and password are given or not provided
  if (!name || !email || !contact) {
    return res.status(400).json({ error: "Required field is missing" });
  }

  // Check existing user
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({ name, email, contact });
    const data = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: data });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update User data

app.put("/update", async (req, res) => {
  //   const { id } = req.params;
  const id = req.body;
  console.log(id);
  const { name, email, contact } = req.body;
  if (!name || !email || !contact) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  try {
    const user = user.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {}
});

// Delete User controller
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user.name, user.email, user.contact);
    await user.deleteOne();

    res.status(200).json({ success: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Server listening
app.listen(port, () => {
  console.log("Server listening on port : ", port);
});
