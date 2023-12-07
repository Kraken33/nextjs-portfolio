import { Icon, IconCode } from '@/components/Icon';

export const SocialNetworks = () => {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      <li className="mr-5 text-xs">
        <a
          className="block hover:text-slate-200"
          href="https://github.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub (opens in a new tab)"
        >
          <span className="sr-only">GitHub</span>
          <Icon code={IconCode.github} />
        </a>
      </li>
      <li className="mr-5 text-xs">
        <a
          className="block hover:text-slate-200"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Instagram (opens in a new tab)"
        >
          <span className="sr-only">Instagram</span>
          <Icon code={IconCode.in} />
        </a>
      </li>
      <li className="mr-5 text-xs">
        <a
          className="block hover:text-slate-200"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn (opens in a new tab)"
        >
          <span className="sr-only">LinkedIn</span>
          <Icon code={IconCode.ln} />
        </a>
      </li>
    </ul>
  );
};
