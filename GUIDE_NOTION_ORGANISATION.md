# 📋 GUIDE NOTION - ORGANISATION CONTENU WAC

**Projet** : We Are Climbers
**Objectif** : Structurer et gérer ton calendrier éditorial dans Notion
**Durée setup** : 30-45 minutes

---

## 🎯 POURQUOI NOTION ?

✅ **Vue Calendrier** : Voir tous tes posts sur une timeline
✅ **Vue Kanban** : Gérer le statut (À faire → En cours → Publié)
✅ **Vue Table** : Filtrer par pilier, plateforme, date
✅ **Templates intégrés** : Dupliquer un template de post en 2 clics
✅ **Synchronisation** : Accessible partout (desktop, mobile, web)

---

## 🏗️ STRUCTURE NOTION À CRÉER

### Vue d'ensemble

```
📁 WAC - Contenu Marketing
├── 📊 Dashboard (vue d'ensemble)
├── 📅 Calendrier Éditorial (database principale)
├── 📝 Templates de Posts (par type)
├── 🎨 Banque de Visuels (liens + prompts)
├── ✅ Checklist Pré-Publication
└── 📈 Analytics & Retours (tracking mensuel)
```

---

## 📊 1. CRÉER LA BASE DE DONNÉES "CALENDRIER ÉDITORIAL"

### Étape 1 : Créer une nouvelle Base de données

1. Ouvre Notion
2. Crée une nouvelle page : **"WAC - Calendrier Éditorial"**
3. Tape `/base` ou `/tableau` → Sélectionne **"Tableau - En ligne"** (ou **"Table - Inline"** si Notion en anglais)
4. Nomme la base de données : **"Posts WAC"**

### Étape 2 : Configurer les propriétés (colonnes)

**Comment ajouter une propriété :**
- Clique sur le **"+"** à droite du dernier en-tête de colonne
- OU clique sur les **"..."** en haut à droite → **"Propriétés"** → **"+ Nouvelle propriété"**

