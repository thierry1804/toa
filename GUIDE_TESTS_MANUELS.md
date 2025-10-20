# Guide de Tests Manuels - Permis de Travail en Hauteur

## 🎯 Objectif
Tester manuellement le formulaire de permis de travail en hauteur pour vérifier la conformité avec le PDF et le bon fonctionnement.

---

## 📋 Prérequis

### Accès
- **URL:** http://localhost:5174
- **Rôle:** Prestataire
- **État:** Au moins un plan de prévention avec statut "valide"

---

## 🚀 Tests Automatisés (Recommandé)

### Option 1: Script Automatisé
1. Ouvrir http://localhost:5174
2. Se connecter comme Prestataire
3. Naviguer vers le formulaire de permis de hauteur
4. Ouvrir la console développeur (F12)
5. Copier le contenu de `test_permis_hauteur.js`
6. Coller dans la console et appuyer sur Entrée
7. Exécuter: `runAllTests()`
8. Consulter les résultats

### Avantages
- ✅ Tests exhaustifs automatiques
- ✅ Vérification de tous les libellés
- ✅ Détection automatique des erreurs
- ✅ Rapport détaillé

---

## 🔍 Tests Manuels Détaillés

### Test 1: Création Complète d'un Permis

#### Étape 1: Informations Générales
**Données de test:**
- Plan de prévention: Sélectionner un plan valide
- Prestataires: "ACME Construction SARL"
- Date début: Aujourd'hui
- Date fin: Dans 7 jours
- Description: "Installation d'antennes sur pylône de 35 mètres"
- Nom du site: "ANT-007"
- Région: "Analamanga"
- Intervenants: 3
- Hauteur: "8m < hauteur ≤ 40m" (pour tester > 20m)
- Travail en toiture: ✅ Coché
- Type de pente: "Forte pente ≥ 20° et < 45°"

**Vérifications:**
- [ ] Tous les champs sont présents
- [ ] Libellé "Hauteur de chute potentielle" (pas "Hauteur de chute")
- [ ] Libellé "Description de l'opération / travaux"
- [ ] Libellé "Prestataires - Sous-traitants"
- [ ] Libellé "Nom du site" (pas "Code Site")
- [ ] Options de pente correctes (ex: "Forte pente ≥ 20° et < 45°")
- [ ] Type de pente visible seulement si "Travail en toiture" coché

#### Étape 2: Risques Identifiés
**Données de test:**
- Chute de personnes: ✅
- Blessure (coupure…): ✅
- Chute d'objet: ✅
- Electrisation / Electrocution: ✅

**Vérifications:**
- [ ] Libellé exact "Electrisation / Electrocution"
- [ ] Libellé exact "Blessure (coupure…)"
- [ ] Libellé exact "Déversement accidentel"
- [ ] Libellé exact "Exposition aux substances dangereuses"
- [ ] Libellé exact "Mauvaise condition météorologique"

#### Étape 3: Matériels et Équipements
**Données de test:**
- Echelle crinoline: ✅
- Ligne de vie verticale: ✅
- Point d'ancrage: ✅
- Harnais: ✅

**Vérifications:**
- [ ] Libellé exact "Echelle crinoline" (pas "Échelle à crinoline")
- [ ] Tous les matériels du PDF présents

#### Étape 4: Mesures de Prévention
**Données de test:**
- Personnel habilité (formé et compétent): ✅
- Personnel apte médicalement: ✅
- Casque avec jugulaire: ✅
- Gants de peinture nitrile: ✅
- Gants isolant électrique: ✅
- Travail à 2 obligatoire: ✅
- Mesure de la vitesse du vent: ✅

**Vérifications:**
- [ ] Libellé exact "Personnel habilité (formé et compétent)"
- [ ] Libellé exact "Personnel apte médicalement"
- [ ] Libellé exact "Casque avec jugulaire"
- [ ] Libellé exact "Gants de peinture nitrile"
- [ ] Libellé exact "Gants isolant électrique"
- [ ] Libellé exact "Travail à 2 obligatoire"
- [ ] Libellé exact "Mesure de la vitesse du vent"
- [ ] Libellé exact "Echelle en bon état (barreaux, montants, patins antidérapants)"

#### Étape 5: Prévention Urgence et Validation
**Vérifications importantes:**
- [ ] **Message d'avertissement orange** visible car hauteur = 8-40m (> 20m)
- [ ] Astérisque (*) sur "Plan de sauvetage disponible"
- [ ] Texte: "Obligatoire pour les travaux en hauteur > 20m"
- [ ] Message: "⚠️ Attention: Le plan de sauvetage est obligatoire..."

**Données de test:**
- Plan de sauvetage disponible: ✅
- Numéros d'urgence disponibles: ✅
- Secouriste présent sur site: ✅
- **Engagement du demandeur: ✅** (OBLIGATOIRE)

**Vérifications du récapitulatif:**
- [ ] Plan de prévention affiché
- [ ] Prestataire affiché
- [ ] Période (dates) affichée
- [ ] Site et région affichés
- [ ] Opération affichée
- [ ] Intervenants affichés
- [ ] Hauteur affichée
- [ ] Travail en toiture avec type de pente affiché

---

### Test 2: Validations des Champs Obligatoires

#### Test 2.1: Étape 1 - Champs Vides
1. Créer un nouveau permis
2. Ne remplir aucun champ
3. Cliquer "Suivant"

