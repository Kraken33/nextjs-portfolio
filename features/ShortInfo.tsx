import { FC, memo } from 'react';
import { RenderNotionTextBlock } from '@/components/RenderNotionTextBlock';

type ShortInfoComponent = {
  fullName: string;
  title: string;
  subTitle: string;
};

export const ShortInfo: FC<ShortInfoComponent> = memo(
  ({ fullName, title, subTitle }) => {
    return (
      <>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <a href="#">
            <RenderNotionTextBlock block={fullName} />
          </a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          <RenderNotionTextBlock block={title} />
        </h2>
        <p className="mt-4 max-w-xs leading-normal">
          <RenderNotionTextBlock block={subTitle} />
        </p>
      </>
    );
  }
);
