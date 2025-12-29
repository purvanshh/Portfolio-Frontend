import { useState, useEffect } from "react";
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
import RippleLoader from "./components/ui/RippleLoader";
import { FaReact } from "react-icons/fa";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 2.5 seconds before showing the site
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <RippleLoader
          icon={<FaReact size="100%" />}
          size={200}
          duration={2}
          logoColor="dodgerblue"
        />
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          marginTop: '2rem',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.9rem',
          letterSpacing: '1px'
        }}>
          View in a desktop for the best experience
        </p>
      </div>
    );
  }

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

      {/* Custom Cursor - only red dot (no invert / negative blend) */}
      <AnimatedCursor
        color="#F94892"
        innerSize={8}
        outerSize={0}
        innerScale={1}
        outerScale={1}
        outerAlpha={0}
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
              description: "Experience a new standard in dental care with this premium landing page. Featuring a mesmerizing floating 3D tooth model, glassmorphism UI elements, and fluid GSAP-powered scroll animations, this site is designed to captivate. The refined teal–white color palette exudes professionalism, perfectly showcasing treatments, patient stories, and doctor profiles.",
              link: "https://github.com/purvanshh/dentist-landing",
              demoLink: "https://dentist-landing-brch.vercel.app/",
              image: require("./images/image.png")
            },
            {
              title: "ARKO – Luxury Real Estate",
              description: "Step into the world of exclusivity with ARKO, a high-end real estate and architecture platform. Crafted to convey pure elegance, it features immersive full-bleed layouts, sophisticated GSAP scroll transitions, and a minimal luxury color system. Every micro-interaction is designed to tell a story of spatial beauty and premium living.",
              link: "https://github.com/purvanshh/real-estate",
              demoLink: "https://real-estate-pied-ten.vercel.app/",
              image: require("./images/Restaurant_landing.png")
            },
            {
              title: "Content Creator Hub",
              description: "Empower your creative journey with this sleek content creator platform. Built with a modern, intuitive interface, it features dynamic content management tools, seamless social media integration, and a vibrant aesthetic designed to inspire. Perfect for influencers and digital creators looking to elevate their online presence with style.",
              link: "https://github.com/purvanshh/content-creator",
              demoLink: "https://content-creator-sage.vercel.app/",
              image: require("./images/SCR-20251229-szgm.jpeg")
            },
            {
              title: "Artisan Bakery",
              description: "Taste the craftsmanship with this modern artisan bakery site. Highlighting floating Three.js bread visuals and gooey text morphing effects, the design is as warm and inviting as fresh bread. The elegant aesthetic and smooth scrolling create a sensory digital experience that perfectly mirrors the artistry of baking.",
              link: "https://github.com/purvanshh/bakery-landing",
              demoLink: "https://bakery-landing-one.vercel.app/",
              image: require("./images/SCR-20251226-tgod.png")
            },
            {
              title: "Épicurien",
              description: "Indulge in luxury with Épicurien, a fine-dining experience brought to life online. Featuring a majestic floating Three.js golden chalice and 36 animated SVG background paths driven by Framer Motion, this site is a feast for the eyes. The sophisticated gold-on-charcoal design sets the stage for a cinematic culinary journey.",
              link: "https://github.com/purvanshh/restaurant-landing",
              demoLink: "https://restaurant-landing-kappa.vercel.app",
              image: require("./images/Restaurant.png")
            },
            {
              title: "BrainWave",
              description: "Explore the future of interface design with BrainWave. A project dedicated to modern frontend patterns, responsive layouts, and clean component architecture. It emphasizes visual polish, precise spacing systems, and scalable design practices, serving as a benchmark for modern, high-performance web applications.",
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
