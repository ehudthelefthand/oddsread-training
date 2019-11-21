'use strict';

const bcrypt = require('bcrypt');

const User = require('./models/user');
const remember = require('./remember');

const cost = 12;

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, cost);
  const user = new User();
  user.email = email;
  user.passwordHash = hash;
  try {
    await user.save();
    await signin(user, res);
  } catch (e) {
    res.status(500).json({
      message: e.toString()
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.sendStatus(401);
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (valid) {
    signin(user, res);
  } else {
    res.sendStatus(401);
  }
};

exports.session = (req, res) => {
  const user = req.User;
  res.json({
    _id: user._id,
    email: user.email
  });
}

exports.signout = async (req, res) => {
  if (!req.User) {
    return res.sendStatus(200);
  }
  req.User.remember = '';
  try {
    await req.User.save();
    res.cookie('remember', '', { expires: new Date() })
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

async function signin(user, res) {
  try {
    user.remember = await remember();
    await user.save();
    res.cookie('remember', user.remember, { httpOnly: true, sameSite: true });
    res.json({
      _id: user._id,
      email: user.email
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}