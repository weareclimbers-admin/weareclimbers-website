# 🚨 AUDIT CALENDRIERS MARS/AVRIL - PROBLÈMES DÉTECTÉS

**Date audit :** 9 février 2025
**Calendriers concernés :** MARS 2026 + AVRIL 2026

---

## ❌ PROBLÈME #1 : JOURS DE LA SEMAINE FAUX

### **MARS 2026 - TOUT DÉCALÉ DE +1 JOUR**

| **Date** | **Jour dans calendrier** | **Vrai jour** | **Statut** |
|----------|--------------------------|---------------|------------|
| 3 mars | Lundi | **MARDI** | ❌ FAUX |
| 4 mars | Mardi | **MERCREDI** | ❌ FAUX |
| 5 mars | Mercredi | **JEUDI** | ❌ FAUX |
| 6 mars | Jeudi | **VENDREDI** | ❌ FAUX |
| 7 mars | Vendredi | **SAMEDI** | ❌ FAUX |
| 8 mars | Samedi | **DIMANCHE** | ❌ FAUX |
| ... | ... | ... | ❌ **TOUT DÉCALÉ** |

**Impact :** TOUS les jours du calendrier MARS sont faux (décalage +1 jour)

---

### **AVRIL 2026 - TOUT DÉCALÉ DE +1 JOUR**

| **Date** | **Jour dans calendrier** | **Vrai jour** | **Statut** |
|----------|--------------------------|---------------|------------|
| 31 mars | Lundi | **MARDI** | ❌ FAUX |
| 1er avril | Mardi | **MERCREDI** | ❌ FAUX |
| 2 avril | Mercredi | **JEUDI** | ❌ FAUX |
| 3 avril | Jeudi | **VENDREDI** | ❌ FAUX |
| ... | ... | ... | ❌ **TOUT DÉCALÉ** |

**Impact :** TOUS les jours du calendrier AVRIL sont faux (décalage +1 jour)

---

## ❌ PROBLÈME #2 : RÉPÉTITIONS DE CONTENU JANVIER/FÉVRIER

### **Contenus quasi-identiques détectés :**

#### **1. LinkedIn 6 mars (MARS) = LinkedIn "Pourquoi Polar" (FÉVRIER)**

**Post février (déjà fait) :**
> Pourquoi on travaille avec Polar (et pas conçu notre propre bracelet)
> - On ne conçoit PAS le bracelet
> - On travaille avec Polar
> - Pourquoi ? 89€ de R&D...
> - Specs : pas d'écran, robuste, réparable...

**Post mars 6 (répétition) :**
> Pourquoi on travaille avec Polar. Specs, prix, choix assumés.
> - On ne conçoit PAS le bracelet
> - Pourquoi Polar ?
> - **Ajout pricing** (seule différence)
> - Mêmes specs

**Verdict :** ⚠️ 80% identique (sauf pricing révélé)

---

#### **2. Reel 9 mars (MARS) = Post carousel "Ce que WAC ne fera JAMAIS" (JANVIER)**

**Post janvier (déjà fait) :**
> Ce que WAC ne fera JAMAIS.
> - Jamais de classement public mondial
> - Jamais de notifications culpabilisantes
> - Jamais de comparaison avec 10 000 inconnus

**Reel mars 9 (répétition) :**
> Script : "Ce que WAC ne fera JAMAIS."
> - Jamais de classement mondial toxique
> - Jamais de notifications qui te culpabilisent
> - Jamais de comparaison avec 10 000 inconnus

**Verdict :** ⚠️ 90% identique (même message, format différent)

---

#### **3. Carousel "Pourquoi WAC n'a PAS de leaderboard" - RÉPÉTÉ**

**JANVIER - Carousel :**
> Pourquoi WAC n'a PAS de leaderboard
> - Les autres apps adorent les classements
> - "Tu es 234ème"
> - Chez WAC : pas de leaderboard public global

**MARS 27 janvier - Carousel identique :**
> Pourquoi WAC n'a PAS de leaderboard
> - Les apps d'escalade : "Tu es 12 487e"
> - Chez WAC, on a fait un choix radical
> - Pas de leaderboard PUBLIC GLOBAL

**Verdict :** ⚠️ 95% identique

---

#### **4. Contenus "Repos valorisé" - RÉPÉTÉS PLUSIEURS FOIS**

**Répétitions détectées :**
- Janvier : Carousel "Le repos est une donnée"
- Février : Carousel "4 signaux que ton corps a besoin de REPOS"
- **Mars 17** : Carousel "Le repos est une donnée scientifique" ← **QUASI-IDENTIQUE à janvier**
- Mars 24 : Carousel "Le repos est une donnée" ← **ENCORE**

**Verdict :** ⚠️ Même message répété 4 fois (angles légèrement différents mais lassant)

---

#### **5. Contenus "Cycle menstruel" - RÉPÉTÉS**

**Répétitions détectées :**
- Janvier : Aucun
- Février : Carousel cycle menstruel (J1-J14 / J15-J28)
- **Mars 5** : Carousel cycle menstruel (J1-J14 / J15-J28) ← **IDENTIQUE**
- **Mars 8** : Carousel cycle menstruel (Journée des Droits des Femmes) ← **ENCORE**

