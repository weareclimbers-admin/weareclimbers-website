export interface Testimonial {
  id: string
  name: string
  level: string
  frequency: string
  photo?: string // TODO: À ajouter plus tard
  quote: string
  value: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie',
    level: '7b',
    frequency: 'Grimpe 3x/semaine',
    quote: "J'ai évité une tendinite grâce aux alertes récup de WAC. L'app m'a conseillé de me reposer alors que je me sentais en pleine forme. J'ai suivi le conseil à contrecœur. 2 jours plus tard, fatigue énorme. Le bracelet a vu avant moi ce que mon corps me cachait.\n\nMaintenant, je fais confiance aux recommandations. Depuis 6 mois, zéro blessure, et je progresse plus vite qu'avant. Parce que je grimpe intelligemment, pas bêtement.",
    value: 'Prévention blessure / Performance responsable'
  },
  {
    id: '2',
    name: 'Thomas',
    level: '6c',
    frequency: 'Débutant (1 an de grimpe)',
    quote: "Enfin une app qui m'encourage à grimper moins mais mieux. Pas de pression, pas de classement, juste des conseils bienveillants adaptés à mon niveau de débutant.\n\nJe vois des gens en salle qui grimpent 5x/semaine et se blessent. Moi je grimpe 2-3x/semaine avec WAC, je progresse régulièrement, et surtout : je prends du plaisir sans stress. C'est ça que je cherchais.",
    value: 'Accessibilité / Bienveillance'
  },
  {
    id: '3',
    name: 'Julie',
    level: '8a',
    frequency: 'Compétitrice',
    quote: "La communauté WAC est incroyable. On partage nos galères, nos chutes, nos réussites sans filtre. Pas de compétition toxique, pas d'ego surdimensionné, juste de l'entraide.\n\nC'est rafraîchissant dans le milieu de la compet où tout le monde se compare H24. Ici, on grimpe pour soi, et on progresse grâce aux autres. J'adore.",
    value: 'Partage / Communauté'
  },
  {
    id: '4',
    name: 'Alex',
    level: '7a+',
    frequency: 'Salle + Falaise',
    quote: "Grâce au bracelet, j'ai compris que je grimpais toujours en zone rouge (cardio trop élevée = fatigue prématurée). Je pensais que c'était normal d'être cramé après chaque session.\n\nWAC m'a montré comment doser mes efforts. Maintenant je grimpe en zone verte-orange, je récupère mieux entre les voies, et paradoxalement... je progresse plus vite. Écouter son corps change tout.",
    value: 'Intelligence / Performance responsable'
  },
  {
    id: '5',
    name: 'Léa',
    level: '6b+',
    frequency: 'Grimpe depuis 2 ans',
    quote: "Enfin une app qui comprend mon corps de femme ! WAC m'a montré que mes 'mauvais jours' (où je n'arrivais à rien) étaient systématiquement liés à ma phase lutéale.\n\nMaintenant j'adapte mes sessions selon mon cycle : technique et endurance pendant la phase lutéale, force et intensité pendant la phase folliculaire. Résultat : je me sens tellement mieux, et fini la culpabilité. Mon corps n'est pas défaillant, il a juste son propre rythme.",
    value: 'Inclusivité / Accessibilité'
  }
]
