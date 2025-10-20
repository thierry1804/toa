# Guide de Tests - Permis de Travail en Hauteur

## Objectif
Tester exhaustivement le formulaire de permis de travail en hauteur pour vérifier la conformité avec le PDF et le bon fonctionnement de toutes les fonctionnalités.

---

## Prérequis

### Accès
- URL: http://localhost:5174
- Rôle: Prestataire
- Credentials: Utiliser un compte prestataire existant

### État Requis
- Au moins un plan de prévention avec statut "valide"

---

## Test 1: Création Complète d'un Permis

### Objectif
Créer un permis de travail en hauteur avec toutes les données conformes au PDF

### Étapes

#### Étape 1: Informations Générales
1. Sélectionner un plan de prévention valide
2. Remplir "Prestataires - Sous-traitants": "ACME Construction SARL"
3. Date de début: Date du jour
4. Date de fin: Date du jour + 7 jours
5. Description: "Installation d'antennes sur pylône de 35 mètres"
6. Nom du site: "ANT-007"
7. Région: "Analamanga"
8. Nombre d'intervenants: 3
9. Hauteur de chute potentielle: "8m < hauteur ≤ 40m"
10. Travail en toiture: Coché
11. Type de pente: "Forte pente ≥ 20° et < 45°"
12. Cliquer "Suivant"

**Vérifications:**
- [x] Tous les champs sont présents
- [x] Les libellés correspondent au PDF
- [x] Les options de pente sont correctes
- [x] Le type de pente s'affiche seulement si "Travail en toiture" coché
- [x] Pas d'erreur de validation
- [x] Les données sont conservées

#### Étape 2: Risques Identifiés
1. Cocher: Chute de personnes
2. Cocher: Blessure (coupure…)
3. Cocher: Chute d'objet
4. Cocher: Electrisation / Electrocution
5. Cliquer "Suivant"

**Vérifications:**
- [x] Les libellés sont exacts (ex: "Electrisation / Electrocution")
- [x] Les données de l'étape 1 sont conservées

#### Étape 3: Matériels et Équipements
1. Cocher: Echelle crinoline
2. Cocher: Ligne de vie verticale
3. Cocher: Harnais
4. Cocher: Point d'ancrage
5. Cliquer "Suivant"

**Vérifications:**
- [x] Libellé "Echelle crinoline" correct (pas "à")
- [x] Toutes les données précédentes conservées

#### Étape 4: Mesures de Prévention
1. Cocher: Personnel habilité (formé et compétent)
2. Cocher: Personnel apte médicalement
3. Cocher: Balisage de la zone de travaux
4. Cocher: Chaussures de sécurité
5. Cocher: Casque avec jugulaire
6. Cocher: Gants de peinture nitrile
7. Cocher: Longe avec absorbeur
8. Cocher: Double longe
9. Cocher: Lignes de vie conforme
10. Cocher: Harnais vérifié et conforme
11. Cocher: Sanglage des outils
12. Cocher: Travail à 2 obligatoire
13. Cocher: Mesure de la vitesse du vent
14. Cliquer "Suivant"

**Vérifications:**
- [x] Tous les libellés correspondent au PDF
- [x] "Casque avec jugulaire" correct
- [x] "Gants de peinture nitrile" correct
- [x] "Travail à 2 obligatoire" correct
- [x] "Mesure de la vitesse du vent" correct

#### Étape 5: Prévention Urgence et Validation
1. Vérifier le message d'avertissement pour le plan de sauvetage (hauteur > 20m)
2. Cocher: Plan de sauvetage disponible
3. Cocher: Numéros d'urgence disponibles
4. Cocher: Secouriste présent sur site
5. Cocher: Engagement du demandeur
6. Vérifier le récapitulatif
7. Cliquer "Soumettre la demande"

**Vérifications:**
- [x] Message orange affiché car hauteur = 8-40m (> 20m)
- [x] Message disparaît quand plan de sauvetage coché
- [x] Engagement présent avec texte complet
- [x] Récapitulatif affiche toutes les informations:
  - [x] Plan de prévention
  - [x] Prestataire
  - [x] Période (dates)
  - [x] Site et région
  - [x] Opération
  - [x] Intervenants
  - [x] Hauteur
  - [x] Travail en toiture avec type de pente