**Verdict :** ⚠️ 3 posts cycle menstruel en 5 semaines (dont 2 quasi-identiques)

---

#### **6. Contenus "3 erreurs qui mènent à la blessure" - RÉPÉTÉS**

**Répétitions détectées :**
- Février : Reel "La blessure, c'est jamais une surprise"
- **Avril 5** : Reel "Les 3 erreurs qui mènent à la blessure" ← **Même sujet**

**Verdict :** ⚠️ Angle légèrement différent mais sujet redondant

---

### **RÉSUMÉ RÉPÉTITIONS :**

| **Sujet** | **Janvier** | **Février** | **Mars** | **Avril** | **Total** | **Verdict** |
|-----------|-------------|-------------|----------|-----------|-----------|-------------|
| Anti-leaderboard | 1 carousel | - | 1 carousel + 1 reel | 1 reel | **4 posts** | ⚠️ TROP |
| Repos valorisé | 1 carousel | 1 carousel | 2 carousels | 1 carousel | **5 posts** | ⚠️ TROP |
| Cycle menstruel | - | 1 carousel | 2 carousels | 1 carousel | **4 posts** | ⚠️ TROP |
| Prévention blessure | - | 1 reel | - | 1 reel | 2 posts | ✅ OK |
| Polar (specs) | - | 1 LinkedIn | 1 LinkedIn (pricing) | - | 2 posts | ⚠️ Presque identiques |

**Conclusion :** MARS et AVRIL ont trop de répétitions des thèmes janvier/février

---

## 🎯 SOLUTION RECOMMANDÉE

### **Option A : REFONTE COMPLÈTE (recommandé)**

**Je refais :**
1. ✅ Calendrier MARS complet (28 posts neufs, jours corrects, 0 répétition)
2. ✅ Calendrier AVRIL complet (32 posts neufs, jours corrects, contenus originaux)

**Avantages :**
- Jours de la semaine corrects
- Contenus 100% neufs (pas de lassitude audience)
- Nouveaux angles sur les piliers WAC

**Délai :** 2-3h de travail

---

### **Option B : CORRECTION PARTIELLE (plus rapide)**

**Je fais :**
1. ✅ Corriger tous les jours de la semaine (mars + avril)
2. ✅ Identifier les 10-12 posts répétitifs
3. ✅ Te donner des remplacements pour ces posts seulement

**Avantages :**
- Plus rapide (1h)
- Garde les bons posts existants

**Inconvénients :**
- Risque de rater des répétitions
- Patchwork moins cohérent

---

## 📋 CALENDRIER RÉEL MARS/AVRIL 2026

### **MARS 2026**

| **Semaine** | **Dates** | **Jours** |
|-------------|-----------|-----------|
| S1 | 2-8 mars | Lundi 2, Mardi 3, Mercredi 4, Jeudi 5, Vendredi 6, Samedi 7, Dimanche 8 |
| S2 | 9-15 mars | Lundi 9, Mardi 10, Mercredi 11, Jeudi 12, Vendredi 13, Samedi 14, Dimanche 15 |
| S3 | 16-22 mars | Lundi 16, Mardi 17, Mercredi 18, Jeudi 19, Vendredi 20, Samedi 21, Dimanche 22 |
| S4 | 23-29 mars | Lundi 23, Mardi 24, Mercredi 25, Jeudi 26, Vendredi 27, Samedi 28, Dimanche 29 |
| S5 | 30-31 mars | Lundi 30, Mardi 31 |

**Jours fériés/événements :**
- 8 mars (dimanche) : Journée Internationale des Droits des Femmes

---

### **AVRIL 2026**

| **Semaine** | **Dates** | **Jours** |
|-------------|-----------|-----------|
| S5 (suite) | 31 mars-5 avril | Mardi 31/3, Mercredi 1/4, Jeudi 2, Vendredi 3, Samedi 4, Dimanche 5 |
| S6 | 6-12 avril | Lundi 6, Mardi 7, Mercredi 8, Jeudi 9, Vendredi 10, Samedi 11, Dimanche 12 |
| S7 | 13-19 avril | Lundi 13, Mardi 14, Mercredi 15, Jeudi 16, Vendredi 17, Samedi 18, Dimanche 19 |
| S8 | 20-26 avril | Lundi 20, Mardi 21, Mercredi 22, Jeudi 23, Vendredi 24, Samedi 25, Dimanche 26 |
| S9 | 27-30 avril | Lundi 27, Mardi 28, Mercredi 29, Jeudi 30 |

**Jours fériés/événements :**
- Aucun en avril 2026 (hors ponts mai)

---

## ✅ DÉCISION À PRENDRE

**Julien, tu veux que je fasse :**

### **Option A : REFONTE COMPLÈTE** (recommandé)
- [ ] Refaire MARS complet (jours corrects + contenus neufs)
- [ ] Refaire AVRIL complet (jours corrects + contenus neufs)
- [ ] Délai : 2-3h

### **Option B : CORRECTION PARTIELLE** (plus rapide)
- [ ] Corriger juste les jours de la semaine
- [ ] Remplacer les 10-12 posts répétitifs
- [ ] Délai : 1h

**Dis-moi quelle option tu préfères et je me lance ! 🚀**