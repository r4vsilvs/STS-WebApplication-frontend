import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth(); // get logout from context

    function handleLogout() {
        logout(); // clears localStorage + resets React auth state
        toast.success("Logout successful");
        navigate("/login");
    }

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">
            Logout
        </button>
    );
}