import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/blog.css";

function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts/published");

      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="blog-page">
      <div className="blog-wrapper">
        <h1 className="blog-title">Latest Blogs</h1>

        <p className="blog-subtitle">Explore published articles</p>

        {posts.length === 0 ? (
          <div className="empty-blog">No published posts available.</div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <div className="blog-card" key={post.id}>
                <h2>{post.slug.split("-").slice(0, -1).join(" ")}</h2>

                <p>
                  Published on: {new Date(post.createdAt).toLocaleDateString()}
                </p>

                <button onClick={() => navigate(`/blog/${post.slug}`)}>
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
