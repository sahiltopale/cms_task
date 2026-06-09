import { useState } from "react";
import api from "../api/axios";
import "../styles/createPost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    // ✅ validation added
    if (!title || !content) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/posts",
        {
          title,
          contentJson: {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: content }],
              },
            ],
          },
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Post Created");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h1 className="create-title">Create Post</h1>
        <p className="create-subtitle">Write and publish a new article</p>

        <label className="create-label">Title</label>
        <input
          className="create-input"
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="create-label">Content</label>
        <textarea
          className="create-textarea"
          placeholder="Write your post content..."
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="create-btn" onClick={handleCreate}>
          Create Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
