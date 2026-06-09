import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/editPost.css";

function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleUpdate = async () => {
    // ✅ validation added
    if (!title || !content) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/posts/${postId}`,
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
      alert("New Version Created");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="edit-page">
      <div className="edit-card">
        <h1 className="edit-title">Edit Post</h1>
        <p className="edit-subtitle">
          Update your post — a new version will be saved
        </p>

        <label className="edit-label">New Title</label>
        <input
          className="edit-input"
          type="text"
          placeholder="New title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="edit-label">Updated Content</label>
        <textarea
          className="edit-textarea"
          rows={8}
          placeholder="Updated content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="edit-btn" onClick={handleUpdate}>
          Update Post
        </button>
      </div>
    </div>
  );
}

export default EditPost;
