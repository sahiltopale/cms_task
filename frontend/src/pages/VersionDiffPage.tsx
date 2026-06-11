import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../styles/VersionDiffPage.css";

interface DiffItem {
  0: number;
  1: string;
}

function VersionDiffPage() {
  const { version1Id, version2Id } = useParams();

  const [diffs, setDiffs] = useState<DiffItem[]>([]);
  const [oldContent, setOldContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiff();
  }, []);

  const fetchDiff = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/posts/compare/${version1Id}/${version2Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDiffs(res.data.diffs || []);
      setOldContent(res.data.oldContent || "");
      setNewContent(res.data.newContent || "");
    } catch (error) {
      console.error("Version compare error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="diff-loading">
        <h2>Loading Comparison...</h2>
      </div>
    );
  }

  return (
    <div className="diff-page">
      <div className="diff-wrapper">
        <h1 className="diff-title">Version Comparison</h1>

        <p className="diff-subtitle">
          Compare changes between two saved versions
        </p>

        <div className="diff-card">
          <div className="diff-side old-version">
            <h3>Old Version</h3>
            <p>{oldContent}</p>
          </div>

          <div className="diff-side new-version">
            <h3>New Version</h3>
            <p>{newContent}</p>
          </div>
        </div>

        <div className="changes-card">
          <h3>Changes</h3>

          {diffs.length === 0 ? (
            <p>No changes found.</p>
          ) : (
            diffs.map((diff, index) => {
              const operation = diff[0];
              const text = diff[1];

              if (!text.trim()) return null;

              if (operation === 1) {
                return (
                  <div key={index} className="diff-added">
                    + {text}
                  </div>
                );
              }

              if (operation === -1) {
                return (
                  <div key={index} className="diff-removed">
                    - {text}
                  </div>
                );
              }

              return (
                <div key={index} className="diff-unchanged">
                  {text}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default VersionDiffPage;
