import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Helper to generate tokens
const generateTokens = (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};

// ===============================
// ✅ Register User
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { username, firstname, lastname, age, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({
      username,
      firstname,
      lastname,
      age,
      email,
      password,
    });

    const { accessToken, refreshToken } = generateTokens(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// ===============================
// ✅ Login User
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check for predefined admin
    if (email === process.env.ADMIN_EMAIL) {
      if (password === process.env.ADMIN_PASSWORD) {
        // You can return a hardcoded token or just send a role response
        const fakeAdmin = {
          _id: "000admin000",
          role: "admin",
          username: "admin",
        };

        const accessToken = jwt.sign(
          {
            id: fakeAdmin._id,
            role: fakeAdmin.role,
            username: fakeAdmin.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
        );

        const refreshToken = jwt.sign(
          {
            id: fakeAdmin._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
        );

        return res.status(200).json({
          message: "Admin login successful",
          user: fakeAdmin,
          tokens: { accessToken, refreshToken },
          redirect: "/admin/dashboard", // 
        });
      } else {
        return res.status(401).json({ message: "Invalid admin password" });
      }
    }

    // ✅ Normal user login
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ===============================
// ✅ Get Current User (Me)
// ===============================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};

// ===============================
// ✅ Apply to Become Seller
// ===============================
export const applySeller = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "seller") {
      return res.status(400).json({ message: "You are already a seller" });
    }

    // Flag for admin to approve (you can add an approval system too)
    user.role = "seller";
    user.isSellerApproved = false; // Add this field in your user model
    await user.save();

    res.status(200).json({ message: "Seller request submitted. Pending admin approval." });
  } catch (err) {
    res.status(500).json({ message: "Seller request failed", error: err.message });
  }
};
