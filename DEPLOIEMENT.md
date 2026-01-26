# Déploiement WeAreClimbers Website

## 🌐 Site en Production

**URL**: https://weareclimbers.fr
**Hébergement**: Vercel
**Framework**: Next.js 16.1.1

---

## 📋 Structure du Site

```
/                    → Page d'accueil (homepage redesignée - 9 sections)
/mission             → Vision & Mission WAC
/fonctionnalites     → Fonctionnalités de l'app
/contact             → Page de contact
/roadmap-rse         → Démarche RSE
/telecharger         → Page de téléchargement app
/privacy             → Politique de confidentialité (RGPD)
/terms               → Conditions générales d'utilisation
/cookies             → Politique de cookies
```

---

## 🚀 Déploiement Automatique

### Configuration Actuelle

Le site est configuré pour un **déploiement automatique** via Vercel:

1. **Push sur Git** → Vercel détecte le changement
2. **Build automatique** → Next.js compile le projet
3. **Déploiement** → Mise en ligne automatique
4. **URL mise à jour** → https://weareclimbers.fr

### Aucune action manuelle requise!

Chaque fois que tu fais un `git push`, Vercel redéploie automatiquement.

---

## 🔧 Déploiement Manuel (si nécessaire)

Si tu veux forcer un déploiement manuellement:

```bash
cd /c/Users/julie/weareclimbers-website

# Déploiement preview (test)
npx vercel

# Déploiement production
npx vercel --prod
```

---

## 🌍 Configuration DNS

### Enregistrements OVH Manager

**Enregistrement A** (racine du domaine):
- Type: A
- Nom: @ (ou vide)
- Cible: 76.76.21.98

**Enregistrement CNAME** (www):
- Type: CNAME
- Nom: www
- Cible: cname.vercel-dns.com.

### Vérifier la propagation DNS

```bash
# Vérifier l'enregistrement A
nslookup weareclimbers.fr

# Vérifier le CNAME
nslookup www.weareclimbers.fr
```

Temps de propagation: 10-30 minutes (parfois jusqu'à 48h)

---

## 📝 Modifier la Privacy Policy

La privacy policy est dans `app/privacy/page.tsx`.

Pour mettre à jour:

1. Modifier le fichier `src/constants/legal/privacyPolicy.js` dans le projet principal (WeAreClimbersClean)
2. Copier le contenu dans `app/privacy/page.tsx` du site web
3. Git commit & push
4. Vercel redéploie automatiquement

**Alternative**: Utiliser le script de génération HTML depuis WeAreClimbersClean/legal-pages

---

## 🎨 Charte Graphique

**Couleurs** (voir `app/globals.css`):
- Primary Green: `#265335`
- Primary Beige: `#F5ECE5`
- Secondary Orange: `#F67931`
- Secondary Beige: `#B19580`
- Secondary Beige Light: `#E6D5C7`

**Fonts**:
- Titres: Syne Bold (700) - UPPERCASE pour les titres principaux
- Corps de texte: Roboto (400 - Regular, 500 - Medium, 700 - Bold)

**Style général**:
- Authentique, pas corporate
- Inclusif (tous genres, morphologies, niveaux)
- Bienveillant, pas compétitif
- Emojis utilisés de manière stratégique (badges, sections)

---

## 🔍 URLs Importantes

- **Dashboard Vercel**: https://vercel.com/dashboard
- **OVH Manager**: https://www.ovh.com/manager/
- **Site en production**: https://weareclimbers.fr
- **Privacy Policy**: https://weareclimbers.fr/privacy

---

## 📦 Dépendances

```json
{
  "next": "^16.1.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

---

## 💡 Tips

- **Build local** pour tester: `npm run build && npm start`
- **Dev server**: `npm run dev` (port 3000)
- **Logs Vercel**: Voir dans le dashboard Vercel → Deployments
- **Rollback**: Possible depuis le dashboard Vercel (revenir à un déploiement précédent)

---

## ✅ Checklist Déploiement Complet

### Infrastructure
- [x] Site Next.js créé
- [x] Déployé sur Vercel
- [x] DNS configuré (OVH)
- [x] Domaine custom ajouté (weareclimbers.fr)
- [x] HTTPS activé (automatique Vercel)
- [x] Privacy policy intégrée

### Homepage (Redesign Janvier 2026)
- [x] 9 sections implémentées
- [x] Composants réutilisables créés (Badge, ValuePillar, TestimonialCard, PricingCard, FAQItem)
- [x] Fichiers de données créés (testimonials, faq, pricing, values)
- [x] Header adapté (CTA "Commander mon bracelet", navigation mise à jour)
- [x] Footer adapté (badges éco-conception)
- [x] Mobile-first responsive design
- [ ] **Assets à uploader** (voir `ASSETS_NEEDED.md`)
  - [ ] Photo produit bracelet Polar 360 brandé WAC
  - [ ] Photos profil témoignages (5)
  - [ ] Vidéo hero (optionnel)
  - [ ] Screenshots app mobile (optionnel)

### Tests Avant Production
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test accordion FAQ
- [ ] Test navigation (tous les liens)
- [ ] Test CTAs (téléchargement, commander bracelet)
- [ ] Vérification performance (Lighthouse)
- [ ] Vérification accessibilité (WCAG)

---

## 📁 Architecture Projet (Mise à Jour)

```
weareclimbers-website/
├── app/
│   ├── page.tsx                 # Homepage redesignée (9 sections)
│   ├── layout.tsx               # Layout global avec fonts
│   ├── globals.css              # Styles CSS + variables couleurs
│   ├── mission/                 # Vision & Mission WAC
│   ├── fonctionnalites/
│   ├── roadmap-rse/             # Démarche RSE
│   ├── contact/
│   ├── telecharger/
│   ├── privacy/
│   ├── terms/
│   └── cookies/
├── components/
│   ├── Header.tsx               # Navigation + CTA Commander
│   ├── Footer.tsx               # Footer avec badges
│   ├── Badge.tsx                # Badge component
│   ├── ValuePillar.tsx          # Pilier de valeurs
│   ├── TestimonialCard.tsx      # Carte témoignage
│   ├── PricingCard.tsx          # Carte tarif
│   └── FAQItem.tsx              # Item FAQ avec accordion
├── lib/
│   ├── testimonials.ts          # Données témoignages
│   ├── faq.ts                   # Données FAQ
│   ├── pricing.ts               # Données tarifs
│   └── values.ts                # Données valeurs + manifesto
├── public/
│   ├── logo-green.png           # Logo version verte (header)
│   └── logo-light.png           # Logo version claire (footer)
├── ASSETS_NEEDED.md             # Liste des visuels manquants
└── DEPLOIEMENT.md               # Ce fichier
```

---

**Dernière mise à jour**: 10 Janvier 2026
**Contact**: privacy@weareclimbers.com
**Version Homepage**: 2.0 (Redesign complet)
