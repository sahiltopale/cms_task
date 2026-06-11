import bcrypt from "bcrypt";
import sequelize from "../config/database";

import User from "../models/User";
import Post from "../models/Post";
import PostVersion from "../models/PostVersion";

const seedPosts = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database Connected");

    // =========================
    // CREATE USER
    // =========================

    const passwordHash = await bcrypt.hash("password123", 10);

    let user = await User.findOne({
      where: {
        email: "demo@gmail.com",
      },
    });

    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: "demo@gmail.com",
        passwordHash: passwordHash,
      });

      console.log("User created");
    }

    // =========================
    // CREATE POSTS
    // =========================

    const posts = [
      {
        slug: "react-basics",
        status: "published",
        title: "React Basics",
        content: "Introduction to React components and hooks",
      },

      {
        slug: "node-api",
        status: "draft",
        title: "Node API Development",
        content: "Building REST APIs using Express and Node",
      },

      {
        slug: "postgres-guide",
        status: "published",
        title: "PostgreSQL Guide",
        content: "Database concepts and Sequelize ORM",
      },
    ];

    for (const item of posts) {
      const existingPost = await Post.findOne({
        where: {
          slug: item.slug,
        },
      });

      if (existingPost) {
        console.log(`Post already exists: ${item.title}`);
        continue;
      }

      const post = await Post.create({
        slug: item.slug,

        status: item.status as "draft" | "published",

        authorId: user.id,
      });

      await PostVersion.create({
        postId: post.id,

        title: item.title,

        contentJson: {
          type: "doc",

          content: [
            {
              type: "paragraph",

              content: [
                {
                  type: "text",

                  text: item.content,
                },
              ],
            },
          ],
        },

        authorId: user.id,
      });

      console.log(`Created post: ${item.title}`);
    }

    console.log("Seed completed successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedPosts();
