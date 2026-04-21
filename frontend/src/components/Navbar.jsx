import { Link, NavLink, useNavigate } from "react-router";
import { Compass, Search, Heart, LogOut, UserCircle2 } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "Traveler";

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-cyan-500 p-2 shadow-lg">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">
              Travel Bharat
            </h1>
            <p className="text-xs text-slate-300">Explore India State by State</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className="text-sm font-medium text-slate-200 hover:text-orange-400">
            Home
          </NavLink>
          <NavLink to="/explore" className="text-sm font-medium text-slate-200 hover:text-orange-400">
            Explore
          </NavLink>
          <NavLink to="/planner" className="text-sm font-medium text-slate-200 hover:text-orange-400">
            Planner
          </NavLink>

          <NavLink
            to="/wishlist"
            className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-orange-400"
          >
            <Heart className="h-4 w-4" />
            Wishlist
          </NavLink>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <UserCircle2 className="h-4 w-4 text-orange-400" />
                <span>
                  Hi, <span className="font-semibold text-orange-400">{userName}</span>
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="text-sm font-medium text-slate-200 hover:text-orange-400">
              Login
            </NavLink>
          )}
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 md:flex"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search place or state"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-52 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </form>
      </div>
    </header>
  );
}

export default Navbar;