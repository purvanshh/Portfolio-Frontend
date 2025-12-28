import "./index.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import ProjectCard from "./components/ProjectCard";
import AboutMe from "./components/AboutMe";
import SkillCard from "./components/SkillCard";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AnimatedCursor from "react-animated-cursor";
import SplineErrorBoundary from "./components/SplineErrorBoundary";
import SmokeyCursor from "./components/ui/SmokeyCursor";

function App() {
  return (
    <>
      {/* Smokey Cursor Effect */}
      <SmokeyCursor
        simulationResolution={128}
        dyeResolution={1024}
        densityDissipation={3}
        velocityDissipation={2}
        curl={5}
        splatRadius={0.25}
        splatForce={6000}
        enableShading={true}
        colorUpdateSpeed={10}
      />

      {/* 3D Background */}
      <SplineErrorBoundary>
        <div className="spline-background fade-in" style={{ opacity: 1 }}>
          <spline-viewer url="https://prod.spline.design/c1CILr5VqKGYhoDt/scene.splinecode" />
        </div>
      </SplineErrorBoundary>

      {/* Custom Cursor */}
      <AnimatedCursor
        color="#fff"
        innerSize={8}
        outerSize={50}
        innerScale={1}
        outerScale={2.2}
        outerAlpha={0}
        outerStyle={{
          background: "#ffffff",
          mixBlendMode: "exclusion",
        }}
        innerStyle={{
          backgroundColor: "#F94892",
        }}
      />

      {/* Main Content */}
      <div className="main-content">
        <Navbar />
        <HomeBanner id="home" />

        {/* ================= PROJECTS ================= */}

        <ProjectCard
          id="project"
          className="even"
          projectTitle="Dental Wellness"
          projectDesc="A premium dental clinic landing page featuring a floating 3D tooth model, glassmorphism UI elements, and smooth GSAP-powered scroll animations. Designed with a refined teal–white color palette to showcase treatments, patient testimonials, and doctor profiles with clean typography and strong visual hierarchy."
          projectLink="https://github.com/purvanshh/dentist-landing"
          deployedProjectLink="https://dentist-landing-brch.vercel.app/"
          projectImg={require("./images/image.png")}
        />

        <ProjectCard
          className="odd"
          projectTitle="ARKO – Luxury Real Estate & Architecture"
          projectDesc="A high-end real estate and architecture website crafted to convey exclusivity and spatial elegance. Features GSAP-driven smooth scroll transitions, refined micro-interactions, immersive full-bleed layouts, and a minimal luxury color system. Emphasizes architectural storytelling, visual hierarchy, and responsive design to present premium properties with clarity and impact."
          projectLink="https://github.com/purvanshh/real-estate"
          deployedProjectLink="https://real-estate-pied-ten.vercel.app/"
          projectImg={require("./images/Real_Estate.jpeg")}
        />

        <ProjectCard
          className="even"
          projectTitle="Artisan Bakery"
          projectDesc="A modern artisan bakery landing page showcasing floating Three.js bread visuals, GSAP-powered smooth scrolling, and gooey text morphing effects. Built with a warm, elegant aesthetic and responsive layout to highlight products, brand identity, and visual craftsmanship."
          projectLink="https://github.com/purvanshh/bakery-landing"
          deployedProjectLink="https://bakery-landing-one.vercel.app/"
          projectImg={require("./images/SCR-20251226-tgod.png")}
        />

        <ProjectCard
          className="odd"
          projectTitle="Épicurien"
          projectDesc="A luxury fine-dining landing page featuring a floating Three.js golden chalice, 36 animated SVG background paths driven by Framer Motion, and GSAP ScrollTrigger reveals. Built around a sophisticated gold-on-charcoal design system with premium typography and cinematic motion."
          projectLink="https://github.com/purvanshh/restaurant-landing"
          deployedProjectLink="https://restaurant-landing-kappa.vercel.app"
          projectImg={require("./images/Restaurant.png")}
        />

        <ProjectCard
          className="even"
          projectTitle="BrainWave"
          projectDesc="A UI/UX-focused project exploring modern frontend patterns through responsive layouts, smooth animations, and clean component architecture. Built to emphasize visual polish, spacing systems, and scalable design practices rather than backend complexity."
          projectLink="https://github.com/purvanshh/BrainWave"
          deployedProjectLink="https://brainwave-iota-ten.vercel.app/"
          projectImg={require("./images/brainwave.png")}
        />

        {/* ================= SECTIONS ================= */}

        <AboutMe id="about" />
        <SkillCard id="skills" />
        <ContactForm id="contact" />
        <Footer />
      </div>
    </>
  );
}

export default App;
