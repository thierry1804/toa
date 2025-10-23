# Guide du Module Gestion des Utilisateurs

## Vue d'ensemble

Le module de gestion des utilisateurs permet de créer, modifier et gérer tous les comptes utilisateurs de la plateforme TOA HSE. Il prend en charge les 6 types de rôles différents et gère spécifiquement les 11 prestataires partenaires de TOA.

## Accès au Module

1. Connectez-vous à la plateforme TOA HSE
2. Dans le menu latéral, cliquez sur **Utilisateurs**
3. Vous accédez à la liste des utilisateurs

> **Note**: Seuls les Super Administrateurs et Administrateurs ont accès à ce module.

## Page Liste des Utilisateurs

### Statistiques en Haut de Page

Cinq cartes affichent les statistiques principales :
- **Total** : Nombre total d'utilisateurs dans le système
- **Actifs** : Utilisateurs pouvant se connecter
- **Inactifs** : Utilisateurs désactivés
- **Prestataires** : Nombre de comptes prestataires (max 11 entreprises)
- **Équipe TOA** : Membres de l'équipe interne

### Filtres

Trois options de filtrage disponibles :
1. **Recherche** : Par nom, prénom, email, téléphone ou entreprise
2. **Rôle** : Filtrer par type d'utilisateur
3. **Statut** : Actifs ou Inactifs

### Tableau des Utilisateurs

Chaque ligne affiche :
- **Utilisateur** : Avatar, nom complet, indication "(Vous)" si c'est votre compte
- **Contact** : Email et téléphone
- **Rôle** : Badge coloré selon le rôle
  - 🔴 Super Administrateur
  - 🟠 Administrateur
  - 🔵 Chef de Projet
  - 🟢 Responsable HSE
  - ⚪ Prestataire
  - 🔵 Direction Générale
- **Entreprise** : Nom de l'entreprise (pour les prestataires) ou "TOA" pour l'équipe interne
- **Statut** : Badge Actif (vert) ou Inactif (rouge)
- **Créé le** : Date de création du compte
- **Actions** : Boutons d'action disponibles

### Actions Disponibles

- 👁️ **Voir** : Consulter les détails (à venir)
- ✏️ **Modifier** : Éditer les informations
- 🔄 **Activer/Désactiver** : Changer le statut du compte
- 🗑️ **Supprimer** : Supprimer définitivement l'utilisateur

> **Restrictions** : Vous ne pouvez pas modifier ou supprimer votre propre compte.

## Créer un Utilisateur

### Étape 1 : Accéder au Formulaire
- Cliquer sur le bouton **"Nouvel utilisateur"** en haut à droite
- Vous accédez au formulaire de création

### Étape 2 : Informations Personnelles

**Champs obligatoires** :
- **Nom** * : Nom de famille (Ex: RAKOTO)
- **Prénom** * : Prénom (Ex: Jean)
- **Email** * : Adresse email unique (Ex: jean.rakoto@entreprise.mg)
  - Doit être valide et unique dans le système
- **Téléphone** * : Numéro de téléphone (Ex: +261 34 12 345 67)

### Étape 3 : Rôle et Permissions

**Sélectionner le rôle** * :

#### 1. Super Administrateur 🔴
**Permissions** :
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs et des rôles
- Configuration système

**Usage** : Réservé aux administrateurs système.

#### 2. Administrateur 🟠
**Permissions** :
- Gestion des permis et plans de prévention
- Gestion des utilisateurs
- Accès aux statistiques

**Usage** : Équipe administrative TOA.

#### 3. Chef de Projet 🔵
**Permissions** :
- Examen et validation des demandes de permis
- Ajout de commentaires sur les permis
- Suivi des interventions
- Consultation des statistiques

**Usage** : Responsables de projet chez TOA (ex: Mr Manjaka).

#### 4. Responsable HSE 🟢
**Permissions** :
- Attribution des références aux permis validés
- Vérification des plans de prévention
- Suivi quotidien des interventions
- Validation des Take 5
- Maîtrise des risques et incidents
- Clôture des interventions

**Usage** : Équipe HSE (ex: Mme Ravaka).

**Rôle clé** : C'est le département HSE qui utilise principalement l'application pour la maîtrise des risques conformément à la certification ISO 14001 et 45001.

#### 5. Prestataire ⚪
**Permissions** :
- Création de plans de prévention
- Demande de permis de travail
- Suivi de ses propres interventions
- Soumission de validations journalières
- Réalisation de Take 5
- Signalement d'incidents

