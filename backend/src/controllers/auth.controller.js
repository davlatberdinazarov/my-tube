const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { registerUserSchema, loginUserSchema } = require("../validation");

const authRegister = async (req, res) => {
  // 1. Validatsiya
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // ❌ return qo‘shildi
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User allaqachon royxatdan o'tgan!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Foydalanuvchi ro'yxatdan o'tdi!" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi!" });
  }
};

const authLogin = async (req, res) => {

  // 1. Validatsiya
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // ❌ return qo‘shildi
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email yoki parol noto‘g‘ri!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Email yoki parol noto‘g‘ri!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Xatolik" });
  }
};

const authProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi!" });
  }
};

module.exports = {
  authRegister,
  authLogin,
  authProfile,
};
