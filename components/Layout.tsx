import { FC, ReactNode } from 'react';

type LayoutComponent = {
  children: ReactNode;
};

export const Layout: FC<LayoutComponent> = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-30">
      {children}
    </div>
  );
};
