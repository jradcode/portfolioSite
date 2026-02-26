export interface Project {
  id: number;
  name: string;
  description: string;
  images: string[];
  githubUrl: string;
  technologies: string[];
  narrative: ProjectNarrative | null; // Use the interface here
}
export interface ProjectNarrative {
  id: number; // Required for the Shared Primary Key link
  backStory: string;
  designPhilosophy: string;
  technicalChallenges: string;
}
