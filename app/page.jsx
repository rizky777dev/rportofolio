import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import ParticleField from "@/components/particle-field";
import Hero from "@/components/hero";
import About from "@/components/about";
import Stats from "@/components/stats";
import Skills from "@/components/skills";
import Journey from "@/components/journey";
import Projects from "@/components/projects";
import Services from "@/components/services";
import CodePlayground from "@/components/code-playground";
import Workflow from "@/components/workflow";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="skip-link fixed z-[999]"
      >
        Lewati ke konten utama
      </a>

      <ScrollProgress />
      <ParticleField />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Journey />
        <Projects />
        <Services />
        <CodePlayground />
        <Workflow />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
