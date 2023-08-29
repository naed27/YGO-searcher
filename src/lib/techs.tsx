/* eslint-disable no-unused-vars */

import { Icons } from "@/components/ui/Icons";
import { LucideProps } from "lucide-react";

export interface Tech {
  id: string,
  name: string,
  description: string,
  yearsExperience: number,
  logo: (props: LucideProps) => JSX.Element;
}

export const techs: Record<string, Tech> = {
  "html": {
    id: "html",
    name: "HTML",
    description: "The standard language for creating web page structure and content.",
    yearsExperience: 5,
    logo: Icons["html"]
  },
  "css": {
    id: "css",
    name: "CSS",
    description: "Used for styling for web pages, including layout, colors, and fonts.",
    yearsExperience: 5,
    logo: Icons["css"]
  },
  "javascript": {
    id: "javascript",
    name: "JavaScript",
    description: "A versatile language for interactive and dynamic web behavior.",
    yearsExperience: 4,
    logo: Icons["javascript"]
  },
  "typescript": {
    id: "typescript",
    name: "TypeScript",
    description: "Enhances JavaScript with static typing and other features",
    yearsExperience: 3,
    logo: Icons["typescript"]
  },
  "reactjs": {
    id: "reactjs",
    name: "React",
    description: "A popular library for reusable UI components.",
    yearsExperience: 3,
    logo: Icons["reactjs"]
  },
  "nextjs": {
    id: "nextjs",
    name: "Next",
    description: "A framework with server-side rendering and powerful features for web apps.",
    yearsExperience: 3,
    logo: Icons["nextjs"]
  },
  "tailwind": {
    id: "tailwind",
    name: "Tailwind",
    description: "A rapid UI development framework with pre-defined utility classes.",
    yearsExperience: 2,
    logo: Icons["tailwind"]
  },
  "tanstack": {
    id: "tanstack",
    name: "TanStack Query",
    description: "A data-fetching library for React, simplifying fetching, caching, and synchronization.",
    yearsExperience: 2,
    logo: Icons["tanstack"]
  },
  "nodejs": {
    id: "nodejs",
    name: "Node",
    description: "A JavaScript runtime for running code outside of a web browser.",
    yearsExperience: 3,
    logo: Icons["nodejs"]
  },
  "mysql": {
    id: "mysql",
    name: "MySQL",
    description: "A relational database for storing and retrieving data.",
    yearsExperience: 4,
    logo: Icons["mysql"]
  },
  "sass": {
    id: "sass",
    name: "Sass",
    description: "A CSS preprocessor with variables, nesting, and mixins. ",
    yearsExperience: 3,
    logo: Icons["sass"]
  },
  "git": {
    id: "git",
    name: "Git",
    description: "A version control system for collaboration, and source code management.",
    yearsExperience: 4,
    logo: Icons["git"]
  },
}
