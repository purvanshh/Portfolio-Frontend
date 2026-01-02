import "./SkillCardStyle.css";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFastapi,
  SiDocker,
  SiPostman,
  SiSwagger,
  SiGit,
  SiFigma,
  SiKubernetes,
  SiNotion,
  SiSlack,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";

export default function SkillCard({ id }) {
  const skillCategories = [
    {
      title: "Primary Stack",
      description: "Technologies I use to build and ship full-stack products",
      skills: [
        { icon: SiPython, name: "Python" },
        { icon: SiJavascript, name: "JavaScript" },
        { icon: SiTypescript, name: "TypeScript" },
        { icon: SiReact, name: "React" },
        { icon: SiFastapi, name: "FastAPI" },
      ],
    },
    {
      title: "Engineering Tools",
      description: "Tools used for API development, testing, and deployment",
      skills: [
        { icon: SiGit, name: "Git" },
        { icon: SiDocker, name: "Docker" },
        { icon: SiPostman, name: "Postman" },
        { icon: SiSwagger, name: "Swagger" },
        { icon: SiKubernetes, name: "Kubernetes" },
      ],
    },
    {
      title: "Design & Productivity",
      description: "Supporting tools for UI design and developer workflow",
      skills: [
        { icon: SiFigma, name: "Figma" },
        { icon: SiNotion, name: "Notion" },
        { icon: SiSlack, name: "Slack" },
        { icon: SiVercel, name: "Vercel" },
        { icon: SiVisualstudiocode, name: "VS Code" },
      ],
    },
  ];

  return (
    <section className="skill-container" id={id}>
      <h2 className="skill-header">Technical Stack</h2>

      <div className="skills-grid">
        {skillCategories.map((category, categoryIndex) => (
          <div className="skill-column" key={categoryIndex}>
            <h3 className="skill-category-title">{category.title}</h3>
            <p className="skill-category-description">{category.description}</p>
            <div className="skill-tiles">
              {category.skills.map((skill, skillIndex) => (
                <div className="skill-tile" key={skillIndex}>
                  <skill.icon className="skill-icon" />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
