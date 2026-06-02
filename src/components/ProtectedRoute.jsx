import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — wraps any route that requires authentication.
 *
 * Props:
 *   adminOnly (bool) — if true, also requires the user to have role "admin"
 *   redirectTo (string) — where to send unauthenticated users (default: /login)
 */
export default function ProtectedRoute({ children, adminOnly = false, redirectTo = "/login" }) {
    const { isAuthenticated, isAdmin } = useAuth();

    // Not logged in at all → go to login
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Logged in but not an admin, and this route requires admin
    if (adminOnly && !isAdmin) {
        return <Navigate to="/home" replace />;
    }

    // All checks passed — render the actual page
    return children;
}
