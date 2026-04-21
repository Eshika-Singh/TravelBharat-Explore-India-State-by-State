import { Link } from "react-router";

function StateCard({ state }) {
  return (
    <Link
      to={`/state/${encodeURIComponent(state.name)}`}
      className="group overflow-hidden rounded-[1.25rem] bg-white shadow-md ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="overflow-hidden">
        <img
          src={state.image}
          alt={state.name}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900">{state.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{state.tagline}</p>
        <div className="mt-4 inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
          Explore Now
        </div>
      </div>
    </Link>
  );
}

export default StateCard;