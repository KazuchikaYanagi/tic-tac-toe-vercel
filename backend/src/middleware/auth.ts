import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  session?: {
    isAuthenticated?: boolean;
    userId?: string;
    [key: string]: any;
  };
}

export const checkAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || Object.keys(req.session).length === 0) {
    console.error("Session is empty or undefined", req.session);
    res.status(401).json({ message: "Unauthorized: session is empty" });
    return;
  }

  if (req.session && req.session.isAuthenticated && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
