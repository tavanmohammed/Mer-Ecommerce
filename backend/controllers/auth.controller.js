import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import redis from "../lib/redis.js"; // default export


// Generate Access & Refresh Tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Store Refresh Token in Redis
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, { ex: 7 * 24 * 60 * 60 }); // 7 days
};

// Set Cookies for tokens
const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// SIGNUP Controller
export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    const { accessToken, refreshToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
     
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN Controller (placeholder)
export const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await user.comparePassword(password))){
        const {accessToken, refreshToken } = generateTokens(user._id)
        await storeRefreshToken(user._id, refreshToken)
        setCookies(res, accessToken, refreshToken)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    }
  } catch (error) {
    console.log("Error in login controller", error.message)
  }
};

// LOGOUT Controller
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    // Clear all cookies (including any unexpected jwt cookie)
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// this will refresh the access token
export const refreshToken = async (req, res) => {
try {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken ) {
        return res.status(401).json({ message: "No refresh token provided"});
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if(!storedToken || storedToken !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token"});
    }

    const accessToken = jwt.sign({ userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m"});

    res.cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });
    res.json({ message: "Token refreshed successfully"});
} catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
}
}

// implement get profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message })
  }
}


