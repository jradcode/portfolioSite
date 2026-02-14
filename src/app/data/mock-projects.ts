import { Project } from '../models/project.model';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "person-app",
    description: "A simple CRUD name tag app where you enter a fullName and age.",
   
    images: [
      "assets/images/personApp/personAppHomePage.png",
      "assets/images/personApp/personAppAddForm.png",
      "assets/images/personApp/personAppEditForm.png",
      "assets/images/personApp/personAppAboutPage.png"
    ],
    githubUrl: "https://github.com/jradcode/person-app",
    technologies: ["Angular 19", "Tailwind", "HTML", "Express.js", "Typescript", "JavaScript", "Prisma", "Postgres", "Neon"]
  },

  {
   id: 2,
    name: "portfolioSite",
    description: "A simple portfolio website that showcases my projects in a card carousel format and displays my resume and a about page.",
    images: [
      "assets/images/portfolioSite/portfolioSiteHomePage.png",
      "assets/images/portfolioSite/portfolioSiteResumePage.png",
      "assets/images/portfolioSite/portfolioSiteAboutPage.png"
    ],
    githubUrl: "https://github.com/jradcode/portfolioSite",
    technologies: ["Angular 21", "TypeScript", "Tailwind", "HTML", "C# ASP.NET Core 10", "EF Core", "Postgres DB", "Neon"]
  },
  {
     id: 3,
    name: "mechanicTracker",
    description: "A CRUD app to track mechanical repairs for used cars and their issues and parts they need.",
    images: [
      "assets/images/mechanicTracker/mechanicTrackerHomePage.png",
      "assets/images/mechanicTracker/mechanicTrackerAboutPage.png",
      "assets/images/mechanicTracker/mechanicTrackerSystemForm.png",
      "assets/images/mechanicTracker/mechanicTrackerSystemForm2.png",
      "assets/images/mechanicTracker/mechanicTrackerSystemForm3.png"
    ],
    githubUrl: "https://github.com/jradcode/mechanic_Tracker",
    technologies: ["Python", "Flask", "pipenv", "jinja2", "CSS", "HTML",] //change the project to the react one
  }
];