import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/idea/:id"
          element={
            <ProtectedRoute>
              <IdeaDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" theme="system"/>
    </BrowserRouter>
  );
};

export default App;
