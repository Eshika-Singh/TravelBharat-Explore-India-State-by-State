import SectionTitle from "../components/SectionTitle";
import StateCard from "../components/StateCard";
import states from "../data/states";

function ExploreStates() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle
        eyebrow="Explore"
        title="Browse India’s most loved travel states"
        subtitle="Choose a state to discover famous places, rich culture, scenic attractions, and destination highlights."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <StateCard key={state.name} state={state} />
        ))}
      </div>
    </section>
  );
}

export default ExploreStates;