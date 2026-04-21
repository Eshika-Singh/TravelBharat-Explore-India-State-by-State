import { Link } from "react-router";
import { Heart, Lock, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = localStorage.getItem("userName") || "Traveler";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);
  useEffect(() => {
  const syncWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  };

  window.addEventListener("storage", syncWishlist);
  return () => window.removeEventListener("storage", syncWishlist);
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (!isLoggedIn) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16">
        <div className="w-full max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-2xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
            <Lock className="h-10 w-10 text-orange-500" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Login to create your Wishlist
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Save your favorite destinations, revisit them anytime, and manage your
            personal travel shortlist in one place.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
            >
              Login
            </Link>
            <Link
              to="/explore"
              className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600"
            >
              Explore Places
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 text-white shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
            Personal Collection
          </p>
          <h1 className="mt-3 text-4xl font-bold">{userName}'s Wishlist</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Keep all your saved destinations in one place and turn your ideas into
            your next real journey.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-xl ring-1 ring-slate-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <Heart className="h-10 w-10 text-orange-500" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-slate-600">
              Start exploring destinations and save your favorite places for later.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((place) => (
              <div
                key={place.id}
                className="overflow-hidden rounded-[1.5rem] bg-white shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {place.name}
                    </h3>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {place.state}
                    </span>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">
                    {place.description}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => handleRemove(place.id)}
                      className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>

                    <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500">
                      <MapPinned className="h-4 w-4" />
                      Saved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;