# 📋 We Are Climbers - Règles du Projet Website

**Date de création** : 21 Janvier 2026
**Dernière mise à jour** : 21 Janvier 2026
**Version** : 1.0
**Objectif** : Guide de référence pour le développement et la maintenance du site marketing We Are Climbers

---

## 🎨 DESIGN SYSTEM & IDENTITÉ VISUELLE

### Palette de Couleurs

#### Couleurs Principales
```css
--color-primary-green: #265335      /* Vert foncé - Titres, textes importants */
--color-primary-beige: #F5ECE5      /* Beige clair - Backgrounds principaux */
```

#### Couleurs Secondaires
```css
--color-secondary-orange: #F67931   /* Orange - CTAs, accents (UNIQUEMENT) */
--color-secondary-beige-dark: #B19580  /* Beige foncé - Textes secondaires */
--color-secondary-beige-medium: #E6D5C7  /* Beige moyen - Backgrounds secondaires */
```

#### ⚠️ RÈGLES D'UTILISATION DES COULEURS - IMPORTANT

**LE BLANC N'EST PAS UNE COULEUR DE LA DA !**
Le blanc (#FFFFFF) ne doit JAMAIS être utilisé dans les designs, sauf cas exceptionnels validés.

**Règles de contraste et lisibilité :**

1. **Sur fonds foncés (vert #265335)** :
   - Utiliser le beige clair (#F5ECE5) pour les textes
   - Crée un rendu lisible, sobre et lumineux

2. **Sur fonds clairs (beige #F5ECE5 ou #E6D5C7)** :
   - Utiliser le vert foncé (#265335) pour les textes
   - Assure contraste, structure et stabilité visuelle

3. **L'orange #F67931 : COULEUR D'ACCENTUATION UNIQUEMENT** :
   - ✅ **Utilisations autorisées** :
     - Boutons et CTAs
     - Petits éléments d'accentuation
     - Cartes cycle menstruel (exception validée)
     - Illustrations ponctuelles
   - ❌ **Utilisations INTERDITES** :
     - Fonds de sections entières
     - Textes sur fond beige foncé (#B19580)
     - Icônes sur fond orange
     - Tout usage qui fait dominer l'orange dans une composition
   - **Principe** : L'orange ponctue, rythme et attire l'attention. Il ne doit JAMAIS dominer un visuel.

4. **Superpositions interdites** :
   - ❌ Orange sur beige foncé (#B19580)
   - ❌ Beige foncé sur orange
   - ❌ Blanc sur n'importe quelle couleur de la DA

### Typographie

#### Polices
- **Titres & Headlines** : `Syne` (Google Font)
  - Font-weight: 700 (Bold)
  - Text-transform: UPPERCASE (pour les titres principaux)
  - Usage: H1, H2, H3, boutons, navigation

- **Corps de texte** : `Roboto` (Google Font)
  - Font-weight: 400 (Regular), 500 (Medium), 700 (Bold)
  - Usage: Paragraphes, descriptions, listes

#### Tailles de Police (Mobile-First)
```css
/* Mobile */
h1: 2.5rem (40px)
h2: 1.875rem (30px)
h3: 1.5rem (24px)
body: 1rem (16px)
small: 0.875rem (14px)

/* Desktop (md: 768px+) */
h1: 4rem (64px)
h2: 3rem (48px)
h3: 2rem (32px)
body: 1.125rem (18px)
```

### Boutons

#### Classes de boutons
```css
.btn-primary {
  background: var(--color-primary-green);
  color: var(--color-primary-beige);
  padding: 1rem 2rem;
  font-family: var(--font-syne);
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-secondary {
  background: var(--color-secondary-orange);
  color: white;
  padding: 1rem 2rem;
  font-family: var(--font-syne);
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-beige {
  background: var(--color-primary-beige);
  color: var(--color-primary-green);
  padding: 1rem 2rem;
  font-family: var(--font-syne);
  text-transform: uppercase;
  font-weight: 700;
  border: 2px solid var(--color-primary-green);
  transition: all 0.3s;
}

.btn-secondary-small {
  background: var(--color-secondary-orange);
  color: white;
  padding: 0.5rem 1rem;
  font-family: var(--font-syne);
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  transition: all 0.3s;
}
```

#### États des boutons
- **Hover** : `opacity: 0.9` ou `transform: scale(1.05)`
- **Active** : `opacity: 0.8`
- **Disabled** : `opacity: 0.5` + `cursor: not-allowed`

### Formes & Coins

- **Boutons** : Coins droits (border-radius: 0)
- **Cards** : Coins droits avec ombre légère
- **Images** : Coins droits (style Bauhaus)
- **Inputs** : Coins droits avec bordure subtile

### Ombres

```css
/* Card shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Card hover */
box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
```

### Espacements

```css
/* Sections */
padding-y: 5rem (80px) mobile
padding-y: 8rem (128px) desktop

/* Container */
max-width: 1280px
padding-x: 1rem (16px) mobile
padding-x: 2rem (32px) desktop

/* Gap entre éléments */
gap-small: 1rem (16px)
gap-medium: 2rem (32px)
gap-large: 3rem (48px)
```

### Animations

#### AOS (Animate On Scroll)
```html
<!-- Fade up animation -->
<div data-aos="fade-up">...</div>

<!-- Fade up with delay -->
<div data-aos="fade-up" data-aos-delay="100">...</div>

<!-- Fade right/left -->
<div data-aos="fade-right">...</div>
<div data-aos="fade-left">...</div>
```

#### Transitions
```css
/* Standard transition */
transition: all 0.3s ease-in-out;

/* Hover scale */
transition: transform 0.3s;
transform: scale(1.05);
```

---

## 🎯 STRATÉGIE MARKETING

### Positionnement : Marketing Émotionnel Outdoor

**Philosophie** : Approche "Émotion-First" inspirée de Patagonia et YETI

#### Principes Directeurs

1. **Émotion > Spécifications**
   - Toujours commencer par le POURQUOI avant le COMMENT
   - Raconter des histoires, pas des features
   - Humaniser la marque avant de parler du produit

2. **Authenticité > Perfection**
   - Transparence sur les limites
   - Vulnérabilité = connexion
   - Pas de survente ou faux chiffres

3. **Communauté > Clients**
   - Les utilisateurs sont des "grimpeurs" pas des "clients"
   - Co-construction avec la communauté
   - Feedback brutal et honnête valorisé

4. **Impact > Profit**
   - Éco-conception dès la première ligne
   - Transparence RSE totale
   - 1% for the Planet

### Ton & Voix

#### Caractéristiques
- **Tutoiement** systématique ("tu", "ton", "toi")
- **Vocabulaire grimpeur** : "grimper", "séance", "voie", "bloc", "beta"
- **Franc & Direct** : Pas de langue de bois
- **Humble** : "On n'est pas parfaits, mais on essaie"
- **Passionné** : Amour de la grimpe et de la nature

#### Exemples de Formulations

✅ **BON**
- "Tu grimpes pour progresser. Pas pour te détruire."
- "On aurait pu créer une app comme les autres. Mais c'est pas notre délire."
- "Parce que je suis pas là pour raconter de la merde."

❌ **À ÉVITER**
- "Révolutionnaire", "Innovant", "Unique"
- "Leader du marché", "Solution N°1"
- Jargon tech inutile
- Promesses irréalistes

### Storytelling : Les 3 Piliers

#### 1. L'Histoire de Julien (Fondateur)
- **Le déclic** : Double tendinite + plafond de verre
- **La décision** : Créer l'app qu'il aurait voulu avoir
- **L'apprentissage** : Autodidacte, Youtube, galères, persévérance
- **Le cycle menstruel** : Écoute de la compagne + sources scientifiques
- **L'éco-conception** : Grimper dans la nature = protéger la nature

#### 2. La Mission WAC
- Progresser sans se détruire
- Comprendre son corps plutôt que le juger
- Communauté bienveillante
- Éco-responsabilité

#### 3. Les Engagements Concrets
- Éco-conception (compression images, hébergement vert)
- Transparence (open data, RGPD exemplaire)
- Inclusivité (cycle menstruel, 5 identités de genre)
- Démarche scientifique (INSEP, Juliana Antero)

---

## 🌟 VALEURS & ADN DE LA MARQUE

### Les 4 Valeurs Fondamentales

#### 1. 🌱 Prévention > Performance
- Grimper longtemps > grimper fort une fois
- Écoute du corps
- Repos valorisé autant que l'effort

#### 2. 🧠 Compréhension > Comparaison
- Analyser ses propres patterns
- Pas de classement toxique
- Chaque grimpeur est unique

#### 3. 🤝 Communauté > Compétition
- Soutien mutuel
- Partage des galères et réussites
- Bienveillance obligatoire

#### 4. 🌍 Éco-Responsabilité > Croissance
- Impact environnemental minimisé
- Transparence totale
- Roadmap RSE publique

### Le Manifeste WAC

> "On grimpe pour progresser. Pas pour se comparer.
> Pour se sentir vivant. Pas pour se détruire.
> Pour comprendre son corps. Pas pour l'ignorer.
> Et pour grimper ensemble, longtemps."

### Différenciation vs Concurrents

| Critère | WAC | Concurrents (8a.nu, Strava, etc.) |
|---------|-----|-----------------------------------|
| Approche | Émotion-first | Tech-first |
| Cycle menstruel | ✅ Première app escalade | ❌ Ignoré |
| Éco-conception | ✅ Dès le départ | ❌ Greenwashing |
| Repos valorisé | ✅ "Reste chez toi" possible | ❌ "No pain no gain" |
| Communauté | Bienveillante | Compétitive |
| Transparence | Totale (limites admises) | Marketing traditionnel |

---

## 📁 STRUCTURE DU SITE

### Architecture de Navigation

#### Menu Principal (Header)
```
[Logo WAC] | Histoire | Mission | Capteurs | Contact | [CTA: Rejoins le mouvement]
```

#### Pages Principales

1. **Homepage (/)** - Hub émotionnel
   - Hero : Manifeste
   - Nos valeurs (4 piliers)
   - Pourquoi WAC (4 cartes dont cycle menstruel)
   - Avec/Sans bracelet
   - Le bracelet (intro)
   - Qui sommes-nous (Julien)
   - FAQ
   - CTA final

2. **Notre Histoire (/histoire)** - Storytelling complet de Julien
   - Le déclic (tendinite)
   - La décision (créer l'app)
   - Pourquoi le cycle menstruel
   - La démarche scientifique (INSEP)
   - L'éco-conception
   - La communauté
   - Le crowdfunding (Mai 2026)

3. **Mission & Valeurs (/mission)** - Vision + Engagements RSE
   - Notre vision
   - Les 4 valeurs
   - Les 3 piliers (Éco-conception, Prévention, Inclusivité)
   - Nos engagements concrets (4 sections détaillées)
   - Notre promesse

4. **Capteurs & Analyse (/capteurs)** - Analyse physiologique + Polar 360
   - Analyse physiologique WAC
   - Polar 360 (pourquoi ce choix)
   - Spécifications techniques
   - Pourquoi pas Apple Watch / Garmin
   - Disponibilité (crowdfunding Mai 2026)

5. **Contact (/contact)** - Formulaire + Informations
   - Formulaire de contact
   - Email contact/support
   - Réseaux sociaux
   - FAQ (lien)

#### Footer - Pages Secondaires

**Navigation**
- Accueil
- Vision & Mission WAC
- Notre Histoire
- Capteurs & Analyse
- Contact

**Ressources**
- Spécifications Techniques (/specifications-techniques)
- Roadmap RSE (/roadmap-rse)

**Légal**
- Politique de Confidentialité (/privacy)
- Conditions Générales (/terms) - À CRÉER
- Politique de Cookies (/cookies) - À CRÉER

**Suivez-nous**
- Instagram (https://www.instagram.com/wac_weareclimbers/)
- Badges : Cycle menstruel, Éco-conçue, Made in France

---

## 🛠️ STACK TECHNIQUE

### Framework & Technologies

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS + CSS Variables
- **Animations** : AOS (Animate On Scroll)
- **Fonts** : Google Fonts (Syne + Roboto)
- **Déploiement** : Vercel
- **Analytics** : À configurer

### Structure des Fichiers

```
weareclimbers-website/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── histoire/page.tsx           # Notre Histoire
│   ├── mission/page.tsx            # Mission & Valeurs
│   ├── capteurs/page.tsx           # Capteurs & Analyse
│   ├── contact/page.tsx            # Contact
│   ├── specifications-techniques/page.tsx
│   ├── roadmap-rse/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx              # À CRÉER
│   ├── cookies/page.tsx            # À CRÉER
│   ├── layout.tsx                  # Layout principal
│   └── globals.css                 # Styles globaux
├── components/
│   ├── Header.tsx                  # Navigation
│   ├── Footer.tsx                  # Footer
│   ├── Badge.tsx                   # Badges
│   ├── ValuePillar.tsx             # Piliers de valeurs
│   ├── TestimonialCard.tsx         # Témoignages
│   ├── FAQItem.tsx                 # Items FAQ
│   └── ...
├── lib/
│   ├── values.ts                   # Valeurs & Manifeste
│   ├── testimonials.ts             # Témoignages
│   ├── faq.ts                      # Questions FAQ
│   └── ...
└── public/
    ├── icons/                      # Icônes (icons8)
    ├── images/                     # Images
    ├── logo-green.png
    ├── logo-light.png
    └── ...
```

### Conventions de Code

#### Composants React
```tsx
// Toujours utiliser 'use client' si état ou hooks
'use client'

import { useState } from 'react'

export default function ComponentName() {
  // State
  const [state, setState] = useState(false)

  // Handlers
  const handleClick = () => {
    setState(true)
  }

  // Render
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

#### Styling
```tsx
// Préférer CSS variables pour les couleurs
<div style={{
  backgroundColor: 'var(--color-primary-green)',
  color: 'var(--color-primary-beige)',
  fontFamily: 'var(--font-syne)'
}}>
  Content
</div>

// Utiliser Tailwind pour les espacements et responsive
<div className="py-20 md:py-32 container-custom">
  Content
</div>
```

#### Images
```tsx
import Image from 'next/image'

// Toujours spécifier width et height
<Image
  src="/logo-green.png"
  alt="We Are Climbers"
  width={180}
  height={50}
  priority  // Pour les images above-the-fold
/>
```

---

## ✅ RÈGLES DE CONTENU

### Principes d'Écriture

#### 1. Toujours Tutoyer
❌ "Vous pouvez télécharger notre application"
✅ "Tu peux télécharger l'app"

#### 2. Utiliser le Vocabulaire Grimpeur
✅ "Séance", "voie", "bloc", "beta", "enchaîner"
❌ "Workout", "training session", "exercise"

#### 3. Être Direct et Honnête
✅ "On n'est pas parfaits, mais on fait de notre mieux"
❌ "Nous sommes la solution la plus innovante du marché"

#### 4. Pas de Faux Chiffres
❌ "15 000 sessions enregistrées" (si pas vrai)
✅ "Lancement du crowdfunding en Mai 2026"

#### 5. Émotion Avant Technique
❌ "Précision de 99,4% avec capteur optique 9 LED"
✅ "Tu l'oublies pendant la grimpe. Mais lui, il n'oublie rien."
→ Puis mentionner les specs en petit

### Structure des Sections

Chaque section importante suit ce pattern :

1. **Titre accrocheur** (Syne, uppercase, primary-green)
2. **Phrase d'accroche émotionnelle** (Roboto, large)
3. **Explication détaillée** (Roboto, medium)
4. **Specs/détails techniques** (Roboto, small, en dernier)
5. **CTA** (Bouton orange ou vert)

### CTAs (Call-to-Actions)

#### CTAs Principaux
- "Rejoins le mouvement" (orange)
- "Découvre notre histoire" (orange)
- "Reste informé du crowdfunding" (beige avec bordure)

#### CTAs Secondaires
- "En savoir plus →" (texte orange)
- "Découvre les capteurs →" (bouton secondary)
- "Télécharge l'app" (bouton primary - quand disponible)

---

## 🎯 OBJECTIFS & KPIs

### Objectifs du Site (Pré-Crowdfunding)

1. **Notoriété** : Faire connaître We Are Climbers
2. **Liste d'attente** : Collecter emails pour crowdfunding Mai 2026
3. **Storytelling** : Humaniser la marque avec l'histoire de Julien
4. **Crédibilité** : Montrer la démarche scientifique (INSEP)
5. **Différenciation** : Cycle menstruel + éco-conception

### KPIs à Suivre (Post-Lancement)

#### Engagement
- Temps moyen sur site : **Objectif 3-5 minutes**
- Bounce rate : **Objectif <40%**
- Pages par session : **Objectif 3-4 pages**

#### Conversion
- Taux de conversion formulaire contact : **Objectif 5-10%**
- Lecture complète page /histoire : **Objectif 40-60%**
- Clics CTA "Rester informé" : **Objectif 10-15%**

#### SEO
- Trafic organique : **Objectif 1000 visites/mois à M+3**
- Top 10 Google pour "app escalade cycle menstruel"
- Backlinks de qualité : **Objectif 10+ à M+6**

---

## 🚀 ROADMAP & PROCHAINES ÉTAPES

### Phase 1 : Finitions (Janvier 2026) ✅ 85% COMPLÉTÉ

- [x] Homepage avec section "Qui sommes-nous"
- [x] Page /histoire (storytelling Julien)
- [x] Page /mission (4 engagements RSE)
- [x] Page /capteurs (analyse physiologique)
- [x] Page /contact
- [x] Page /roadmap-rse
- [x] Page /specifications-techniques
- [x] Page /privacy
- [ ] Page /terms (Conditions Générales) - À CRÉER
- [ ] Page /cookies (Politique de Cookies) - À CRÉER
- [X] Peaufinage Hero homepage
- [X] Réécriture carte "Entraînement intentionnel"

### Phase 2 : Optimisations (Février 2026)

- [ ] Optimisation SEO (meta tags, Open Graph)
- [ ] Optimisation images (compression WebP)
- [ ] Test responsive mobile complet
- [ ] Audit accessibilité (WCAG AA)
- [ ] Intégration Google Analytics / Plausible
- [ ] Configuration formulaire contact (backend)

### Phase 3 : Pré-Crowdfunding (Mars-Avril 2026)

- [ ] Landing page crowdfunding
- [ ] Newsletter (Mailchimp / Brevo)
- [ ] Campagne Instagram / TikTok
- [ ] Vidéo manifeste (cf. SCRIPT_VIDEO_MANIFESTE_WAC.md)
- [ ] Partenariats salles d'escalade
- [ ] Articles de blog (SEO)

### Phase 4 : Crowdfunding (Mai 2026)

- [ ] Lancement campagne
- [ ] Live updates sur site
- [ ] Compteur objectifs en temps réel
- [ ] Badges "Early Supporter"

---

## 📚 RESSOURCES & RÉFÉRENCES

### Documentation Projet

- **REFONTE_SITE_MARKETING_EMOTIONNEL_V2.md** : Stratégie marketing complète
- **SCRIPT_VIDEO_MANIFESTE_WAC.md** : Script vidéo pour réseaux sociaux
- **ETAT_DES_LIEUX_BETA.md** : État de l'app mobile
- **PROJECT-RULES.md** : Ce document

### Inspirations Design & Marketing

- **Patagonia** (patagonia.com) : Storytelling émotionnel, éco-responsabilité
- **YETI** (yeti.com) : Lifestyle outdoor, pas de focus produit
- **Allbirds** (allbirds.com) : Transparence carbone, design épuré
- **Who Gives A Crap** (whogivesacrap.org) : Ton décalé, mission claire

### Sources Scientifiques (Cycle Menstruel)

- Juliette Bergmann : [Entraînement au féminin](https://juliettebergmanescalade.fr/)
- Juliana Antero (INSEP) : Projet Empow'her
- Articles scientifiques sur cycle hormonal et performance

### Outils Utilisés

- **Design** : Figma (si besoin wireframes)
- **Icônes** : Icons8 (licences payées)
- **Images** : Unsplash, Pexels (photos de grimpe)
- **Animations** : AOS Library
- **Analytics** : Google Analytics / Plausible (à configurer)

---

## 🤝 COLLABORATION & RÔLES

### Expert Marketing Émotionnel Outdoor (Claude)

**Rôle** : Conseiller stratégique marketing, rédaction de contenu, cohérence de marque

**Responsabilités** :
- Valider le ton et la voix de tous les contenus
- S'assurer de l'approche "émotion-first"
- Vérifier l'authenticité et la transparence
- Éviter la survente et les faux chiffres
- Optimiser les CTAs et le storytelling

**Rappel pour futures conversations** :
- Toujours privilégier l'émotion avant la technique
- Tutoiement obligatoire
- Vocabulaire grimpeur
- Humble et transparent sur les limites
- Pas de promesses irréalistes

### Julien (Fondateur / Product Owner)

**Rôle** : Vision, décisions stratégiques, validation finale

**Responsabilités** :
- Valider les contenus liés à son histoire personnelle
- Décider des priorités de développement
- Relations INSEP / scientifiques
- Validation design et UX

---

## ⚠️ POINTS D'ATTENTION CRITIQUES

### À NE JAMAIS FAIRE

1. ❌ **Inventer des chiffres** (utilisateurs, sessions, reviews)
2. ❌ **Faire du greenwashing** (être honnête sur les limites)
3. ❌ **Survendre** ("révolutionnaire", "unique au monde")
4. ❌ **Utiliser du jargon tech** sans explication émotionnelle
5. ❌ **Ignorer l'accessibilité** (contraste, alt text, responsive)
6. ❌ **Copier les concurrents** (rester authentique)

### À Toujours Vérifier

1. ✅ **Tutoiement** partout
2. ✅ **Couleurs du design system** respectées
3. ✅ **Typographie** (Syne pour titres, Roboto pour texte)
4. ✅ **Mobile-first** (90% du trafic sera mobile)
5. ✅ **Animations AOS** pour l'engagement
6. ✅ **Alt text** sur toutes les images
7. ✅ **Liens fonctionnels** (pas de 404)
8. ✅ **CTAs clairs** et cohérents

---

## 📞 CONTACT & SUPPORT

### Informations de Contact

- **Email général** : contact@weareclimbers.fr
- **Support** : support@weareclimbers.fr
- **Instagram** : @wac_weareclimbers

### Crowdfunding

- **Date de lancement** : Mai 2026
- **Objectif** : Financer production bracelets + développement app
- **Plateforme** : À déterminer (Ulule / Kickstarter)

---

**Note Finale** : Ce document est vivant et doit être mis à jour régulièrement au fil de l'évolution du projet. Toute modification majeure doit être documentée avec la date et la raison du changement.

**Version** : 1.0
**Dernière mise à jour** : 21 Janvier 2026
**Prochaine revue** : Avant lancement crowdfunding (Mars 2026)
