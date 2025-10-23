# Plan de Prévention HSSES - Spécification Complète des Champs

## Vue d'ensemble

Document de référence : **SGI-PPHSSES-TOA-601**  
Version : 2.0  
Révision : 2025

Ce document liste l'ensemble des champs nécessaires pour le formulaire de Plan de Prévention conforme aux exigences ISO 14001 et 45001 de TowerCo of Africa.

---

## SECTION 1 : EN-TÊTE ET INFORMATIONS GÉNÉRALES

### Champs Principaux

| Champ | Type | Obligatoire | Description | Exemple |
|-------|------|-------------|-------------|---------|
| **Projet / Activité** | Texte libre | ✅ Oui | Description du projet ou de l'activité | "Installation équipements télécommunication" |
| **Site** | Texte libre | ✅ Oui | Nom du site d'intervention | "Site Antananarivo Centre" |
| **Référence** | Texte / Auto-généré | ✅ Oui | Référence unique du plan | "PREV-2025-001" |
| **Révision** | Texte / Date | ✅ Oui | Année ou numéro de révision | "2025" (par défaut) |

**Rôles autorisés à remplir** : Chef de projet, HSE

---

## SECTION 2 : ENGAGEMENT DU PRESTATAIRE

### A. Informations de la Société Prestataire

| Champ | Type | Obligatoire | Description | Exemple |
|-------|------|-------------|-------------|---------|
| **Société** | Texte | ✅ Oui | Nom de la société prestataire | "eTech Consulting" |
| **N° RCS** | Texte/Numérique | ✅ Oui | Numéro d'inscription au registre du commerce | "2023-B-12345" |
| **Siège social** | Texte | ✅ Oui | Adresse du siège social | "Lot II J 123 Analamahitsy, Antananarivo" |
| **Représentant** | Texte | ✅ Oui | Nom complet (Mr/Mme/Mlle) | "M. Paul RANDRIA" |
| **Qualité/Fonction** | Texte | ✅ Oui | Fonction du représentant | "Directeur Technique" |

### B. Détails du Site d'Intervention

| Champ | Type | Obligatoire | Description | Exemple |
|-------|------|-------------|-------------|---------|
| **Localité** | Texte | ✅ Oui | Localité précise | "Ankorondrano" |
| **Fokontany** | Texte | ✅ Oui | Fokontany | "Ankorondrano Nord" |
| **Commune** | Texte | ✅ Oui | Commune | "Antananarivo Renivohitra" |
| **District** | Texte | ✅ Oui | District | "Antananarivo" |
| **Région** | Texte | ✅ Oui | Région | "Analamanga" |
| **Coordonnées GPS** | Texte | ❌ Non | Latitude/Longitude | "-18.8792, 47.5079" |
| **Situation géographique** | Dropdown + Texte | ✅ Oui | Type de zone | "en ville" / "rurale" / "sur montagne" / "autre" |
| **Situation (si autre)** | Texte | Conditionnel | Détails si "autre" sélectionné | "Zone côtière" |

### C. Date et Signatures

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Date de signature** | Date | ✅ Oui | Date de signature du plan |

**Signatures et Informations des Parties** :

#### Pour le Donneur d'Ordre (TOA)
- Nom et Prénom (texte) ✅
- Fonction (texte) ✅
- Signature (upload image ou signature électronique) ✅

#### Pour le Prestataire
- Nom de la Société (texte) ✅
- Nom et Prénom (texte) ✅
- Fonction (texte) ✅
- Signature (upload image ou signature électronique) ✅

---

## SECTION 3 : DESCRIPTION DES TRAVAUX

| Champ | Type | Obligatoire | Description | Exemple |
|-------|------|-------------|-------------|---------|
| **Nature intervention** | Texte | ✅ Oui | Type d'intervention | "Maintenance préventive" |
| **Description travaux** | Texte long | ✅ Oui | Description détaillée | "Remplacement des équipements défectueux..." |
| **Nombre intervenants** | Numérique | ✅ Oui | Nombre de personnes | 5 |
| **Durée estimée** | Numérique | ✅ Oui | En heures | 24 |
| **Horaires début** | Heure | ✅ Oui | Heure de début | "08:00" |
| **Horaires fin** | Heure | ✅ Oui | Heure de fin | "17:00" |
| **Horaires pause** | Texte | ✅ Oui | Temps de pause | "12:00-13:00" |

---

## SECTION 4 : RISQUES DUS AUX ACTIVITÉS ET INSTALLATIONS

### A. Identification des Risques Générés par les Activités

#### Tableau Principal (Checkboxes organisées par catégories)

