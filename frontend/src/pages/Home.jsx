import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Car, ShieldCheck, Clock } from "lucide-react";
import axios from "../api/axios";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import heroImage from "../assets/hero.png";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(false);

  // ============================
  // Fetch Vehicles
  // ============================

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/vehicles");

      if (response.data.success) {
        setVehicles(response.data.vehicles.slice(0, 6));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ============================
  // Search Handler
  // ============================

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      setSearchResults(true);

      const response = await axios.get("/vehicles/search", {
        params: filters,
      });

      if (response.data.success) {
        setVehicles(response.data.vehicles);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
              Rent Your Dream Vehicle
              <span className="text-indigo-600"> Anytime, Anywhere</span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
              RentiGo makes vehicle rental simple, secure and affordable. Choose
              from a wide range of vehicles and book instantly.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* FIXED: Changed from to="/" to to="/vehicles" to make exploration functional */}
              <Link
                to="/vehicles"
                className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
              >
                Explore Vehicles
              </Link>

              <Link
                to="/register"
                className="px-7 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 dark:hover:bg-slate-900 transition"
              >
                Become Partner
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Vehicle Rental"
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Featured Vehicles */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {searchResults ? "Search Results" : "Featured Vehicles"}
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Choose from our best available vehicles
            </p>
          </div>

          {/* FIXED: Changed route path from singular "/vehicle" to plural "/vehicles" */}
          {!searchResults && (
            <Link
              to="/vehicles"
              className="text-indigo-600 font-bold hover:underline"
            >
              View All
            </Link>
          )}
        </div>

        {loading ? (
          <Loading message="Loading vehicles..." />
        ) : vehicles.length === 0 ? (
          <EmptyState
            title="No vehicles found"
            description="Try changing your search filters."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose RentiGo */}

      <section className="bg-white dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Why Choose RentiGo?
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Simple, reliable and affordable vehicle rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
                <Car className="text-indigo-600" size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                Wide Vehicle Collection
              </h3>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Choose from bikes, hatchbacks, sedans, SUVs and premium vehicles
                according to your travel needs.
              </p>
            </div>

            {/* Card 2 */}

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/40">
                <ShieldCheck className="text-green-600" size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                Safe & Secure
              </h3>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Verified agencies, trusted vehicles and secure booking process
                for a worry-free rental experience.
              </p>
            </div>

            {/* Card 3 */}

            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/40">
                <Clock className="text-yellow-600" size={28} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                Quick Booking
              </h3>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Book your favourite vehicle within minutes with an easy and
                user-friendly booking process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-center shadow-xl">
          <h2 className="text-4xl font-black text-white">
            Ready to Start Your Journey?
          </h2>

          <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
            Join thousands of happy customers who trust RentiGo for affordable,
            reliable and hassle-free vehicle rentals.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-slate-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
