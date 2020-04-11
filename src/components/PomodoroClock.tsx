import * as React from 'react';

import ProgressRing from './ProgressRing';

export default function PomodoroClock() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setProgress(progress + 0.25);
    }, 250);
  });

  return (
    <div>
      <ProgressRing
        radius={200}
        stroke={8}
        progress={progress}
        backgroundColor="#E0E0E0"
        foreGroundColor="#42A5F5"
      >
        <span>12:33</span>
      </ProgressRing>
    </div>
  );
}
