export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Lenguajes",
    skills: ["Java", "JavaScript", "PHP", "Python", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    skills: ["React", "Vite", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Spring Boot", "Node.js", "Express", "REST APIs"],
  },
  {
    category: "Bases de datos",
    skills: ["PostgreSQL", "SQL Server", "Firebase Firestore"],
  },
  {
    category: "Cloud",
    skills: ["AWS Cloud", "Google Cloud", "Vertex AI", "Data Lakes"],
  },
  {
    category: "DevOps / Infra",
    skills: ["Docker", "Docker Compose", "Git", "GitHub", "Cloudflare CDN", "SendGrid"],
  },
  {
    category: "Ciberseguridad",
    skills: ["OWASP Top 10", "Roles-based access", "Criptografía aplicada"],
  },
  {
    category: "Herramientas",
    skills: ["VS Code", "IntelliJ IDEA", "Figma", "Swagger/OpenAPI", "Postman"],
  },
];