Voici les **propriétés à créer** (dans l'ordre) :

| **Nom de la propriété** | **Type de propriété** | **Options** |
|-------------------------|----------|-------------|
| **Titre du post** | Titre | (par défaut, déjà créé) |
| **Date de publication** | Date | Activer "Inclure l'heure" (ou "Include time") |
| **Statut** | Sélection | 🔵 À faire, 🟡 En cours, 🟢 Publié, 🔴 Annulé |
| **Plateforme** | Sélection multiple | Instagram Feed, Instagram Stories, Instagram Reel, LinkedIn Post, LinkedIn Article |
| **Pilier** | Sélection | 1. Transparence radicale, 2. Anti-comparaison, 3. Prévention obsessionnelle, 4. Communauté bienveillante, 5. Éco-responsabilité brutale, 6. Teasing produit |
| **Type de contenu** | Sélection | Photo, Carousel, Reel, Stories, Article long, Post court, Meme/Humour |
| **Texte/Légende** | Texte | (zone de texte longue) |
| **Visuel** | URL | (lien vers image ou prompt) |
| **CTA** | Texte | (appel à l'action du post) |
| **Hashtags** | Texte | (liste hashtags) |
| **Engagement** | Nombre | (likes + commentaires, à remplir après publication) |
| **Notes** | Texte | (remarques, idées, retours) |

**Types de propriétés en français dans Notion :**
- **Titre** = propriété principale (existe par défaut)
- **Texte** = champ texte court
- **Date** = calendrier + option heure
- **Sélection** = choix unique dans une liste (Select)
- **Sélection multiple** = plusieurs choix possibles (Multi-select)
- **Nombre** = chiffres uniquement
- **URL** = lien web

### Étape 3 : Créer les options pour "Statut"

1. Clique sur l'**en-tête de colonne "Statut"**
2. Dans le menu qui s'ouvre, clique sur **"Modifier la propriété"**
3. Ajoute ces 4 options en cliquant sur **"+ Nouvelle option"** :
   - 🔵 À faire
   - 🟡 En cours
   - 🟢 Publié
   - 🔴 Annulé

**Astuce** : Pour ajouter l'émoji, copie/colle l'émoji directement dans le nom de l'option

### Étape 4 : Créer les options pour "Pilier"

1. Clique sur l'**en-tête de colonne "Pilier"**
2. Dans le menu, clique sur **"Modifier la propriété"**
3. Ajoute ces 6 options en cliquant sur **"+ Nouvelle option"** :
   - 1️⃣ Transparence radicale (25%)
   - 2️⃣ Anti-comparaison (20%)
   - 3️⃣ Prévention obsessionnelle (20%)
   - 4️⃣ Communauté bienveillante (15%)
   - 5️⃣ Éco-responsabilité brutale (10%)
   - 6️⃣ Teasing produit (10%)

4. **Personnalise les couleurs** (survole une option → clic sur les **"..."** → **"Couleur"**) :
   - Transparence radicale → Orange
   - Anti-comparaison → Vert
   - Prévention obsessionnelle → Bleu
   - Communauté bienveillante → Rose
   - Éco-responsabilité brutale → Vert foncé
   - Teasing produit → Violet

---

## 📅 2. CRÉER LES VUES

**Comment créer une nouvelle vue :**
- En haut à droite de ta base de données, clique sur **"+ Nouvelle vue"** (ou **"+ New view"** si en anglais)

### Vue 1 : Tableau (par défaut)

**Usage** : Voir tous les posts en tableau, filtrer, trier

**Configuration** :
1. En haut à droite → **"+ Nouvelle vue"** → **"Tableau"** (ou **"Table"**)
2. Nomme la vue : **"📊 Vue Table Complète"**
3. **Trier** : Clique sur **"Trier"** (en haut) → Ajoute **"Date de publication"** → **Croissant** (du plus ancien au plus récent)
4. **Filtres** : Aucun (vue complète de tous les posts)

### Vue 2 : Calendrier

**Usage** : Visualiser les posts sur une timeline

**Configuration** :
1. En haut à droite → **"+ Nouvelle vue"** → **"Calendrier"** (ou **"Calendar"**)
2. Nomme la vue : **"📅 Calendrier"**
3. **Présenter par** (ou **"Layout by"**) : Sélectionne **"Date de publication"**
4. **Afficher** : Coche **"Aperçu de carte"** (ou **"Card preview"**) pour voir un aperçu du contenu
5. **Propriétés visibles** : Active Statut, Plateforme, Pilier (clique sur **"Propriétés"** en haut à droite)

**Astuce** : Glisse-dépose les posts pour changer la date directement dans le calendrier !

### Vue 3 : Kanban (par statut)

**Usage** : Gérer le workflow (À faire → En cours → Publié)

**Configuration** :
1. En haut à droite → **"+ Nouvelle vue"** → **"Tableau"** (ou **"Board"**)
2. Nomme la vue : **"📋 Kanban par Statut"**
3. **Grouper par** (ou **"Group by"**) : Sélectionne **"Statut"**
4. **Propriétés visibles** : Active Date, Plateforme, Pilier
5. **Trier** : Par "Date de publication" (croissant)

**Utilisation** :
- Glisse un post de la colonne "🔵 À faire" → "🟡 En cours" quand tu commences à travailler dessus
- Glisse vers "🟢 Publié" une fois en ligne

### Vue 4 : Chronologie (optionnel, très visuel)

**Usage** : Vue type Gantt pour voir la progression dans le temps

**Configuration** :
1. En haut à droite → **"+ Nouvelle vue"** → **"Chronologie"** (ou **"Timeline"**)
2. Nomme la vue : **"📈 Chronologie"**
3. **Présenter par** : "Date de publication"
4. **Colorer par** : "Pilier" (chaque pilier aura sa couleur définie à l'étape précédente)

---

## 📝 3. CRÉER LES MODÈLES DE POSTS

**Comment créer un modèle (template) :**
1. Dans ta base de données, clique sur la petite **flèche ▼** à côté du bouton **"Nouveau"** (ou **"New"**)
2. Sélectionne **"+ Nouveau modèle"** (ou **"+ New template"**)
3. Nomme ton modèle et remplis-le

### Modèle 1 : Post Instagram Feed (Carousel)

1. Dans la base de données, clique sur **"Nouveau ▼"** → **"+ Nouveau modèle"**
2. Nomme le modèle : **"📸 Instagram Carousel"**
3. Remplis les champs par défaut :

```
Titre du post : [À remplir]
Plateforme : Instagram Feed
Type de contenu : Carousel
Statut : 🔵 À faire

---

## Structure Carousel

**Slide 1 - Cover :**
- Visuel : [Description ou lien]
- Texte overlay : [Titre accrocheur]
- Emoji : [Si pertinent]

**Slide 2-3 :**
- Contenu principal
- Points clés
- Format lisible

**Slide 4 - CTA :**
- Message final
- Call-to-action
- Logo WAC

---

## Légende Instagram

[Hook première ligne - max 15 mots]

[Corps du texte - storytelling/valeur]

[Émotion/Question]

[CTA]

[Hashtags : 5-10]

---

## Visuel

**Prompt IA (si génération) :**
[Prompt Midjourney/Leonardo]

**OU lien banque d'images :**
[URL Unsplash/Pexels]

---

## Checklist avant publication

- [ ] Tutoiement respecté
- [ ] Vocabulaire grimpeur utilisé
- [ ] Pas de survente
- [ ] CTA clair
- [ ] Hashtags pertinents
- [ ] Visuel aligné avec texte
- [ ] Contraste suffisant texte/fond
```

### Modèle 2 : Post Instagram Reel

Crée un nouveau modèle : **"🎬 Instagram Reel"**

```
Titre du post : [À remplir]
Plateforme : Instagram Reel
Type de contenu : Reel
Statut : 🔵 À faire

---

## Script Reel

**Durée** : [15s / 30s / 60s]

### Timeline

**[0-3s] HOOK**
- Visuel : [Description]
- Texte overlay : [Texte accrocheur]
- Voix off/Texte : [Ce qui est dit]

**[3-X s] CORPS**
- Visuel : [Montage/plans]
- Texte overlay : [Points clés]
- Voix off : [Narration]

**[X-fin] CTA**
- Visuel : Logo WAC
- Texte overlay : [CTA]

---

## Légende Reel

[Résumé court du reel]

[Message clé]

[Hashtags]

---

## Production

**Tournage** :
- [ ] Face caméra OU voix off + B-roll
- [ ] Lumière naturelle
- [ ] Son clair (micro-cravate si possible)

**Montage (CapCut)** :
- [ ] Sous-titres ajoutés (OBLIGATOIRE)
- [ ] Musique discrète (30-40%)
- [ ] Transitions dynamiques
- [ ] Export 1080p, 9:16

---

## Checklist

- [ ] Sous-titres lisibles
- [ ] Hook dans les 3 premières secondes
- [ ] Message clair (1 idée par reel)
- [ ] CTA final
- [ ] Musique non stressante
```

### Modèle 3 : Post LinkedIn Long

Crée un nouveau modèle : **"💼 LinkedIn Article Long"**

```
Titre du post : [À remplir]
Plateforme : LinkedIn Article
Type de contenu : Article long
Statut : 🔵 À faire

---

## Titre LinkedIn

[Titre accrocheur - max 100 caractères]

---

## Structure

**HOOK (2-3 lignes) :**
[Phrase qui capte l'attention]

**CONTEXTE :**
[Situation, problème, observation]

**DÉVELOPPEMENT :**
[Corps de l'article - 600-1000 mots]
- Point 1
- Point 2
- Point 3

**CONCLUSION :**
[Leçon, message clé]

**CTA :**
[Appel à l'action]

**SIGNATURE :**
Julien
Fondateur, We Are Climbers

---

🔗 [Lien site/liste d'attente]

---

## Hashtags LinkedIn

[5-8 hashtags professionnels]

---

## Visuel

[Photo/infographie professionnelle]
Format : 1200x627px ou 1200x1200px

---

## Checklist

- [ ] Ton professionnel mais authentique
- [ ] Pas de jargon inutile
- [ ] Storytelling émotionnel
- [ ] Transparence radicale
- [ ] CTA clair
```

### Modèle 4 : Stories Instagram

Crée un nouveau modèle : **"📱 Instagram Stories"**

```
Titre du post : [À remplir]
Plateforme : Instagram Stories
Type de contenu : Stories
Statut : 🔵 À faire

---

## Série de Stories (5-8 stories)

**Story 1 :**
- Visuel : [Description]
- Texte : [Court, 2 lignes max]
- Sticker : [Sondage/Question/Countdown]

**Story 2 :**
- Visuel : [...]
- Texte : [...]

**Story 3 :**
- [...]

**Story 4-5 :**
- Repost réponses communauté
- Tag + remerciement

**Story finale :**
- Teasing prochain post
- CTA lien bio

---

## Checklist Stories

- [ ] Format 1080x1920px (9:16)
- [ ] Texte lisible (police "Moderne" Instagram)
- [ ] Couleurs WAC (vert/beige/orange)
- [ ] Stickers interactifs (engagement)
- [ ] Pas de surcharge visuelle
```

---

## 🎨 4. CRÉER LA PAGE "BANQUE DE VISUELS"

### Structure de la page

Crée une nouvelle page : **"🎨 Banque de Visuels WAC"**

```markdown
# 🎨 BANQUE DE VISUELS WAC

## 📸 Banques d'images gratuites

### Unsplash
- Lien : https://unsplash.com
- Mots-clés prioritaires :
  - "indoor climbing"
  - "bouldering gym"
  - "rock climbing hands"
  - "climbing chalk"
  - "athlete recovery"

### Pexels
- Lien : https://pexels.com
- Mots-clés : "climbing training", "sport motivation"

### Pexels Videos
- Lien : https://pexels.com/videos
- Mots-clés : "climbing slow motion", "bouldering training"

---

## 🤖 Prompts IA (Midjourney / Leonardo.ai)

### Style général WAC
```
[Sujet], natural lighting, authentic documentary style, earthy color palette #265335 #F5ECE5, minimalist composition, soft focus, candid moment, climbing gym atmosphere, --ar 1:1 --style raw --v 6
```

### Catégories de prompts

**Communauté & Culture grimpe :**
```
Two climbers supporting each other in indoor gym, natural camaraderie, documentary photography, warm lighting, authentic moment, earthy tones, --ar 1:1
```

**Prévention & Santé :**
```
Athlete stretching fingers and wrists before climbing, close-up on hands, educational moment, natural light, professional healthcare photography, --ar 1:1
```

**Éco-conception :**
```
Sustainable wristband on natural wood surface, eco materials visible, soft daylight, product photography, earthy palette, simple composition, --ar 1:1
```

**Inspiration & Lifestyle :**
```
Female climber looking up at wall with determination, profile shot, dramatic side lighting, authentic focus moment, gym atmosphere, inspirational, --ar 1:1
```

**Storytelling Julien :**
```
Young entrepreneur coding late evening, laptop glow, coffee cup, scattered notes, authentic hustle, warm dim lighting, motivational startup vibe, --ar 1:1
```

---

## 🎨 Outils de création

- **Canva** : canva.com (carousels, stories)
- **CapCut** : capcut.com (montage reels)
- **Leonardo.ai** : leonardo.ai (génération images IA)
- **Photopea** : photopea.com (édition photos)

---

## 📐 Formats & Dimensions

| Type | Dimensions | Ratio |
|------|------------|-------|
| Instagram Feed (carré) | 1080 x 1080 px | 1:1 |
| Instagram Stories | 1080 x 1920 px | 9:16 |
| Instagram Reel | 1080 x 1920 px | 9:16 |
| LinkedIn Post | 1200 x 627 px | 1.91:1 |
```

---

## ✅ 5. CRÉER LA CHECKLIST PRÉ-PUBLICATION

Crée une nouvelle page : **"✅ Checklist Avant Publication"**

```markdown
# ✅ CHECKLIST PRÉ-PUBLICATION WAC

## 📝 Contenu & Ton

- [ ] **Tutoiement** respecté partout (tu/ton/toi)
- [ ] **Vocabulaire grimpeur** utilisé (session, voie, bloc, beta)
- [ ] **Pas de survente** ("révolutionnaire", "unique", "innovant")
- [ ] **Ton direct & franc** (pas de langue de bois)
- [ ] **Authenticité** > Perfection
- [ ] **Émotion** avant technique
- [ ] **CTA clair** (question, lien, tag quelqu'un)

---

## 🎨 Visuel & Design

- [ ] **Couleurs WAC** respectées (vert #265335, beige #F5ECE5, orange #F67931 accent)
- [ ] **Police Syne** pour titres (ou équivalent)
- [ ] **Police Roboto** pour corps de texte
- [ ] **Logo WAC** présent (discret)
- [ ] **Style authentique** (pas de filtre saturé)
- [ ] **Résolution correcte** (min 1080px)
- [ ] **Texte lisible** (taille min 24pt, contraste suffisant)
- [ ] **Format adapté** (1:1 feed, 9:16 reels/stories)

---

## ♿ Accessibilité

- [ ] **Contraste suffisant** texte/fond (min 4.5:1)
- [ ] **Texte alternatif** ajouté sur images
- [ ] **Sous-titres** sur vidéos (OBLIGATOIRE pour reels)

---

## 📱 Plateforme-specific

### Instagram Feed
- [ ] Légende max 2200 caractères (idéal 150-250 mots)
- [ ] Première ligne captivante (max 15 mots)
- [ ] Hashtags 5-10 pertinents
- [ ] Pas d'émojis à chaque ligne

### Instagram Reel
- [ ] Durée 15-60s
- [ ] Hook dans les 3 premières secondes
- [ ] Sous-titres OBLIGATOIRES
- [ ] Musique discrète (30-40% volume)
- [ ] Export 1080p, 9:16, 30fps

### Instagram Stories
- [ ] Format 1080x1920px
- [ ] Texte court (max 2 lignes)
- [ ] Stickers interactifs (engagement)
- [ ] Cohérence visuelle (couleurs WAC)

### LinkedIn
- [ ] Ton professionnel mais authentique
- [ ] Pas de jargon inutile
- [ ] Storytelling émotionnel
- [ ] 5-8 hashtags pros
- [ ] Visuel 1200x627px ou 1200x1200px

---

## 🚀 Avant de publier

- [ ] **Relecture orthographe** (Grammarly ou LanguageTool)
- [ ] **Test liens** (si lien en bio ou dans post)
- [ ] **Heure de publication** optimale (voir analytics)
- [ ] **Programmation** (si utilisation Buffer/Later/Meta Business Suite)

---

## 📊 Après publication

- [ ] **Répondre aux commentaires** dans les 2h
- [ ] **Enregistrer dans Notion** (engagement, retours)
- [ ] **Analyser performance** après 48h
- [ ] **Ajuster stratégie** si besoin
```

---

## 📈 6. CRÉER LE DASHBOARD

Crée une nouvelle page : **"📊 Dashboard WAC"**

```markdown
# 📊 DASHBOARD WAC - Vue d'ensemble

## 🎯 Objectifs Crowdfunding Mai 2026

- **Liste email** : 200-500 inscrits
- **Followers Instagram** : 400-600
- **Followers LinkedIn** : 500-800
- **Engagement rate Insta** : 10-15%

---

## 📅 Cette semaine

**Lien vers Calendrier →** [Lien vers ta database]

**Posts à publier cette semaine :** [Vue filtrée]

---

## 📊 Statistiques actuelles (à jour : [Date])

### Instagram
- Followers : [X]
- Engagement rate moyen : [X]%
- Top post du mois : [Lien]

### LinkedIn
- Followers : [X]
- Engagement moyen : [X] réactions/post

### Liste email
- Inscrits : [X]

---

## 🎨 Répartition piliers (objectif vs réel)

| Pilier | Objectif | Réel mois en cours |
|--------|----------|---------------------|
| Transparence radicale | 25% | [X]% |
| Anti-comparaison | 20% | [X]% |
| Prévention obsessionnelle | 20% | [X]% |
| Communauté bienveillante | 15% | [X]% |
| Éco-responsabilité brutale | 10% | [X]% |
| Teasing produit | 10% | [X]% |

---

## 📝 Actions prioritaires

- [ ] [Action 1]
- [ ] [Action 2]
- [ ] [Action 3]

---

## 💡 Idées de posts

- [Idée 1]
- [Idée 2]
- [Idée 3]

---

## 🔗 Liens rapides

- [Calendrier Éditorial](lien)
- [Templates de Posts](lien)
- [Banque de Visuels](lien)
- [Checklist Pré-Publication](lien)
- [Analytics & Retours](lien)
```

---

## 🚀 7. WORKFLOW HEBDOMADAIRE RECOMMANDÉ

### Dimanche soir (30 min) - Planification

1. Ouvre le **Dashboard**
2. Regarde le **Calendrier** de la semaine à venir
3. Vérifie que tous les posts ont :
   - Statut = 🔵 À faire
   - Texte/Légende rédigée
   - Visuel identifié (prompt ou lien)
4. Identifie les posts prioritaires

### Lundi-Mercredi-Vendredi matin (1h) - Création

1. Ouvre la **Vue Kanban**
2. Passe 1 post de "À faire" → "En cours"
3. Crée le visuel (Canva/CapCut)
4. Finalise la légende
5. Vérifie la **Checklist Pré-Publication**
6. Passe le post → "Publié" (ou programme)

### Quotidien (10-15 min) - Engagement

1. Réponds aux commentaires
2. Poste 2-3 Stories spontanées (behind-the-scenes)
3. Interagis avec la communauté

### Fin de mois (1h) - Analyse

1. Ouvre la **Vue Table**
2. Remplis la colonne "Engagement" pour tous les posts publiés
3. Identifie :
   - Top 3 posts du mois
   - Format le plus performant
   - Pilier le plus engageant
4. Ajuste le calendrier du mois suivant

---

## 📱 8. UTILISER NOTION MOBILE

### Créer un post en déplacement

1. Ouvre l'app Notion
2. Va dans **"Calendrier Éditorial"**
3. Clique **"+"** en bas
4. Sélectionne le **template** approprié
5. Remplis les champs (même partiellement)
6. Statut = "🔵 À faire"
7. Finalise plus tard sur desktop

### Publier depuis ton téléphone

1. Ouvre le post dans Notion
2. Copie la **Légende** complète
3. Ouvre Instagram/LinkedIn
4. Colle la légende
5. Ajoute le visuel (depuis Canva mobile)
6. Publie
7. Retour Notion → Statut = "🟢 Publié"

---

## 💡 ASTUCES NOTION AVANCÉES

### Astuce 1 : Relations entre databases

Si tu crées une database **"Idées de posts"** :
- Relie-la à ta database **"Calendrier Éditorial"**
- Transforme une idée en post planifié en 1 clic

### Astuce 2 : Formules automatiques

Ajoute une propriété **"Jours restants avant CF"** :
```
dateBetween(prop("Date de publication"), now(), "days")
```

### Astuce 3 : Modèles de modèles

Crée un modèle **"Modèle Vierge"** :
- Toutes les sections vides
- Checklist complète
- Dupliquer pour créer un nouveau type de post rapidement

### Astuce 4 : Rappels automatiques

Sur chaque post :
- Clique sur la date
- Active **"Me rappeler"** (ou **"Remind"**)
- Choisis **"1 jour avant"** (ou "1 day before") pour recevoir une notification

---

## 🎁 BONUS : IMPORT RAPIDE DU CALENDRIER

### Option 1 : Import CSV

1. Crée un fichier CSV avec colonnes :
   ```
   Titre,Date,Statut,Plateforme,Pilier,Type
   ```

2. Dans Notion, clique sur **"..."** (menu 3 points) sur ta base de données → **"Fusionner avec un CSV"** (ou **"Merge with CSV"**)

3. Mappe les colonnes (associe chaque colonne du CSV à une propriété Notion)

4. Clique sur **"Importer"** !

### Option 2 : Copie manuelle depuis le markdown

1. Ouvre **CALENDRIER_EDITORIAL_CF_2026_V2.md**
2. Pour chaque post, crée une nouvelle entrée dans Notion :
   - **Titre** = Date + Type (ex: "21 Janv - Carousel Transparence")
   - Copie/colle la **légende complète** dans le champ "Texte/Légende"
   - Remplis les **propriétés** (Date, Statut, Plateforme, Pilier, Type)

---

## ✅ CHECKLIST SETUP NOTION (30-45 min)

- [ ] Base de données "Calendrier Éditorial" créée
- [ ] 12 propriétés configurées (Titre, Date, Statut, Plateforme, Pilier, Type, Texte, Visuel, CTA, Hashtags, Engagement, Notes)
- [ ] Options "Statut" et "Pilier" ajoutées avec émojis et couleurs
- [ ] 4 vues créées (Tableau, Calendrier, Kanban, Chronologie)
- [ ] 4 modèles de posts créés (Carousel, Reel, LinkedIn, Stories)
- [ ] Page "Banque de Visuels" créée
- [ ] Page "Checklist Pré-Publication" créée
- [ ] Dashboard créé avec liens
- [ ] 5 premiers posts importés (test)
- [ ] App Notion mobile installée

---

## 🚀 PROCHAINES ÉTAPES

1. **Setup Notion** (30-45 min avec ce guide)
2. **Importer posts Janvier-Février** (1h)
3. **Créer tes 5 premiers visuels** (2h)
4. **Programmer 1 semaine de posts** (30 min)
5. **Publier ton premier post WAC V2** 🎉

---

**Tu es prêt à gérer ton contenu comme un pro ! 💪**

**Questions ? Reviens vers moi, je t'aide à ajuster. 🚀**

**We Are Climbers.**
