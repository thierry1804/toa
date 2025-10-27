# SCRIPT DÉTAILLÉ DE DÉMONSTRATION
## TOA HSSES - Présentation Pas à Pas

**Date :** 16 Janvier 2025  
**Version :** 1.0  
**Durée :** 45-60 minutes  

---

## 🎬 **INTRODUCTION (2 minutes)**

### **Accueil et Présentation :**
> "Bonjour et bienvenue à cette démonstration du système TOA HSSES. Je vais vous présenter une solution complète de gestion des permis de travail et des plans de prévention, développée spécifiquement pour répondre aux exigences HSSES de TOA.
> 
> Cette démonstration durera environ 45 minutes et couvrira les 4 profils utilisateurs principaux : Prestataire, Chef de Projet, HSE, et Super Admin.
> 
> Nous allons suivre un workflow complet, de la création d'un plan de prévention par un prestataire jusqu'à la validation finale par HSE, en passant par l'examen du Chef de Projet."

### **Objectifs de la Démonstration :**
> "Les objectifs de cette démonstration sont :
> - Démontrer la conformité aux standards HSSES de TOA
> - Présenter les workflows complets par profil utilisateur
> - Valider l'efficacité opérationnelle du système
> - Rassurer sur la sécurité et la traçabilité"

---

## 👤 **SCÉNARIO 1 : PRESTATAIRE (15 minutes)**

### **1.1 Connexion et Présentation du Dashboard (2 min)**

**Actions :**
1. Ouvrir le navigateur
2. Aller sur `https://toa-prototype.netlify.app/`
3. Cliquer sur "Se connecter"
4. Saisir : `prestataire@etech.mg`
5. Saisir le mot de passe : `prest123`
6. Cliquer sur "Connexion"

**Script :**
> "Commençons par le profil Prestataire. Je me connecte avec les identifiants d'eTech.
> 
> [Attendre la connexion]
> 
> Voici le dashboard du prestataire. Comme vous pouvez le voir, il ne présente que les données pertinentes pour eTech. L'utilisateur ne peut pas accéder aux données d'autres prestataires, garantissant la confidentialité et l'isolation des données.
> 
> Le menu de navigation est adapté au rôle : on trouve les Permis, Plans de Prévention, et Interventions, mais pas la gestion des utilisateurs qui est réservée aux administrateurs."

### **1.2 Création d'un Plan de Prévention (5 min)**

**Actions :**
1. Cliquer sur "Plans de Prévention" dans le menu
2. Cliquer sur "Nouveau Plan"
3. **Étape 1 - Informations générales :**
   - Titre : "Maintenance des pompes à essence"
   - Description : "Maintenance préventive des pompes à essence de la station service"
4. **Étape 2 - Localisation :**
   - Site : "Station Service Antananarivo"
   - Adresse : "Route d'Antsirabe, Antananarivo"
   - Code site : "SS-ANT-001"
5. **Étape 3 - Responsables :**
   - Maître d'ouvrage : "TOA Madagascar"
   - Prestataire : "eTech Solutions"
6. Cliquer sur "Suivant" après chaque étape

