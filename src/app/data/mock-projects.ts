import { Project } from '../models/project.model';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "person-app",
    description: "A simple CRUD name tag app where you enter a fullName and age.",
   
    images: [
      "assets/images/project1-home.jpg",
      "assets/images/project1-person-form.jpg",
      "assets/images/project1-card.jpg"
    ],
    githubUrl: "https://github.com/jradcode/person-app",
    technologies: ["Angular 19", "Tailwind", "Express.js", "Typescript", "JavaScript", "Prisma", "Postgres", "Neon"]
  },

  {
   id: 2,
    name: "change_csv_file",
    description: "A simple python 3 command line app that converts a CSV file into a organized data file.",
    images: [
      "assets/images/project2-start",
      "assets/images/project2-use.jpg",
      "assets/images/project2-results.jpg"
    ],
    githubUrl: "https://github.com/jradcode/change_csv_file",
    technologies: ["Python 3", "CSV", "command line", "data-science"]
  },
  {
     id: 3,
    name: "video-game-tracker",
    description: "A CRUD app to track video games you passed.",
    images: [
      "assets/images/project3-home",
      "assets/images/project3-details",
      "assets/images/project3-form.jpg"
    ],
    githubUrl: "https://github.com/jradcode/video-game-tracker",
    technologies: ["React.js", "Express.js", "JavaScript", "complex-data"] //change the project to the react one
  }
];