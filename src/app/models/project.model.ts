export interface Project {
  id: number; //id for indexing
  name: string;  //name of project
  description: string; //brief description of project
  images: string[];   //images of various pages of project in carasel html format
  githubUrl: string; //link to the specific github repo of project
  technologies: string[]; //list of technologies used in project
}