export interface Value {
  id: string
  icon: string
  title: string
  description: string
}

export const values: Value[] = [
  {
    id: 'partage',
    icon: '/icons/icons8-cœur-poignée-de-main-50.png',
    title: 'On grimpe seul.e, mais on progresse ensemble',
    description: 'WAC, c\'est une communauté bienveillante, pas un classement de performances. Partage tes sessions, pas ton ego. Entraide, challenges collectifs, feed social axé sur le soutien mutuel. Ici, on célèbre les galères autant que les réussites.'
  },
  {
    id: 'performance',
    icon: '/icons/icons8-plante-50.png',
    title: 'Progresser sainement, pas à tout prix',
    description: 'Notre app te dit parfois de te reposer, et c\'est notre fierté. La vraie performance, c\'est la progression durable. Pas de culture de la souffrance, pas de "no pain no gain". Juste du respect pour ton corps et ta santé.'
  },
  {
    id: 'inclusivite',
    icon: '/icons/icons8-cadenas-ouvert-48.png',
    title: 'Jamais élitiste, toujours inclusif',
    description: 'Pour tous les genres, toutes les morphologies, tous les niveaux. Première app escalade à prendre en compte l\'impact des cycles menstruels sur ta performance. Parce que ton corps mérite d\'être compris, pas jugé.'
  },
  {
    id: 'eco',
    icon: '/icons/icons8-planté-à-la-main-50.png',
    title: 'Tech utile, pas tech gadget',
    description: 'App éco-conçue (compression images, optimisation batterie), développée en France, hébergement green. Objectif : bracelet éco-responsable made in France (roadmap 2026). Nos choix ne sont pas les plus simples, mais ils sont les plus justes.'
  }
]

export const manifesto = {
  tagline: 'WeAreClimbers - Grimpons mieux, ensemble',
  quote: 'Chez WeAreClimbers, nos choix ne sont pas les plus simples, mais ils sont les plus justes. On croit que grimper mieux ≠ grimper plus. Et qu\'on grimpe mieux ensemble.'
}
