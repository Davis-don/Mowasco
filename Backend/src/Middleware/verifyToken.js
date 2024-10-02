import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  const token = req.cookies._token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "1. Unauthorized user." });

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
    if (error)
      return res.status(401).json({ success: false, message: error.message });
    req.user = decoded;
    next();
  });
};

export default verifyToken;
