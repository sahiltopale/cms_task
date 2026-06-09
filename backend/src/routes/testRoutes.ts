import { Router } from "express";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.get("/protected", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    message: "Protected Route Accessed",
    userId: req.user?.id,
  });
});

export default router;
