import secretariatDirectionImg from '../assets/secretariat-direction.jpg';
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
  { name: "Espace apprenants", href: "#clients" },
  { name: "Contact", href: "#contact" }
];

export const FORMATIONS = [
  {
    audience: "Entreprises & organisations",
    title: "Pilotage financier et trésorerie",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
    courses: ["Gestion de trésorerie", "Tableaux de bord financiers", "Prévisions et reporting"],
    price: 90000
  },
  {
    audience: "Entreprises & organisations",
    title: "Management et performance des équipes",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    courses: ["Leadership opérationnel", "Communication managériale", "Pilotage des objectifs"],
    price: 90000
  },
  {
    audience: "Entreprises & organisations",
    title: "Organisation, structuration et stratégie de croissance",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    courses: ["Diagnostic organisationnel", "Processus et procédures", "Plan de croissance"],
    price: 90000
  },
  {
    audience: "Entreprises & organisations",
    title: "Vente et développement commercial",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    courses: ["Prospection et négociation", "Parcours client", "Pilotage commercial"],
    price: 90000
  },
  {
    audience: "Entreprises & organisations",
    title: "Fiscalité et optimisation légale",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=80",
    courses: ["Obligations fiscales", "Conformité", "Optimisation légale"],
    price: 90000
  },
  {
    audience: "Entreprises & organisations",
    title: "Digitalisation et automatisation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    courses: ["Cartographie des processus", "Outils numériques", "Automatisation des tâches"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Intelligence artificielle",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    courses: ["Outils d'IA générative", "Automatisation personnelle", "Usages professionnels"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Marketing Digital",
    image: marketingDigitalImg,
    courses: ["Administration de sites web", "SEO", "E-commerce", "Création de contenus", "Gestion des réseaux sociaux"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Génie logiciel",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    courses: ["Algorithmique", "Conception logicielle", "Tests et déploiement"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Développement web",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    courses: ["HTML, CSS et JavaScript", "Sites responsives", "Projets web"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Secrétariat de direction et comptable",
    image: secretariatDirectionImg,
    courses: ["Gestion d'agenda", "Saisie comptable", "Outils bureautiques"],
    price: 90000
  },
  {
    audience: "Particuliers",
    title: "Maintenance informatique",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    courses: ["Diagnostic matériel", "Maintenance systèmes", "Assistance utilisateurs"],
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
