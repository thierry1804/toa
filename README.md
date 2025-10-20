# TOA - Plateforme de Gestion HSE

Plateforme web de suivi des interventions, plans de prévention et permis de travail pour TowerCo of Africa Madagascar.

## 🎯 Fonctionnalités

### ✅ Implémentées (Version actuelle - v0.0.0)

- **Authentification et gestion des rôles**
  - 6 types d'utilisateurs : Super Admin, Admin, Chef de projet, HSE, Prestataire, DG
  - Système de permissions granulaire
  - Comptes de démonstration pour tests

- **Support bilingue**
  - Interface en Français et Malgache
  - Commutation instantanée entre les langues

- **Dashboard interactif**
  - Statistiques en temps réel
  - Vue d'ensemble des permis et interventions
  - Cartes statistiques par rôle utilisateur
  - Actions rapides contextuelles

- **Interface utilisateur moderne**
  - Design responsive et ergonomique
  - Sidebar rétractable
  - Thème cohérent avec les couleurs TOA
  - Composants UI réutilisables (Button, Card, Input, Select, Textarea, Checkbox)

- **Gestion des permis de travail** (Partiellement implémentée)
  - Page de liste complète avec filtres et recherche
  - Tableau avec toutes les informations pertinentes
  - Badges de statut colorés et intuitifs
  - Actions contextuelles selon le rôle
  - Statistiques en temps réel
  - Store Zustand avec persistance
  - Formulaires de création et édition

- **Gestion des plans de prévention** (Partiellement implémentée)
  - Page de liste en format cards
  - Indicateurs de niveau de risque
  - Filtres par statut et recherche
  - Statistiques des risques critiques
  - Formulaires de création et édition

- **Workflow de validation** (Partiellement implémentée)
  - Système de statuts (brouillon → validation chef → validation HSE → validé)
  - Attribution automatique de références par HSE
  - Filtrage par rôle utilisateur
  - Actions de validation intégrées

### 🚧 À développer (Prochaines phases)

- **Formulaires de permis spécialisés**
  - Permis général (PERMIS DE TRAVAIL)
  - Permis travaux en hauteur (ANNEXE 1)
  - Permis travaux électriques (ANNEXE 2)
  - Formulaires digitalisés interactifs
  - Upload de documents et pièces jointes

- **Plans de prévention HSSES complets**
  - Formulaire SGI-PPHSSES-TOA-601
  - Identification des risques
  - Mesures de prévention
  - Gestion des documents

- **Workflow de validation avancé**
  - Système de commentaires
  - Notifications en temps réel
  - Historique des validations
  - Signatures numériques

- **Suivi journalier des interventions**
  - Contrôle journalier des permis
  - Signatures numériques
  - Mesures de sécurité
  - Clôture des permis

- **Statistiques et KPIs**
  - Dashboard analytique
  - Graphiques et tendances
  - Export de données
  - Rapports personnalisés

## 🛠️ Stack Technique

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Forms**: React Hook Form + Zod
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 👥 Comptes de Démonstration

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Super Admin | admin@toa.mg | admin123 |
| Chef de Projet | chef@toa.mg | chef123 |
| HSE | hse@toa.mg | hse123 |
| Prestataire | prestataire@etech.mg | prest123 |
| Direction Générale | dg@toa.mg | dg123 |

## 📁 Structure du Projet

```
toa-platform/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── ui/          # Composants UI de base
│   │   ├── forms/       # Composants de formulaires
│   │   ├── layout/      # Layout et navigation
│   │   └── dashboard/   # Composants dashboard
│   ├── pages/           # Pages de l'application
│   │   ├── auth/        # Authentification
│   │   ├── dashboard/   # Dashboard
│   │   ├── permits/     # Gestion des permis
│   │   ├── prevention/  # Plans de prévention
│   │   └── statistics/    # Statistiques et rapports
│   ├── types/           # Types TypeScript
│   ├── hooks/           # Custom React hooks
│   ├── store/           # State management (Zustand)
│   ├── services/        # Services API
│   ├── utils/           # Utilitaires
│   └── lib/             # Bibliothèques et helpers
├── public/              # Assets statiques
└── doc/                 # Documentation source (PDF)
└── README.md
```

## 🔐 Permissions par Rôle

### Super Admin
- Accès complet à toutes les fonctionnalités

### Admin
- Gestion des permis et plans de prévention
- Gestion des utilisateurs
- Accès aux statistiques

### Chef de Projet
- Validation des demandes de permis (1ère étape)
- Création et suivi des plans de prévention
- Vue sur les interventions de ses projets

### HSE
- Validation finale des permis (2ème étape)
- Attribution des références uniques
- Contrôle journalier des interventions
- Gestion des risques

### Prestataire
- Création de demandes de permis
- Création de plans de prévention
- Suivi de ses propres interventions
- Clôture de ses permis

### Direction Générale
- Vue d'ensemble en lecture seule
- Accès aux statistiques et KPIs
- Dashboard analytique

## 🌍 Internationalisation

L'application supporte 2 langues :
- **Français (fr)** : Langue par défaut
- **Malgache (mg)** : Langue locale

Le changement de langue est persisté localement et s'applique à toute l'interface.

## 🎨 Design System

### Couleurs principales
- **Primary**: Bleu (#0ea5e9) - Actions principales, navigation
- **Success**: Vert (#22c55e) - Validations, états positifs
- **Warning**: Jaune (#eab308) - Avertissements, en attente
- **Danger**: Rouge (#ef4444) - Erreurs, refus, risques critiques

### Composants UI
- Buttons (5 variants)
- Cards
- Inputs avec validation
- Badges de statut
- Modales
- Tables
- Forms

## 📝 Documents de Référence

Les formulaires sont basés sur les documents officiels TOA :
- CR Réunion TOA 09/10/2024
- PERMIS DE TRAVAIL (Formulaire général)
- PERMIS DE TRAVAIL ÉLECTRIQUE (ANNEXE 2)
- PERMIS DE TRAVAIL EN HAUTEUR (ANNEXE 1)
- SGI-PPHSSES-TOA-601 (Plan de prévention HSSES)

## 🚀 Démarrage Rapide

1. **Cloner le projet et installer les dépendances**
   ```bash
   cd toa-platform
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir l'application**
   - URL : http://localhost:5173
   - Se connecter avec un des comptes de démo

## 🚀 Prochaines Étapes

1. **Phase 2** : Implémentation des formulaires de permis
   - Formulaire permis général
   - Formulaire permis hauteur
   - Formulaire permis électrique
   - Validation et soumission

2. **Phase 3** : Workflow de validation
   - Système de notifications
   - Commentaires et historique
   - Génération automatique de références

3. **Phase 4** : Suivi journalier
   - Contrôles quotidiens
   - Signatures numériques
   - Clôture des interventions

4. **Phase 5** : Statistiques avancées
   - Dashboard analytique
   - Graphiques et tendances
   - Export de rapports

## 📞 Support

Pour toute question ou support :
- Email : support@toa.mg
- Documentation : voir dossier `/doc`

## 📄 Licence

Propriété de TowerCo of Africa Madagascar © 2025
