import jwt from 'jsonwebtoken';
import 'dotenv/config';

const auth = (req, res, next) => {
  let token =
    req.body.token || req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  }

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }

    req.user = user;
    return next();
  });
};

export default auth;