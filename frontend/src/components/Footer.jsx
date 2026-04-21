import { Compass, MapPinned, Heart, Plane } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-cyan-500 p-2">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Travel Bharat</h2>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            A modern travel exploration platform to discover Indian states,
            famous destinations, personalized wishlists, and day-wise travel plans.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><MapPinned className="h-4 w-4" /> State-wise Travel</li>
            <li className="flex items-center gap-2"><Plane className="h-4 w-4" /> Trip Planning</li>
            <li className="flex items-center gap-2"><Heart className="h-4 w-4" /> Wishlist Saving</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Features
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>Professional UI Experience</li>
            <li>Search Across Places</li>
            <li>State Detail Pages</li>
            <li>Secure User Wishlist</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Project
          </h3>
          <p className="text-sm leading-6 text-slate-400">
            Built with React, Tailwind CSS, FastAPI, and MongoDB for a clean,
            scalable, full-stack travel experience.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-5 text-center text-sm text-slate-500">
        © 2026 Travel Bharat. Designed for a premium travel experience.
      </div>
    </footer>
  );
}

export default Footer;