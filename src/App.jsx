import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaExternalLinkAlt, FaFileDownload, FaTrophy, FaRobot, FaServer, FaCogs, FaDatabase } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Sphere, Wireframe, Octahedron, PresentationControls, TorusKnot, useGLTF } from '@react-three/drei';
import AnimatedSection from './components/AnimatedSection';
import AmbientBackground from './components/AmbientBackground';

// A beautifully stylized abstract Geometric representation of complex algorithms
function Hero3D() {
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 9] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -10, -5]} intensity={1} color="#555555" />
        <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} config={{ mass: 2, tension: 400 }}>
          <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
            <TorusKnot args={[1.5, 0.4, 128, 32]} position={[0,0,0]}>
              <MeshDistortMaterial color="#111111" distort={0.2} speed={1.5} roughness={0.1} metalness={0.9} />
            </TorusKnot>
            <TorusKnot args={[1.55, 0.45, 64, 16]}>
              <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
            </TorusKnot>
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

// B&W stylized custom Low Poly Car built using Drei mesh primitives to avoid broken links
function LowPolyCar(props) {
  const group = useRef();
  useFrame(() => {
    group.current.rotation.y += 0.005;
  });
  return (
    <group ref={group} {...props} scale={0.8} rotation={[0.2, -Math.PI / 4, 0]}>
      {/* Chassis */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 0.8, 1.8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.3, 1.2, 0]}>
        <boxGeometry args={[2, 0.7, 1.6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Wheels */}
      {[[-1.2, 0.2, 1], [1.2, 0.2, 1], [-1.2, 0.2, -1], [1.2, 0.2, -1]].map((pos, idx) => (
        <mesh key={idx} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Contact3D() {
  return (
    <div style={{ height: '300px', width: '100%', marginBottom: '-50px' }}>
       <Canvas camera={{ position: [0, 2, 8] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <LowPolyCar position={[0, -0.5, 0]} />
        </Float>
      </Canvas>
    </div>
  )
}

function LeetCode3D() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
        <Float speed={3} rotationIntensity={3} floatIntensity={2}>
          <Icosahedron args={[1.8, 0]}>
            <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} transparent opacity={0.9} />
            <Wireframe thickness={0.03} stroke={"#ffffff"} />
          </Icosahedron>
        </Float>
      </Canvas>
    </div>
  );
}

function Achievement3D() {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 5, 0]} intensity={2} />
        <Float speed={2.5} rotationIntensity={1} floatIntensity={3}>
          <Octahedron args={[1.8, 0]}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
            <Wireframe thickness={0.02} stroke={"#aaaaaa"} />
          </Octahedron>
        </Float>
      </Canvas>
    </div>
  );
}

function App() {
  return (
    <>
      <AmbientBackground />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation */}
        <nav className="glass-nav">
          <div className="nav-content">
            <span className="logo">S.S.</span>
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
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-content"
          >
            <h2 className="hero-greeting">Hi, I'm</h2>
            <h1 className="hero-name">Saransh<br/>Sethi.</h1>
            <h3 className="hero-role">SDE & AI Developer</h3>
            <p className="hero-bio" style={{ maxWidth: '600px' }}>
              B.Tech CSE @ Bennett University. Specializing in intelligent, scalable full-stack applications, Real-Time Systems, and Agentic AI workflows. I engineer automation and host my own n8n environments to optimize everything possible.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">View Work</a>
              <a href="/resume.pdf" target="_blank" className="btn btn-outline"><FaFileDownload /> Download Resume</a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            <Hero3D />
          </motion.div>
        </section>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="section">
          <h2 className="section-title">Experience</h2>
          <div className="staggered-grid">
            <div className="glass-card">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>SDE Intern</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Solutioneers Infotech | 06/2025 – 07/2025</p>
              <ul style={{ paddingLeft: '1rem', listStyleType: 'square' }}>
                <li style={{ marginBottom: '1rem' }}>Built a robust real-time voice pipeline with roughly 100ms streaming latency.</li>
                <li style={{ marginBottom: '1rem' }}>Developed a backend voice agent for real-time interactions using Google Cloud STT/TTS APIs.</li>
                <li style={{ marginBottom: '1rem' }}>Engineered intent extraction and fallback mechanisms, resulting in 87% query processing accuracy.</li>
              </ul>
            </div>

            <div className="glass-card">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Freelance Developer</h3>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>X Transport (Canada) | 07/2025 – Present</p>
              <ul style={{ paddingLeft: '1rem', listStyleType: 'square' }}>
                <li style={{ marginBottom: '1rem' }}>Delivered a fully working MVP within 14 days with full ownership of frontend and backend.</li>
                <li style={{ marginBottom: '1rem' }}>Built a responsive React.js frontend tailored for freight quotes, reducing bounce rates by 25%.</li>
                <li style={{ marginBottom: '1rem' }}>Integrated automated email notifications pipeline using Nodemailer.</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="section">
          <h2 className="section-title">Featured Work</h2>
          <div className="staggered-grid">
            
            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>Placement Automation</h3>
                <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaExternalLinkAlt /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>Self-hosted platform triggering on placement emails, using an LLM to extract key details, validating via schema, and sending alerts to Telegram.</p>
              <div className="project-tags">
                <span>n8n</span><span>Docker</span><span>LLM APIs</span>
              </div>
            </div>

            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>Incident Response RL</h3>
                <a href="https://github.com/Saransh2412/incident-response-rl" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={20} /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>Reinforcement learning environment simulating real production incident response. The agent scored a perfect 1.0 across all critical response tasks.</p>
              <div className="project-tags">
                <span>Python</span><span>RL</span><span>FastAPI</span>
              </div>
            </div>

            <div className="glass-card project-card">
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>Flipkart Clone</h3>
                <a href="https://github.com/Saransh2412/flipkart_clone" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={20} /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>A highly detailed, responsive UI clone of the Flipkart e-commerce platform. Built rapidly in just 2 days featuring complex nested layouts.</p>
              <div className="project-tags">
                <span>React</span><span>JavaScript</span><span>CSS</span>
              </div>
            </div>

            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>Deepfake Detection API</h3>
                <a href="https://github.com/Saransh2412/Deepfake_detection" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={20} /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>An AI-powered system designed to accurately detect deepfake images and videos utilizing advanced deep learning architectures.</p>
              <div className="project-tags">
                <span>Python</span><span>Deep Learning</span><span>Computer Vision</span>
              </div>
            </div>
            
            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>Kickstart Scaffolding</h3>
                <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaExternalLinkAlt /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>AI tool interpreting high-level prompts into ordered engineering tasks, generating structured templates enforced via Pydantic.</p>
              <div className="project-tags">
                <span>LangChain</span><span>LangGraph</span><span>Pydantic</span>
              </div>
            </div>

            <div className="glass-card project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.6rem' }}>LegalBot</h3>
                <a href="https://github.com/Saransh2412/Legalbot" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><FaGithub size={20} /></a>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>AI-powered chatbot answering simple legal queries via Google Gemini API with a clean ChatGPT-inspired interface.</p>
              <div className="project-tags">
                <span>React</span><span>Vite</span><span>Gemini API</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Tech Stack Section */}
        <AnimatedSection id="skills" className="section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="staggered-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="glass-card skill-category">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><FaRobot color="#818cf8" /> AI Coding Agents</h3>
              <div className="skill-tags">
                <span>Codex</span>
                <span>Antigravity</span>
                <span>Opencode</span>
                <span>CodeRabbit AI</span>
                <span>Stitch</span>
              </div>
            </div>
            <div className="glass-card skill-category">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><FaDatabase color="#818cf8" /> Languages & Data</h3>
              <div className="skill-tags">
                <span>C++</span><span>Python</span><span>JavaScript</span><span>SQL</span><span>MySQL</span>
              </div>
            </div>
            <div className="glass-card skill-category">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><FaServer color="#818cf8" /> Frameworks</h3>
              <div className="skill-tags">
                <span>React.js</span><span>Node.js</span><span>Express.js</span><span>Tailwind CSS</span>
              </div>
            </div>
            <div className="glass-card skill-category">
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><FaCogs color="#818cf8" /> Architecture</h3>
              <div className="skill-tags">
                <span>Docker</span><span>n8n</span><span>WebSockets</span><span>Git</span><span>VS Code</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection id="achievements" className="section">
           <div className="split-section">
              <div>
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>Achievements</h2>
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <FaTrophy size={28} color="white" />
                    <h3 style={{ fontSize: '1.4rem' }}>Hackathon Finalist</h3>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Cleared Round 1 (Top ~4% among 52,000+ participants) – Scalar Meta X OpenEnv Hackathon.
                  </p>
                </div>
                
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <FaTrophy size={28} color="white" />
                    <h3 style={{ fontSize: '1.4rem' }}>Zenevia Fest Winner</h3>
                  </div>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    1st Prize – IEEE AI Image Generation Challenge (2025).
                  </p>
                </div>

                <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Certifications</h3>
                   <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                     <li style={{ marginBottom: '0.5rem' }}>NVIDIA - Getting Started with Accelerated Computing in Modern CUDA C++</li>
                     <li style={{ marginBottom: '0.5rem' }}>GOOGLE - Operating Systems (Coursera)</li>
                     <li style={{ marginBottom: '0.5rem' }}>BCG - Software Engineering Virtual Experience</li>
                   </ul>
                </div>
              </div>
              
              <div>
                 <Achievement3D />
              </div>
           </div>
        </AnimatedSection>

        {/* Leetcode Segment */}
        <AnimatedSection className="section">
          <div className="split-section" style={{ direction: 'rtl' }}>
             <div style={{ direction: 'ltr' }}>
                <h2 className="section-title" style={{ marginBottom: '2rem' }}>DSA & Logic</h2>
                <div className="glass-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <FaCode size={50} color="white" />
                    <div>
                      <h3 style={{ fontSize: '2rem' }}>500+</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>Problems Solved</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Consistent problem solving across major platforms, translating algorithms directly into robust software architecture.
                  </p>
                  <a href="https://leetcode.com/u/Saranshsethi" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ display: 'inline-flex' }}>Visit LeetCode Profile</a>
                </div>
             </div>
             <div style={{ direction: 'ltr' }}>
                 <LeetCode3D />
             </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="section" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', borderTop: '1px solid var(--glass-border)' }}>
            
            <Contact3D />

            <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '2rem' }}>Let's Build.</h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              I am actively looking for new opportunities and collaborations. Reach out via email or connect with me on LinkedIn.<br/>
              <span style={{ fontSize: '1.1rem', color: '#fff', fontStyle: 'italic', display: 'inline-block', marginTop: '1.5rem'}}>
                PS: Always ready to talk about cars and cycling! 🚗🚴
              </span>
            </p>
            <a href="mailto:sethisaransh3@gmail.com" className="btn btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.2rem' }}>Send an Email</a>
            
            <div className="social-links" style={{ marginTop: '5rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
              <a href="https://github.com/Saransh2412" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={36} /></a>
              <a href="https://www.linkedin.com/in/saransh-sethi/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={36} /></a>
            </div>
        </AnimatedSection>

        <footer style={{ padding: '4rem 5%', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1rem', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-darker)' }}>
          <p>Handcrafted by Saransh Sethi © 2026</p>
        </footer>
      </main>
    </>
  );
}

export default App;
