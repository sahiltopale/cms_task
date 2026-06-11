import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Versions from "./pages/Versions";
import VersionDiffPage from "./pages/VersionDiffPage";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-post/:postId"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/versions/:postId"
          element={
            <ProtectedRoute>
              <Versions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/compare/:version1Id/:version2Id"
          element={
            <ProtectedRoute>
              <VersionDiffPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <ProtectedRoute>
              <BlogDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
