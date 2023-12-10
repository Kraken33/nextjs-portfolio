import { FC, memo, ReactNode } from 'react';
import map from 'lodash/fp/map';
import { NavigationSections } from '@/types/navigation';

export type NavigationComponent = {
  activeKey: NavigationSections;
};

export const Navigation: FC<NavigationComponent> = memo(({ activeKey }) => {
  const navigationItems = [
    NavigationSections.about,
    NavigationSections.experience,
    NavigationSections.projects,
  ];
  const getClassNames = ({
    key,
    activeKey,
    activeClassNames,
    inActiveClassNames,
  }: {
    key: NavigationSections;
    activeKey: NavigationSections;
    activeClassNames: string;
    inActiveClassNames: string;
  }) => {
    return activeKey === key ? activeClassNames : inActiveClassNames;
  };
  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {map<NavigationSections, ReactNode>((key) => (
          <li>
            <a className="group flex items-center py-3 active" href={`#${key}`}>
              <span
                className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 motion-reduce:transition-none ${getClassNames(
                  {
                    key,
                    activeKey,
                    activeClassNames: 'bg-slate-200 w-16',
                    inActiveClassNames: 'w-8 bg-slate-600',
                  }
                )}`}
              ></span>
              <span
                className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 ${getClassNames(
                  {
                    key,
                    activeKey,
                    activeClassNames: 'text-slate-200',
                    inActiveClassNames: 'text-slate-600',
                  }
                )}`}
              >
                {key}
              </span>
            </a>
          </li>
        ))(navigationItems)}
      </ul>
    </nav>
  );
});
