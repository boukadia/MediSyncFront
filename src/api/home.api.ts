// home.api.ts
const BASE = import.meta.env.VITE_API;

export interface HomeData {
  logo: string;
  heroSection: {
    title: string;
    subtitle: string;
    bannerImage: string;
    ctaText: string;
    ctaLink: string;
  };
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  aboutSection: {
    title: string;
    description: string;
    image: string;
    medecin:string;
    patient:string
  };
  testimonials: Array<{
    name: string;
    message: string;
    avatar: string;
  }>;
  footer: {
    copyright: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  };
}

export async function getHomeDataApi(): Promise<HomeData> {
  try {
    const response = await fetch(`${BASE}/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    // Return default data in case of error
    return getDefaultHomeData();
  }
}

// Default data as fallback
function getDefaultHomeData(): HomeData {
  return {
    logo: "https://example.com/images/logo.png",
    heroSection: {
      title: "Simplifiez la gestion de votre clinique avec MediSync",
      subtitle: "Rationalisez les rendez-vous, gérez les dossiers patients et optimisez vos opérations cliniques avec notre plateforme médicale tout-en-un.",
      bannerImage: "https://cdni.iconscout.com/illustration/premium/thumb/doctor-appointment-booking-illustration-download-in-svg-png-gif-file-formats--healthcare-medical-online-consultation-pack-illustrations-4726992.png",
      ctaText: "Commencer maintenant",
      ctaLink: "/login"
    },
    services: [
      {
        icon: "fas fa-calendar-check",
        title: "Gestion des Rendez-vous",
        description: "Système de prise de rendez-vous en ligne avec notifications automatiques."
      },
      {
        icon: "fas fa-user-md",
        title: "Dossiers Patients",
        description: "Gestion complète des dossiers médicaux avec historique sécurisé."
      },
      {
        icon: "fas fa-prescription-bottle-medical",
        title: "Prescriptions Digitales",
        description: "Création et gestion des ordonnances numériques avec suivi."
      }
    ],
    aboutSection: {
      title: "À propos de MediSync",
      description: "Nous sommes une équipe passionnée dédiée à moderniser les soins de santé grâce à des solutions digitales innovantes.",
      image: "https://thumbs.dreamstime.com/z/male-doctor-explaining-medical-results-to-senior-couple-clinic-consultation-family-doctor-reviews-medical-records-403723043.jpg?ct=jpeg"
    },
    testimonials: [
      {
        name: "Dr. Sarah Benali",
        message: "MediSync a révolutionné ma pratique. Je gagne 3 heures par jour grâce à l'automatisation.",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
      },
      {
        name: "Dr. Ahmed Lahlou",
        message: "Interface intuitive et fonctionnalités complètes. Mes patients apprécient la facilité d'usage.",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
      }
    ],
    footer: {
      copyright: "© 2025 MediSync. Tous droits réservés.",
      links: [
        { label: "Politique de confidentialité", url: "/privacy" },
        { label: "Conditions d'utilisation", url: "/terms" },
        { label: "Contact", url: "/contact" }
      ]
    }
  };
}