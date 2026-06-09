import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { AuthRequest } from "../middleware/authMiddleware";
import Post from "../models/Post";
import PostVersion from "../models/PostVersion";

export const createPost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, contentJson } = req.body;

    const slug =
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "") +
      "-" +
      uuidv4().slice(0, 6);

    const post = await Post.create({
      slug,
      authorId: req.user?.id,
      status: "draft",
    });

    const version = await PostVersion.create({
      postId: (post as any).id,
      title,
      contentJson,
      authorId: req.user?.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
      version,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updatePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const { title, contentJson } = req.body;

    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    const version = await PostVersion.create({
      postId,
      title,
      contentJson,
      authorId: req.user?.id,
    });

    res.status(200).json({
      message: "New version created",
      version,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getPostVersions = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const versions = await PostVersion.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(versions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const publishPost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    await post.update({
      status: "published",
    });

    res.status(200).json({
      message: "Post published successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const unpublishPost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    await post.update({
      status: "draft",
    });

    res.status(200).json({
      message: "Post moved to draft",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getSinglePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    const latestVersion = await PostVersion.findOne({
      where: { postId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      post,
      latestVersion,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyPosts = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const posts = await Post.findAll({
      where: {
        authorId: req.user?.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const postId = String(req.params.postId);

    const post = await Post.findByPk(postId);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    await PostVersion.destroy({
      where: { postId },
    });

    await post.destroy();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
