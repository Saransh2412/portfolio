import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaExternalLinkAlt, FaFileDownload, FaTrophy, FaRobot, FaDatabase, FaServer, FaCogs, FaInstagram } from 'react-icons/fa';
import { SiCplusplus, SiPython, SiJavascript, SiMysql, SiReact, SiNodedotjs, SiExpress, SiDocker, SiGnubash, SiGit, SiOpenai, SiHtml5, SiCss, SiGithub, SiPostman, SiVercel, SiRender, SiRailway, SiHuggingface } from 'react-icons/si';
import AnimatedSection from './components/AnimatedSection';
import AmbientBackground from './components/AmbientBackground';
import BmwExperience from './components/BmwExperience';

const journeyItems = [
  {
    title: 'Student',
    meta: 'Bennett University | 2023 - 2027',
    points: [
      'B.Tech in Computer Science and Engineering with a 9.28 CGPA.',
      'Relevant coursework includes Operating Systems, DSA, Algorithms, AI, ML, and DBMS.',
      'Solved 500+ DSA problems across multiple platforms.',
    ],
  },
  {
    title: 'Freelance Developer',
    meta: 'X Transport (Canada) | 07/2025 - 08/2025',
    points: [
      'Built a responsive React.js frontend for freight quote workflows.',
      'Developed backend APIs with Node.js and Express.js.',
      'Added automated email notifications using Nodemailer and delivered a working MVP in 14 days.',
    ],
  },
  {
    title: 'SDE Intern',
    meta: 'Solutioneers Infotech | 06/2025 - 07/2025',
    points: [
      'Worked on a backend voice agent for real-time conversations.',
      'Implemented WebSocket-based audio streaming for bidirectional voice communication.',
      'Integrated speech-to-text, LLM response generation, text-to-speech, intent extraction, and fallback handling.',
      'Refined audio chunk handling to improve voice pipeline reliability.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: <SiPython />, color: '#3776ab' },
      { name: 'C++', icon: <SiCplusplus />, color: '#00599c' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'SQL', icon: <FaDatabase />, color: '#4db6ac' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: <SiReact />, color: '#61dafb' },
      { name: 'Tailwind CSS', icon: <FaCode />, color: '#06b6d4' },
      { name: 'HTML', icon: <SiHtml5 />, color: '#e34f26' },
      { name: 'CSS', icon: <SiCss />, color: '#1572b6' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#5fa04e' },
      { name: 'Express.js', icon: <SiExpress />, color: '#ffffff' },
      { name: 'WebSockets', icon: <FaServer />, color: '#c4f042' },
      { name: 'Nodemailer', icon: <FaEnvelope />, color: '#ea4335' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479a1' },
      { name: 'Google Sheets', icon: <FaDatabase />, color: '#34a853' },
    ],
  },
  {
    title: 'Cloud',
    skills: [
      { name: 'Docker', icon: <SiDocker />, color: '#2496ed' },
      { name: 'Vercel', icon: <SiVercel />, color: '#ffffff' },
      { name: 'Cloudflare Tunnel', icon: <FaServer />, color: '#f38020' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
      { name: 'n8n', icon: <FaCogs />, color: '#ea4b71' },
      { name: 'Clerk', icon: <FaCogs />, color: '#6c47ff' },
      { name: 'VS Code', icon: <FaCode />, color: '#007acc' },
      { name: 'IntelliJ', icon: <FaCode />, color: '#ff2d55' },
    ],
  },
];

function App() {
  const [lcData, setLcData] = useState(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIntroDone(true);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.body.style.overflowY = introDone ? '' : 'hidden';
    return () => {
      document.body.style.overflowY = '';
    };
  }, [introDone]);

  // Fetch live LeetCode statistics and avoid showing invented fallback values.
  useEffect(() => {
    const username = 'Saranshsethi';

    const setNormalizedData = (data) => {
      if (!data) return false;

      if (
        typeof data.easySolved === 'number' &&
        typeof data.mediumSolved === 'number' &&
        typeof data.hardSolved === 'number'
      ) {
        setLcData({
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          totalSolved:
            typeof data.totalSolved === 'number'
              ? data.totalSolved
              : data.easySolved + data.mediumSolved + data.hardSolved,
        });
        return true;
      }

      const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum;
      if (!Array.isArray(stats)) return false;

      const easySolved = stats.find((item) => item.difficulty === 'Easy')?.count ?? 0;
      const mediumSolved = stats.find((item) => item.difficulty === 'Medium')?.count ?? 0;
      const hardSolved = stats.find((item) => item.difficulty === 'Hard')?.count ?? 0;

      setLcData({
        easySolved,
        mediumSolved,
        hardSolved,
        totalSolved: easySolved + mediumSolved + hardSolved,
      });
      return true;
    };

    const fetchLeetCodeData = async () => {
      try {
        const graphQlResponse = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query userProfileCalendar($username: String!) {
                matchedUser(username: $username) {
                  submitStats {
                    acSubmissionNum {
                      difficulty
                      count
                    }
                  }
                }
              }
            `,
            variables: { username },
          }),
        });

        if (graphQlResponse.ok) {
          const graphQlData = await graphQlResponse.json();
          if (setNormalizedData(graphQlData)) {
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching LeetCode GraphQL data:', error);
      }

      try {
        const fallbackResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (!fallbackResponse.ok) {
          throw new Error(`Fallback API returned ${fallbackResponse.status}`);
        }
        const fallbackData = await fallbackResponse.json();
        setNormalizedData(fallbackData);
      } catch (error) {
        console.error('Error fetching LeetCode fallback data:', error);
      } finally {
        setLcLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  const easySolved = lcData?.easySolved ?? null;
  const mediumSolved = lcData?.mediumSolved ?? null;
  const hardSolved = lcData?.hardSolved ?? null;
  const totalSolved = lcData?.totalSolved ?? null;
  const easyWidth = totalSolved ? (easySolved / totalSolved) * 100 : 0;
  const mediumWidth = totalSolved ? (mediumSolved / totalSolved) * 100 : 0;
  const hardWidth = totalSolved ? (hardSolved / totalSolved) * 100 : 0;

  // Scroll-reveal for timeline items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Scroll-driven timeline line growth
  useEffect(() => {
    const handleScroll = () => {
      const timeline = document.querySelector('.timeline');
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const timelineTop = rect.top + window.scrollY;
      const timelineHeight = rect.height;
      const scrolled = window.scrollY + window.innerHeight - timelineTop;
      const progress = Math.min(Math.max(scrolled / timelineHeight, 0), 1);
      timeline.style.setProperty('--line-progress', progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!introDone && (
        <Motion.div
          className="intro-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="intro-grid"></div>
          <Motion.div
            className="intro-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="intro-kicker">Saransh Sethi</span>
            <h1>Systems that move.</h1>
            <p>Loading rooftop mode</p>
          </Motion.div>
          <Motion.div
            className="intro-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </Motion.div>
      )}
      <AmbientBackground />
      {/* High-End BMW Scroll Experience moved to root for accurate scroll tracking */}
      <BmwExperience />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation */}
        <nav className="glass-nav">
          <div className="nav-content">
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Featured Work</a>
              <a href="#skills">Tech Stack</a>
              <a href="#achievements">Achievements</a>
              <a href="#contact">Contact</a>
              <a href="/resume.pdf" target="_blank" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                <FaFileDownload /> Resume
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero" id="about">
          <Motion.div
            className="hero-watermark"
            aria-hidden="true"
            initial={{ opacity: 0, y: 40 }}
            animate={introDone ? { opacity: 0.55, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            SARANSH
          </Motion.div>
          <Motion.div
            className="hero-portrait"
            aria-hidden="true"
            initial={{ opacity: 0, x: 80, rotate: 3 }}
            animate={introDone ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 80, rotate: 3 }}
            transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          >
            <div className="hero-portrait-label">01 / Rooftop</div>
            <img src="/hero-saransh-rooftop.jpg" alt="" />
          </Motion.div>
          <Motion.div
            className="hero-note"
            aria-hidden="true"
            initial={{ opacity: 0, y: 24 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          >
            <span className="hero-note-label">Currently into</span>
            <p>systems, backend flows, and things that feel fast and intentional.</p>
          </Motion.div>
          <Motion.div
            className="hero-orbit"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          >
            Systems / System Design / Backend
          </Motion.div>
          {/* Top Left Branding */}
          <Motion.div
            className="hero-corner-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          >
            $&gt; Hello_World <br/>
            <span style={{ color: 'var(--accent)' }}>[ Saransh Sethi ]</span>
          </Motion.div>

          <Motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.85, delay: 0.5, ease: 'easeOut' }}
            className="hero-content"
          >
            <h2 className="hero-greeting">Not Another Dev Portfolio</h2>
            <h1 className="hero-name">Saransh Sethi.</h1>
            <h3 className="hero-role">I build systems that feel sharp, calm, and real.</h3>
            <p className="hero-bio">
              B.Tech CSE student at Bennett University. I like backend-heavy products, thoughtful interfaces, and engineering work that feels clean under pressure.
            </p>
            <div className="hero-highlights">
              <span>9.28 CGPA</span>
              <span>500+ DSA Problems</span>
              <span>Systems + Backend</span>
            </div>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">My Work</a>
              <a href="/resume.pdf" target="_blank" className="btn btn-outline"><FaFileDownload /> Download Resume</a>
            </div>
          </Motion.div>
        </section>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="section">
          <h2 className="section-title">The Journey</h2>
          
          <div className="timeline">
            {journeyItems.map((item) => (
              <div className="timeline-item" key={item.title}>
                <div className="timeline-dot"></div>
                <div className="glass-card">
                  <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{item.meta}</p>
                  <ul className="timeline-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured Work Section */}
        <AnimatedSection id="projects" className="section">
          <h2 className="section-title">Featured Work</h2>
          <div className="staggered-grid">
            
            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Placement Automation</h3>
                <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaExternalLinkAlt size={20} /></a>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>Self-hosted system triggering on campus placement emails, utilizing structured LLM parsing to extract metadata, validating it against a strict schema, and dispatching real-time Telegram alerts.</p>
              <div className="project-tags">
                <span>n8n</span><span>Docker</span><span>LLM APIs</span>
              </div>
            </div>

            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Incident Response RL</h3>
                <a href="https://github.com/Saransh2412/incident-response-rl" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={24} /></a>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>A reinforcement learning environment mimicking production tier incident response workflows. Deployed during a high-stakes hackathon; our agent achieved a perfect 1.0 success rate across all critical tasks.</p>
              <div className="project-tags">
                <span>Python</span><span>RL</span><span>FastAPI</span>
              </div>
            </div>

            <div className="glass-card project-card">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Flipkart React Clone</h3>
                <a href="https://github.com/Saransh2412/flipkart_clone" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={24} /></a>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>A deeply complex, robust UI clone of the Flipkart e-commerce platform. Developed completely in a fast-paced 2-day sprint focusing on nested layouts and pure CSS grid constraints.</p>
              <div className="project-tags">
                <span>React</span><span>JavaScript</span><span>CSS</span>
              </div>
            </div>

            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.6rem', margin: 0 }}>Kickstart AI Scaffolding</h3>
                <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaExternalLinkAlt size={20} /></a>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>An intelligent terminal tool interpreting open-ended development prompts into discrete engineering tasks. Triggers localized multi-file generation validated reliably through Pydantic graphs.</p>
              <div className="project-tags">
                <span>LangChain</span><span>LangGraph</span><span>Pydantic</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Tech Stack Section */}
        <AnimatedSection id="skills" className="section compact">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-stack-grid">
            {skillGroups.map((group) => (
              <div className="glass-card tech-card" key={group.title}>
                <h3 className="tech-card-title">
                  {group.title}
                </h3>
                <div className="tech-skill-grid">
                  {group.skills.map((skill) => (
                    <div className="tech-skill" key={skill.name}>
                      <div className="tech-skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* DSA & Achievements Block */}
        <AnimatedSection id="achievements" className="section">
           <h2 className="section-title">Problem Solving</h2>
           
           <div className="lc-card" style={{ marginBottom: '4rem' }}>
              <div className="lc-info">
                <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <FaCode size={30} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '1.5rem 0 0 0' }}>
                  {typeof totalSolved === 'number' ? totalSolved : '--'}
                </h3>
                <p style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem' }}>Problems Solved</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '300px' }}>
                  Continuous learning through algorithmic challenges & data structures. Consistent practice on Leetcode focusing on Data Structures, Algorithms, and System Design.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', minHeight: '1.5rem', marginBottom: '1.5rem' }}>
                  {lcLoading ? 'Fetching live LeetCode stats...' : totalSolved === null ? 'Live LeetCode stats unavailable right now.' : 'Live stats from your LeetCode profile.'}
                </p>
                <div>
                  <a href="https://leetcode.com/u/Saranshsethi" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
                    <FaExternalLinkAlt /> View Profile
                  </a>
                </div>
              </div>

              <div className="lc-progress-container">
                {/* Easy */}
                <div className="lc-bar-wrapper">
                  <div className="lc-bar-header">
                    <span style={{ color: '#00b8a3' }}>Easy</span>
                    <span><strong style={{color: '#00b8a3', fontSize: '1.2rem'}}>{easySolved ?? '--'}</strong> <span style={{color: 'var(--text-secondary)'}}>solved</span></span>
                  </div>
                  <div className="lc-bar-bg">
                    <div className="lc-bar-fill" style={{ width: `${easyWidth}%`, background: '#00b8a3' }}></div>
                  </div>
                </div>
                {/* Medium */}
                <div className="lc-bar-wrapper">
                  <div className="lc-bar-header">
                    <span style={{ color: '#ffc01e' }}>Medium</span>
                    <span><strong style={{color: '#ffc01e', fontSize: '1.2rem'}}>{mediumSolved ?? '--'}</strong> <span style={{color: 'var(--text-secondary)'}}>solved</span></span>
                  </div>
                  <div className="lc-bar-bg">
                    <div className="lc-bar-fill" style={{ width: `${mediumWidth}%`, background: '#ffc01e' }}></div>
                  </div>
                </div>
                {/* Hard */}
                <div className="lc-bar-wrapper">
                  <div className="lc-bar-header">
                    <span style={{ color: '#ff375f' }}>Hard</span>
                    <span><strong style={{color: '#ff375f', fontSize: '1.2rem'}}>{hardSolved ?? '--'}</strong> <span style={{color: 'var(--text-secondary)'}}>solved</span></span>
                  </div>
                  <div className="lc-bar-bg">
                    <div className="lc-bar-fill" style={{ width: `${hardWidth}%`, background: '#ff375f' }}></div>
                  </div>
                </div>
              </div>
           </div>
        </AnimatedSection>

        {/* Honors & Achievements Block */}
        <AnimatedSection id="honors" className="section">
           <h2 className="section-title">Honors & Awards</h2>

           <div className="glass-card" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ flex: '0 0 auto' }}><FaTrophy size={40} color="var(--text-primary)" /></div>
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Hackathon Finalist – Scalar Meta X</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                 Cleared Round 1, placing in the Top ~4% out of 52,000+ total competitors in the OpenEnv Hackathon.
                </p>
              </div>
           </div>

           <div className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
              <div style={{ flex: '0 0 auto', marginTop: '0.5rem' }}><FaTrophy size={40} color="var(--text-primary)" /></div>
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Certifications & Honors</h3>
                <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>1st Prize – IEEE AI Image Generation Challenge (Zenevia Fest 2025)</li>
                  <li style={{ marginBottom: '0.5rem' }}>1X Dean's List Award – Academic Excellence</li>
                  <li style={{ marginBottom: '0.5rem' }}>NVIDIA – Accelerated Computing in Modern CUDA C++</li>
                  <li style={{ marginBottom: '0.5rem' }}>Google – Operating Systems Certification</li>
                  <li style={{ marginBottom: '0.5rem' }}>BCG – Software Engineering Virtual Experience</li>
                </ul>
              </div>
           </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="section contact-section" style={{ textAlign: 'center', padding: '8rem 2rem 2.5rem 2rem' }}>
            
            <h2 style={{ fontSize: '5rem', fontWeight: 800, margin: '0' }}>Let's Build.</h2>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '1rem', marginTop: '2rem', maxWidth: '700px', margin: '2rem auto' }}>
              I am actively looking for new opportunities, collaborations, and ambitious problems to solve. Give me a shout!
            </p>
            <p style={{ fontSize: '1.2rem', color: 'var(--accent)', fontFamily: 'JetBrains Mono', marginBottom: '5rem' }}>
              // Always ready to talk about cars 🚗 
            </p>

            <div className="contact-meta">
              <div className="contact-meta-item">
                <span>Focus</span>
                <strong>Backend, systems, real-time products</strong>
              </div>
              <div className="contact-meta-item">
                <span>Base</span>
                <strong>India · Remote friendly</strong>
              </div>
              <div className="contact-meta-item">
                <span>Status</span>
                <strong>Open to internships and serious builds</strong>
              </div>
            </div>

            <div className="social-links" style={{ marginTop: '4rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
              <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={32} /></a>
              <a href="https://www.linkedin.com/in/saransh-sethi/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={32} /></a>
              <a href="https://www.instagram.com/i.saranshh/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={32} /></a>
              <a href="mailto:sethisaransh3@gmail.com" aria-label="Email"><FaEnvelope size={32} /></a>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '8rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>
                $&gt; System.exit(0)
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Handcrafted by Saransh Sethi © 2026
              </div>
            </div>
        </AnimatedSection>
      </main>
    </>
  );
}

export default App;
