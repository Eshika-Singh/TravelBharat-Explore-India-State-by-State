import HeroSection from "../components/HeroSection";
import SectionTitle from "../components/SectionTitle";
import StateCard from "../components/StateCard";
import states from "../data/states";

function Home() {
  return (
    <div>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Featured States"
          title="Start your next journey with iconic destinations"
          subtitle="Explore handpicked Indian states with unforgettable travel experiences, cultural richness, scenic beauty, and timeless heritage."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <StateCard key={state.name} state={state} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;