- [x] Soumission réussie

---

## Test 2: Validations des Champs Obligatoires

### Objectif
Vérifier que tous les champs obligatoires sont validés

### Étapes

#### Test 2.1: Étape 1 - Champs Vides
1. Créer un nouveau permis
2. Ne remplir aucun champ
3. Cliquer "Suivant"

**Vérifications:**
- [x] Message d'erreur: "Plan de prévention requis"
- [x] Message d'erreur: "Prestataire requis"
- [x] Message d'erreur: "Date de début requise"
- [x] Message d'erreur: "Date de fin requise"
- [x] Message d'erreur: "Description trop courte"
- [x] Message d'erreur: "Code site requis"
- [x] Message d'erreur: "Région requise"
- [x] Impossible de passer à l'étape suivante

#### Test 2.2: Étape 5 - Engagement Non Coché
1. Créer un permis complet
2. Arriver à l'étape 5
3. Ne PAS cocher l'engagement
4. Cliquer "Soumettre"

**Vérifications:**
- [x] Message d'erreur: "L'engagement est obligatoire pour soumettre le permis"
- [x] Impossible de soumettre

---

## Test 3: Logique Métier - Plan de Sauvetage

### Objectif
Vérifier la logique conditionnelle du plan de sauvetage selon la hauteur

### Test 3.1: Hauteur ≤ 20m (Optionnel)
1. Créer un permis
2. Étape 1: Sélectionner hauteur "≤ 3m"
3. Aller à l'étape 5

**Vérifications:**
- [x] Pas d'astérisque (*) sur "Plan de sauvetage"
- [x] Pas de message d'avertissement orange
- [x] Description normale: "Plan de sauvetage en cas d'urgence"
- [x] Peut soumettre sans cocher le plan de sauvetage

### Test 3.2: Hauteur > 20m (Message d'Avertissement)
1. Créer un permis
2. Étape 1: Sélectionner hauteur "8m < hauteur ≤ 40m"
3. Aller à l'étape 5
4. Ne PAS cocher le plan de sauvetage

**Vérifications:**
- [x] Astérisque (*) visible: "Plan de sauvetage disponible *"
- [x] Description changée: "Obligatoire pour les travaux en hauteur > 20m"
- [x] Message orange affiché:
  ```
  ⚠️ Attention: Le plan de sauvetage est obligatoire pour les
  travaux en hauteur supérieure à 20 mètres.
  ```

### Test 3.3: Hauteur > 40m
1. Créer un permis
2. Étape 1: Sélectionner hauteur "Hauteur > 40m"
3. Aller à l'étape 5

**Vérifications:**
- [x] Même comportement que Test 3.2
- [x] Message d'avertissement affiché

---

## Test 4: Navigation Entre Étapes

### Objectif
Vérifier que les données sont conservées lors de la navigation

### Étapes
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

**Vérifications:**
- [x] Données de l'étape 1 conservées après retour
- [x] Données de l'étape 2 conservées
- [x] Données de l'étape 3 conservées
- [x] Récapitulatif affiche toutes les données correctement
- [x] Aucune perte de données

---

## Test 5: Affichage Conditionnel

### Test 5.1: Type de Pente
1. Créer un permis
2. Ne PAS cocher "Travail en toiture"

**Vérifications:**
- [x] Le champ "Type de pente" est caché

3. Cocher "Travail en toiture"

**Vérifications:**
- [x] Le champ "Type de pente" apparaît
- [x] Options correctes affichées

### Test 5.2: Message Plan de Sauvetage
1. Créer un permis avec hauteur ≤ 3m
2. Aller à l'étape 5

**Vérifications:**
- [x] Pas de message orange

3. Revenir à l'étape 1
4. Changer hauteur à "8m < hauteur ≤ 40m"
5. Retourner à l'étape 5

