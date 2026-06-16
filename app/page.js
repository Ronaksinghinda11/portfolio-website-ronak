import Navbar from "./components/Navbar";
import Act0_Hero from "./components/Act0_Hero";
import AboutSection from "./components/AboutSection";
import CinematicScroll from "./components/CinematicScroll";
import Act5_Timeline from "./components/Act5_Timeline";
import Act6_Stats from "./components/Act6_Stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Act0_Hero />
        <AboutSection />
        <CinematicScroll />
        <Act5_Timeline />
        <Act6_Stats />
      </main>
    </>
  );
}
