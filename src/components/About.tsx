import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { Users, Briefcase, Laptop, ChevronRight } from 'lucide-react';

import guimsVideo from '../assets/guims2.mp4';

import './about.css';

/* ------------------------------------------------------------------ */
/*  ContainerScroll sub-components                                     */
/* ------------------------------------------------------------------ */

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="about-scroll-header">
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="about-device-card"
    >
      <div className="about-device-inner">{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About component                                               */
/* ------------------------------------------------------------------ */

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleDimensions = isMobile ? [1, 1] : [1.05, 1];
  const rotateDimensions = isMobile ? [0, 0] : [20, 0];
  const translateDimensions = isMobile ? [0, 0] : [0, -100];

  const rotate = useTransform(scrollYProgress, [0, 1], rotateDimensions);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], translateDimensions);

  return (
    <>
      {/* ---- ContainerScroll 3D section ---- */}
      <section id="about" ref={containerRef} className="about-scroll-section">
        <div
          className="about-scroll-wrapper"
          style={{ perspective: '1000px' }}
        >
          <Header
            translate={translate}
            titleComponent={
              <>
                <h2 className="about-scroll-title">
                  Découvrez l'univers de
                </h2>
                <span className="about-scroll-title-highlight">
                  Guims Academy
                </span>
              </>
            }
          />
          <Card rotate={rotate} scale={scale}>
            <video src={guimsVideo} controls autoPlay loop style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Card>
        </div>
      </section>

      {/* ---- Details below ---- */}
      <section className="about-details">
        <div className="about-details-grid">
          <div className="about-details-text">
            <h2>L'excellence au service de votre avenir</h2>
            <p className="about-highlight">
              Guims Academy accompagne les entreprises, forme les particuliers, et propose des parcours en ligne pour répondre aux exigences du marché africain et mondial.
            </p>
            <p className="about-subtext">
              Notre mission est de combler le fossé entre la formation théorique et
              les exigences réelles du marché. Nous forgeons les leaders de
              demain à travers une pédagogie innovante et un accompagnement
              personnalisé, quel que soit votre profil.
            </p>
            <button className="btn-text">
              Voir plus <ChevronRight size={18} />
            </button>
          </div>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="about-stat-icon">
                <Users size={22} />
              </div>
              <div className="about-stat-content">
                <div className="about-stat-number" style={{ fontSize: '1.25rem' }}>Particuliers</div>
                <div className="about-stat-label">Formations certifiantes en présentiel</div>
              </div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon">
                <Briefcase size={22} />
              </div>
              <div className="about-stat-content">
                <div className="about-stat-number" style={{ fontSize: '1.25rem' }}>Entreprises</div>
                <div className="about-stat-label">Formations sur mesure B2B</div>
              </div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon">
                <Laptop size={22} />
              </div>
              <div className="about-stat-content">
                <div className="about-stat-number" style={{ fontSize: '1.25rem' }}>En Ligne</div>
                <div className="about-stat-label">Parcours 100% e-learning</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;