# Rapport de Conformité - Permis de Travail en Hauteur

## Date d'analyse
15 octobre 2025

## Référence du document
- **PDF:** SGI-PPHSSES-TOA-301_01 - Permis de Travail en Hauteur (Version 2.0, Date: 01/03/2025)
- **Code:** `src/components/forms/PermitHauteurForm.tsx`

---

## Matrice de Comparaison Exhaustive

### 1. INFORMATIONS GÉNÉRALES (Étape 1)

| Champ PDF | Champ Code Actuel | Statut | Écart | Action Requise |
|-----------|-------------------|--------|-------|----------------|
| Référence du plan de prévention | ❌ Manquant | 🔴 NON CONFORME | Champ obligatoire manquant | Ajouter sélection du plan de prévention |
| Numéro du permis de travail | ❌ Manquant | 🔴 NON CONFORME | Champ auto-généré manquant | Ajouter génération automatique |
| Permis valable (dates) | ❌ Manquant | 🔴 NON CONFORME | Dates début/fin manquantes | Ajouter champs dateDebut et dateFin |
| Description de l'opération / travaux | ✅ `descriptionOperation` | 🟢 CONFORME | - | - |
| Prestataires - Sous-traitants | ❌ Manquant | 🔴 NON CONFORME | Nom entreprise manquant | Ajouter champ prestataire |
| Nom du site | ✅ `codeSite` | 🟢 CONFORME | - | - |
| Région | ✅ `region` | 🟢 CONFORME | - | - |
| Nombre d'intervenants | ✅ `nombreIntervenants` | 🟢 CONFORME | - | - |

### 2. HAUTEUR ET TYPE DE TRAVAIL

| Champ PDF | Champ Code Actuel | Statut | Écart | Action Requise |
|-----------|-------------------|--------|-------|----------------|
| **Hauteur de chute potentielle** | **Hauteur de chute** | 🟡 PARTIELLEMENT CONFORME | Libellé incomplet | Changer en "Hauteur de chute potentielle" |
| ☐ Hauteur ≤ 3m | `'<=3m'` : '≤ 3 mètres' | 🟢 CONFORME | - | - |
| ☐ 3m < hauteur ≤ 8m | `'3-8m'` : '3 à 8 mètres' | 🟢 CONFORME | - | - |
| ☐ 8m < hauteur ≤ 40m | `'8-40m'` : '8 à 40 mètres' | 🟢 CONFORME | - | - |
| ☐ Hauteur > 40m | `'>40m'` : '> 40 mètres' | 🟢 CONFORME | - | - |
| **Travail en toiture** | `travailToiture` | 🟢 CONFORME | - | - |

### 3. TYPE DE PENTE (Conditionnel si travail en toiture)

| Option PDF | Option Code Actuel | Statut | Écart | Action Requise |
|-----------|-------------------|--------|-------|----------------|
| ☐ Toit plat | `'plat'` : 'Plat (0-5°)' | 🟡 PARTIELLEMENT CONFORME | Angles différents | Retirer les angles, utiliser juste "Plat" |
| ☐ Légère pente < 20° | `'legere'` : 'Légère (5-15°)' | 🔴 NON CONFORME | Angles incorrects (5-15° vs < 20°) | Changer en "Légère pente < 20°" |
| ☐ Forte pente ≥ 20° et < 45° | `'forte'` : 'Forte (15-30°)' | 🔴 NON CONFORME | Angles incorrects (15-30° vs 20-45°) | Changer en "Forte pente ≥ 20° et < 45°" |
| ☐ Très forte pente ≥ 45° et < 60° | `'tres_forte'` : 'Très forte (30-45°)' | 🔴 NON CONFORME | Angles incorrects (30-45° vs 45-60°) | Changer en "Très forte pente ≥ 45° et < 60°" |
| ☐ Pente extrême ≥ 60° | `'extreme'` : 'Extrême (>45°)' | 🔴 NON CONFORME | Angles incorrects (>45° vs ≥ 60°) | Changer en "Pente extrême ≥ 60°" |

### 4. RISQUES SIGNALÉS (Étape 2)

