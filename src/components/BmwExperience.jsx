import { useCallback, useEffect, useRef, useState } from 'react';
import { motion as Motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export default function BmwExperience() {
  const { scrollY } = useScroll();
  const [carY, setCarY] = useState(20);
  const [muted, setMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [routeProgress, setRouteProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const carYRef = useRef(20);
  const targetYRef = useRef(20);
  const audioContextRef = useRef(null);
  const engineNodesRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const mutedRef = useRef(true);
  const audioReadyRef = useRef(false);
  const sectionsRef = useRef([]);

  const ensureEngine = useCallback(() => {
    if (engineNodesRef.current) {
      return engineNodesRef.current;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    const context = new AudioContextClass();
    const master = context.createGain();
    const lowOsc = context.createOscillator();
    const highOsc = context.createOscillator();
    const lowGain = context.createGain();
    const highGain = context.createGain();
    const filter = context.createBiquadFilter();

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i += 1) {
      const seed = Math.sin(i * 91.345) * 10000;
      noiseData[i] = (seed - Math.floor(seed) - 0.5) * 0.22;
    }

    const noise = context.createBufferSource();
    const noiseGain = context.createGain();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    lowOsc.type = 'sawtooth';
    highOsc.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.value = 260;
    filter.Q.value = 3;
    lowGain.gain.value = 0.22;
    highGain.gain.value = 0.06;
    noiseGain.gain.value = 0.015;
    master.gain.value = 0;

    lowOsc.connect(lowGain).connect(filter);
    highOsc.connect(highGain).connect(filter);
    noise.connect(noiseGain).connect(filter);
    filter.connect(master).connect(context.destination);

    lowOsc.start();
    highOsc.start();
    noise.start();

    engineNodesRef.current = { context, master, lowOsc, highOsc, filter };
    audioContextRef.current = context;
    return engineNodesRef.current;
  }, []);

  const enableAudio = useCallback(async (forceAudible = false) => {
    const engine = ensureEngine();
    if (!engine) return false;

    if (engine.context.state === 'suspended') {
      await engine.context.resume().catch(() => {});
    }

    const now = engine.context.currentTime;
    const targetGain = forceAudible ? 0.08 : mutedRef.current ? 0 : 0.035;
    engine.master.gain.cancelScheduledValues(now);
    engine.master.gain.setTargetAtTime(targetGain, now, 0.04);
    if (forceAudible) {
      engine.lowOsc.frequency.setTargetAtTime(78, now, 0.03);
      engine.highOsc.frequency.setTargetAtTime(168, now, 0.03);
      engine.filter.frequency.setTargetAtTime(720, now, 0.03);
      scrollSpeedRef.current = Math.max(scrollSpeedRef.current, 0.45);
    }
    audioReadyRef.current = engine.context.state === 'running';
    setAudioReady(engine.context.state === 'running');
    return engine.context.state === 'running';
  }, [ensureEngine]);

  useEffect(() => {
    audioReadyRef.current = audioReady;
    mutedRef.current = muted;

    if (muted && engineNodesRef.current) {
      const { master } = engineNodesRef.current;
      const now = audioContextRef.current.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.linearRampToValueAtTime(0, now + 0.08);
    }

    if (!muted && audioReady && engineNodesRef.current) {
      const { master } = engineNodesRef.current;
      const now = audioContextRef.current.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0.035, now, 0.08);
    }
  }, [muted, audioReady]);

  useEffect(() => {
    let frameId;

    const updateSections = () => {
      sectionsRef.current = [...document.querySelectorAll('main section[id]')];
    };

    const updateTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const maxCarTravel = Math.max(window.innerHeight - 172, 20);
      targetYRef.current = 20 + progress * (maxCarTravel - 20);

      const scrollDelta = Math.abs(window.scrollY - lastScrollYRef.current);
      lastScrollYRef.current = window.scrollY;
      scrollSpeedRef.current = Math.min(scrollSpeedRef.current + scrollDelta * 0.12, 1);
      setRouteProgress(Math.round(progress * 100));

      const currentMarker = window.scrollY + window.innerHeight * 0.35;
      const currentSection = sectionsRef.current.findLast((section) => {
        return currentMarker >= section.offsetTop;
      });
      if (currentSection?.id) {
        setActiveSection(currentSection.id);
      }
    };

    const animate = () => {
      carYRef.current += (targetYRef.current - carYRef.current) * 0.055;
      scrollSpeedRef.current *= 0.92;
      setCarY(carYRef.current);
      setSpeed(Math.round(18 + scrollSpeedRef.current * 142));

      const engine = engineNodesRef.current;
      if (engine && audioReadyRef.current) {
        const now = engine.context.currentTime;
        const rev = Math.min(scrollSpeedRef.current, 1);
        const targetVolume = mutedRef.current ? 0 : 0.035 + rev * 0.16;
        engine.master.gain.setTargetAtTime(targetVolume, now, 0.05);
        engine.lowOsc.frequency.setTargetAtTime(42 + rev * 80, now, 0.05);
        engine.highOsc.frequency.setTargetAtTime(84 + rev * 155, now, 0.05);
        engine.filter.frequency.setTargetAtTime(220 + rev * 780, now, 0.05);
      }

      frameId = requestAnimationFrame(animate);
    };

    lastScrollYRef.current = window.scrollY;
    updateSections();
    updateTarget();
    animate();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);
    window.addEventListener('resize', updateSections);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('resize', updateSections);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
      engineNodesRef.current = null;
    };
  }, []);

  // Track how fast the user is scrolling for physics effects
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Residue trails stretch opposite the scroll direction and fade when the page settles.
  const trailScaleY = useTransform(smoothVelocity, (velocity) => {
    return Math.min(Math.abs(velocity) / 950, 1.6);
  });
  const trailBlur = useTransform(smoothVelocity, (velocity) => {
    return `blur(${Math.min(Math.abs(velocity) / 220, 10)}px)`;
  });
  const upwardTrailOpacity = useTransform(smoothVelocity, [0, 200, 1200], [0, 0.35, 0.9]);
  const downwardTrailOpacity = useTransform(smoothVelocity, [-1200, -200, 0], [0.9, 0.35, 0]);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0,
      right: 'clamp(4px, 1vw, 14px)',
      bottom: 0,
      width: '156px', 
      pointerEvents: 'none', 
      zIndex: 50,
    }}>
      <div className="car-dashboard">
        <div className="car-dashboard-top">
          <span>Route</span>
          <strong>{routeProgress}%</strong>
        </div>
        <div className="car-dashboard-bar">
          <span style={{ width: `${routeProgress}%` }}></span>
        </div>
        <div className="car-dashboard-speed">
          <strong>{speed}</strong>
          <span>km/h</span>
        </div>
        <div className="car-dashboard-section">{activeSection.replace('-', ' ')}</div>
      </div>
      <button
        className="car-sound-toggle"
        type="button"
        onClick={async () => {
          if (muted) {
            mutedRef.current = false;
            await enableAudio(true);
            setMuted(false);
            return;
          }
          mutedRef.current = true;
          setMuted(true);
        }}
        aria-label={muted ? 'Turn car sound on' : 'Turn car sound off'}
        aria-pressed={!muted && audioReady}
      >
        {muted ? 'Sound on' : 'Sound off'}
      </button>
      
      <Motion.div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: '44px',
          y: carY,
          width: '96px',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        
        {/* Velocity residue while scrolling down */}
        <Motion.div 
          style={{
            position: 'absolute',
            top: '-120px',
            width: '28px',
            height: '140px',
            opacity: upwardTrailOpacity,
            scaleY: trailScaleY,
            filter: trailBlur,
            transformOrigin: 'bottom center',
            background: 'linear-gradient(to top, rgba(244, 241, 232, 0.08), rgba(196, 240, 66, 0.24), transparent)',
            borderRadius: '999px',
            zIndex: 1
          }}
        />

        {/* Velocity residue while scrolling up */}
        <Motion.div 
          style={{
            position: 'absolute',
            top: '68px',
            width: '28px',
            height: '140px',
            opacity: downwardTrailOpacity,
            scaleY: trailScaleY,
            filter: trailBlur,
            transformOrigin: 'top center',
            background: 'linear-gradient(to bottom, rgba(244, 241, 232, 0.08), rgba(196, 240, 66, 0.24), transparent)',
            borderRadius: '999px',
            zIndex: 1
          }}
        />

        <Motion.div style={{ zIndex: 2 }}>
          <img 
            src="/car-top.svg"
            alt="Top down sports car"
            style={{
              width: '82px',
              transform: 'rotate(180deg)',
              filter: 'drop-shadow(0px -12px 18px rgba(0,0,0,0.55))'
            }}
          />
        </Motion.div>

      </Motion.div>
      
    </div>
  );
}
