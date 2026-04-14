import Navbar from "../components/layout/NavBar";
import Hero from "../components/home/Hero";
import Histoire from "../components/home/Histoire";
import Equipe from "../components/home/Equipe";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "var(--cream)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Hero />
      <Histoire />
      <Equipe />
    </div>
  );
}
