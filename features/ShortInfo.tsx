import { FC } from 'react';

type ShortInfoComponent = {
  fullName: string;
  title: string;
  subTitle: string;
};

export const ShortInfo: FC<ShortInfoComponent> = ({
  fullName,
  title,
  subTitle,
}) => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
        <a href="#">{fullName}</a>
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xs leading-normal">{subTitle}</p>
    </>
  );
};
