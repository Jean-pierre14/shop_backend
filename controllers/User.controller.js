import User from "../models/User.model.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

// Joi validation schema for user creation
export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Middleware to validate request body
export const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate the request body
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Set token as a cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const users = await User.find();

      res.json(users).status(200);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = user.generateToken();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" }).status(200);
};
