export type PortfolioExperience = {
  company: string;
  position: string;
  startedAt: string;
  finishedAt: string;
  description: string;
};

export type PortfolioSocials = {
  name: string;
  link: string;
};

export type PortfolioProjects = {
  name: string;
  description: string;
  techTags: string[];
  image: string;
  href: string;
};

export type PortfolioData = {
  fullName: string;
  title: string;
  subTitle: string;
  description: string;
  experience: PortfolioExperience[];
  socials: PortfolioSocials[];
  projects: PortfolioProjects[];
};
