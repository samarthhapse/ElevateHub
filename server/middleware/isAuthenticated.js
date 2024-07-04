import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
   
    const token = req.headers["authorization"];

    if (!token) {
      console.log("token not found");
      return res
        .status(401)
        .json({ message: "User not authenticated.", success: false });
    }
    const jwtToken = token.replace("Bearer", "").trim();
   
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    if (!decode) {
      console.log("decode token not found");
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error", error, success: false });
  }
};
export default isAuthenticated;
