import db_connection from "./dbConnect.js";
import express from "express";
import cors from "cors"
import { User } from "./model/user.model.js";
const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

db_connection();

// get all the users data from the database
app.get("/", async (req, res) => {
  const data = await User.find({});
  res.json({ message: "success", msg: true  ,  data: data });
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
      return res.status(200).json({msg: false , error: "User already exists with same email " });
    }

    const user = new User({ name, email, contact });
    const data = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", msg: true , data: data });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update User data

app.put("/update/:id", async (req, res) => {

  const id = req.params.id;
  console.log(id);
  const { name, email, contact } = req.body;
  if (!name && !email && !contact) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;

    const data = await user.save();
    res.status(200).json({ message: "User updated successfully", data: data });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
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

    res.status(200).json({ msg: true , success: "User deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Server listening
app.listen(port, () => {
  console.log("Server listening on port : ", port);
});



// Backend Completed ......