const { encodPassword, getToken } = require("../helper.js");
const AuthModal = require("../modals/AuthModal.js");
const bcrypt = require("bcrypt");

const authController = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const isUserExisted = await AuthModal.findOne({ email });
    if (isUserExisted) {
      // User already exists
      if (isUserExisted.email === email) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }
    }

    // Create a new user
    const newUser = new AuthModal({
      name,
      email,
      password: await encodPassword(password),
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error in authController:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthModal.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "password does not match" });
    }
    const token = await getToken(user._id);
    res
      .status(200)
      .json({
        user: { email: user.email, name: user.name, _id: user._id },
        success: true,
        message: "You are logged in",
        token,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  authController,
  loginController,
};
