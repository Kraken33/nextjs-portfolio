import { FC } from 'react';

export const Layout = ({ children }: FC) => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
      {children}
    </div>
  );
};
