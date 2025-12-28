import "./SkillCardStyle.css";
import { GlowingCards, GlowingCard } from "./ui/GlowingCards";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFastapi,
  SiMysql,
  SiDocker,
  SiPostman,
  SiSwagger,
  SiGit,
  SiFigma,
  SiKubernetes,
  SiAmazonaws,
  SiNotion,
  SiSlack,
  SiVercel,
  SiVisualstudiocode,
  SiLinux,
} from "react-icons/si";

export default function SkillCard({ id }) {
  return (
    <section className="skill-container" id={id}>
      <h2 className="skill-header">Technical Stack</h2>

      <GlowingCards
        enableGlow={true}
        glowRadius={300}
        glowOpacity={0.9}
        animationDuration={400}
        gap="3rem"
        padding="3rem 2rem"
      >
        {/* PRIMARY STACK */}
        <GlowingCard glowColor="#61DAFB">
          <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Primary Stack</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Technologies I use to build and ship full-stack products
          </p>
          <div className="skillset">
            <abbr title="Python"><SiPython className="techLogo" /></abbr>
            <abbr title="JavaScript"><SiJavascript className="techLogo" /></abbr>
            <abbr title="TypeScript"><SiTypescript className="techLogo" /></abbr>
            <abbr title="React"><SiReact className="techLogo" /></abbr>
            <abbr title="FastAPI"><SiFastapi className="techLogo" /></abbr>
            <abbr title="SQL / MySQL"><SiMysql className="techLogo" /></abbr>
          </div>
        </GlowingCard>

        {/* ENGINEERING TOOLS */}
        <GlowingCard glowColor="#2496ED">
          <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Engineering Tools</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Tools used for API development, testing, and deployment
          </p>
          <div className="skillset">
            <abbr title="Git"><SiGit className="techLogo" /></abbr>
            <abbr title="Docker"><SiDocker className="techLogo" /></abbr>
            <abbr title="Postman"><SiPostman className="techLogo" /></abbr>
            <abbr title="Swagger / OpenAPI"><SiSwagger className="techLogo" /></abbr>
            <abbr title="Kubernetes"><SiKubernetes className="techLogo" /></abbr>
            <abbr title="AWS"><SiAmazonaws className="techLogo" /></abbr>
          </div>
        </GlowingCard>

        {/* DESIGN & PRODUCTIVITY */}
        <GlowingCard glowColor="#F24E1E">
          <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Design & Productivity</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Supporting tools for UI design and developer workflow
          </p>
          <div className="skillset">
            <abbr title="Figma"><SiFigma className="techLogo" /></abbr>
            <abbr title="Notion"><SiNotion className="techLogo" /></abbr>
            <abbr title="Slack"><SiSlack className="techLogo" /></abbr>
            <abbr title="Vercel"><SiVercel className="techLogo" /></abbr>
            <abbr title="VS Code"><SiVisualstudiocode className="techLogo" /></abbr>
            <abbr title="Linux"><SiLinux className="techLogo" /></abbr>
          </div>
        </GlowingCard>
      </GlowingCards>
    </section>
  );
}
