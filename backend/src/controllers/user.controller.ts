// backend/src/controllers/user.controller.ts
import { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import bcrypt from "bcrypt";

interface AuthenticatedRequest extends Request {
  session?:
    | {
        isAuthenticated?: boolean;
        userId?: string;
        [key: string]: any;
      }
    | any;
}

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({ error: "Unable to get users" });
  }
};

const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({ error: `Unable to get the user` });
  }
};

const registerUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Username and Password are required" });
      return;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ error: "Unable to register user" });
  }
};

const loginUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Username and password are required." });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(403).json({ message: "Password is incorrect" });
      return;
    }

    (req as AuthenticatedRequest).session!.isAuthenticated = true;
    (req as AuthenticatedRequest).session!.userId = user.id.toString();
    // req.session!.isAuthenticated = true;
    // req.session!.userId = user.id.toString();

    console.log("Session after login:", req.session);
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const userProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("Session Data:", req.session);
    const userId = req.session?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.log("userProfile check:", error);
    console.error("User Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const logoutUser = (req: AuthenticatedRequest, res: Response): void => {
  try {
    (req as AuthenticatedRequest).session = null;
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout User Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      res.status(404).json({ error: `The user does not exist` });
      return;
    }
    res.status(200).json({ message: "Update user successfully", user });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ error: `Unable to update the user` });
  }
};

const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ error: "The user does not exist" });
      return;
    }
    res.status(200).json({ message: "Deleted the user", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete the user" });
  }
};

const getTopThreeUsers = async (req: Request, res: Response) => {
  try {
    const topThreeUsers = await User.find()
      .sort({ win: -1 })
      // .sort({ winRate: -1 })
      .limit(3)
      .select("username matches win");
    res.status(200).json(topThreeUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get the top users" });
  }
};

export default {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
  updateUser,
  deleteUserById,
  getTopThreeUsers,
};
