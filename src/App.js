import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import RippleLoader from "./components/ui/RippleLoader";
import { FaReact } from "react-icons/fa";
import useMobileRedirect from "./hooks/useMobileRedirect";
import LazyRender from "./components/utils/LazyRender";
import useFirstInteraction from "./hooks/useFirstInteraction";

// Lazy load heavy components
const AboutMe = lazy(() => import("./components/AboutMe"));
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

  // "True" lazy loading: Wait for user to actually do something before mounting heavy 3D stuff
  const hasInteracted = useFirstInteraction();

  useEffect(() => {
    // Check for device capabilities
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
      // Default to 4 if unknown
      const coreCount = navigator.hardwareConcurrency || 4;

      // Tier 3: Low Performance (Mobile, Tablets, Low-end Laptops)
      // Downgraded criteria: Even 4 cores might be weak mobile chips.
      if (isMobile || isSmallScreen || coreCount < 4) {
        setPerformanceTier('low');
      }
      // Tier 2: Medium Performance (Average Ultrabooks)
      // 4-6 cores usually means i5/i7 U-series or M1 Air
      else if (coreCount <= 6) {
        setPerformanceTier('medium');
      }
      // Tier 1: High Performance (Workstations, Gaming)
      else {
        setPerformanceTier('high');
      }
    };

    checkPerformance();

    // Reduced loading time to 2 seconds as requested
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
        {/* Smokey Cursor Effect - Gated by Interaction + High Tier Only */}
        {/* We disable this on 'low' AND 'medium' tiers to prioritize smooth scrolling for average users */}
        {hasInteracted && performanceTier === 'high' && (
          <SmokeyCursor
            simulationResolution={128}
            dyeResolution={1024}
            captureResolution={512}
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
        {/* 3D Background - Gated by Interaction */}
        {hasInteracted && performanceTier !== 'low' && (
          <div className="spline-background fade-in" style={{ opacity: 1 }}>
            <Spline scene="https://prod.spline.design/c1CILr5VqKGYhoDt/scene.splinecode" />
          </div>
        )}
      </Suspense>

      <Suspense fallback={null}>
        {/* Custom Cursor - Gated by Interaction */}
        {hasInteracted && (
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
              'a', 'input[type="text"]', 'input[type="email"]', 'input[type="number"]',
              'input[type="submit"]', 'input[type="image"]', 'label[for]', 'select',
              'textarea', 'button', '.link'
            ]}
          />
        )}
      </Suspense>

      {/* Main Content */}
      <main className="main-content">
        <Navbar />
        {/* HomeBanner is critical LCP element - Render immediately */}
        <HomeBanner id="home" />

        {/* ================= PROJECTS ================= */}

        {/* Defer loading entirely until near viewport */}
        <LazyRender rootMargin="400px" fallback={<div style={{ height: '800px' }} />}>
          <Suspense fallback={<div style={{ height: '800px' }} />}>
            <ScrollPlanes
              id="project"
            />
          </Suspense>
        </LazyRender>

        {/* ================= SECTIONS ================= */}

        <LazyRender rootMargin="200px" fallback={<div style={{ height: '400px' }} />}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <AboutMe id="about" />
          </Suspense>
        </LazyRender>

        <LazyRender rootMargin="200px" fallback={<div style={{ height: '400px' }} />}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <SkillCard id="skills" />
          </Suspense>
        </LazyRender>

        <LazyRender rootMargin="200px" fallback={<div style={{ height: '400px' }} />}>
          <Suspense fallback={<div style={{ height: '400px' }} />}>
            <ContactForm id="contact" />
          </Suspense>
        </LazyRender>

        <LazyRender rootMargin="100px" fallback={<div style={{ height: '100px' }} />}>
          <Suspense fallback={<div style={{ height: '100px' }} />}>
            <Footer />
          </Suspense>
        </LazyRender>
      </main>
    </>
  );
}

export default App;
