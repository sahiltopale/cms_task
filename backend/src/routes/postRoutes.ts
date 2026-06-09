import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createPost,
  updatePost,
  getPostVersions,
  publishPost,
  unpublishPost,
  getSinglePost,
  getMyPosts,
  deletePost,
} from "../controllers/postController";

const router = Router();

router.post("/", authMiddleware, createPost);

router.get("/my-posts", authMiddleware, getMyPosts);

router.put("/:postId", authMiddleware, updatePost);

router.get("/:postId", authMiddleware, getSinglePost);

router.get("/:postId/versions", authMiddleware, getPostVersions);

router.patch("/:postId/publish", authMiddleware, publishPost);

router.patch("/:postId/unpublish", authMiddleware, unpublishPost);

router.delete("/:postId", authMiddleware, deletePost);

export default router;
