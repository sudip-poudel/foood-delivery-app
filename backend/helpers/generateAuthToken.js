const jwt = require("jsonwebtoken");

const generateAuthToken = (uid) => {
  const data = {
    user: {
      id: uid,
    },
  };
  const authToken = jwt.sign(data, process.env.VITE_JWT_SECRET, {
    expiresIn: "15d",
  });
  return authToken;
};
module.exports = generateAuthToken;