**1. Catégorie : Risques liés à l'environnement**
- ☐ Catégorie active (Oui/Non)
- **Sous-types** :
  - ☐ Pollutions (déversement)
  - ☐ Incendie

**2. Catégorie : Risque Social**
- ☐ Catégorie active (Oui/Non)
- **Sous-types** :
  - ☐ Contestation riveraine
  - ☐ Sureté
  - ☐ Autre(s) → Champ texte pour préciser

**3. Catégorie : Risque lié à la santé et sécurité**
- ☐ Catégorie active (Oui/Non)
- **Sous-types** (18 risques spécifiques) :
  - ☐ Accident lié à la sécurité routière
  - ☐ Risque chimique
  - ☐ Risque en hauteur
  - ☐ Risque d'ensevelissement et/ou effondrement
  - ☐ Risque de noyade
  - ☐ Risques liés aux installations électriques
  - ☐ Risque lié à la manipulation des outils à la main
  - ☐ Risque lié à la manipulation des outillages électroportatifs
  - ☐ Accident lié à manutention mécanique
  - ☐ Accident lié à manutention manuelle
  - ☐ Risque lié au travail à chaud
  - ☐ Risque lié au travail isolé
  - ☐ Risque lié aux coactivités
  - ☐ Risque lié à l'ambiance thermique
  - ☐ Risque lié au bruit
  - ☐ Risques psychosociaux
  - ☐ Risque face aux maladies infectieuses
  - ☐ Risque du paludisme
  - ☐ Autre(s) → Champ texte pour préciser

**4. Catégorie : Risque lié aux installation/infrastructure existants**
- ☐ Catégorie active (Oui/Non)
- **Sous-types** :
  - ☐ Risques liés à l'accès sur site
  - ☐ Risques liés à l'état des infrastructures existants (Greenfield, Rooftop)
  - ☐ Autre(s) pour le site Rooftop → Champ texte pour préciser

### Tableau n°1 : Détail des Risques Identifiés

**Répétable** pour chaque risque identifié :

| Champ | Type | Description |
|-------|------|-------------|
| **Détail du risque identifié** | Texte | Description précise du risque |
| **Nature et localisation** | Texte | Où et comment le risque se manifeste |
| **Mesures de protection à prendre** | Texte | Actions pour prévenir le risque |
| **Mises en œuvre par** | Select | "TOA" ou "Prestataire" |

**Bouton** : "Ajouter un risque" pour créer une nouvelle ligne.

### Tableau n°2 : Sécurité Routière (Spécifique)

**Détail du risque** : "Risques liés au déplacement vers site" (fixe)

