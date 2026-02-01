import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect.jsx";

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoard />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <h2>404 – Page Not Found</h2> },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
