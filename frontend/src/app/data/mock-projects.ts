

//now I'm getting the data From C#
import { Project } from '../models/project.model';
//change UserStory to backStory
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
    technologies: ["Angular 19", "Tailwind", "HTML", "Express.js", "Typescript", "JavaScript", "Prisma", "Postgres", "Neon"],

    narrative: {
      backStory: "For a long time I was using React and testing other frontend libraries until Angular had a major breakthrough with Angular 19 which made it more lightweight, so I decided to create a simple test project to learn Angular again and figure it out as it was a harder library.",
      designPhilosophy: "The UI used tailwind as it was a new CSS utility library and wanted something simple and to practice using it. I want a grayish like style to fit a nametag theme.",
      technicalChallenges: "Signals came out for Angular 19 and I wanted to learn how to use them and also just learn Angular itself. When I first was learning Angular which was before React was popular it was hard for me to grasp it as I was used to using template languages. I had to delay learning it and focus on other simpler libraries. I was still learning node.js and the MEAN stack. After this project I learned to love Angular and actually preferred it over React and other libraries."
    }
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
    technologies: ["Angular 21", "TypeScript", "Tailwind", "HTML", "C# ASP.NET Core 10", "EF Core", "Postgres DB", "Neon"],

     narrative: {
      backStory: "I delayed this project for a long time. I was still building other projects to fill my portfolio. I took long breaks to focus on other studies and worked survival jobs. I had long been trying to figure out how I should design this and what technologies I should use. I wanted a website or something to show off my work and expand it later for future clients or employers and to showcase my finished project. I wanted this to be like a journal of sorts.",
      designPhilosophy: "I wanted something simple, so I went with a image gallery or carousel instead of video as videos would take too much resources as I was just starting out and did'nt want to spend a fortune on cloud computing and data. I took a Tailwind and Materialize dark theme as I thought it would he easier to see yet look stylish. This project was design to expand if I wanted to scale my hobby into a larger business. I also wanted it to be easier to add more projects rather than hard coding things in. I wanted a simple admin authentication system so only I can add projects. I also wanted to show off projects that were private that I intended to sell that intended to be my IP.",
      technicalChallenges: "The design I wanted was hard. It took me awhile to figure out how I should structure how I should show off my projects. I need to study other portfolios and also get more experience in web development. For a long time I worked on projects before AI and now AI can give me suggestions or template pages for me so I can focus on  architecture and actually finishing projects. Dealing with images and processing them was hard for me, especially storing it in the backend."
    }
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
    technologies: ["Python", "Flask", "pipenv", "jinja2", "CSS", "HTML",], //change the project to the react one

    narrative: {
      backStory: "I started this app because I had an old car that was in an accident, and I wanted to restore it. I had to research and learn car repair and automotive and to help me learn the various vehicle systems I wanted to create mechanic tracker that tracks the parts and problems with the car. I split it into systems like engine, brakes, suspension, transmission etc.",
      designPhilosophy: "I wanted a comprehensive app that covers as many systems and parts of the car as possible. I focus on 1 car first then maybe later expend it to different cars. However it would be a huge app so I wanted to generalize and appeal to older used cars as they need the most work. I do want to expand the UI to use angular or react as right now it is using the jinja2 template language. I might want to switch  the backend to use Golang instead of Python Flask. Later on I was thinking of turning it into a mobile app.",
      technicalChallenges: "The data would be huge as there's thousands of parts for a car. I needed to do much research and focus on 1 car to make it manageable. The main challenge is how big and complex the data structure will be and how much I'm willing to expand this app."
    }
  }
];