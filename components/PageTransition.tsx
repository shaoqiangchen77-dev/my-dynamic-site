'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitioning(true);
      setTimeout(() => {
        setDisplayChildren(children);
        setTransitioning(false);
        window.scrollTo(0, 0);
      }, 200);
    }
  }, [children, displayChildren]);

  return (
    <div
      style={{
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      {displayChildren}
    </div>
  );
}
