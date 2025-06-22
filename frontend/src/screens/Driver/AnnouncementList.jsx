// src/components/driver/AnnouncementsList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AnnouncementsList = () => {
  const { token } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get("http://localhost:7460/api/announcements/getdriverannouncement", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className={ announcements.length < 3 ? "p-4 space-y-6" : "p-4 space-y-6 h-150 overflow-y-scroll"}>
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements found.</p>
      ) : (
        announcements.map((ann) => (
          <div key={ann._id} className="border border-gray-300 rounded-xl p-4 shadow-md bg-white">
            <h3 className="text-lg font-bold mb-2">
              {ann.startPoint} ➜ {ann.destination}
            </h3>
            <p><span className="font-semibold">Start Date:</span> {new Date(ann.startDate).toLocaleDateString('en-gb')}</p>
            <p><span className="font-semibold">Capacity:</span> {ann.availableCapacity} kg</p>
            <p>
              <span className="font-semibold">Package Types:</span>{" "}
              {Array.isArray(ann.packagesTypes) ? (ann.packagesTypes.length === 0 ? "No types" : ann.packagesTypes.join(", ")) : "N/A"}
            </p>

            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate(`/driver/announcement/${ann._id}`)}
            >
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AnnouncementsList;
