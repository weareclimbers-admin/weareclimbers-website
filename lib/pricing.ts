export interface PricingPlan {
  id: string
  name: string
  price: number
  recommended?: boolean
  features: {
    included: string[]
    excluded?: string[]
  }
  cta: string
  ctaLink: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'essai',
    name: 'Essai Gratuit',
    price: 0,
    features: {
      included: [
        'App gratuite',
        'Communauté et feed social',
        'Suivi progression basique',
        'Challenges de groupe'
      ],
      excluded: [
        'Fréquence cardiaque temps réel',
        'Prévention blessure',
        'Analyse cycles menstruels',
        'Détection automatique mouvements'
      ]
    },
    cta: "Télécharger l'app",
    ctaLink: '/telecharger'
  },
  {
    id: 'grimpeur',
    name: 'Grimpeur',
    price: 99,
    recommended: true,
    features: {
      included: [
        'App gratuite (toutes fonctionnalités)',
        'Bracelet Polar 360 WeAreClimbers',
        'Garantie constructeur 2 ans',
        'Livraison gratuite en France',
        'Guide de démarrage',
        'Support technique',
        'Accès coaching personnalisé (dès le lancement)'
      ]
    },
    cta: 'Commander maintenant',
    ctaLink: '#contact'
  },
  {
    id: 'passionne',
    name: 'Passionné',
    price: 139,
    features: {
      included: [
        'Tout du pack Grimpeur',
        'Chargeur USB-C supplémentaire',
        'Bracelet textile de remplacement',
        'Support technique prioritaire',
        'Stickers WeAreClimbers',
        'Accès anticipé aux modules premium',
        'Accès beta aux nouveaux modules'
      ]
    },
    cta: 'Commander le pack complet',
    ctaLink: '#contact'
  }
]

export interface UpcomingModule {
  id: string
  icon: string
  name: string
  description: string
  availableFrom: string
}

export const upcomingModules: UpcomingModule[] = [
  {
    id: 'coaching',
    icon: '/icons/icons8-objectif-50.png',
    name: 'Coaching personnalisé',
    description: 'Plans d\'entraînement adaptés à ton niveau et objectifs, suivi progression avec recommandations évolutives',
    availableFrom: 'Dès le lancement'
  },
  {
    id: 'outdoor',
    icon: '/icons/icons8-montagne-50.png',
    name: 'Module Outdoor',
    description: 'Analyse spécifique falaise, grandes voies, blocs naturels',
    availableFrom: '2026 - sûr'
  },
  {
    id: 'nutrition',
    icon: '/icons/icons8-nutrition-50.png',
    name: 'Module Nutrition grimpeur',
    description: 'Conseils nutrition adaptés à ton entraînement et objectifs',
    availableFrom: '2026 - probable'
  }
]
