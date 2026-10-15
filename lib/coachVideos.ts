/**
 * Démos vidéo de la page Coachs — source unique de vérité.
 *
 * Ce sont les tutos « Prise en main » de la webapp coach (MP4 1920×1080, sous-titres
 * incrustés, données fictives), hébergés sur Vercel Blob. Source des URL et durées :
 * weareclimbers-coach/lib/academy/generated/tutos/media.json (clé = id). Une vidéo
 * refaite change d'URL (empreinte du contenu) : recopier `src` ET `durationSec`.
 *
 * Chaque vidéo = carte titre (0 → 3 s) + app en action + carte de fin (3 dernières s).
 * Le site ne lit que la plage utile [start, end] (cf. ScreenFrame).
 *
 * Image fixe (affiche + repli mouvement réduit / Save-Data) : `public/images/coachs/tuto-<id>.webp`,
 * extraite à 3,2 s — jamais le poster Blob, qui montre la carte titre :
 *   ffmpeg -ss 3.2 -i <src> -frames:v 1 -c:v libwebp -quality 80 tuto-<id>.webp
 */

export type CoachVideoId = 'programmation' | 'scenarios' | 'exercices-modeles' | 'mes-graphiques'

export interface CoachVideo {
  /** MP4 hébergé (Vercel Blob) */
  src: string
  /** Début de la plage utile, en secondes (fin du fondu de la carte titre) */
  start: number
  /** Fin de la plage utile, en secondes (début de la carte de fin) */
  end: number
  /** Image fixe locale (première image de la plage utile) */
  poster: string
  /** Description pour les lecteurs d'écran */
  alt: string
}

/** Carte titre (2,5 s + fondu 0,5 s) et carte de fin (3 s) des tutos Remotion */
const TITLE_CARD_SEC = 3
const END_CARD_SEC = 3

function tuto(id: CoachVideoId, src: string, durationSec: number, alt: string): CoachVideo {
  return { src, start: TITLE_CARD_SEC, end: durationSec - END_CARD_SEC, poster: `/images/coachs/tuto-${id}.webp`, alt }
}

const BLOB = 'https://ujzgtdngjnoysxji.public.blob.vercel-storage.com/academy/tutos'

/** Une vidéo absente (pas encore publiée) : le bloc garde son visuel de repli. */
export const COACH_VIDEOS: Partial<Record<CoachVideoId, CoachVideo>> = {
  programmation: tuto(
    'programmation',
    `${BLOB}/programmation-60f7acf27bfa.mp4`,
    84.1,
    "Démo WAC Coach : le coach programme une séance à une élève depuis le calendrier, puis compare le prévu et le réalisé.",
  ),
  scenarios: tuto(
    'scenarios',
    `${BLOB}/scenarios-04085e096286.mp4`,
    87.4,
    "Démo WAC Coach : deux plans de préparation à une compétition comparés, avec la forme projetée le jour J, puis envoyés à l'élève.",
  ),
  'exercices-modeles': tuto(
    'exercices-modeles',
    `${BLOB}/exercices-modeles-dfd6dd587d72.mp4`,
    85.7,
    "Démo WAC Coach : création d'un exercice personnalisé, puis d'un modèle de séance réutilisable.",
  ),
  'mes-graphiques': tuto(
    'mes-graphiques',
    `${BLOB}/mes-graphiques-a16a93548774.mp4`,
    70.1,
    "Démo WAC Coach : construction d'un graphique personnalisé, qui s'affiche ensuite sur la fiche d'une élève.",
  ),
}
