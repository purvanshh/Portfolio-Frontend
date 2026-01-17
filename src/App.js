import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
const AboutMe = lazy(() => import("./components/AboutMe"));
import RippleLoader from "./components/ui/RippleLoader";
import { FaReact } from "react-icons/fa";
import { projects } from './lib/projects';
import useMobileRedirect from "./hooks/useMobileRedirect";

// Lazy load heavy components
const SkillCard = lazy(() => import("./components/SkillCard"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Footer = lazy(() => import("./components/Footer"));
const AnimatedCursor = lazy(() => import("react-animated-cursor"));
const Spline = lazy(() => import('./components/ui/Spline'));
const SmokeyCursor = lazy(() => import("./components/ui/SmokeyCursor"));
const ScrollPlanes = lazy(() => import("./components/ui/ScrollPlanes"));


function App() {
  useMobileRedirect();
  const [isLoading, setIsLoading] = useState(true);
  const [performanceTier, setPerformanceTier] = useState('high'); // 'high', 'medium', 'low'

  useEffect(() => {
    // Check for device capabilities
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      // Default to 4 if unknown, which puts it in 'medium' tier safely
      const coreCount = navigator.hardwareConcurrency || 4;

      // Tier 3: Low Performance (Mobile or very weak hardware)
      if (isMobile || isSmallScreen || coreCount < 4) {
        setPerformanceTier('low');
      }
      // Tier 2: Medium Performance (Average laptops, dual-core with hyperthreading, etc.)
      else if (coreCount <= 6) {
        setPerformanceTier('medium');
      }
      // Tier 1: High Performance (Gaming rigs, powerful work laptops)
      else {
        setPerformanceTier('high');
      }
    };

    checkPerformance();

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
          Optimizing experience for your device...
        </p>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        {/* Smokey Cursor Effect - Adaptive Quality */}
        {performanceTier !== 'low' && (
          <SmokeyCursor
            simulationResolution={performanceTier === 'high' ? 128 : 64}
            dyeResolution={performanceTier === 'high' ? 1024 : 512}
            captureResolution={performanceTier === 'high' ? 512 : 256}
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
        {performanceTier !== 'low' && (
          <div className="spline-background fade-in" style={{ opacity: 1 }}>
            <Spline scene="https://prod.spline.design/c1CILr5VqKGYhoDt/scene.splinecode" />
          </div>
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
      <main className="main-content">
        <Navbar />
        <HomeBanner id="home" />

        {/* ================= PROJECTS ================= */}

        <Suspense fallback={<div style={{ height: '500px' }} />}>
          <ScrollPlanes
            id="project"
            projects={projects}
          />
        </Suspense>

        {/* ================= SECTIONS ================= */}

        <Suspense fallback={<div style={{ height: '500px' }} />}>
          <AboutMe id="about" />
        </Suspense>
        <Suspense fallback={<div style={{ height: '300px' }} />}>
          <SkillCard id="skills" />
        </Suspense>
        <Suspense fallback={<div style={{ height: '300px' }} />}>
          <ContactForm id="contact" />
        </Suspense>
        <Suspense fallback={<div style={{ height: '100px' }} />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
