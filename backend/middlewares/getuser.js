const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res.sendStatus(401).send({ error: "You are not authorized" });
  }
  try {
    const data = jwt.verify(token, process.env.VITE_JWT_SECRET);
    req.user = data?.user.id;
    next();
  } catch (error) {
    res.sendStatus(401).send({ error: "You are not authorized" });
  }
};
module.exports = getUser;
