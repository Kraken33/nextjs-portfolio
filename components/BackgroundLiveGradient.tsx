import { useEffect, useRef } from 'react';

export const BackgroundLiveGradient = () => {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!gradientRef.current) return;
      const { clientX, clientY } = ev;
      gradientRef.current.style.setProperty('--x', `${clientX}px`);
      gradientRef.current.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .gradient {
          background-image: radial-gradient(
            circle farthest-side at var(--x, 100px) var(--y, 100px),
            #1a2542 0%,
            transparent 100%
          );
        }
      `}</style>
      <div
        ref={gradientRef}
        className="gradient pointer-events-none fixed inset-0 transition duration-300 h-100vh"
      />
    </>
  );
};
