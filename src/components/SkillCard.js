import "./SkillCardStyle.css";

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
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGit,
  SiFigma,
} from "react-icons/si";

export default function SkillCard({ id }) {
  return (
    <section className="skill-container" id={id}>
      <h2 className="skill-header">Technical Stack</h2>

      {/* PRIMARY STACK */}
      <div className="skill-box">
        <h3>Primary Stack</h3>
        <p className="skill-subtext">
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
      </div>

      {/* DATA & ML */}
      <div className="skill-box">
        <h3>Data & Machine Learning</h3>
        <p className="skill-subtext">
          Hands-on experience building data-driven features and models
        </p>
        <div className="skillset">
          <abbr title="Pandas"><SiPandas className="techLogo" /></abbr>
          <abbr title="NumPy"><SiNumpy className="techLogo" /></abbr>
          <abbr title="scikit-learn"><SiScikitlearn className="techLogo" /></abbr>
        </div>
      </div>

      {/* ENGINEERING TOOLS */}
      <div className="skill-box">
        <h3>Engineering Tools</h3>
        <p className="skill-subtext">
          Tools used for API development, testing, and deployment
        </p>
        <div className="skillset">
          <abbr title="Git"><SiGit className="techLogo" /></abbr>
          <abbr title="Docker"><SiDocker className="techLogo" /></abbr>
          <abbr title="Postman"><SiPostman className="techLogo" /></abbr>
          <abbr title="Swagger / OpenAPI"><SiSwagger className="techLogo" /></abbr>
        </div>
      </div>

      {/* DESIGN & PRODUCTIVITY */}
      <div className="skill-box">
        <h3>Design & Productivity</h3>
        <p className="skill-subtext">
          Supporting tools for UI design and developer workflow
        </p>
        <div className="skillset">
          <abbr title="Figma"><SiFigma className="techLogo" /></abbr>
        </div>
      </div>
    </section>
  );
}