**Usage** : Les 11 entreprises partenaires qui réalisent les travaux.

**Champ supplémentaire obligatoire** :
- **Entreprise** * : Nom de l'entreprise prestataire

> **Note importante** : TOA travaille avec 11 prestataires partenaires. Chaque prestataire doit remplir un plan de prévention et obtenir un permis avant chaque intervention.

#### 6. Direction Générale 🔵
**Permissions** :
- Vue d'ensemble de tous les permis et interventions
- Accès aux tableaux de bord et KPI
- Consultation des statistiques globales

**Usage** : Direction pour le suivi global.

### Étape 4 : Sécurité

**Obligatoire à la création** :
- **Mot de passe** * : Minimum 6 caractères
- **Confirmer le mot de passe** * : Doit correspondre au mot de passe

> **Sécurité** : Le mot de passe sera utilisé pour la connexion de l'utilisateur.

### Étape 5 : Statut du Compte

**Compte actif** :
- ☑️ **Coché** : L'utilisateur peut se connecter immédiatement
- ☐ **Non coché** : Le compte est créé mais désactivé

> **Conseil** : Laissez coché pour un compte actif par défaut.

### Étape 6 : Créer

- Vérifier toutes les informations
- Cliquer sur **"Créer l'utilisateur"**
- Vous êtes redirigé vers la liste avec un message de confirmation

## Modifier un Utilisateur

### Accéder à la Modification
1. Dans la liste des utilisateurs, trouver l'utilisateur à modifier
2. Cliquer sur l'icône **✏️ Modifier**
3. Le formulaire s'ouvre avec les informations actuelles

### Champs Modifiables
- ✅ Toutes les informations personnelles
- ✅ Le rôle et l'entreprise
- ✅ Le statut actif/inactif
- ⚠️ Le mot de passe (optionnel)

### Modification du Mot de Passe

**En mode édition** :
- Les champs mot de passe sont **optionnels**
- **Laissez-les vides** pour conserver le mot de passe actuel
- **Remplissez-les** uniquement pour changer le mot de passe

Un message jaune vous rappelle : _"Laissez les champs vides pour conserver le mot de passe actuel."_

### Enregistrer les Modifications
- Cliquer sur **"Enregistrer les modifications"**
- Les changements sont appliqués immédiatement

## Gérer le Statut d'un Utilisateur

### Désactiver un Compte
1. Dans la liste, trouver l'utilisateur actif
2. Cliquer sur l'icône **🔄 Désactiver** (orange)
3. Confirmer l'action
4. Le badge passe à **Inactif** (rouge)
5. L'utilisateur ne peut plus se connecter

### Réactiver un Compte
1. Filtrer par statut "Inactifs" si nécessaire
2. Trouver l'utilisateur inactif
3. Cliquer sur l'icône **🔄 Activer** (vert)
4. Confirmer l'action
5. Le badge passe à **Actif** (vert)
6. L'utilisateur peut à nouveau se connecter

## Supprimer un Utilisateur

### Procédure
1. Dans la liste, trouver l'utilisateur
2. Cliquer sur l'icône **🗑️ Supprimer** (rouge)
3. Une confirmation s'affiche avec le nom de l'utilisateur
4. Confirmer la suppression
5. L'utilisateur est **définitivement supprimé**

> **⚠️ Attention** : Cette action est **irréversible**. Toutes les données de l'utilisateur seront perdues.

### Restrictions
- ❌ Vous ne pouvez pas supprimer votre propre compte
- ✅ Seuls les Super Admins et Admins peuvent supprimer des comptes

## Les 11 Prestataires Partenaires

### Contexte
TowerCo of Africa travaille avec **11 entreprises prestataires** qui interviennent sur les zones d'exploitation. Chaque prestataire :
1. Doit créer un compte utilisateur
2. Remplit un plan de prévention avant chaque mission
3. Fait une demande de permis pour les travaux à risque
4. Ne peut accéder au site qu'avec un permis valide

### Prestataires Actuels (Exemples)
1. eTech Consulting
2. TELMA
3. Orange Madagascar
4. Airtel Madagascar
5. TechnoServ
6. Madagascar Telecom
7. InfraTech Solutions
8. BTP Services
9. Électricité Pro
10. Network Install
11. Maintenance Plus

