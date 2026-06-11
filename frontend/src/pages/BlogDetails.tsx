import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/blogDetails.css";

function BlogDetails() {
  const { slug } = useParams();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/slug/${slug}`);

      setPost(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const extractText = (node: any): string => {
    if (!node) return "";

    let text = "";

    if (node.type === "text") {
      text += node.text;
    }

    if (node.content) {
      node.content.forEach((child: any) => {
        text += extractText(child);
      });
    }

    return text;
  };

  if (loading) {
    return <div className="blog-loading">Loading...</div>;
  }

  if (!post) {
    return <div className="blog-loading">Post not found</div>;
  }

  const content = post.content?.contentJson;

  return (
    <div className="blog-details-page">
      <div className="blog-details-wrapper">
        <h1 className="details-title">{post.content?.title}</h1>

        <p className="details-date">
          Published on: {new Date(post.post.createdAt).toLocaleDateString()}
        </p>

        <div className="article-content">
          {content?.content?.map((item: any, index: number) => (
            <p key={index}>{extractText(item)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
