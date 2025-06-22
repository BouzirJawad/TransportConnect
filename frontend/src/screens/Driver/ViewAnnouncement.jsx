// src/pages/driver/ViewAnnouncement.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../provider/AuthProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EditAnnouncementModal from "./EditAnnouncementModal";

const ViewAnnouncement = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annRes = await axios.get(
          `http://localhost:7460/api/announcements/getone/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const demandRes = await axios.get(
          `http://localhost:7460/api/demands/getbyannouncement/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnnouncement(annRes.data);
        setDemands(demandRes.data);

        const initialStatuses = {};
        demandRes.data.forEach((d) => {
          initialStatuses[d._id] = d.status || "";
        });
        setUpdatedStatuses(initialStatuses);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(
        `http://localhost:7460/api/announcements/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Announcement deleted");
      navigate("/driver/dashboard");
    } catch (error) {
      toast.error("Failed to delete announcement");
    }
  };

  const handleStatusChange = (demandId, value) => {
    setUpdatedStatuses((prev) => ({ ...prev, [demandId]: value }));
  };

  const saveDemandStatus = async (demandId) => {
    const statusValue = updatedStatuses[demandId];
    try {
      await axios.put(
        `http://localhost:7460/api/demands/update/${demandId}`,
        { status: statusValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!announcement)
    return <p className="text-center mt-10">Announcement not found.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
            onClick={() => navigate("/driver/dashboard")}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold">Announcement Details</h2>
        </div>

        {/* Announcement Details */}
        <div className="bg-white p-6 rounded shadow-md space-y-3">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p><strong>From:</strong> {announcement.startPoint}</p>
            <p><strong>To:</strong> {announcement.destination}</p>
            <p><strong>Date:</strong> {new Date(announcement.startDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {announcement.status || "N/A"}</p>
            <p><strong>Capacity:</strong> {announcement.availableCapacity} kg</p>
            <p>
              <strong>Max Dimensions:</strong> {announcement.maxDimensions?.length} x {announcement.maxDimensions?.width} x {announcement.maxDimensions?.height} cm
            </p>
            <p className="col-span-2">
              <strong>WayPoints:</strong> {announcement.wayPoints?.join(" ➜ ") || "None"}
            </p>
            <p className="col-span-2">
              <strong>Package Types:</strong> {announcement.packagesTypes ? announcement.packagesTypes.join(", ") : "none"}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Demands Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Related Demands</h3>
          {demands.length === 0 ? (
            <p className="text-gray-500">No demands yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {demands.map((demand) => (
                <div
                  key={demand._id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-3"
                >
                  <p className="text-sm">
                    <strong>Shipper:</strong>{" "}
                    {demand.shipper?.firstName || "Unknown"}
                  </p>

                  {/* Packages */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {demand.packages.map((pkg, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded border text-sm shadow-sm"
                      >
                        <p><strong>Title:</strong> {pkg.title}</p>
                        <p><strong>Type:</strong> {pkg.type}</p>
                        <p><strong>Dimensions:</strong> {pkg.dimensions?.length} x {pkg.dimensions?.width} x {pkg.dimensions?.height} cm</p>
                        <p><strong>Weight:</strong> {pkg.weight} kg</p>
                      </div>
                    ))}
                  </div>

                  {/* Status Update */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      className="border rounded px-3 py-2 w-full text-sm"
                      value={updatedStatuses[demand._id]}
                      onChange={(e) =>
                        handleStatusChange(demand._id, e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      onClick={() => saveDemandStatus(demand._id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showEditModal && (
        <EditAnnouncementModal onClose={() => setShowEditModal(false)} id={id} startPoint={announcement.startPoint} wayPoints={announcement.wayPoints} destination={announcement.destination} maxDimensions={announcement.maxDimensions} packagesTypes={announcement.packagesTypes} availableCapacity={announcement.availableCapacity} startDate={announcement.startDate} />
      )}

      <Footer />
    </div>
  );
};

export default ViewAnnouncement;
