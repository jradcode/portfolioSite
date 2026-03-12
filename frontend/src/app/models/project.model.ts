//This is the frontend data model for angular. I had to split it into 2 models to save
//it from loading all at the same time and to reduce complexity.

//This will be displayed in the project-card component on the home screen
export interface Project {
  id: number;
  name: string;
  description: string;
  images: string[];
  githubUrl?: string | null; //optional if code is private
  isPrivate: boolean;
  technologies: string[];
  narrative: ProjectNarrative | null; // Use the interface here
}
//This will be displayed on the details page where all the data is shown and zoomed in for better viewing.
export interface ProjectNarrative {
  id: number; // Required for the Shared Primary Key link
  backStory: string;
  designPhilosophy: string;
  technicalChallenges: string;
}
