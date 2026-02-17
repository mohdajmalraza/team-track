import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { TeamProvider } from "./context/TeamContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import RootRedirect from "./routes/RootRedirect.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import TeamsPage from "./pages/TeamsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProjectDetailsPage from "./pages/ProjectDetailsPage.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:id", element: <ProjectDetailsPage /> },
      { path: "/tasks/:id", element: <TaskDetailsPage /> },
      { path: "/teams", element: <TeamsPage /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
  { path: "*", element: <h2>404 – Page Not Found</h2> },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <TeamProvider>
              <UserProvider>
                <RouterProvider router={router} />
              </UserProvider>
            </TeamProvider>
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
