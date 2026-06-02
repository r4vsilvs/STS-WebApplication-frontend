import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../utils/api";

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      axios
        .get(`${BASE_URL}/api/user/all`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);


  return (
    <div className="w-full h-full relative p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Users Management
      </h2>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border-collapse whitespace-nowrap">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User ID</th>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user._id}
                </td>

                <td className="px-6 py-4">
                  <img
                    src={user.img || "/default-profile.png"}
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>

                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4 font-semibold">{user.role}</td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${user.isBlocked
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}