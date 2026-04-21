import { Link } from "react-router";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.25),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(6,182,212,0.22),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1 text-sm font-medium text-orange-300">
            Discover the beauty of India
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Explore India <span className="text-orange-400">State by State</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            Travel Bharat helps you discover iconic destinations, build a personalized
            wishlist, and create simple day-wise travel plans across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Explore States
            </Link>
            <Link
              to="/planner"
              className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Plan a Trip
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=80"
            alt="India travel"
            className="h-[500px] w-full rounded-[2rem] object-cover shadow-2xl ring-1 ring-white/10"
          />
          <div className="absolute -bottom-6 left-6 rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
            <p className="text-sm text-slate-200">Curated destinations across India</p>
            <h3 className="text-xl font-bold text-white">Premium Travel Experience</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;