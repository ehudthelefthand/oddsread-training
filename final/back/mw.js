const User = require('./models/user');

exports.getUser = async (req, res, next) => {
  const token = req.cookies.remember;
  if (!token) {
    next();
  }
  try {
    const user = await User.findOne({ remember: token }).exec();
    req.User = user;
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

exports.requireUser = (req, res, next) => {
  if (req.User) {
    next();
  } else {
    res.sendStatus(401);
    next('401');
  }
};