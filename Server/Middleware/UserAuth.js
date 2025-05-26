import jwt from "jsonwebtoken";

// Middleware to check user token from cookie and optionally role
const UserAuth = (requiredRole = null) => {
  return (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // If role is required, check role match
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ success: false, message: "Access denied: insufficient role" });
      }

      // Store user info in request
      req.user = decoded;
      next();

    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
};

export default UserAuth;
