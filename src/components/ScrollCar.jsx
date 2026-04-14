import { useState, useEffect } from 'react';

export default function ScrollCar() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topPos = progress * (window.innerHeight - 120);
  const wheelSpin = progress * 3600; // degrees

  return (
    <div 
      className="scroll-car-container"
      style={{ 
        position: 'fixed', 
        right: '25px', 
        top: `${topPos}px`,
        zIndex: 50,
        transition: 'top 0.15s ease-out',
        pointerEvents: 'none',
      }}
    >
      <div className="car-body">
        {/* Car top / cabin */}
        <div className="car-cabin"></div>
        {/* Windows */}
        <div className="car-window car-window-front"></div>
        <div className="car-window car-window-back"></div>
        {/* Main body */}
        <div className="car-main"></div>
        {/* Headlight */}
        <div className="car-headlight"></div>
        {/* Taillight */}
        <div className="car-taillight"></div>
        {/* Bumper */}
        <div className="car-bumper-front"></div>
        <div className="car-bumper-back"></div>
        {/* Wheels */}
        <div className="car-wheel car-wheel-front" style={{ transform: `rotate(${wheelSpin}deg)` }}>
          <div className="car-wheel-hub"></div>
        </div>
        <div className="car-wheel car-wheel-back" style={{ transform: `rotate(${wheelSpin}deg)` }}>
          <div className="car-wheel-hub"></div>
        </div>
        {/* Ground shadow */}
        <div className="car-shadow"></div>
        {/* Exhaust particles */}
        <div className="car-exhaust">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}
