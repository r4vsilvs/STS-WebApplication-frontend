import Loading from "../../components/loading";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../utils/api";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

export function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "95%",
      maxWidth: "750px",
      maxHeight: "85vh",
      overflowY: "auto",
      borderRadius: "12px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  function openModal(order) {
    setSelectedOrder(order);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedOrder(null);
  }

  useEffect(() => {
    if (!isLoading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized");
      setIsLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/api/order`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data.orders);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching orders");
        setIsLoading(false);
      });
  }, [isLoading]);

  function updateStatus(orderId, newStatus) {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized");

    axios
      .patch(
        `${BASE_URL}/api/order/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Order status updated");
        setIsLoading(true);
      })
      .catch(() => toast.error("Failed to update status"));
  }

  function deleteOrder(orderId) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    axios
      .delete(`${BASE_URL}/api/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Order deleted successfully");
        setIsLoading(true); // refresh the list
        closeModal(); // close modal if deleting from inside
      })
      .catch(() => toast.error("Failed to delete order"));
  }

  return (
    <div className="w-full h-full relative p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Orders Management
        </h2>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh] flex-col gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4">{order.name}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4 font-semibold">Rs. {order.total}</td>
                    <td className="px-6 py-4">
                      {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${order.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-4">
                        <FiEdit
                          className="text-[22px] cursor-pointer hover:scale-125 transition text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(
                              order._id,
                              order.status === "pending"
                                ? "completed"
                                : "pending"
                            );
                          }}
                        />
                        <FaTrash
                          className="text-[22px] cursor-pointer hover:scale-125 transition text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOrder(order._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Order Details"
            >
              {selectedOrder && (
                <div className="flex flex-col gap-6">
                  <h2 className="text-lg font-semibold mb-2">
                    Order {selectedOrder.orderId}
                  </h2>
                  {/* Order Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p><strong>Name:</strong> {selectedOrder.name}</p>
                      <p><strong>Email:</strong> {selectedOrder.email}</p>
                      <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p><strong>Address:</strong> {selectedOrder.address}</p>
                      <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${selectedOrder.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : selectedOrder.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                            }`}
                        >
                          {selectedOrder.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                          <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Quantity</th>
                            <th className="px-4 py-3">Availability</th>
                            <th className="px-4 py-3">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.products.map((item, idx) => (
                            <tr
                              key={idx}
                              className="border-b hover:bg-gray-50 transition"
                            >
                              <td className="px-4 py-3">
                                <img
                                  src={item.productInfo.images[0]}
                                  alt={item.productInfo.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              </td>
                              <td className="px-4 py-3 font-semibold">
                                {item.productInfo.name}
                              </td>
                              <td className="px-4 py-3">{item.productInfo.quantity}</td>

                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full font-semibold ${item.productInfo.quantity > 0
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                    }`}
                                >
                                  {item.productInfo.quantity > 0 ? "Available" : "Out of Stock"}
                                </span>
                              </td>
                              <td className="px-4 py-3">Rs. {item.productInfo.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total */}
                    <div className="px-4 py-3 bg-gray-100 flex justify-between font-bold text-lg rounded-b-2xl">
                      <span>Total</span>
                      <span>Rs. {selectedOrder.total}</span>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => deleteOrder(selectedOrder._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}