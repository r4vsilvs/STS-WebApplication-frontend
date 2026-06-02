import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// 1. Create the context object
export const AuthContext = createContext(null);

// 2. Helper: decode the token from localStorage, returns null if invalid/missing
function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return null;
        }
        return decoded; // e.g. { firstName, lastName, role, ... }
    } catch {
        return null;
    }
}

// 3. The Provider component — wraps your whole app
export function AuthProvider({ children }) {
    const [user, setUser] = useState(getUserFromToken);

    // Derived booleans for convenience
    const isAuthenticated = user !== null;
    const isAdmin = user?.role === "admin";

    // Called after a successful login to sync state
    function login(token) {
        localStorage.setItem("token", token);
        setUser(getUserFromToken());
    }

    // Called on logout
    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. Custom hook — any component can call useAuth() to get the context
export function useAuth() {
    return useContext(AuthContext);
}
