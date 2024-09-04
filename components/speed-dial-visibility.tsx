// components/speed-dial-visibility.tsx
'use client';

import React, { useEffect, useState } from 'react';
import BasicSpeedDial from './speed-dial';

interface SpeedDialVisibilityProps {
  targetId: string; // The ID of the element to observe
}

const SpeedDialVisibility: React.FC<SpeedDialVisibilityProps> = ({ targetId }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry!.isIntersecting);
      },
      {
        threshold: 0.2 // Adjust this threshold as needed
      }
    );

    observer.observe(targetElement);

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [targetId]);

  return <div>{visible && <BasicSpeedDial />}</div>;
};

export default SpeedDialVisibility;
