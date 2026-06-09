import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: any }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
