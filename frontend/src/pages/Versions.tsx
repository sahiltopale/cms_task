import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/versions.css";

function Versions() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [versions, setVersions] = useState<any[]>([]);
  const [version1, setVersion1] = useState("");
  const [version2, setVersion2] = useState("");

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/posts/${postId}/versions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVersions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRestoreVersion = async (versionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to restore this version?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/posts/restore/${versionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Version restored successfully!");

      fetchVersions();
    } catch (error) {
      console.error(error);
      alert("Failed to restore version");
    }
  };

  const handleCompare = () => {
    if (!version1 || !version2) {
      alert("Please select two versions");
      return;
    }

    if (version1 === version2) {
      alert("Select different versions");
      return;
    }

    navigate(`/compare/${version1}/${version2}`);
  };

  return (
    <div className="versions-page">
      <div className="versions-wrapper">
        <h1 className="versions-title">Version History</h1>

        <p className="versions-subtitle">
          Compare or restore any version of this post
        </p>

        {versions.length === 0 ? (
          <p className="versions-empty">No versions available yet.</p>
        ) : (
          <>
            <div className="compare-section">
              <select
                value={version1}
                onChange={(e) => setVersion1(e.target.value)}
              >
                <option value="">Select Version 1</option>

                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.title} (
                    {new Date(version.createdAt).toLocaleString()})
                  </option>
                ))}
              </select>

              <select
                value={version2}
                onChange={(e) => setVersion2(e.target.value)}
              >
                <option value="">Select Version 2</option>

                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.title} (
                    {new Date(version.createdAt).toLocaleString()})
                  </option>
                ))}
              </select>

              <button className="compare-btn" onClick={handleCompare}>
                Compare Versions
              </button>
            </div>

            <div className="versions-list">
              {versions.map((version, index) => (
                <div key={version.id} className="version-card">
                  <h3 className="version-title">{version.title}</h3>

                  <p className="version-date">
                    Created: {new Date(version.createdAt).toLocaleString()}
                  </p>

                  <p className="version-id">Version ID: {version.id}</p>

                  {index === 0 && (
                    <span className="latest-badge">Latest Version</span>
                  )}

                  <div className="version-actions">
                    <button
                      className="restore-btn"
                      onClick={() => handleRestoreVersion(version.id)}
                    >
                      Restore Version
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Versions;
