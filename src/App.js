import "./index.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import AboutMe from "./components/AboutMe";
import SkillCard from "./components/SkillCard";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AnimatedCursor from "react-animated-cursor";
import SplineErrorBoundary from "./components/SplineErrorBoundary";
import SmokeyCursor from "./components/ui/SmokeyCursor";
import ScrollCarousel from "./components/ui/ScrollCarousel";

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

        <ScrollCarousel
          id="project"
          maxScrollHeight={6000}
          features={[
            {
              title: "Dental Wellness",
              description: "A premium dental clinic landing page featuring a floating 3D tooth model, glassmorphism UI elements, and smooth GSAP-powered scroll animations. Designed with a refined teal–white color palette to showcase treatments, patient testimonials, and doctor profiles.",
              link: "https://github.com/purvanshh/dentist-landing",
              demoLink: "https://dentist-landing-brch.vercel.app/",
              image: require("./images/image.png")
            },
            {
              title: "ARKO – Luxury Real Estate",
              description: "A high-end real estate and architecture website crafted to convey exclusivity. Features GSAP-driven smooth scroll transitions, immersive full-bleed layouts, and a minimal luxury color system.",
              link: "https://github.com/purvanshh/real-estate",
              demoLink: "https://real-estate-pied-ten.vercel.app/",
              image: require("./images/Real_Estate.jpeg")
            },
            {
              title: "Artisan Bakery",
              description: "A modern artisan bakery landing page showcasing floating Three.js bread visuals, GSAP-powered smooth scrolling, and gooey text morphing effects. Built with a warm, elegant aesthetic.",
              link: "https://github.com/purvanshh/bakery-landing",
              demoLink: "https://bakery-landing-one.vercel.app/",
              image: require("./images/SCR-20251226-tgod.png")
            },
            {
              title: "Épicurien",
              description: "A luxury fine-dining landing page featuring a floating Three.js golden chalice, 36 animated SVG background paths driven by Framer Motion, and GSAP ScrollTrigger reveals.",
              link: "https://github.com/purvanshh/restaurant-landing",
              demoLink: "https://restaurant-landing-kappa.vercel.app",
              image: require("./images/Restaurant.png")
            },
            {
              title: "BrainWave",
              description: "A UI/UX-focused project exploring modern frontend patterns through responsive layouts, smooth animations, and clean component architecture.",
              link: "https://github.com/purvanshh/BrainWave",
              demoLink: "https://brainwave-iota-ten.vercel.app/",
              image: require("./images/brainwave.png")
            }
          ]}
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
