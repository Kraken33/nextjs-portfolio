import { Icon, IconCode } from '@/components/Icon';
import { FC, ReactNode, useMemo, memo } from 'react';
import map from 'lodash/fp/map';
import { PortfolioSocials } from '@/types/portfolio';

type SocialNetworksComponent = {
  list: PortfolioSocials[];
};

const socialNetworkLabels = {
  [IconCode.ln]: 'LinkedIn',
  [IconCode.ig]: 'Instagram',
  [IconCode.github]: 'GitHub',
};

export const SocialNetworks: FC<SocialNetworksComponent> = memo(({ list }) => {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      {useMemo(
        () =>
          map<PortfolioSocials, ReactNode>(({ link, name }) => (
            <li key={name} className="mr-5 text-xs">
              <a
                className="block hover:text-slate-200"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${
                  socialNetworkLabels[name as IconCode]
                } (opens in a new tab)`}
              >
                <span className="sr-only">
                  {socialNetworkLabels[name as IconCode]}
                </span>
                <Icon code={IconCode[name as IconCode]} />
              </a>
            </li>
          ))(list),
        [list]
      )}
    </ul>
  );
});
