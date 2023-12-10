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

export type PortfolioData = {
  fullName: string;
  title: string;
  subTitle: string;
  description: string;
  experience: PortfolioExperience[];
  socials: PortfolioSocials[];
};
