import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/versions.css";

function Versions() {
  const { postId } = useParams();
  const [versions, setVersions] = useState<any[]>([]);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/posts/${postId}/versions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVersions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="versions-page">
      <div className="versions-wrapper">
        <h1 className="versions-title">Version History</h1>
        <p className="versions-subtitle">All saved versions of this post</p>

        {versions.length === 0 ? (
          <p className="versions-empty">No versions available yet.</p>
        ) : (
          <div className="versions-list">
            {versions.map((version) => (
              <div key={version.id} className="version-card">
                <h3 className="version-title">{version.title}</h3>
                <p className="version-date">
                  Created: {new Date(version.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Versions;
