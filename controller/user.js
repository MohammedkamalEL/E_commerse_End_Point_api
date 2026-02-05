const dataNotFound = require("../middleware/dataNotFound");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv");

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}).select("name email ");
    if (dataNotFound(res, user, "item not found")) return;
    res.status(200).json({ ststus: true, data: { user } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, passwordHash, email } = req.body;

    if (!name || !passwordHash || !email) {
      return res
        .status(400)
        .json({ mesg: "name and email and password is requierd " });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ mesg: "user exist alrady" });
    }

    const newUser = new User(req.body);
    const seveUser = await newUser.save();
    res.status(201).json({ statue: true, data: { user: seveUser } });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const userLogin = await User.findOne({ email: req.body.email });
    if (dataNotFound(res, userLogin, "user not found")) return;

    if (
      userLogin &&
      bcrypt.compareSync(req.body.password, userLogin.passwordHash)
    ) {
      const token = jwt.sign(
        { id: userLogin.id, isAdmin: userLogin.isAdmin },
        process.env.SECRET_JWT,
        { expiresIn: "1d" },
      );
      res
        .status(200)
        .json({ ststus: true, data: { userLogin }, msg: "auth", token });
    } else {
      res.send("password is wrong");
    }
  } catch (error) {
    console.log(error);
    res.send("server error");
  }
};

module.exports = {
  getAllUser,
  createUser,
  login,
};
