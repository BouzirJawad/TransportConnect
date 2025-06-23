import { useState } from "react";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import AnnouncementList from "./AnnouncementList";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import IncomingDemandsList from "./IncomingDemandsList";
import DriverHistory from "./DriverHistory";

const DriverDashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-blue-1">
      <Navbar />
      <header className="bg-orange-1 text-center text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
      </header>

      <main className="container flex-1 mx-auto p-6 space-y-10">
        {/* My Announcements Section */}
        <section id="my-announcements">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Announcements</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-1 text-white px-4 py-2 rounded hover:bg-blue-2"
            >
              + Create Announcement
            </button>
          </div>
          <AnnouncementList onEdit={setEditData} />
        </section>

        {/* Incoming Demands Section */}
        <section id="incoming-demands">
          <h2 className="text-xl font-semibold mb-4">Incoming Demands</h2>
          <IncomingDemandsList />
        </section>

        {/* History Section */}
        <section id="history">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <DriverHistory />
        </section>
      </main>

      {/* Modals */}
      {showCreateModal && (
        <CreateAnnouncementModal onClose={() => setShowCreateModal(false)} />
      )}

      <Footer />
    </div>
  );
};

export default DriverDashboard;
