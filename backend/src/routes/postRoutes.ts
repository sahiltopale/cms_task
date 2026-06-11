import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  createPost,
  updatePost,
  getPostVersions,
  getSingleVersion,
  restoreVersion,
  compareVersions,
  publishPost,
  unpublishPost,
  getSinglePost,
  getMyPosts,
  deletePost,
  getPublishedPosts,
  getPostBySlug,
} from "../controllers/postController";

const router = Router();

router.post("/", authMiddleware, createPost);

router.get("/my-posts", authMiddleware, getMyPosts);

router.get("/published", getPublishedPosts);

router.get("/slug/:slug", getPostBySlug);

router.put("/:postId", authMiddleware, updatePost);

// Version APIs
router.get("/version/:versionId", authMiddleware, getSingleVersion);

router.post("/restore/:versionId", authMiddleware, restoreVersion);

router.get("/compare/:version1Id/:version2Id", authMiddleware, compareVersions);

// Post APIs
router.get("/:postId", authMiddleware, getSinglePost);

router.get("/:postId/versions", authMiddleware, getPostVersions);

router.patch("/:postId/publish", authMiddleware, publishPost);

router.patch("/:postId/unpublish", authMiddleware, unpublishPost);

router.delete("/:postId", authMiddleware, deletePost);

export default router;