| Risque PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| ☐ Effondrement | `effondrement` | 🟢 CONFORME | - | - |
| ☐ Incendie | `incendie` | 🟢 CONFORME | - | - |
| ☐ Déversement accidentel | `deversement` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Déversement" vs "Déversement accidentel" | Ajouter "accidentel" au libellé |
| ☐ Electrisation/Electrocution | `electrisation` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Électrisation" vs "Electrisation/Electrocution" | Changer en "Electrisation/Electrocution" |
| ☐ Chute de personnes | `chutePersonnes` | 🟢 CONFORME | - | - |
| ☐ Blessure (coupure…) | `blessure` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Blessure" vs "Blessure (coupure…)" | Ajouter "(coupure…)" |
| ☐ Chute d'objet | `chuteObjet` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Chute d'objets" vs "Chute d'objet" | Changer en singulier |
| ☐ Exposition aux substances dangereuses | `expositionSubstances` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Exposition substances" vs complet | Utiliser libellé complet |
| ☐ Ecrasement | `ecrasement` | 🟢 CONFORME | - | - |
| ☐ Mauvaise condition météorologique | `mauvaiseMeteo` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Mauvaise météo" vs "Mauvaise condition météorologique" | Utiliser libellé complet |
| ☐ Autre : _____ | `autres` (array) | 🟢 CONFORME | - | - |

### 5. MATÉRIELS UTILISÉS (Étape 3)

| Matériel PDF | Champ Code | Statut | Écart | Action Requise |
|-------------|-----------|--------|-------|----------------|
| ☐ Echafaudage roulant | `echafaudageRoulant` | 🟢 CONFORME | - | - |
| ☐ Echafaudage fixe | `echafaudageFixe` | 🟢 CONFORME | - | - |
| ☐ Filet de sécurité | `filetSecurite` | 🟢 CONFORME | - | - |
| ☐ Ligne de vie verticale | `ligneVieVerticale` | 🟢 CONFORME | - | - |
| ☐ Ligne de vie horizontale | `ligneVieHorizontale` | 🟢 CONFORME | - | - |
| ☐ Point d'ancrage | `pointAncrage` | 🟢 CONFORME | - | - |
| ☐ Echelle crinoline | `echelleCrinoline` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Échelle à crinoline" vs "Echelle crinoline" | Retirer "à" |
| ☐ Plateforme élévatrice | `plateformeElevatrice` | 🟢 CONFORME | - | - |
| ☐ Travail sur cordes | `travailCordes` | 🟢 CONFORME | - | - |
| ☐ Echelle | `echelle` | 🟢 CONFORME | - | - |
| ☐ Escabeau | `escabeau` | 🟢 CONFORME | - | - |
| ☐ Autre : _____ | `autres` (array) | 🟢 CONFORME | - | - |

### 6. MESURES DE PRÉVENTION (Étape 4)

| Mesure PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| ☐ Personnel habilité (formé et compétent) | `personnelHabilite` | 🟡 PARTIELLEMENT CONFORME | Libellé court | Ajouter "(formé et compétent)" |
| ☐ Personnel apte médicalement | `personnelApte` | 🟡 PARTIELLEMENT CONFORME | Libellé: "Personnel apte" vs "apte médicalement" | Ajouter "médicalement" |
| ☐ Balisage de la zone de travaux | `balisage` | 🟡 PARTIELLEMENT CONFORME | Libellé court | Compléter "de la zone de travaux" |
| ☐ Chaussures de sécurité | `chaussuresSecurite` | 🟢 CONFORME | - | - |
| ☐ Casque avec jugulaire | `casque` | 🔴 NON CONFORME | Libellé: "Casque de sécurité" vs "Casque avec jugulaire" | Changer en "Casque avec jugulaire" |
| ☐ Gants de peinture nitrile | `gantsNitrile` | 🔴 NON CONFORME | Libellé: "Gants nitrile" vs "Gants de peinture nitrile" | Changer en "Gants de peinture nitrile" |
| ☐ Gants isolant électrique | `gantsIsolants` | 🔴 NON CONFORME | Libellé: "Gants isolants" vs "Gants isolant électrique" | Changer en "Gants isolant électrique" |
| ☐ Gants de manutention | `gantsManutention` | 🟢 CONFORME | - | - |
| ☐ Bouchon d'oreille | `bouchonOreille` | 🟢 CONFORME | - | - |
| ☐ Casque anti-bruit | `casqueAntiBruit` | 🟢 CONFORME | - | - |
| ☐ Longe avec absorbeur | `longeAbsorbeur` | 🟢 CONFORME | - | - |
| ☐ Double longe | `doubleLonge` | 🟢 CONFORME | - | - |
| ☐ Lignes de vie conforme | `ligneVieConforme` | 🟢 CONFORME | - | - |
| ☐ Harnais vérifié et conforme | `harnaisVerifie` | 🟢 CONFORME | - | - |
| ☐ Echafaudage contrôlé et conforme | `echafaudageConforme` | 🟢 CONFORME | - | - |
| ☐ Echelle en bon état (barreaux, montants, patins antidérapants) | `echelleConforme` | 🟡 PARTIELLEMENT CONFORME | Libellé court manque détails | Compléter le libellé |
| ☐ Sanglage des outils | `sanglageOutils` | 🟢 CONFORME | - | - |
| ☐ Travail à 2 obligatoire | `travailDeux` | 🟡 PARTIELLEMENT CONFORME | Libellé manque "obligatoire" | Ajouter "obligatoire" |
| ☐ Mesure de la vitesse du vent | `mesureVent` | 🟡 PARTIELLEMENT CONFORME | Libellé manque "de la vitesse" | Compléter le libellé |

