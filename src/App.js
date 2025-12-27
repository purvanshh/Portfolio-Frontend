import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeBanner from "./components/HomeBanner";
import ProjectCard from './components/ProjectCard'
import AboutMe from './components/AboutMe'
import SkillCard from './components/SkillCard'
import ContactForm from './components/ContactForm'
import AnimatedCursor from "react-animated-cursor"
import SplineErrorBoundary from "./components/SplineErrorBoundary";
function App() {


  return (
    <>
      <SplineErrorBoundary>
        <div className="spline-background fade-in" style={{ opacity: 1 }}>
          <spline-viewer url="https://prod.spline.design/c1CILr5VqKGYhoDt/scene.splinecode"></spline-viewer>
        </div>
      </SplineErrorBoundary>

      <AnimatedCursor
        color="#fff"
        innerSize={8}
        outerSize={50}
        innerScale={1}
        outerScale={2.2}
        outerAlpha={0}
        outerStyle={{
          background: '#ffffff',
          mixBlendMode: 'exclusion'
        }}
        innerStyle={{
          backgroundColor: '#F94892'
        }}
      />
      <div className="main-content">
        <Navbar />
        <HomeBanner id="home" />

        {/* PROJECTS */}
        <ProjectCard
          id="project"
          className="even"
          projectTitle="Dental Wellness"
          projectDesc="A premium dental clinic landing page featuring a floating 3D tooth model, smooth scroll animations, glassmorphism UI elements, and a refined teal-white color palette. Showcases treatments, patient testimonials, and team profiles with elegant typography."
          projectLink="https://github.com/purvanshh/dentist-landing"
          deployedProjectLink="https://dentist-landing-brch.vercel.app/"
          projectImg={require('./images/image.png')}
        />

        <ProjectCard
          className="odd"
          projectTitle="ARKO - Luxury Real Estate & Architecture"
          projectDesc="A premium, modern real estate website showcasing luxury properties with elegant design and smooth animations."
          projectLink="https://github.com/purvanshh/real-estate"
          deployedProjectLink="https://real-estate-pied-ten.vercel.app/"
          projectImg={require('./images/Real_Estate.jpeg')}
        />

        <ProjectCard
          className="even"
          projectTitle="Artisan Bakery"
          projectDesc="A premium, modern landing page for an artisan bakery featuring stunning 3D Three.js visuals with floating bread animation, GSAP-powered smooth scroll animations, gooey text morphing effects, and a responsive design with a warm, elegant aesthetic."
          projectLink="https://github.com/purvanshh/bakery-landing"
          deployedProjectLink="https://bakery-landing-one.vercel.app/"
          projectImg={require('./images/SCR-20251226-tgod.png')}
        />

        <ProjectCard
          className="odd"
          projectTitle="Épicurien"
          projectDesc="A luxury fine dining landing page featuring 3D Three.js floating golden chalice, 36 animated SVG background paths with Framer Motion, GSAP ScrollTrigger reveals, and a sophisticated gold-on-charcoal design system with premium typography."
          projectLink="https://github.com/purvanshh/restaurant-landing"
          deployedProjectLink="https://restaurant-landing-kappa.vercel.app"
          projectImg={require('./images/Restaurant.png')}
        />

        <ProjectCard
          className="even"
          projectTitle="BrainWave"
          projectDesc="Modern UI/UX showcase implementing responsive layouts, smooth animations, and clean component structure. Built as a design-focused project to explore modern frontend patterns and visual polish."
          projectLink="https://github.com/purvanshh/BrainWave"
          deployedProjectLink="https://brainwave-iota-ten.vercel.app/"
          projectImg={require('./images/brainwave.png')}
        />

        <AboutMe id='about' />
        <SkillCard id='skills' />
        <ContactForm id='contact' />
        <Footer />
      </div>
    </>
  );
}

export default App;