# We Are Climbers - Site Vitrine

Site vitrine officiel de We Are Climbers, l'application et les bracelets connectés pour grimpeurs.

## Technologies

- **Next.js 16** - Framework React avec SSR/SSG
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Google Fonts** - SYNE (titres) et Roboto (textes)

## Charte Graphique

Le site respecte la charte graphique We Are Climbers :

### Couleurs
- **Primaires** : Vert #265335 et Beige #F5ECE5
- **Secondaires** : Orange #F67931 (accent), Beiges #B19580 et #E6D5C7

### Typographies
- **Titres** : SYNE Bold, majuscules, interlettrage -6%
- **Textes** : Roboto, minuscules, interlignage +30%

## Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
weareclimbers-website/
├── app/                        # Pages Next.js (App Router)
│   ├── page.tsx               # Page d'accueil
│   ├── mission/               # Notre Mission
│   ├── fonctionnalites/       # Fonctionnalités
│   ├── contact/               # Contact
│   ├── roadmap-rse/           # Roadmap RSE
│   ├── layout.tsx             # Layout principal
│   └── globals.css            # Styles globaux
├── components/                 # Composants réutilisables
│   ├── Header.tsx             # En-tête avec navigation
│   └── Footer.tsx             # Pied de page
├── public/                     # Fichiers statiques (logos, images)
├── tailwind.config.js         # Configuration Tailwind
├── tsconfig.json              # Configuration TypeScript
└── next.config.js             # Configuration Next.js
```

## Pages

- **/** - Accueil avec présentation des produits
- **/mission** - Notre mission et nos valeurs
- **/fonctionnalites** - Fonctionnalités de l'app et des bracelets
- **/contact** - Formulaire de contact
- **/roadmap-rse** - Feuille de route RSE

## Déploiement

### Option 1 : Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Option 2 : OVH
1. Builder le projet : `npm run build`
2. Uploader le dossier `.next`, `public`, et `node_modules` sur votre serveur
3. Configurer Node.js sur OVH
4. Lancer avec `npm start`

## Prochaines Étapes

- [ ] Ajouter les vrais logos et images
- [ ] Intégrer les liens App Store / Google Play
- [ ] Configurer le formulaire de contact (backend)
- [ ] Ajouter Google Analytics
- [ ] Optimiser les images (Next Image)
- [ ] Ajouter les animations (Framer Motion)
- [ ] Intégration future avec Shopify pour les bracelets
- [ ] SEO avancé (sitemap, robots.txt, meta tags)

## Notes Importantes

### Assets Manquants
Pour compléter le site, il faudra ajouter :
- Logo WAC (SVG de préférence) dans `/public/logo.svg`
- Images de démonstration de l'app
- Photos de grimpeurs (conformes à la charte)
- Icônes pour App Store et Google Play

### Configuration DNS
Pour pointer `weareclimbers.fr` vers le site :
1. Aller dans la configuration DNS chez OVH
2. Ajouter un enregistrement A pointant vers l'IP du serveur
3. Ajouter un CNAME pour www

## Support

Pour toute question technique :
- Email : contact@weareclimbers.fr
- Documentation Next.js : https://nextjs.org/docs

---

© 2025 We Are Climbers - Tous droits réservés