### Gestion Spécifique
- **Rôle** : Toujours "Prestataire"
- **Entreprise** : Obligatoire et unique
- **Accès** : Limité à leurs propres permis et interventions
- **Certifications** : ISO 14001 (environnement) et 45001 (sécurité)

## Flux de Travail Type

### Nouvelle Entreprise Prestataire
1. **Super Admin/Admin** crée le compte utilisateur
   - Rôle : Prestataire
   - Entreprise : Nom de la nouvelle entreprise
   - Email et téléphone du responsable
   - Mot de passe initial

2. **Communication** au prestataire
   - Email de connexion
   - Mot de passe temporaire
   - Instructions de première connexion

3. **Prestataire** se connecte
   - Change son mot de passe
   - Accède à ses fonctionnalités
   - Peut créer des plans de prévention
   - Peut demander des permis

### Nouvelle Équipe HSE
1. **Super Admin** crée le compte
   - Rôle : Responsable HSE
   - Pas d'entreprise (équipe TOA)
   - Email TOA (@toa.mg)

2. **HSE** reçoit ses accès
   - Peut valider les permis
   - Attribue les références
   - Suit les interventions quotidiennes

### Nouveau Chef de Projet
1. **Super Admin/Admin** crée le compte
   - Rôle : Chef de Projet
   - Email TOA
   
2. **Chef de Projet** accède
   - Examine les demandes de permis
   - Valide ou refuse avec commentaires
   - Suit les interventions

## Bonnes Pratiques

### Création de Comptes
- ✅ Vérifier l'unicité de l'email
- ✅ Utiliser des emails professionnels
- ✅ Assigner le bon rôle dès la création
- ✅ Communiquer le mot de passe de façon sécurisée
- ✅ Demander à l'utilisateur de changer son mot de passe

### Gestion des Accès
- ✅ Désactiver plutôt que supprimer (traçabilité)
- ✅ Réactiver les comptes temporairement inactifs
- ✅ Supprimer uniquement les doublons ou erreurs
- ✅ Réviser régulièrement la liste des actifs

### Sécurité
- 🔒 Mots de passe d'au moins 6 caractères
- 🔒 Ne jamais partager les identifiants par email non sécurisé
- 🔒 Désactiver immédiatement les comptes en cas de départ
- 🔒 Réviser les permissions régulièrement

### Prestataires
- 📋 Maintenir la liste des 11 entreprises partenaires
- 📋 Un seul compte principal par entreprise recommandé
- 📋 Documenter les contacts de chaque prestataire
- 📋 Former les prestataires à l'utilisation de la plateforme

## Certification ISO et Maîtrise des Risques

### Contexte ISO 14001 et 45001
TowerCo of Africa est certifié :
- **ISO 14001** : Management environnemental
- **ISO 45001** : Santé et sécurité au travail

La gestion des utilisateurs et des accès fait partie intégrante du système de maîtrise des risques HSE.

### Traçabilité
Chaque utilisateur créé inclut :
- ✅ Date de création
- ✅ Date de dernière modification
- ✅ Historique des actions (à venir)

### Responsabilités
- **Super Admin** : Configuration système et urgences
- **Admin** : Gestion quotidienne des utilisateurs
- **HSE** : Validation et suivi des risques
- **Chef de Projet** : Validation des demandes
- **Prestataires** : Exécution sécurisée des travaux
- **DG** : Supervision et KPIs

## Support et Questions

### En cas de problème
1. Vérifier les permissions de votre compte
2. Consulter ce guide
3. Contacter le Super Administrateur
4. Documenter le problème rencontré

### Demandes Fréquentes

**Q: Combien d'utilisateurs peut-on créer ?**
R: Illimité, mais on recommande 1 compte par personne et par entreprise prestataire.

**Q: Peut-on avoir plusieurs Super Admins ?**
R: Oui, mais limiter pour des raisons de sécurité.

**Q: Un prestataire peut-il voir les permis des autres ?**
R: Non, chaque prestataire voit uniquement ses propres données.

**Q: Comment ajouter un 12ème prestataire ?**
R: Créer simplement un nouveau compte avec le rôle Prestataire et le nom de la nouvelle entreprise.

**Q: Que faire si un utilisateur oublie son mot de passe ?**
R: Le Super Admin/Admin peut modifier le compte et définir un nouveau mot de passe.

---

**Version** : 1.0  
**Date** : Octobre 2025  
**Plateforme** : TOA HSE - Module Gestion des Utilisateurs  
**Conformité** : ISO 14001 & ISO 45001
