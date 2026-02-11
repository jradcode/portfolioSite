import { Project } from '../models/project.model';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "person-app",
    description: "A simple CRUD name tag app where you enter a fullName and age.",
   
    images: [
      "assets/images/personAppHomePage.png",
      "assets/images/personAppAddForm.png",
      "assets/images/personAppEditForm.png",
      "assets/images/personAppAboutPage.png"
    ],
    githubUrl: "https://github.com/jradcode/person-app",
    technologies: ["Angular 19", "Tailwind", "Express.js", "Typescript", "JavaScript", "Prisma", "Postgres", "Neon"]
  },

  {
   id: 2,
    name: "portfolioSite",
    description: "A simple portfolio website that showcases my projects in a card carousel format and displays my resume and a about page.",
    images: [
      "assets/images/portfolioSiteHomePage.png",
      "assets/images/portfolioSiteResumePage.png",
      "assets/images/portfolioSiteAboutPage.png"
    ],
    githubUrl: "https://github.com/jradcode/portfolioSite",
    technologies: ["Angular 21", "TypeScript", "Tailwind", "HTML", "C# ASP.NET Core 10", "EF Core", "Postgres DB", "Neon"]
  },
  {
     id: 3,
    name: "video-game-tracker",
    description: "A CRUD app to track video games you passed.",
    images: [
      "assets/images/project3-home.jpg",
      "assets/images/project3-details.jpg",
      "assets/images/project3-form.jpg"
    ],
    githubUrl: "https://github.com/jradcode/video-game-tracker",
    technologies: ["React.js", "Express.js", "JavaScript", "Pillow"] //change the project to the react one
  }
];