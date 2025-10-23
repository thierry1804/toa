# Guide d'utilisation - RisqueDetailForm

## Vue d'ensemble

Le composant `RisqueDetailForm` est un formulaire avancé pour la saisie structurée des risques dans le plan de prévention. Il remplace la simple liste (risque, niveau, mesure) par un système complet avec catégories, sous-catégories et évaluation automatique.

## Fichier créé

**Chemin** : `src/components/prevention/RisqueDetailForm.tsx`

## Structure des Champs

### 1. **Catégorisation du risque**
Sélection en cascade pour classifier le risque :

#### Catégorie principale (4 options)
- 🟢 **Risques liés à l'environnement**
- 🔵 **Risque Social**  
- 🔴 **Risque lié à la santé et sécurité**
- 🟠 **Risque lié aux installations/infrastructures**

#### Sous-catégories dynamiques

**Pour Environnement** :
- Pollutions (déversement)
- Incendie
- Nuisances sonores
- Émissions atmosphériques
- Gestion des déchets
- Autre (à préciser)

**Pour Social** :
- Contestation riveraine
- Sûreté
- Relations avec les communautés
- Accès au site
- Autre (à préciser)

**Pour Santé et Sécurité** (18 options) :
- Accident lié à la sécurité routière
- Risque chimique
- Risque en hauteur
- Risque d'ensevelissement et/ou effondrement
- Risque de noyade
- Risques liés aux installations électriques
- Risque lié à la manipulation des outils à la main
- Risque lié à la manipulation des outillages électroportatifs
- Accident lié à manutention mécanique
- Accident lié à manutention manuelle
- Risque lié au travail à chaud
- Risque lié au travail isolé
- Risque lié aux coactivités
- Risque lié à l'ambiance thermique
- Risque lié au bruit
- Risques psychosociaux
- Risque face aux maladies infectieuses
- Risque du paludisme
- Autre (à préciser)

**Pour Infrastructure** :
- Risques liés à l'accès sur site
- Risques liés à l'état des infrastructures existants
- Stabilité des structures existantes
- Réseaux enterrés
- Autre (à préciser)

### 2. **Description du risque**
- **Risque identifié** * (Textarea) : Description précise du risque
- **Nature et localisation** * (Textarea) : Où et comment le risque se manifeste

### 3. **Évaluation du risque**
- **Niveau de gravité** * (Select) : Faible / Moyen / Élevé / Critique
- **Probabilité d'occurrence** * (Select) : Faible / Moyenne / Élevée
- **Niveau de risque** (Calculé automatiquement) : Résultat de Gravité × Probabilité

#### Matrice de calcul du niveau de risque

| Gravité \ Probabilité | Faible | Moyenne | Élevée |
|-----------------------|--------|---------|--------|
| **Faible**            | Faible | Faible  | Moyen  |
| **Moyen**             | Faible | Moyen   | Élevé  |
| **Élevé**             | Moyen  | Élevé   | Critique |
| **Critique**          | Élevé  | Critique | Critique |

### 4. **Mesures de prévention**
- **Mesures de prévention prévues** * (Textarea) : Liste toutes les mesures
- **Équipements nécessaires** (Input) : EPI, matériel de sécurité, etc.

### 5. **Responsabilités et suivi**
- **Responsable de la mise en œuvre** * (Select) : TOA ou Prestataire
- **Personnel concerné** (Input) : Qui est affecté par ce risque
- **Délai de mise en œuvre** (Input) : Ex: "Avant démarrage", "J+7"

## Interface Type Complet

```typescript
export interface RisqueDetailComplet {
  id: string;
  
  // Catégorisation
  categoriePrincipale: 'environnement' | 'social' | 'sante_securite' | 'infrastructure' | '';
  sousCategorie: string;
  
  // Détails du risque
  risqueIdentifie: string;
  natureLocalisation: string;
  
  // Évaluation
  niveauGravite: 'faible' | 'moyen' | 'eleve' | 'critique' | '';
  probabilite: 'faible' | 'moyenne' | 'elevee' | '';
  niveauRisque: 'faible' | 'moyen' | 'eleve' | 'critique' | ''; // Auto-calculé
  
  // Mesures de prévention
  mesuresPreventionPrevues: string;
  equipementsNecessaires: string;
  
  // Responsabilités
  responsableMiseEnOeuvre: 'toa' | 'prestataire' | '';
  personnelConcerne: string;
  
  // Suivi
  delaiMiseEnOeuvre: string;
  verification: boolean;
  dateVerification?: Date;
}
```

## Utilisation dans le Formulaire