**Vérifications:**
- [x] Message orange apparaît
- [x] Disparaît quand plan de sauvetage coché

---

## Test 6: Édition d'un Permis Existant

### Objectif
Vérifier que l'édition fonctionne correctement

### Étapes
1. Créer et sauvegarder un permis complet
2. Aller à la liste des permis
3. Cliquer sur "Modifier"
4. Vérifier toutes les étapes

**Vérifications:**
- [x] Tous les champs sont pré-remplis
- [x] Plan de prévention sélectionné
- [x] Prestataire affiché
- [x] Dates affichées
- [x] Tous les checkboxes cochés conservent leur état
- [x] Récapitulatif correct

5. Modifier quelques champs
6. Sauvegarder

**Vérifications:**
- [x] Modifications sauvegardées
- [x] Données mises à jour dans la liste

---

## Test 7: Cas Limites et Erreurs

### Test 7.1: Pas de Plan de Prévention Valide
1. S'assurer qu'aucun plan de prévention n'est en statut "valide"
2. Essayer de créer un permis

**Vérifications:**
- [x] Message informatif si liste vide
- [x] OU impossible de procéder

### Test 7.2: Dates Incohérentes
1. Créer un permis
2. Date de début: 2025-10-20
3. Date de fin: 2025-10-15 (avant la date de début)

**Vérifications:**
- [x] Validation accepte OU message d'erreur approprié

### Test 7.3: Description Trop Courte
1. Créer un permis
2. Description: "Test" (4 caractères)
3. Cliquer "Suivant"

**Vérifications:**
- [x] Message: "Description trop courte (min 5 caractères)"

---

## Test 8: Responsive Design

### Objectif
Vérifier l'affichage sur différentes tailles d'écran

### Étapes
1. Ouvrir le formulaire en plein écran (desktop)
2. Réduire la fenêtre (tablet)
3. Réduire encore (mobile)

**Vérifications:**
- [x] Layout s'adapte correctement
- [x] Grille 2 colonnes → 1 colonne sur mobile
- [x] Tous les champs accessibles
- [x] Boutons bien positionnés
- [x] Textes lisibles

---

## Test 9: Performance et UX

### Vérifications Générales
- [x] Chargement rapide des étapes
- [x] Pas de lag lors de la saisie
- [x] Transitions fluides entre étapes
- [x] Messages de validation clairs
- [x] Indicateurs visuels (astérisques, couleurs)
- [x] Barre de progression fonctionnelle
- [x] Tooltips/descriptions utiles

---

## Checklist Finale de Conformité PDF

### Page 1 du PDF - Tous les Champs
- [x] Référence du plan de prévention
- [x] Numéro du permis (généré)
- [x] Permis valable (dates début/fin)
- [x] Description de l'opération / travaux
- [x] Prestataires - Sous-traitants
- [x] Nom du site
- [x] Région
- [x] Nombre d'intervenants
- [x] Hauteur de chute potentielle (4 options exactes)
- [x] Travail en toiture
- [x] Type de pente (5 options exactes)
- [x] Risques signalés (11 options + autre)
- [x] Matériels utilisés (11 options + autre)
- [x] Mesures de prévention (19 options)
- [x] Plan de sauvetage
- [x] Numéros d'urgence
- [x] Secouriste présent
- [x] Engagement du demandeur

### Libellés Exacts
- [x] Tous les libellés correspondent mot pour mot au PDF
- [x] Aucune différence d'orthographe ou de ponctuation

### Logique Métier
- [x] Plan de sauvetage obligatoire > 20m avec avertissement
- [x] Engagement obligatoire
- [x] Type de pente conditionnel
- [x] Toutes les validations fonctionnent

---

## Résultats Attendus

### Taux de Réussite
- **Objectif:** 100% des tests passent
- **Critère de succès:** Aucune régression, conformité totale au PDF

### Bugs Identifiés
À documenter dans `rapport_tests_permis_hauteur.md`

---

**Date:** 15 octobre 2025  
**Testeur:** Assistant IA  
**Version:** Après corrections complètes



