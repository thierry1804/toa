# Rapport de Conformité - Plan de Prévention HSSES

## Analyse du Document PDF SGI-PPHSSES-TOA-601

### Structure du Document PDF

Le document PDF contient les sections suivantes :

1. **En-tête et Identification**
   - Référence : SGI-PPHSSES-TOA-601
   - Version : 2.0
   - Date : 19/08/2025
   - PROJET/ACTIVITÉ
   - SITE
   - RÉFÉRENCE

2. **Section 1 : Introduction**
   - Objectif du plan de prévention

3. **Section 2 : Engagement du Prestataire**
   - Informations société prestataire
   - Représentant légal
   - Localisation du site (Localité, Fokontany, Commune, District, Région, Coordonnées géographiques, Situation)
   - Engagements du prestataire

4. **Section 3 : Signatures**
   - Pour TOA (Donneur d'ordre)
   - Pour le Prestataire
   - Nom de la société, Nom et Prénom, Fonction, Signature

5. **Section 4 : Risques dus aux Activités**
   - A. Identification des risques générés par les activités
   - B. Installations et équipements
   - Tableaux détaillés des risques et mesures

6. **Section 5 : Documents HSSES à fournir**
   - 6 catégories de documents/livrables requis

## Comparaison Exhaustive : PDF vs Code

### ✅ CONFORMITÉS IDENTIFIÉES

#### 1. Informations Entreprise Prestataire
**PDF :** Société, représentant, siège social
**Code :** ✅ Conforme
- `entreprisePrestataire` ✅
- `representantPrestataire` ✅
- `adressePrestataire` ✅
- `contactPrestataire` ✅
- `emailPrestataire` ✅

#### 2. Localisation du Site
**PDF :** Localité, Fokontany, Commune, District, Région, Coordonnées géographiques, Situation
**Code :** ✅ Partiellement conforme
- `nomSite` ✅
- `codeSite` ✅
- `region` ✅
- `adresseSite` ✅
- `coordonneesGPS` ✅

#### 3. Risques Identifiés
**PDF :** Catégories de risques détaillées avec mesures de prévention
**Code :** ✅ Conforme
- Structure `RisqueIdentifie` ✅
- Champs : categorie, description, niveauGravite, probabilite, impact ✅
- Mesures de prévention ✅
- Équipements nécessaires ✅
- Responsable de la mesure ✅

#### 4. Équipements et Matériels
**PDF :** Liste des installations, matériels, équipements et outillages
**Code :** ✅ Conforme
- `equipementsProtection` ✅
- `outilsTravail` ✅
- `materielSecurite` ✅
- `equipementsUrgence` ✅

### ❌ ÉCARTS MAJEURS IDENTIFIÉS

#### 1. **Section Engagement du Prestataire - MANQUANTE**
**PDF :** Section complète avec :
- Informations société (registre du commerce, numéro)
- Représentant légal avec qualité/fonction
- Localisation détaillée (Fokontany, Commune, District)
- Situation du site (ville, rurale, montagne)
- 7 engagements spécifiques du prestataire

**Code :** ❌ Absent du formulaire
- Pas de champ pour numéro registre du commerce
- Pas de champ pour qualité/fonction du représentant
- Pas de champs Fokontany, Commune, District
- Pas de champ "Situation du site"
- Pas de section engagements

#### 2. **Section Signatures - MANQUANTE**
**PDF :** Section complète avec :
- Pour TOA : Nom et Prénom, Fonction, Signature
- Pour Prestataire : Nom de la société, Nom et Prénom, Fonction, Signature

**Code :** ❌ Absent du formulaire
- Pas d'interface de signature
- Pas de champs pour les fonctions
- Pas de validation/signature

#### 3. **Section Documents HSSES - INCOMPLÈTE**
**PDF :** 6 catégories de documents obligatoires :
1. Communication (PV toolbox)
2. Qualification/habilitation (certificats, badges)
3. Préparation urgence (liste équipe intervention)
4. EPI (photos personnel avec EPI)
5. Analyse de risques (Take 5)
6. Repli chantier (photos housekeeping)

**Code :** ❌ Partiellement implémenté
- Champ `documents` existe dans le type mais pas d'UI d'upload
- Pas de catégorisation des documents
- Pas de validation des documents requis

#### 4. **Champs de Localisation Manquants**
**PDF :** Fokontany, Commune, District, Situation du site
**Code :** ❌ Manquants
- Pas de champ Fokontany
- Pas de champ Commune  
- Pas de champ District
- Pas de champ Situation (ville/rurale/montagne)

#### 5. **Validation et Approbation - MANQUANTE**
**PDF :** Processus de validation et approbation
**Code :** ❌ Absent du formulaire
- Section `validation` existe dans le type mais pas d'UI
- Pas de workflow d'approbation
- Pas de signatures électroniques

#### 6. **Suivi et Clôture - MANQUANTE**
**PDF :** Suivi des incidents et clôture
**Code :** ❌ Absent du formulaire
- Section `suivi` existe dans le type mais pas d'UI
- Pas de gestion des incidents
- Pas de processus de clôture

### ⚠️ PROBLÈMES D'IMPLÉMENTATION

#### 1. **Arrays Multi-valeurs Limités**
**Problème :** Le code utilise `register('field.0')` pour les équipements/formations
**Impact :** Limite à une seule valeur par catégorie
**Solution :** Utiliser `useFieldArray` comme pour les risques

#### 2. **Validations Insuffisantes**
**Problème :** Certaines validations du PDF ne sont pas implémentées
**Exemples :**
- Pas de validation de cohérence des dates
- Pas de validation des coordonnées GPS
- Pas de validation des numéros de téléphone

#### 3. **Champs Optionnels vs Obligatoires**
**Problème :** Certains champs marqués optionnels dans le code sont obligatoires dans le PDF
**Exemples :**
- `coordonneesGPS` : optionnel dans le code, requis dans le PDF
- `certifications` : optionnel dans le code, requis dans le PDF

## Recommandations Prioritaires

### 🔴 CRITIQUE - À Implémenter Immédiatement

1. **Ajouter la Section Engagement du Prestataire**
   - Champs : numéro registre commerce, qualité représentant
   - Champs localisation : Fokontany, Commune, District, Situation
   - Section engagements avec checkboxes

2. **Ajouter la Section Signatures**
   - Interface de signature électronique
   - Champs pour fonctions des signataires

3. **Implémenter l'Upload de Documents**
   - Interface d'upload avec catégorisation
   - Validation des documents requis
   - Gestion des annexes

### 🟡 IMPORTANT - À Améliorer

4. **Corriger les Arrays Multi-valeurs**
   - Remplacer `register('field.0')` par `useFieldArray`
   - Permettre l'ajout/suppression d'éléments

5. **Ajouter les Validations Manquantes**
   - Validation des coordonnées GPS
   - Validation des numéros de téléphone
   - Validation de cohérence des dates

6. **Implémenter le Workflow de Validation**
   - Section validation dans le formulaire
   - Processus d'approbation
   - Gestion des statuts

### 🟢 AMÉLIORATION - À Planifier

7. **Ajouter la Section Suivi**
   - Gestion des incidents
   - Processus de clôture
   - Historique des modifications

8. **Améliorer l'UX**
   - Formulaire multi-étapes
   - Sauvegarde automatique
   - Validation en temps réel

## Conclusion

Le formulaire actuel couvre environ **60%** des exigences du document PDF. Les écarts principaux concernent :

1. **Sections manquantes** (Engagement, Signatures, Documents)
2. **Champs de localisation incomplets**
3. **Workflow de validation absent**
4. **Upload de documents non implémenté**

Une refonte significative est nécessaire pour atteindre la conformité complète avec le document SGI-PPHSSES-TOA-601.

