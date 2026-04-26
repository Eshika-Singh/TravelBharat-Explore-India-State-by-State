import { useState } from "react";

function TripPlanner() {
  const [state, setState] = useState("");
  const [days, setDays] = useState(1);
  const [plan, setPlan] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPlan([]);
    setLoading(true);

    try {
      const res = await fetch("https://travelbharat-explore-india-state-by-state.onrender.com/trip-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state,
          days: Number(days),
        }),
      });

      const raw = await res.text();
      const data = raw ? JSON.parse(raw) : {};

      if (!res.ok) {
        throw new Error(data.detail || "Unable to generate trip plan.");
      }

      setPlan(data.plan || []);
      setMessage("Trip plan generated successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Unable to generate trip plan.");
      setMessageType("error");
      setPlan([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">Plan Your Trip</h1>
          <p className="mt-2 text-slate-600">
            Enter state and number of days to generate your travel itinerary.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <input
              type="text"
              placeholder="Enter state name"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="number"
              min="1"
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-orange-500"
            >
              Generate Plan
            </button>
          </form>

          {loading && (
            <p className="mt-4 font-semibold text-orange-500">
              Generating your plan...
            </p>
          )}

          {message && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm font-medium ${
                messageType === "success"
                  ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                  : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
          <h2 className="text-2xl font-bold">Your Itinerary</h2>

          <div className="mt-6 space-y-4">
            {plan.length === 0 ? (
              <p className="text-slate-300">
                Your generated trip plan will appear here.
              </p>
            ) : (
              plan.map((item) => (
                <div
                  key={item.day}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <p className="text-sm font-semibold text-orange-400">
                    Day {item.day}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{item.place_name}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripPlanner;