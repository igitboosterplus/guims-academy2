import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import Balancer from 'react-wrap-balancer';

import secretariatBureautiqueImg from '../assets/secretariat-bureautique.jpg';
import secretariatDirectionImg from '../assets/secretariat-direction.jpg';
import marketingDigitalImg from '../assets/marketing-digital.jpg';

import './hero.css';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fanSlots = [
  { rotate: -6, x: 48, ty: 24 },
  { rotate: 0, x: 0, ty: -8 },
  { rotate: 6, x: -48, ty: 24 },
];

const fanContainerVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const fanCardVariants: Variants = {
  hidden: (slot: (typeof fanSlots)[number]) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot: (typeof fanSlots)[number]) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const images = [
  { src: secretariatBureautiqueImg, alt: 'Formation Secrétariat Bureautique' },
  { src: secretariatDirectionImg, alt: 'Formation Secrétariat de Direction' },
  { src: marketingDigitalImg, alt: 'Formation Marketing Digital' },
];

const positionClasses = [
  'hero10-fan-card--left',
  'hero10-fan-card--center',
  'hero10-fan-card--right',
];

function ImageFan({ animate }: { animate: boolean }) {
  return (
    <motion.div
      className="hero10-fan-container"
      variants={fanContainerVariants}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
    >
      {images.map((img, i) => {
        const slot = fanSlots[i];
        return (
          <motion.div
            key={img.src}
            custom={slot}
            variants={fanCardVariants}
            className={`hero10-fan-card ${positionClasses[i]}`}
          >
            <img src={img.src} alt={img.alt} decoding="async" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const reduce = useReducedMotion();
  const animate = !reduce;
  const _ref = useRef(null);

  return (
    <section className="hero10" ref={_ref}>
      <motion.div
        className="hero10-inner"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Header */}
        <motion.div
          variants={animate ? itemVariants : undefined}
          className="hero10-header"
        >
          <h1 className="hero10-title">
            <Balancer>Osez innover, Osez créer</Balancer>
            <br />
            <Balancer>
              <span>avec </span>
              <span className="hero10-title-highlight">excellence</span>
            </Balancer>
          </h1>
          <p className="hero10-description">
            <Balancer>
              Guims Academy vous propose des formations certifiantes adaptées au
              marché international. Développez vos compétences auprès d'experts
              du domaine.
            </Balancer>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={animate ? itemVariants : undefined}
          className="hero10-ctas"
        >
          <div className="hero10-cta-row">
            <a href="#formations" className="hero10-btn-primary">
              Commencer une formation
            </a>
            <a href="#about" className="hero10-btn-outline">
              En savoir plus
            </a>
          </div>
          <p className="hero10-social-proof">
            Rejoint par 2 000+ étudiants depuis 2020
          </p>
        </motion.div>

        {/* Fan images */}
        <div className="hero10-fan-container" style={{ width: '100%', maxWidth: '48rem', margin: '0 auto' }}>
          <ImageFan animate={animate} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;