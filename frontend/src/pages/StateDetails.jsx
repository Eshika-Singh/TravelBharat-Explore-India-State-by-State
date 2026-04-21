import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../services/api";
import { Heart, MapPinned } from "lucide-react";

function StateDetails() {
  const { stateName } = useParams();
  const [places, setPlaces] = useState([]);
  const [message, setMessage] = useState("");
  const decodedState = decodeURIComponent(stateName);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await api.get(`/places/${decodedState}`);
        setPlaces(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaces();
  }, [decodedState]);

  const handleWishlist = (place) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to add destinations to your wishlist.");
      return;
    }

    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadySaved = existingWishlist.some(
      (item) =>
        item.name === place.name &&
        item.state === place.state
    );

    if (alreadySaved) {
      setMessage(`${place.name} is already in your wishlist.`);
      return;
    }

    const newPlace = {
      id: `${place.state}-${place.name}-${Date.now()}`,
      name: place.name,
      state: place.state,
      description: place.description,
      image: place.image,
    };

    const updatedWishlist = [...existingWishlist, newPlace];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    setMessage(`${place.name} has been added to your wishlist.`);
  };

  return (
    <section className="min-h-[80vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
            State Destination Guide
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Discover {decodedState}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Explore iconic places, save your favorites, and build a memorable
            itinerary with a curated travel experience for {decodedState}.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/wishlist"
              className="rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              View Wishlist
            </Link>
            <Link
              to="/planner"
              className="rounded-2xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Plan Trip
            </Link>
          </div>
        </div>

        {message && (
          <div className="mt-8 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700 ring-1 ring-orange-200">
            {message}
          </div>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <div
              key={place._id}
              className="overflow-hidden rounded-[1.5rem] bg-white shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {place.name}
                  </h3>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                    {place.state}
                  </span>
                </div>

                <p className="text-sm leading-7 text-slate-600">
                  {place.description}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleWishlist(place)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
                  >
                    <Heart className="h-4 w-4" />
                    Add to Wishlist
                  </button>

                  <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600">
                    <MapPinned className="h-4 w-4" />
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StateDetails;