import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/dashboard.css";

function Dashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/posts/my-posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const publishPost = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/posts/${postId}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Post Published");
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to publish post");
    }
  };

  // ✅ ADDED: Unpublish function
  const unpublishPost = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/posts/${postId}/unpublish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert("Post Unpublished");
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to unpublish post");
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post Deleted");
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.slug
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ? true : post.status?.toLowerCase() === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">CMS Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage, edit and publish your content
          </p>
        </div>

        <div className="dashboard-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-post")}
          >
            Create Post
          </button>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER BAR */}
      <div className="dashboard-controls">
        <input
          className="search-bar"
          placeholder="Search posts by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-group">
          {["all", "draft", "published"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS */}
      {filteredPosts.length === 0 ? (
        <p className="dashboard-empty">No posts found.</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-top">
                <h3 className="post-title">{post.slug}</h3>
                <span
                  className={`post-status status-${post.status?.toLowerCase()}`}
                >
                  {post.status}
                </span>
              </div>

              <div className="post-actions">
                <button onClick={() => navigate(`/edit-post/${post.id}`)}>
                  Edit
                </button>

                <button onClick={() => navigate(`/versions/${post.id}`)}>
                  Versions
                </button>

                {/* ✅ TOGGLE BUTTON */}
                {post.status?.toLowerCase() === "published" ? (
                  <button onClick={() => unpublishPost(post.id)}>
                    Unpublish
                  </button>
                ) : (
                  <button onClick={() => publishPost(post.id)}>Publish</button>
                )}

                <button className="danger" onClick={() => deletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
