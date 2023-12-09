import { Icon, IconCode } from '@/components/Icon';
import { FC, useMemo } from 'react';
import map from 'lodash/fp/map';

type SocialNetworksComponent = {
  list: any[];
};

const socialNetworkLabels = {
  ln: 'LinkedIn',
  ig: 'Instagram',
  github: 'GitHub',
};

export const SocialNetworks: FC<SocialNetworksComponent> = ({ list }) => {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      {useMemo(
        () =>
          map(({ link, name }) => (
            <li className="mr-5 text-xs">
              <a
                className="block hover:text-slate-200"
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${socialNetworkLabels[name]} (opens in a new tab)`}
              >
                <span className="sr-only">{socialNetworkLabels[name]}</span>
                <Icon code={IconCode[name]} />
              </a>
            </li>
          ))(list),
        [list]
      )}
    </ul>
  );
};
