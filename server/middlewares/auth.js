import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token != "null") {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "Token expired!" });
      } else {
        req.user = decoded;
        next();
      }
    });
    return;
  }
  console.log(req.headers);
  res.json({ message: "Forbidden!" });
};

export default auth;
