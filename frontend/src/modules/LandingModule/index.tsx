import Benefits from "./sections/Benefits";
import Hero from "./sections/Hero";

export default function LandingModule() {
  return (
    <main className="flex flex-col gap-10 overflow-hidden pt-36">
      <Hero />
      <Benefits />
    </main>
  );
}