**Mesures de protection** (checkboxes + upload d'évidences) :

| Mesure | Checkbox | Upload Évidence |
|--------|----------|-----------------|
| Gestion de temps de pause | ☐ | 📎 Upload |
| Formation du chauffeur en conduite défensive | ☐ | 📎 Upload |
| Chauffeur apte médicalement | ☐ | 📎 Upload |
| Plan du trajet | ☐ | 📎 Upload |
| Géolocalisation des flottes | ☐ | 📎 Upload |
| Check-list avant départ des véhicules | ☐ | 📎 Upload |
| Respect des règlements et exigences (chargement, transport, conduite de nuit) | ☐ | 📎 Upload |
| Maintenance périodique des véhicules | ☐ | 📎 Upload |

**Note** : Pour chaque mesure cochée, un fichier justificatif doit être fourni en annexe.

---

### B. Installations et Équipements à l'Usage des Salariés

#### I. Liste des Installations

**Tableau répétable** :

| Champ | Type | Description |
|-------|------|-------------|
| **Descriptions des installations** | Texte | Ex: "Lieu de stockage des produits", "Autres installations" |
| **Présent (Oui/Non)** | Checkbox | Si l'installation est présente |
| **Conditions d'utilisation** | Texte | Comment l'installation est utilisée |

**Bouton** : "Ajouter une installation"

#### II. Liste des Matériels, Équipements et Outillages

**Tableau répétable** :

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Description** | Texte | ✅ | Ex: "Équipement de premier secours", "Kit de sauvetage", "Kit absorbant anti-pollution" |
| **Présent (Oui/Non)** | Checkbox | ✅ | Si le matériel est disponible |
| **Conditions d'utilisation** | Texte | ✅ | Mode d'emploi ou conditions |
| **Date de vérification** | Date | ✅ | Date de dernier contrôle |
| **Vérifié par** | Texte | ✅ | Nom ou rôle de la personne |
| **Checklist annexée** | Upload | ❌ | Upload de la checklist de vérification |

**Bouton** : "Ajouter un équipement"

**Note importante** : Compléter ce tableau avec des check-lists en annexe.

---

## SECTION 5 : DOCUMENTS HSSES À FOURNIR PAR LE PRESTATAIRE

**Tableau des Documents et Actions** (répétable, 6 lignes minimum) :

| N° | Action | Action Réalisée (Oui/Non) | Document/Livrable à fournir | Livrable Fourni (Oui/Non) | Upload Annexes |
|----|--------|---------------------------|----------------------------|---------------------------|----------------|
| 1 | **COMMUNICATION** : Information et sensibilisation pour les employés | ☐ | PV du toolbox sur la communication des consignes sécuritaires basées sur le MDOP et ADR | ☐ | 📎 Upload |
| 2 | **Qualification/habilitation** | ☐ | Certificats ou badge/Stickers pour l'habilitation électrique et secourisme | ☐ | 📎 Upload |
| 3 | **Préparation et réponses aux situations d'urgence** | ☐ | Communication de la liste de l'équipe de première intervention en cas de scénarios d'urgence (incendie/explosion, blessures, épandage de produits dangereux) | ☐ | 📎 Upload |
| 4 | **Équipement de Protection Individuel (EPI)** | ☐ | Photos du personnel avec les EPI adéquats selon leur tâche respective | ☐ | 📎 Upload |
| 5 | **Analyse de risques** | ☐ | Évidences des Take 5 réalisés sur site | ☐ | 📎 Upload |
| 6 | **Repli de chantier** | ☐ | Photos montrant le housekeeping et la finalité des déchets générés sur site | ☐ | 📎 Upload |

**Fonctionnalités** :
- Chaque ligne peut être cochée indépendamment
- Chaque document peut être uploadé
- Possibilité d'ajouter des lignes supplémentaires ("Ajouter un document HSSES")

**Colonnes du tableau** :
1. **N°** : Auto-généré (1 à 6+)
2. **Action** : Description de l'action ou catégorie
3. **Oui/Non (Action)** : Checkbox si l'action a été réalisée
4. **Document/Livrable à fournir** : Description du document attendu
5. **Oui/Non (Livrable)** : Checkbox si le livrable est fourni
6. **Upload** : Bouton d'upload pour annexer les documents

---

## SECTIONS EXISTANTES (À CONSERVER)

### Formation et Compétences
- Personnel formé
- Formations requises
- Certifications
- Personnel habilité

### Procédures d'Urgence
- Plan d'évacuation
- Numéros d'urgence
- Secouriste présent
- Poste de secours
- Hôpital de référence

### Surveillance et Contrôle
- Contrôles réguliers
- Fréquence des contrôles
- Responsable contrôle
- Points de contrôle

### Documents et Attestations
- Assurance responsabilité
- Attestation formation
- Certificat habilitation
- Autres documents

### Validation et Approbation
- Validé par (HSE)
- Date validation
- Commentaires
- Signature

### Suivi et Clôture
- Incidents
- Observations
- Améliorations
- Clôturé par
- Date clôture

---

## RÉCAPITULATIF DES CHAMPS MANQUANTS AJOUTÉS

### Section 2 : Engagement du Prestataire
- ✅ N° RCS (Registre Commerce)
- ✅ Siège social
- ✅ Qualité/Fonction du représentant
- ✅ Fokontany
- ✅ Commune
- ✅ District
- ✅ Situation géographique (dropdown + texte)
- ✅ Fonction pour le Donneur d'Ordre

### Section 4 : Risques
- ✅ Incendie (dans risques environnementaux)
- ✅ Section B complète : Installations et Équipements
  - Liste des installations (répétable)
  - Liste des matériels/équipements (répétable)
  - Date de vérification
  - Vérifié par
  - Upload check-lists

### Section 5 : Documents HSSES
- ✅ Section complète : Documents HSSES à Fournir
  - 6 actions standard
  - Checkbox action réalisée
  - Checkbox livrable fourni
  - Upload annexes pour chaque ligne
  - Possibilité d'ajouter des lignes

---

## WORKFLOW DE VALIDATION

### Étape 1 : Création par le Prestataire
1. Remplit toutes les sections obligatoires
2. Coche les risques applicables
3. Détaille chaque risque identifié
4. Fournit les mesures de protection
5. Upload des évidences (sécurité routière, documents HSSES)
6. Signe électroniquement
7. Soumet pour validation

### Étape 2 : Examen par le Chef de Projet
1. Vérifie la complétude du plan
2. Examine les risques identifiés
3. Valide les mesures de protection
4. Ajoute des commentaires si nécessaire
5. Signe et valide

### Étape 3 : Validation Finale par HSE
1. Vérifie la conformité ISO 14001/45001
2. Contrôle les évidences fournies
3. Valide les installations et équipements
4. Attribue une référence unique
5. Signe et approuve
6. Le plan devient actif

### Étape 4 : Pendant l'Intervention
1. Le prestataire suit le plan validé
2. Réalise les Take 5 quotidiens
3. Maintient les EPI et équipements
4. Documente tout incident

### Étape 5 : Clôture
1. Repli de chantier documenté (photos)
2. HSE vérifie la conformité finale
3. Clôture du plan
4. Archivage pour traçabilité ISO

---

## VALIDATION DU FORMULAIRE

### Champs Obligatoires
- ✅ Tous les champs marqués "Obligatoire" dans les tableaux ci-dessus
- ✅ Au moins 1 risque identifié
- ✅ Au moins 1 mesure de protection pour chaque risque
- ✅ Signature du prestataire
- ✅ Upload des évidences pour sécurité routière (si applicable)

### Règles de Validation
1. **Email** : Format valide (ex: @entreprise.mg)
2. **Téléphone** : Format international (+261...)
3. **GPS** : Format latitude, longitude (-18.xxx, 47.xxx)
4. **Dates** : Date de fin > Date de début
5. **N° RCS** : Non vide, format alphanumérique
6. **Nombre intervenants** : > 0
7. **Durée estimée** : > 0 heures

### Messages d'Erreur
- "Ce champ est obligatoire"
- "Format d'email invalide"
- "La date de fin doit être postérieure à la date de début"
- "Veuillez identifier au moins un risque"
- "Veuillez fournir au moins une mesure de protection"

---

## PERMISSIONS PAR RÔLE

| Action | Prestataire | Chef Projet | HSE | Admin | Super Admin |
|--------|-------------|-------------|-----|-------|-------------|
| Créer plan | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modifier (brouillon) | ✅ (sien) | ✅ | ✅ | ✅ | ✅ |
| Soumettre pour validation | ✅ (sien) | ❌ | ❌ | ❌ | ✅ |
| Valider (Chef) | ❌ | ✅ | ❌ | ✅ | ✅ |
| Valider final (HSE) | ❌ | ❌ | ✅ | ✅ | ✅ |
| Attribuer référence | ❌ | ❌ | ✅ | ✅ | ✅ |
| Voir tous les plans | ❌ | ✅ | ✅ | ✅ | ✅ |
| Clôturer | ❌ | ❌ | ✅ | ✅ | ✅ |

---

## INTÉGRATION AVEC LES AUTRES MODULES

### Lien avec Permis de Travail
- Chaque plan de prévention est référencé dans la demande de permis
- Le permis ne peut être créé sans plan de prévention validé
- Référence du plan affichée sur le permis

### Lien avec Interventions
- Le plan est consulté lors des validations journalières
- Les risques identifiés sont rappelés lors des Take 5
- Les mesures de protection sont vérifiées quotidiennement

### Lien avec Utilisateurs
- Seuls les prestataires et équipe TOA peuvent créer des plans
- La signature électronique est liée au compte utilisateur
- Traçabilité complète (qui a créé, modifié, validé)

### Lien avec Statistiques
- Nombre de plans par prestataire
- Taux de validation
- Types de risques les plus fréquents
- Délais moyen de validation
- Conformité ISO (% de plans conformes)

---

## EXPORT ET IMPRESSION

### Format PDF
- En-tête avec logos TOA et Prestataire
- Numérotation des pages
- Table des matières
- Signatures électroniques visibles
- Annexes incluses
- Footer avec référence et date

### Format Excel
- Export des risques pour analyse
- Export des mesures de protection
- Export des documents HSSES
- Pivot tables pour statistiques

---

## CONFORMITÉ ISO 14001 & ISO 45001

### ISO 14001 - Management Environnemental
- ✅ Identification des aspects environnementaux (pollutions, déchets)
- ✅ Évaluation des risques environnementaux
- ✅ Mesures de prévention et protection
- ✅ Suivi et contrôle
- ✅ Documentation et traçabilité

### ISO 45001 - Santé et Sécurité au Travail
- ✅ Identification des dangers
- ✅ Évaluation des risques professionnels
- ✅ Hiérarchie des mesures de contrôle
- ✅ Formation et compétences
- ✅ Procédures d'urgence
- ✅ Surveillance et amélioration continue

---

**Version** : 1.0  
**Date** : 23 Octobre 2025  
**Statut** : Spécification Complète  
**Conformité** : ISO 14001 & ISO 45001
