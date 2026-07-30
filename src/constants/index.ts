import secretariatBureautiqueImg from '../assets/secretariat-bureautique.jpg';
import secretariatDirectionImg from '../assets/secretariat-direction.jpg';
import secretariatComptableImg from '../assets/secretariat-comptable.jpg';
import marketingDigitalImg from '../assets/marketing-digital.jpg';

import avatarJean from '../assets/avatar-jean.jpg';
import avatarMarie from '../assets/avatar-marie.jpg';
import avatarAlain from '../assets/avatar-alain.jpg';

const getNextIntakeDate = () => {
  const today = new Date();
  let nextMonth = today.getMonth() + 1;
  let year = today.getFullYear();
  if (nextMonth > 11) {
    nextMonth = 0;
    year += 1;
  }
  const monthsInFrench = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  return {
    long: `06 ${monthsInFrench[nextMonth]} ${year}`,
    short: `6 ${monthsInFrench[nextMonth]}`
  };
};

const intake = getNextIntakeDate();
export const nextIntakeLong = intake.long;
export const nextIntakeShort = intake.short;

export type NavLink = {
  name: string;
  href: string;
  className?: string;
  external?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { name: "Accueil", href: "#" },
  { name: "Nos Formations", href: "#formations" },
  { name: "Nos Lauréats", href: "#laureats" },
  { name: "Actualités", href: "#actualites" },
  { name: "À propos", href: "#about" },
  { name: "Espace Etudiants", href: "#clients" },
  { name: "Contact", href: "#contact" }
];

export const FORMATIONS = [
  {
    title: "Secrétariat Bureautique",
    image: secretariatBureautiqueImg,
    courses: ["Informatique de base", "Gestion documentaire", "Outils Microsoft"],
    price: 90000
  },
  {
    title: "Secrétariat de Direction",
    image: secretariatDirectionImg,
    courses: ["Gestion d'agenda", "Communication pro", "Management"],
    price: 90000
  },
  {
    title: "Secrétariat Comptable",
    image: secretariatComptableImg,
    courses: ["Saisie comptable", "Logiciels de gestion", "Fiscalité de base"],
    price: 90000
  },
  {
    title: "Marketing Digital",
    image: marketingDigitalImg,
    courses: ["Administration de sites web", "SEO", "E-commerce", "Création de contenus", "Gestion des réseaux sociaux"],
    price: 90000
  }
];

export const SERVICES = [
  {
    title: "Certifications Internationales",
    description: "Obtenez des certifications professionnelles reconnues à l'échelle internationale."
  },
  {
    title: "Projets Réels & Pratiques",
    description: "Travaillez sur des cas d'usage réels et des projets de terrain pour être immédiatement opérationnel."
  },
  {
    title: "Insertion Directe",
    description: "Mise en relation directe avec les entreprises de notre réseau après votre formation."
  },
  {
    title: "Inscriptions en cours",
    description: `Places limitées pour la rentrée du ${intake.short}. Réservez la vôtre dès maintenant.`
  }
];

export const CONTACT_INFO = {
  phone: "+237 655 955 615",
  email: "contact@guimsacademy.com",
  location: "Ndogbong Carrefour Conquete",
  slogan: "Osez innover, Osez créer",
  nextIntake: intake.short
};

export const TESTIMONIALS = [
  {
    name: "Priso Daniel",
    role: "Secrétaire de Direction",
    text: "Grâce à Guims Academy, j'ai obtenu une formation de qualité et un accompagnement sur mesure qui m'a ouvert les portes de l'emploi.",
    avatar: avatarJean
  },
  {
    name: "Marie Songo",
    role: "Spécialiste Marketing",
    text: "Le volet Web Design est exceptionnel. Les formateurs sont extrêmement qualifiés et à l'écoute des étudiants !",
    avatar: avatarMarie
  },
  {
    name: "Alain Essomba",
    role: "Assistant Comptable",
    text: `Une école sérieuse qui tient ses promesses. La rentrée du ${intake.short.toLowerCase()} est une opportunité à ne pas manquer pour se professionnaliser.`,
    avatar: avatarAlain,
    imagePosition: "72% center"
  }
];
