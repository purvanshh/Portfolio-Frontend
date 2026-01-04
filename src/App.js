import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import AboutMe from "./components/AboutMe";
import RippleLoader from "./components/ui/RippleLoader";
import { FaReact } from "react-icons/fa";

// Lazy load heavy components
const SkillCard = lazy(() => import("./components/SkillCard"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Footer = lazy(() => import("./components/Footer"));
const AnimatedCursor = lazy(() => import("react-animated-cursor"));
const SplineErrorBoundary = lazy(() => import("./components/SplineErrorBoundary"));
const SmokeyCursor = lazy(() => import("./components/ui/SmokeyCursor"));
const ScrollCarousel = lazy(() => import("./components/ui/ScrollCarousel"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

  useEffect(() => {
    // Check for low-end devices
    const checkLowPower = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      const coreCount = navigator.hardwareConcurrency || 4;

      // Consider it low power if it's mobile, small screen, or has few cores
      if (isMobile || isSmallScreen || coreCount < 4) {
        setIsLowPowerDevice(true);
      }
    };

    checkLowPower();

    // Wait for 2.5 seconds before showing the site
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
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
          For the most fluid experience, I recommend viewing this project on a desktop device with battery saver disabled.
        </p>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        {/* Smokey Cursor Effect - Disabled on low power devices */}
        {!isLowPowerDevice && (
          <SmokeyCursor
            {...(() => {
              // Dynamic quality adjustment based on device capabilities
              const isHighEnd = typeof navigator !== 'undefined' &&
                (navigator.hardwareConcurrency || 4) > 4;
              return {
                simulationResolution: isHighEnd ? 80 : 64,
                dyeResolution: isHighEnd ? 640 : 512
              };
            })()}
            densityDissipation={3}
            velocityDissipation={2}
            curl={5}
            splatRadius={0.25}
            splatForce={6000}
            enableShading={true}
            colorUpdateSpeed={10}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {/* 3D Background - Disabled on low power devices */}
        {!isLowPowerDevice && (
          <SplineErrorBoundary>
            <div className="spline-background fade-in" style={{ opacity: 1 }}>
              <spline-viewer url="https://prod.spline.design/c1CILr5VqKGYhoDt/scene.splinecode" />
            </div>
          </SplineErrorBoundary>
        )}
      </Suspense>

      <Suspense fallback={null}>
        {/* Custom Cursor - only red dot (no invert / negative blend) */}
        <AnimatedCursor
          color="#F94892"
          innerSize={8}
          outerSize={0}
          innerScale={1.2}
          outerScale={1}
          outerAlpha={0}
          hasBlendMode={false}
          innerStyle={{
            backgroundColor: "#F94892",
            zIndex: 99999,
          }}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link'
          ]}
        />
      </Suspense>

      {/* Main Content */}
      <div className="main-content">
        <Navbar />
        <HomeBanner id="home" />

        {/* ================= PROJECTS ================= */}

        <Suspense fallback={<div style={{ height: '500px' }} />}>
          <ScrollCarousel
            id="project"
            maxScrollHeight={6000}
            features={[
              {
                title: "TravelPlanner – Immersive Travel",
                description: "A modern, immersive travel planning website featuring stunning parallax mountain backgrounds with 17 layered images, custom cursor with spring physics and trail effects, and scroll-expanding hero video. Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion, it delivers pop-out hover effects, dynamic navbar with animated sliding pill, and expand-on-hover destination cards for an unforgettable user experience.",
                link: "https://github.com/purvanshh/travel-planner",
                demoLink: "https://travel-planner-rho-three.vercel.app/",
                image: require("./images/image copy.png")
              },
              {
                title: "Dropset – Futuristic Gym",
                description: "Step into the future of fitness with Dropset, a high-performance gym tracker landing page built for Gen Z athletes. Featuring stunning 3D floating dumbbells, assembling wireframe gyms, and animated neon grids powered by Three.js and React Three Fiber. The electric cyber theme with glowing gradients, glassmorphism cards, and Framer Motion + GSAP animations creates an immersive workout experience.",
                link: "https://github.com/purvanshh/gym-landing",
                demoLink: "https://gym-landing-sage.vercel.app",
                image: require("./images/SCR-20260101-nxhh.jpeg")
              },
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
                image: require("./images/SCR-20260103-bhcf.jpeg")
              },
              {
                title: "Kane Williams Lawyer",
                description: "A sophisticated lawyer portfolio crafted with elegance and authority. Featuring a sleek dark theme with refined gold accents, smooth Framer Motion animations, and comprehensive sections including services, testimonials, FAQ, and blog. The professional typography and responsive design command trust while the modern aesthetic sets a new standard for legal web presence.",
                link: "https://github.com/purvanshh/lawyer-landing",
                demoLink: "https://lawyer-landing-gamma.vercel.app/",
                image: require("./images/SCR-20251231-ubqm.png")
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
        </Suspense>

        {/* ================= SECTIONS ================= */}

        <AboutMe id="about" />
        <Suspense fallback={<div style={{ height: '300px' }} />}>
          <SkillCard id="skills" />
        </Suspense>
        <Suspense fallback={<div style={{ height: '300px' }} />}>
          <ContactForm id="contact" />
        </Suspense>
        <Suspense fallback={<div style={{ height: '100px' }} />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
