import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const IncomingDemandsList = () => {
  const { token } = useAuth();
  const [incomingDemands, setIncomingDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncomingDemands = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7460/api/demands/incomingdemands",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIncomingDemands(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load demands");
    } finally {
      setLoading(false);
    }
  };

  const saveDemandStatus = async (demandId, status) => {
    try {
      await axios.put(
        `http://localhost:7460/api/demands/update/${demandId}`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (status === "cancelled") {
        toast.success("demand cancelled", { duration: 2000});
      } else {
        toast.success("demand accepted", { duration: 2000});
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchIncomingDemands();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      {incomingDemands.length === 0 ? (
        <p className="text-center text-gray-500">No demands yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {incomingDemands.map((demand) => (
            <div
              key={demand._id}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-3"
            >
              <div className="flex gap-1">
                <p className="text-sm">
                  <strong>Shipper:</strong>{" "}
                  {demand.shipper?.firstName || "Unknown"}
                </p>
                <p className="text-sm">
                  {demand.shipper?.lastName || "Unknown"}
                </p>
              </div>

              <p className="text-sm">
                <strong>number:</strong> {demand.shipper?.phoneNumber || "Unknown"}
              </p>

              {/* Packages */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {demand.packages.map((pkg, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded border text-sm shadow-sm"
                  >
                    <p>
                      <strong>Title:</strong> {pkg.title}
                    </p>
                    <p>
                      <strong>Type:</strong> {pkg.type}
                    </p>
                    <p>
                      <strong>Dimensions:</strong> {pkg.dimensions?.length} x{" "}
                      {pkg.dimensions?.width} x {pkg.dimensions?.height} cm
                    </p>
                    <p>
                      <strong>Weight:</strong> {pkg.weight} kg
                    </p>
                  </div>
                ))}
              </div>

              {/* Status Update */}
              <div className="mt-4 w-2/3 gap-10 flex ml-auto">
                <button
                  className="mt-2 bg-red-600 text-white px-3 py-1 w-full rounded text-sm hover:bg-red-700"
                  onClick={() => saveDemandStatus(demand._id, "cancelled")}
                >
                  refuse
                </button>

                <button
                  className="mt-2 bg-green-500 text-white px-3 py-1 w-full rounded text-sm hover:bg-green-700"
                  onClick={() => saveDemandStatus(demand._id, "accepted")}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingDemandsList;