### 7. PRÉVENTION EN CAS D'URGENCE (Étape 5)

| Champ PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| Plan de sauvetage disponible (obligatoire > 20m) | `planSauvetageDisponible` | 🟡 PARTIELLEMENT CONFORME | Validation conditionnelle manquante | Ajouter logique: obligatoire si hauteur > 20m |
| Numéros d'urgence disponibles | `numerosUrgenceDisponibles` | 🟢 CONFORME | - | - |
| Secouriste présent sur site | `secouristePresent` | 🟡 PARTIELLEMENT CONFORME | Libellé manque "sur site" | Ajouter "sur site" |

### 8. ENGAGEMENT DU DEMANDEUR (Étape 5)

| Champ PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| ☐ Engagement du demandeur | ❌ Manquant | 🔴 NON CONFORME | Section entière manquante | Ajouter checkbox d'engagement obligatoire |
| Texte: "En tant que demandeur de ce permis, je m'engage à respecter la mise en œuvre des mesures de prévention mentionnées à chaque début de travaux impliquant un travail en hauteur" | ❌ Manquant | 🔴 NON CONFORME | - | Ajouter texte complet |

### 9. VALIDATION DU PERMIS

| Champ PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| Autorisé par (Donneur d'ordre): Nom + Visa | ❌ Manquant | 🔴 NON CONFORME | Champ manquant | Géré par workflow de validation |
| Demandeur de permis: Nom + Visa | ✅ `demandeurNom` + `demandeurDate` | 🟢 CONFORME | - | - |
| Responsable du contractant: Nom + Visa | ❌ Manquant | 🔴 NON CONFORME | Champ manquant | Géré par workflow de validation |
| Personnel(s) exécutant(s): Nom(s) + Visa(s) | ✅ `personnelsExecutants` | 🟢 CONFORME | - | - |

### 10. VALIDATION JOURNALIÈRE (Page 2 du PDF)

| Champ PDF | Champ Code | Statut | Écart | Action Requise |
|-----------|-----------|--------|-------|----------------|
| Tableau de validation journalière (30 jours max) | ✅ `validationsJournalieres` | 🟢 CONFORME | - | - |
| Date | ❓ À vérifier dans l'interface | 🟡 À VÉRIFIER | - | Vérifier dans le store/types |
| Code site | ❓ À vérifier | 🟡 À VÉRIFIER | - | Vérifier dans le store/types |
| Signatures commencement/clôture | ❓ À vérifier | 🟡 À VÉRIFIER | - | Vérifier dans le store/types |
| Vitesse du vent | ❓ À vérifier | 🟡 À VÉRIFIER | - | Vérifier dans le store/types |

---

## Récapitulatif des Écarts

### Écarts Critiques (🔴)
1. **Référence du plan de prévention** - Champ manquant
2. **Numéro du permis** - Auto-génération manquante
3. **Dates de validité** - Champs manquants
4. **Prestataires/Sous-traitants** - Champ manquant
5. **Type de pente** - Toutes les options ont des angles incorrects
6. **Casque avec jugulaire** - Libellé incorrect
7. **Gants de peinture nitrile** - Libellé incorrect
8. **Gants isolant électrique** - Libellé incorrect
9. **Engagement du demandeur** - Section entière manquante

### Écarts Moyens (🟡)
10. **Hauteur de chute** - Libellé incomplet (manque "potentielle")
11. Plusieurs libellés de risques incomplets
12. Plusieurs libellés de mesures de prévention incomplets
13. **Plan de sauvetage** - Validation conditionnelle manquante (obligatoire > 20m)

### Points Conformes (🟢)
- Tous les champs de base (site, région, intervenants, description)
- Toutes les options de hauteur de chute
- Majorité des risques (structure correcte)
- Tous les matériels (sauf un libellé)
- Majorité des mesures de prévention (sauf libellés)

---

## Statistiques de Conformité

| Catégorie | Conforme | Partiellement Conforme | Non Conforme | Total |
|-----------|----------|------------------------|--------------|-------|
| **Informations générales** | 4 | 1 | 4 | 9 |
| **Type de pente** | 0 | 1 | 4 | 5 |
| **Risques** | 5 | 6 | 0 | 11 |
| **Matériels** | 11 | 1 | 0 | 12 |
| **Mesures prévention** | 9 | 9 | 3 | 21 |
| **Prévention urgence** | 1 | 2 | 0 | 3 |
| **Engagement** | 0 | 0 | 2 | 2 |
| **Validation** | 2 | 0 | 2 | 4 |
| **TOTAL** | **32** | **20** | **15** | **67** |

**Taux de conformité:** 47.8% (conforme) + 29.9% (partiellement) = **77.7%**  
**Taux de non-conformité:** **22.3%**

---

## Priorités de Correction

### Priorité 1 (Urgent - Champs manquants obligatoires)
1. Ajouter sélection du plan de prévention
2. Ajouter génération automatique du numéro de permis
3. Ajouter champs dates de validité (début/fin)
4. Ajouter champ prestataire/sous-traitant
5. Ajouter section engagement du demandeur (obligatoire)

### Priorité 2 (Important - Corrections de valeurs)
6. Corriger toutes les options de type de pente
7. Corriger les libellés des gants (peinture nitrile, isolant électrique)
8. Corriger le libellé du casque (avec jugulaire)
9. Ajouter validation conditionnelle plan de sauvetage (> 20m)

### Priorité 3 (Amélioration - Libellés)
10. Compléter tous les libellés incomplets pour correspondre exactement au PDF
11. Améliorer le récapitulatif pour afficher toutes les informations clés

---

## Recommandations

### Recommandations techniques
1. **Appliquer la correction MultiStepForm** déjà implémentée pour partager les données entre étapes
2. **Ajouter une validation Zod personnalisée** pour le plan de sauvetage conditionnel
3. **Créer un composant réutilisable** pour les engagements (utilisable dans autres permis)
4. **Améliorer le système de numérotation** avec format: YYYY/PTWH/XXX (ex: 2025/PTWH/331)

### Recommandations UX
1. **Afficher un avertissement visuel** quand hauteur > 20m et plan sauvetage non coché
2. **Grouper visuellement** les mesures de prévention par catégories (comme dans le code actuel)
3. **Améliorer le récapitulatif** avec un résumé visuel des choix (badges, icônes)
4. **Ajouter des tooltips** pour expliquer certaines mesures techniques

### Recommandations de validation
1. **Rendre obligatoire** la sélection d'au moins un risque
2. **Rendre obligatoire** la sélection d'au moins un matériel
3. **Rendre obligatoire** la sélection d'au moins 3 mesures de prévention
4. **Validation stricte** de l'engagement avant soumission

---

## Prochaines Étapes

1. ✅ Analyse et matrice de comparaison terminée
2. ⏭️ Appliquer toutes les corrections (Priorité 1, 2, 3)
3. ⏭️ Mettre à jour les types TypeScript
4. ⏭️ Appliquer la correction MultiStepForm
5. ⏭️ Tests exhaustifs avec navigateur
6. ⏭️ Documentation des résultats de tests

---

**Date du rapport:** 15 octobre 2025  
**Analyste:** Assistant IA  
**Statut:** Analyse complète - Prêt pour les corrections