**Résultats attendus:**
- [ ] Message: "Plan de prévention requis"
- [ ] Message: "Prestataire requis"
- [ ] Message: "Date de début requise"
- [ ] Message: "Date de fin requise"
- [ ] Message: "Description trop courte"
- [ ] Message: "Code site requis"
- [ ] Message: "Région requise"
- [ ] Impossible de passer à l'étape suivante

#### Test 2.2: Étape 5 - Engagement Non Coché
1. Créer un permis complet
2. Arriver à l'étape 5
3. Ne PAS cocher l'engagement
4. Cliquer "Soumettre"

**Résultats attendus:**
- [ ] Message: "L'engagement est obligatoire pour soumettre le permis"
- [ ] Impossible de soumettre

---

### Test 3: Logique Métier - Plan de Sauvetage

#### Test 3.1: Hauteur ≤ 20m (Optionnel)
1. Créer un permis
2. Étape 1: Sélectionner hauteur "≤ 3m"
3. Aller à l'étape 5

**Résultats attendus:**
- [ ] Pas d'astérisque (*) sur "Plan de sauvetage"
- [ ] Pas de message d'avertissement orange
- [ ] Description normale: "Plan de sauvetage en cas d'urgence"
- [ ] Peut soumettre sans cocher le plan de sauvetage

#### Test 3.2: Hauteur > 20m (Message d'Avertissement)
1. Créer un permis
2. Étape 1: Sélectionner hauteur "8m < hauteur ≤ 40m"
3. Aller à l'étape 5
4. Ne PAS cocher le plan de sauvetage

**Résultats attendus:**
- [ ] Astérisque (*) visible: "Plan de sauvetage disponible *"
- [ ] Description changée: "Obligatoire pour les travaux en hauteur > 20m"
- [ ] Message orange affiché avec icône ⚠️

---

### Test 4: Navigation Entre Étapes

1. Créer un permis
2. Remplir l'étape 1 complètement
3. Cliquer "Suivant"
4. Remplir l'étape 2
5. Cliquer "Suivant"
6. Remplir l'étape 3
7. Cliquer "Précédent" → Retour étape 2
8. Cliquer "Précédent" → Retour étape 1
9. Vérifier les données
10. Cliquer "Suivant" plusieurs fois jusqu'à l'étape 5
11. Vérifier le récapitulatif

**Résultats attendus:**
- [ ] Données de l'étape 1 conservées après retour
- [ ] Données de l'étape 2 conservées
- [ ] Données de l'étape 3 conservées
- [ ] Récapitulatif affiche toutes les données correctement
- [ ] Aucune perte de données

---

### Test 5: Affichage Conditionnel

#### Test 5.1: Type de Pente
1. Créer un permis
2. Ne PAS cocher "Travail en toiture"

**Résultats attendus:**
- [ ] Le champ "Type de pente" est caché

3. Cocher "Travail en toiture"

**Résultats attendus:**
- [ ] Le champ "Type de pente" apparaît
- [ ] Options correctes affichées

#### Test 5.2: Message Plan de Sauvetage
1. Créer un permis avec hauteur ≤ 3m
2. Aller à l'étape 5

**Résultats attendus:**
- [ ] Pas de message orange

3. Revenir à l'étape 1
4. Changer hauteur à "8m < hauteur ≤ 40m"
5. Retourner à l'étape 5

**Résultats attendus:**
- [ ] Message orange apparaît
- [ ] Disparaît quand plan de sauvetage coché

---

## 📊 Checklist de Conformité PDF

### Page 1 du PDF - Tous les Champs
- [ ] Référence du plan de prévention
- [ ] Numéro du permis (généré)
- [ ] Permis valable (dates début/fin)
- [ ] Description de l'opération / travaux
- [ ] Prestataires - Sous-traitants
- [ ] Nom du site
- [ ] Région
- [ ] Nombre d'intervenants
- [ ] Hauteur de chute potentielle (4 options exactes)
- [ ] Travail en toiture
- [ ] Type de pente (5 options exactes)
- [ ] Risques signalés (11 options + autre)
- [ ] Matériels utilisés (11 options + autre)
- [ ] Mesures de prévention (19 options)
- [ ] Plan de sauvetage
- [ ] Numéros d'urgence
- [ ] Secouriste présent
- [ ] Engagement du demandeur

### Libellés Exacts
- [ ] Tous les libellés correspondent mot pour mot au PDF
- [ ] Aucune différence d'orthographe ou de ponctuation

### Logique Métier
- [ ] Plan de sauvetage obligatoire > 20m avec avertissement
- [ ] Engagement obligatoire
- [ ] Type de pente conditionnel
- [ ] Toutes les validations fonctionnent

---

## 🎯 Résultats Attendus

### Taux de Réussite
- **Objectif:** 100% des tests passent
- **Critère de succès:** Aucune régression, conformité totale au PDF

### Bugs Identifiés
À documenter dans `rapport_tests_permis_hauteur.md`

---

## 📝 Rapport de Test

Après les tests, documenter:

1. **Tests réussis** ✅
2. **Tests échoués** ❌
3. **Bugs identifiés** 🐛
4. **Améliorations suggérées** 💡
5. **Taux de conformité final** 📊

---

**Date:** 15 octobre 2025  
**Version:** Après corrections complètes  
**Status:** Prêt pour les tests


