import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-eggshell text-blue-1 flex flex-col">

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center text-center p-10 bg-white">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Delivering Fast, Reliable, and Secure Shipping
          </h2>
          <p className="text-lg mb-6 text-blue-1">
            Join as a driver or shipper today and streamline your transportation needs with TransportConnect.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-blue-2 text-white px-6 py-3 rounded-md hover:bg-blue-1 transition">
              Get Started
            </Link>
            <a href="#services" className="text-blue-1 underline hover:text-blue-2">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-10 bg-eggshell">
        <h3 className="text-3xl font-bold mb-4">About Us</h3>
        <p className="text-blue-1 max-w-3xl">
          TransportConnect is a modern shipping platform connecting shippers and drivers. Whether you need to send a package or earn money delivering, our system is designed to make logistics simple, fast, and secure.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="p-10 bg-blue-1 text-white">
        <h3 className="text-3xl font-bold mb-4">Our Services</h3>
        <ul className="space-y-2 list-disc pl-6">
          <li>Post or find shipment announcements</li>
          <li>Track delivery history and demand status</li>
          <li>Rate and review users after deliveries</li>
          <li>Admin tools for managing and monitoring the platform</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-10 bg-white text-orange-1">
        <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
        <p>Email: admin@TransportConnect.com</p>
        <p>Phone: +212 6 12 34 56 78</p>
      </section>

        <Footer />
    </div>
  );
};

export default Landing;