```tsx
import RisqueDetailForm from '@/components/prevention/RisqueDetailForm';

// Dans votre PreventionFormPage
const [risquesDetailles, setRisquesDetailles] = useState<RisqueDetailComplet[]>([]);

// Dans le JSX
<RisqueDetailForm
  risques={risquesDetailles}
  onRisquesChange={setRisquesDetailles}
/>
```

## Fonctionnalités Principales

### 1. **Sélection en Cascade**
- Sélectionner d'abord la catégorie principale
- Les sous-catégories se chargent automatiquement
- Si la catégorie change, la sous-catégorie se réinitialise

### 2. **Calcul Automatique du Niveau de Risque**
- Dès que Gravité ET Probabilité sont sélectionnés
- Le niveau de risque s'affiche avec la couleur appropriée :
  - 🟢 Faible (vert)
  - 🟡 Moyen (jaune)
  - 🟠 Élevé (orange)
  - 🔴 Critique (rouge)

### 3. **Ajout/Modification/Suppression**
- **Ajouter** : Remplir le formulaire → Cliquer "Ajouter le risque"
- **Modifier** : Cliquer sur l'icône crayon → Modifier → "Mettre à jour"
- **Supprimer** : Cliquer sur l'icône poubelle → Confirmer

### 4. **Validation Intelligente**
Avant d'ajouter un risque, le formulaire vérifie :
- ✅ Catégorie principale sélectionnée
- ✅ Sous-catégorie sélectionnée
- ✅ Risque identifié renseigné
- ✅ Niveau de gravité sélectionné
- ✅ Probabilité sélectionnée
- ✅ Mesures de prévention renseignées
- ✅ Responsable sélectionné

### 5. **Affichage des Risques**
Chaque risque ajouté affiche :
- Badge de catégorie (avec couleur)
- Badge de niveau de risque (avec couleur)
- Titre du risque
- Nature et localisation
- Sous-catégorie
- Responsable
- Mesures de prévention
- Équipements (si renseigné)
- Délai (si renseigné)
- Boutons Modifier/Supprimer

## Organisation Visuelle (5 Sections)

### Section 1 : Catégorisation (Bordure bleue primaire)
- Catégorie principale (dropdown)
- Sous-catégorie (dropdown conditionnel)

### Section 2 : Description (Bordure bleue)
- Risque identifié (textarea)
- Nature et localisation (textarea)

### Section 3 : Évaluation (Bordure jaune)
- Niveau de gravité (dropdown)
- Probabilité (dropdown)
- **Niveau de risque calculé** (affichage coloré)

### Section 4 : Mesures de prévention (Bordure verte)
- Mesures prévues (textarea)
- Équipements nécessaires (input)

### Section 5 : Responsabilités (Bordure violette)
- Responsable mise en œuvre (dropdown)
- Personnel concerné (input)
- Délai mise en œuvre (input)

## Exemple de Données

```typescript
const exempleRisque: RisqueDetailComplet = {
  id: 'risque-1',
  
  // Catégorisation
  categoriePrincipale: 'sante_securite',
  sousCategorie: 'risque_hauteur',
  
  // Description
  risqueIdentifie: 'Chute de hauteur lors de travaux sur pylône de 40m',
  natureLocalisation: 'Pylône télécommunication, accès par échelle à crinoline, zone technique en hauteur',
  
  // Évaluation
  niveauGravite: 'critique',
  probabilite: 'moyenne',
  niveauRisque: 'critique', // Calculé automatiquement
  
  // Mesures
  mesuresPreventionPrevues: 'Port du harnais complet avec double longe, ligne de vie verticale, formation travail en hauteur niveau 2, binôme obligatoire, conditions météo vérifiées',
  equipementsNecessaires: 'Harnais complet, longes avec absorbeur, casque avec mentonnière, chaussures de sécurité montantes',
  
  // Responsabilités
  responsableMiseEnOeuvre: 'prestataire',
  personnelConcerne: 'Techniciens télécoms habilités',
  delaiMiseEnOeuvre: 'Avant montée sur pylône',
  
  // Suivi
  verification: false,
};
```

## Avantages par rapport à l'Ancien Système

### Avant (3 champs simples)
- ❌ Risque (texte libre)
- ❌ Niveau (texte libre ou select basique)
- ❌ Mesure (texte libre)
- ❌ Pas de catégorisation
- ❌ Pas de calcul automatique
- ❌ Données non structurées

