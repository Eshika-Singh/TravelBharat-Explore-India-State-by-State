import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import api from "../services/api";

function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/search?query=${query}`);
        setResults(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <section className="min-h-[80vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 text-white shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
            Search
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            Results for "{query}"
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Explore destinations related to your search and continue building your
            next travel experience.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-[2rem] bg-white p-10 text-center shadow-xl ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              No destinations found
            </h2>
            <p className="mt-3 text-slate-600">
              Try searching for another state or place name.
            </p>
            <Link
              to="/explore"
              className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
            >
              Explore All States
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {results.map((place) => (
              <div
                key={place._id}
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
                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                      {place.state}
                    </span>
                  </div>

                  <p className="text-sm leading-7 text-slate-600">
                    {place.description}
                  </p>

                  <Link
                    to={`/state/${encodeURIComponent(place.state)}`}
                    className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
                  >
                    View State
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPage;