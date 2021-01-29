const jwt = require("jsonwebtoken");
const secret = "@2018/_owlSimplonxwxw,HDnc)x:xzHey@";

var authenticate = function authenticate(req, res, next) {
  try {
    const token = req.header("x-authenticate");
    jwt.verify(token, secret);
    req.isAuthenticated = token;
    next(); 
  } catch (err) {
    res.status(401).send(err);
  }
};
const decodeToken = function decodeToken(token) {
  return jwt.decode(token);
};

const verifyToken = function verifyToken(token) {
  try {
    const check = jwt.verify(token, secret);
    return { msg: check, status: true };
  } catch (err) {
    return { msg: err.message, status: false };
  }
};

const createToken = function createToken(pangolin, ip) {
  return jwt.sign(
    {
      infos: pangolin,
      ip,
    },
    secret
  );
};

const removeSensitiveInfo = function removeSensitiveInfo(u) {
  if (!u) throw new Error("A User object is required as argument");
  const filteredPangolin = {};
  const keys = ["password", "username"];

  for (let key in keys) {
    delete u[keys[key]];
  }

  for (let prop in u) {
    if (u.hasOwnProperty(prop)) filteredPangolin[prop] = u[prop];
  }

  return filteredPangolin;
};

module.exports = {
  authenticate,
  createToken,
  decodeToken,
  verifyToken,
  removeSensitiveInfo,
};
