"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (!req.session || Object.keys(req.session).length === 0) {
        console.error("Session is empty or undefined", req.session);
        res.status(401).json({ message: "Unauthorized: session is empty" });
        return;
    }
    if (req.session && req.session.isAuthenticated && req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.checkAuth = checkAuth;
