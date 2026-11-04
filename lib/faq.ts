export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: "L'app fonctionne-t-elle sans le bracelet ?",
    answer: "Oui ! L'app est 100% gratuite et utilisable sans bracelet. Tu peux saisir manuellement tes sessions, accéder à la communauté, participer aux challenges de groupe.\n\nMais pour notre mission principale — suivre ta charge et ta récupération grâce à l'analyse cardiaque en temps réel — le bracelet est indispensable. Sans lui, tu n'as pas accès aux fonctionnalités avancées qui font vraiment la différence : suivi de tes indicateurs de récupération, suivi de la charge et de la récupération, analyse cycles menstruels.\n\nC'est comme avoir une voiture sans GPS : tu peux rouler, mais tu rates plein de raccourcis."
  },
  {
    id: '2',
    question: "Pourquoi pas ma montre Garmin ou Apple Watch ?",
    answer: "Ta montre mesure aussi ta fréquence cardiaque, avec un capteur optique au poignet. On ne prétend pas faire mieux qu'elle en escalade : aucune mesure ne le montre à ce jour.\n\nOn a fait un autre choix : un seul capteur, le Polar 360, pour que l'app sache exactement d'où viennent ses données. On le porte à l'avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.\n\nNous avons choisi le Polar 360 après une analyse de ses caractéristiques, sans banc d'essai comparatif."
  },
  {
    id: '3',
    question: "C'est quoi la différence avec Strava ou MyClimb ?",
    answer: "Strava = logbook généraliste (course, vélo, etc.)\nMyClimb = tracking cotations et voies\n\nWAC = coach intelligent spécialisé escalade qui écoute ton corps pour t'empêcher de te blesser et t'aider à progresser durablement.\n\nOn ne mesure pas juste la performance. On protège ta santé, on analyse ton état de fatigue, on adapte tes recommandations à ton cycle menstruel (si applicable), on te dit quand te reposer avant que ton corps craque.\n\nC'est une approche complètement différente : performance responsable, pas performance à tout prix."
  },
  {
    id: '4',
    question: "Le bracelet est compatible avec toutes les salles d'escalade ?",
    answer: "Oui ! Le bracelet fonctionne partout : salle, falaise, bloc, grande voie. Aucune infrastructure nécessaire.\n\nIl mesure ta fréquence cardiaque et tes mouvements via Bluetooth. L'app analyse ensuite tes données pour détecter automatiquement les voies, les tentatives, les temps de repos.\n\nQue tu grimpes chez Arkose, à Fontainebleau ou dans les Calanques, WAC fonctionne."
  },
  {
    id: '5',
    question: "Livraison et garantie ?",
    answer: "• Livraison gratuite en France métropolitaine (3-5 jours ouvrés)\n• Garantie constructeur Polar 2 ans\n• Satisfait ou remboursé 30 jours (on reprend le bracelet si tu n'es pas content.e)\n\nPour les livraisons hors France, contacte-nous : bonjour@weareclimbers.fr"
  },
  {
    id: '6',
    question: "Les modules premium sont obligatoires ?",
    answer: "Non ! Les modules (Outdoor, Nutrition, etc.) sont optionnels.\n\nL'app + bracelet te donnent déjà tout pour progresser en sécurité :\n- Analyse fréquence cardiaque temps réel\n- Suivi de la charge et de la récupération\n- Analyse cycles menstruels\n- Recommandations personnalisées\n- Coaching de base\n\nLes modules premium sont des bonus pour aller encore plus loin selon tes besoins spécifiques. À toi de choisir ce qui te correspond."
  },
  {
    id: '7',
    question: "Mes données sont-elles protégées ?",
    answer: "Oui. 100%.\n\n• Chiffrement AES-256 de tes données sensibles\n• RGPD strict : tes données t'appartiennent vraiment\n• On ne les vend JAMAIS à des tiers\n• Tu peux les exporter ou les supprimer quand tu veux\n• Hébergement sécurisé en France\n\nPour les données cycles menstruels : elles sont privées, chiffrées, et jamais partagées. Même nous n'y avons pas accès en clair.\n\nTa vie privée, c'est sacré."
  },
  {
    id: '8',
    question: "L'analyse des cycles menstruels, comment ça marche ?",
    answer: "Tu renseignes (de manière optionnelle et privée) tes dates de cycle dans l'app. WAC analyse ensuite tes performances selon les phases de ton cycle (folliculaire, ovulatoire, lutéale).\n\nTu reçois des graphiques dédiés et des recommandations adaptées :\n- Quand pousser plus fort (pic de forme naturel)\n- Quand privilégier la technique ou la récup\n- Comment adapter ton entraînement pour progresser avec ton corps, pas contre lui\n\nC'est 100% optionnel. Si tu ne veux pas renseigner ces infos, l'app fonctionne normalement."
  }
]