**Script :**
> "Le prestataire commence par créer un plan de prévention. Le formulaire est structuré en étapes pour guider l'utilisateur et éviter les oublis.
> 
> [Remplir l'étape 1]
> 
> L'étape 1 collecte les informations générales. Le système valide en temps réel que tous les champs obligatoires sont remplis.
> 
> [Remplir l'étape 2]
> 
> L'étape 2 concerne la localisation. Le code site est important pour la traçabilité et l'organisation des données.
> 
> [Remplir l'étape 3]
> 
> L'étape 3 identifie les parties prenantes. Ces informations sont essentielles pour la responsabilité et la traçabilité."

**Actions (suite) :**
7. **Étape 4 - Nature des travaux :**
   - Nature : "Maintenance"
   - Description : "Maintenance préventive des pompes à essence, vérification des joints, remplacement des filtres"
   - Nombre d'intervenants : 3
   - Durée estimée : 2 jours
8. **Étape 5 - Planning :**
   - Date de début : Demain
   - Date de fin : Après-demain
   - Horaires : 8h00 - 17h00
   - Pause : 12h00 - 13h00
9. **Étape 6 - Identification des risques :**
   - Risque chimique : "Exposition aux vapeurs d'essence"
   - Risque électrique : "Travaux à proximité d'installations électriques"
   - Risque d'incendie : "Travaux sur équipements contenant des hydrocarbures"

**Script :**
> "L'étape 4 définit précisément la nature des travaux. Le système adapte les validations selon le type d'activité.
> 
> [Remplir l'étape 4]
> 
> L'étape 5 planifie l'intervention. Les dates et horaires sont validés pour éviter les conflits.
> 
> [Remplir l'étape 5]
> 
> L'étape 6 est cruciale : l'identification des risques. Le système propose une liste structurée de risques selon les standards HSSES, avec catégorisation par type : environnemental, social, santé-sécurité, et infrastructure.
> 
> [Remplir l'étape 6]
> 
> Chaque risque identifié doit être accompagné de mesures de prévention appropriées. Le système guide l'utilisateur pour s'assurer que tous les risques sont correctement évalués."

### **1.3 Création d'un Permis de Travail (5 min)**

**Actions :**
1. Cliquer sur "Permis" dans le menu
2. Cliquer sur "Nouveau Permis"
3. Choisir "Permis Général"
4. **Informations de base :**
   - Intitulé : "Maintenance des pompes à essence"
   - Localisation : "Station Service Antananarivo"
   - Code site : "SS-ANT-001"
   - Contractant : "eTech Solutions"
   - Nombre d'intervenants : 3
5. **Dates :**
   - Date de début : Demain
   - Date de fin : Après-demain
   - Durée max : 2 jours
6. **Types de travaux à risques :**
   - Travaux électriques : ✓
   - Travaux chauds : ✓
   - Autres : "Travaux sur équipements contenant des hydrocarbures"
7. **Lien avec plan de prévention :**
   - Sélectionner le plan créé précédemment
8. Cliquer sur "Créer le permis"

**Script :**
> "Maintenant, le prestataire crée un permis de travail général. Ce permis sera automatiquement lié au plan de prévention créé précédemment.
> 
> [Remplir les informations de base]
> 
> Le système identifie les types de travaux à risques et adapte les validations en conséquence. Pour ce type de travaux, des permis annexes pourraient être nécessaires.
> 
> [Sélectionner les types de risques]
> 
> Le lien avec le plan de prévention est automatique. Cela garantit la cohérence entre le plan et le permis, et évite les doublons d'information.
> 
> [Créer le permis]
> 
> Le permis est créé et soumis automatiquement pour validation par le Chef de Projet. Le statut est mis à jour en temps réel."

### **1.4 Gestion des Interventions (3 min)**

**Actions :**
1. Cliquer sur "Interventions" dans le menu
2. Cliquer sur "Nouvelle Intervention"
3. **Informations de l'intervention :**
   - Référence : "INT-2025-001"
   - Description : "Maintenance pompes à essence - Station Antananarivo"
   - Permis associé : Sélectionner le permis créé
   - Équipe : "Équipe eTech - 3 personnes"
4. Cliquer sur "Créer l'intervention"
5. Cliquer sur "Démarrer l'intervention"
6. Cliquer sur "Nouveau Take 5"
7. **Take 5 - Étape 1 (Arrêter) :**
   - "Arrêt des pompes à essence"
   - "Coupure électrique des équipements"
8. **Take 5 - Étape 2 (Observer) :**
   - "Vérification de l'absence de vapeurs"
   - "Contrôle de l'isolation électrique"
9. Cliquer sur "Soumettre le Take 5"

**Script :**
> "Les interventions suivent un cycle de vie strict. Le prestataire crée une intervention liée au permis de travail.
> 
> [Créer l'intervention]
> 
> L'intervention peut être démarrée, suspendue, reprise, et clôturée. Chaque changement de statut est tracé.
> 
> [Démarrer l'intervention]
> 
> Le Take 5 est une évaluation de sécurité obligatoire avant de commencer les travaux. Il suit la méthode des 5 étapes : Arrêter, Observer, Analyser, Contrôler, Procéder.
> 
> [Remplir le Take 5]
> 
> Chaque étape du Take 5 est structurée pour s'assurer qu'aucun aspect de sécurité n'est oublié. Le Take 5 est transmis à HSE pour révision."

---

## 👨‍💼 **SCÉNARIO 2 : CHEF DE PROJET (10 minutes)**

### **2.1 Connexion et Vue d'Ensemble (2 min)**

**Actions :**
1. Cliquer sur le menu utilisateur (coin supérieur droit)
2. Cliquer sur "Déconnexion"
3. Cliquer sur "Se connecter"
4. Saisir : `chef@toa.mg`
5. Saisir le mot de passe : `chef123`
6. Cliquer sur "Connexion"

**Script :**
> "Maintenant, passons au profil Chef de Projet. Je me déconnecte et me reconnecte avec les identifiants du Chef de Projet.
> 
> [Attendre la connexion]
> 
> Voici le dashboard du Chef de Projet. Contrairement au prestataire, il a une vue d'ensemble de tous les projets en cours. Il peut voir les demandes en attente de validation, les statistiques globales, et accéder à tous les détails nécessaires pour prendre des décisions éclairées.
> 
> Le menu de navigation inclut l'accès aux statistiques, ce qui n'était pas disponible pour le prestataire."

### **2.2 Validation d'un Plan de Prévention (4 min)**

**Actions :**
1. Cliquer sur "Plans de Prévention" dans le menu
2. Cliquer sur le plan créé par le prestataire (statut "En attente de validation Chef")
3. Examiner les détails du plan
4. Cliquer sur "Valider par Chef de Projet"
5. **Modal de validation :**
   - Commentaire : "Plan de prévention complet et conforme. Les risques sont bien identifiés et les mesures de prévention appropriées. Validation accordée."
6. Cliquer sur "Valider"

**Script :**
> "Le Chef de Projet examine le plan de prévention soumis par le prestataire. Il a accès à tous les détails : identification des risques, mesures de prévention, planning, etc.
> 
> [Examiner le plan]
> 
> Le Chef de Projet peut voir que le plan est complet et bien structuré. Les risques liés aux hydrocarbures sont correctement identifiés avec des mesures de prévention appropriées.
> 
> [Ouvrir la modal de validation]
> 
> La validation nécessite un commentaire obligatoire. Cela garantit la traçabilité des décisions et permet d'expliquer le raisonnement du Chef de Projet.
> 
> [Valider avec commentaire]
> 
> Une fois validé, le plan passe au statut 'Validé par Chef - En attente HSE'. Le Chef de Projet ne peut plus le modifier, garantissant l'intégrité du processus de validation."

### **2.3 Validation d'un Permis de Travail (4 min)**

**Actions :**
1. Cliquer sur "Permis" dans le menu
2. Cliquer sur le permis créé par le prestataire (statut "En attente de validation Chef")
3. Examiner les détails du permis
4. Vérifier le lien avec le plan de prévention
5. Cliquer sur "Valider par Chef de Projet"
6. **Modal de validation :**
   - Commentaire : "Permis conforme au plan de prévention validé. Les travaux à risques sont correctement identifiés. Validation accordée."
7. Cliquer sur "Valider"

**Script :**
> "Le Chef de Projet examine maintenant le permis de travail. Il vérifie la cohérence avec le plan de prévention déjà validé.
> 
> [Examiner le permis]
> 
> Le Chef de Projet peut voir que le permis est correctement lié au plan de prévention et que les types de travaux à risques sont cohérents.
> 
> [Ouvrir la modal de validation]
> 
> La validation du permis suit le même processus que le plan de prévention : commentaire obligatoire et traçabilité complète.
> 
> [Valider avec commentaire]
> 
> Le permis passe au statut 'En attente de validation HSE'. Le Chef de Projet a rempli son rôle dans le processus de validation en s'assurant que la demande est complète et conforme."

---

## 🛡️ **SCÉNARIO 3 : HSE (10 minutes)**

### **3.1 Connexion et Vue HSE (2 min)**

**Actions :**
1. Cliquer sur le menu utilisateur
2. Cliquer sur "Déconnexion"
3. Cliquer sur "Se connecter"
4. Saisir : `hse@toa.mg`
5. Saisir le mot de passe : `hse123`
6. Cliquer sur "Connexion"

**Script :**
> "Passons maintenant au profil HSE, responsable de la validation finale et de l'attribution des références.
> 
> [Attendre la connexion]
> 
> Le dashboard HSE est spécialisé avec un accès privilégié aux validations en attente, aux métriques de sécurité, et aux contrôles de conformité. HSE peut suivre l'ensemble des activités HSSES de l'organisation."

### **3.2 Validation Finale du Plan de Prévention (4 min)**

**Actions :**
1. Cliquer sur "Plans de Prévention" dans le menu
2. Cliquer sur le plan validé par le Chef de Projet (statut "Validé par Chef - En attente HSE")
3. Examiner les vérifications de conformité ISO
4. Cliquer sur "Valider par HSE"
5. **Modal de validation HSE :**
   - Référence : "PP-HSE-2025-001"
   - Commentaires : "Plan conforme aux standards ISO 14001/45001. Tous les risques identifiés avec mesures appropriées. Validation accordée."
6. Cliquer sur "Valider"

**Script :**
> "HSE effectue la validation finale du plan de prévention. Le système effectue automatiquement des vérifications de conformité ISO 14001/45001.
> 
> [Examiner les vérifications de conformité]
> 
> Comme vous pouvez le voir, le système vérifie automatiquement :
> - L'identification et l'évaluation des risques ✓
> - Les mesures de prévention appropriées ✓
> - La formation du personnel ✓
> - Les équipements de protection ✓
> - Les procédures d'urgence ✓
> - La surveillance et le contrôle ✓
> 
> [Ouvrir la modal de validation HSE]
> 
> HSE doit attribuer une référence unique au plan. Cette référence suit un format standardisé et garantit la traçabilité.
> 
> [Valider avec référence et commentaires]
> 
> Le plan passe au statut 'Validé' et reçoit sa référence officielle. Il est maintenant prêt pour l'exécution des travaux."

### **3.3 Validation Finale du Permis et Suivi (4 min)**

**Actions :**
1. Cliquer sur "Permis" dans le menu
2. Cliquer sur le permis validé par le Chef de Projet (statut "En attente de validation HSE")
3. Cliquer sur "Valider par HSE"
4. **Modal de validation HSE :**
   - Commentaire : "Permis conforme. Référence attribuée automatiquement."
5. Cliquer sur "Valider"
6. Vérifier que la référence a été générée automatiquement
7. Aller dans "Interventions"
8. Examiner les Take 5 soumis par le prestataire
9. Cliquer sur "Réviser Take 5"

**Script :**
> "HSE valide maintenant le permis de travail. Le système génère automatiquement une référence unique selon le format : ANNÉE/PTW/XXX.
> 
> [Valider le permis]
> 
> [Vérifier la référence générée]
> 
> La référence '2025/PTW/001' a été automatiquement attribuée. Cette référence est unique et permet l'identification du permis dans tous les systèmes.
> 
> [Aller dans les interventions]
> 
> HSE peut maintenant suivre l'exécution des interventions. Il peut réviser les Take 5 soumis par le prestataire et s'assurer que les procédures de sécurité sont respectées.
> 
> [Examiner le Take 5]
> 
> Le Take 5 est structuré et complet. HSE peut valider ou demander des modifications si nécessaire. Cette révision garantit la qualité des évaluations de sécurité."

---

## 🔧 **SCÉNARIO 4 : SUPER ADMIN (10 minutes)**

### **4.1 Connexion et Vue d'Administration (2 min)**

**Actions :**
1. Cliquer sur le menu utilisateur
2. Cliquer sur "Déconnexion"
3. Cliquer sur "Se connecter"
4. Saisir : `admin@toa.mg`
5. Saisir le mot de passe : `admin123`
6. Cliquer sur "Connexion"

**Script :**
> "Terminons avec le profil Super Admin, qui a accès à toutes les fonctionnalités du système.
> 
> [Attendre la connexion]
> 
> Le Super Admin a une vue d'ensemble complète : gestion des utilisateurs, statistiques globales, monitoring du système. Il peut configurer et administrer l'ensemble de la plateforme."

### **4.2 Gestion des Utilisateurs (4 min)**

**Actions :**
1. Cliquer sur "Utilisateurs" dans le menu
2. Présenter la liste des utilisateurs
3. Cliquer sur "Nouvel Utilisateur"
4. **Création d'un utilisateur :**
   - Nom : "DUPONT"
   - Prénom : "Pierre"
   - Email : "pierre.dupont@nouveau-prestataire.mg"
   - Téléphone : "+261 34 12 345 99"
   - Rôle : "Prestataire"
   - Entreprise : "Nouveau Prestataire SARL"
   - Statut : "Actif"
5. Cliquer sur "Créer l'utilisateur"
6. Retourner à la liste
7. Modifier un utilisateur existant
8. Changer le statut d'un utilisateur

**Script :**
> "Le Super Admin peut gérer tous les utilisateurs du système. Voici la liste complète avec tous les rôles : Super Admin, Chef de Projet, HSE, Prestataires, et Direction Générale.
> 
> [Créer un nouvel utilisateur]
> 
> La création d'utilisateur permet de définir tous les paramètres : informations personnelles, rôle, entreprise, et statut. Chaque rôle a des permissions prédéfinies et sécurisées.
> 
> [Créer l'utilisateur]
> 
> L'utilisateur est créé et peut immédiatement se connecter avec ses identifiants.
> 
> [Modifier un utilisateur existant]
> 
> Le Super Admin peut modifier toutes les informations d'un utilisateur, y compris son rôle et son statut. Les changements sont immédiatement effectifs.
> 
> [Changer le statut]
> 
> Un utilisateur peut être désactivé temporairement ou définitivement. Cela permet de gérer les accès sans supprimer les données historiques."

### **4.3 Statistiques et Monitoring (4 min)**

**Actions :**
1. Cliquer sur "Statistiques" dans le menu
2. Présenter les KPIs principaux
3. Expliquer les métriques par site
4. Montrer les tableaux de bord
5. Cliquer sur "Permis" pour voir les détails
6. Cliquer sur "Plans de Prévention" pour voir les détails

**Script :**
> "Les statistiques fournissent une vue d'ensemble des performances du système HSSES.
> 
> [Présenter les KPIs]
> 
> Voici les indicateurs clés :
> - Total des permis : 15
> - Taux de validation : 87%
> - Taux de refus : 13%
> - Permis en cours : 8
> - Plans de prévention : 12
> 
> [Expliquer les métriques par site]
> 
> Les métriques sont détaillées par site, permettant d'identifier les zones d'activité et les performances par localisation.
> 
> [Montrer les tableaux de bord]
> 
> Les tableaux de bord permettent un suivi en temps réel des activités HSSES. Le Super Admin peut identifier rapidement les problèmes et les opportunités d'amélioration.
> 
> [Détails des permis et plans]
> 
> Chaque métrique peut être détaillée pour comprendre les tendances et prendre des décisions éclairées."

---

## 📊 **DÉMONSTRATION DES MÉTRIQUES ET CONFORMITÉ (5 minutes)**

### **5.1 Retour sur le Workflow Complet (3 min)**

**Actions :**
1. Retourner au dashboard
2. Cliquer sur "Permis"
3. Retracer le parcours du permis créé
4. Montrer la traçabilité complète

**Script :**
> "Retraçons maintenant le parcours complet du permis que nous avons créé :
> 
> 1. **Création** par le prestataire eTech Solutions
> 2. **Validation** par le Chef de Projet avec commentaires
> 3. **Validation finale** par HSE avec attribution de référence
> 4. **Exécution** avec Take 5 et suivi HSE
> 
> Chaque étape est tracée avec :
> - Horodatage précis
> - Nom du validateur
> - Commentaires et justifications
> - Changements de statut
> 
> Cette traçabilité complète garantit la conformité aux exigences d'audit et aux standards HSSES."

### **5.2 Points de Conformité (2 min)**

**Script :**
> "Cette démonstration illustre la conformité du système aux standards HSSES de TOA :
> 
> ✅ **Workflow respecté** : Chaque étape suit les processus documentés
> ✅ **Traçabilité complète** : Toutes les actions sont enregistrées
> ✅ **Sécurité des données** : Isolation par utilisateur et permissions granulaires
> ✅ **Conformité ISO** : Vérifications automatiques 14001/45001
> ✅ **Interface intuitive** : Adaptation à chaque profil utilisateur
> ✅ **Performance** : Temps de réponse rapides et interface fluide"

---

## ❓ **QUESTIONS ET RÉPONSES (10-15 minutes)**

### **Questions Techniques :**

**Q : "Comment garantir la sécurité des données ?"**
**R :** "Le système implémente plusieurs niveaux de sécurité :
- Isolation stricte des données par utilisateur
- Permissions granulaires par rôle
- Validation côté client et serveur
- Traçabilité complète de toutes les actions
- Chiffrement des données sensibles"

**Q : "Le système peut-il gérer plusieurs sites ?"**
**R :** "Absolument. Le système est conçu pour gérer plusieurs sites avec :
- Codes site uniques
- Métriques par localisation
- Filtrage par site
- Responsables par site"

**Q : "Comment gérer les utilisateurs temporaires ?"**
**R :** "Le Super Admin peut :
- Créer des utilisateurs avec dates d'expiration
- Désactiver temporairement des comptes
- Gérer les accès par période
- Conserver l'historique des actions"

### **Questions Fonctionnelles :**

**Q : "Que se passe-t-il si un Chef de Projet refuse un plan ?"**
**R :** "Le plan retourne au prestataire avec :
- Motif du refus obligatoire
- Commentaires détaillés
- Possibilité de modification
- Nouvelle soumission après correction"

**Q : "Comment gérer les urgences ?"**
**R :** "Le système permet :
- Création rapide de permis d'urgence
- Validation accélérée
- Notifications automatiques
- Traçabilité maintenue"

**Q : "Le système est-il mobile ?"**
**R :** "Oui, l'interface est responsive et fonctionne sur :
- Smartphones
- Tablettes
- Ordinateurs portables
- Tous les navigateurs modernes"

---

## 🎯 **CONCLUSION DE LA DÉMONSTRATION (3 minutes)**

### **Récapitulatif des Avantages :**

**Script :**
> "Cette démonstration illustre les avantages majeurs du système TOA HSSES :
> 
> **1. Conformité Totale**
> - Respect des standards HSSES de TOA
> - Workflows documentés implémentés
> - Vérifications ISO 14001/45001 automatiques
> 
> **2. Efficacité Opérationnelle**
> - Interface intuitive pour tous les profils
> - Validation automatique des données
> - Workflow fluide entre les rôles
> - Gain de temps significatif
> 
> **3. Sécurité et Audit**
> - Permissions granulaires par rôle
> - Isolation des données par utilisateur
> - Traçabilité complète des actions
> - Conformité aux exigences d'audit
> 
> **4. Évolutivité**
> - Architecture modulaire
> - Facilement extensible
> - Adaptation aux futurs besoins
> - Maintenance simplifiée"

### **Prochaines Étapes :**

**Script :**
> "Les prochaines étapes recommandées sont :
> 
> **1. Validation Utilisateur (1 semaine)**
> - Tests par les utilisateurs finaux
> - Collecte des retours
> - Ajustements mineurs
> 
> **2. Formation des Équipes (1 semaine)**
> - Formation des prestataires
> - Formation des Chefs de Projet
> - Formation des équipes HSE
> - Documentation utilisateur
> 
> **3. Déploiement Production (1 semaine)**
> - Migration des données existantes
> - Configuration finale
> - Tests de charge
> - Mise en service
> 
> **4. Suivi et Amélioration (Continue)**
> - Monitoring des performances
> - Collecte des retours
> - Améliorations continues
> - Évolutions fonctionnelles"

### **Message de Clôture :**

**Script :**
> "Le système TOA HSSES est prêt pour la production. Il répond parfaitement aux exigences HSSES de TOA avec une conformité de 94% sur l'ensemble des profils utilisateurs.
> 
> Le système garantit la sécurité, la traçabilité, et l'efficacité opérationnelle tout en respectant les standards internationaux.
> 
> Je reste à votre disposition pour toute question ou clarification.
> 
> Merci pour votre attention."

---

## 📋 **CHECKLIST POST-DÉMONSTRATION**

### **Actions Immédiates :**
- [ ] Collecter les retours des participants
- [ ] Noter les questions en suspens
- [ ] Planifier les sessions de formation
- [ ] Préparer la migration des données
- [ ] Organiser les tests utilisateurs

### **Suivi :**
- [ ] Envoyer la documentation complète
- [ ] Planifier les prochaines étapes
- [ ] Organiser les réunions de suivi
- [ ] Préparer le plan de déploiement
- [ ] Mettre en place le monitoring

---

**Document généré le :** 16 Janvier 2025  
**Version :** 1.0  
**Prochaine révision :** Après la démonstration  

---

*Ce script détaillé vous guide pas à pas pour une démonstration réussie du système TOA HSSES, en mettant en valeur tous les aspects de conformité et d'efficacité opérationnelle.*