### Maintenant (Système complet)
- ✅ **Catégorisation** : 4 catégories + sous-catégories
- ✅ **Évaluation structurée** : Gravité × Probabilité = Niveau
- ✅ **Calcul automatique** du niveau de risque
- ✅ **Mesures détaillées** : Prévention + Équipements
- ✅ **Responsabilités claires** : TOA ou Prestataire
- ✅ **Suivi** : Délai et vérification
- ✅ **Validation** des données
- ✅ **Interface intuitive** avec couleurs
- ✅ **Données structurées** pour export/analyse

## Export et Statistiques

Les données structurées permettent :
- 📊 **Statistiques par catégorie** : Combien de risques environnementaux ? De santé ?
- 📈 **Distribution des niveaux** : % de risques critiques, élevés, moyens, faibles
- 🎯 **Analyse par responsable** : Risques TOA vs Prestataire
- 📉 **Suivi dans le temps** : Évolution des risques
- 📄 **Export structuré** : Excel, PDF avec tableaux organisés

## Intégration avec le Plan de Prévention

```tsx
// Dans PreventionFormPage.tsx
const [formData, setFormData] = useState({
  // ... autres champs
  
  // Remplacer l'ancien système par :
  risquesDetailles: [] as RisqueDetailComplet[],
});

// Validation
const validateRisques = (): boolean => {
  if (formData.risquesDetailles.length === 0) {
    addToast('error', 'Veuillez identifier au moins un risque');
    return false;
  }
  
  // Vérifier qu'il y a au moins un risque critique ou élevé identifié
  const risquesImportants = formData.risquesDetailles.filter(
    r => r.niveauRisque === 'critique' || r.niveauRisque === 'eleve'
  );
  
  if (risquesImportants.length > 0) {
    // Afficher un avertissement
    console.warn(`${risquesImportants.length} risques critiques/élevés identifiés`);
  }
  
  return true;
};

// Sauvegarde
const savePlan = () => {
  const planData = {
    // ... autres données
    risquesDetailles: formData.risquesDetailles,
  };
  
  addPlanPrevention(planData);
};
```

## Conformité ISO

### ISO 14001 (Environnement)
- ✅ Identification des aspects environnementaux (catégorie dédiée)
- ✅ Évaluation des risques environnementaux (gravité × probabilité)
- ✅ Mesures de prévention documentées
- ✅ Responsabilités définies

### ISO 45001 (Santé et Sécurité)
- ✅ Identification des dangers (catégories santé/sécurité)
- ✅ Évaluation des risques professionnels (matrice structurée)
- ✅ Hiérarchie des mesures de contrôle
- ✅ Suivi et vérification

## Migration depuis l'Ancien Système

Si vous aviez déjà des risques avec l'ancien format :

```typescript
// Ancien format
interface RisqueSimple {
  risque: string;
  niveau: string;
  mesure: string;
}

// Fonction de migration
const migrerRisques = (anciens: RisqueSimple[]): RisqueDetailComplet[] => {
  return anciens.map((ancien, index) => ({
    id: `risque-migre-${index}`,
    categoriePrincipale: 'sante_securite', // Par défaut
    sousCategorie: 'autre',
    risqueIdentifie: ancien.risque,
    natureLocalisation: 'À compléter',
    niveauGravite: mapNiveau(ancien.niveau),
    probabilite: 'moyenne',
    niveauRisque: mapNiveau(ancien.niveau),
    mesuresPreventionPrevues: ancien.mesure,
    equipementsNecessaires: '',
    responsableMiseEnOeuvre: 'prestataire',
    personnelConcerne: '',
    delaiMiseEnOeuvre: '',
    verification: false,
  }));
};

const mapNiveau = (niveau: string): any => {
  const lower = niveau.toLowerCase();
  if (lower.includes('faible')) return 'faible';
  if (lower.includes('moyen')) return 'moyen';
  if (lower.includes('eleve') || lower.includes('élevé')) return 'eleve';
  if (lower.includes('critique')) return 'critique';
  return 'moyen';
};
```

## Prochaines Améliorations Possibles

1. **Upload de photos** : Illustrer chaque risque
2. **Historique** : Tracer les modifications de risques
3. **Templates** : Risques pré-définis par type de chantier
4. **Cartographie** : Visualiser les risques sur un plan de site
5. **Notifications** : Alerter quand un risque critique est ajouté
6. **Export PDF** : Générer un rapport structuré
7. **Analyse prédictive** : Suggestions basées sur l'historique

---

**Version** : 1.0  
**Date** : 23 Octobre 2025  
**Fichier** : `src/components/prevention/RisqueDetailForm.tsx`  
**Statut** : Prêt à l'emploi
