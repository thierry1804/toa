# Guide d'utilisation - Section Risques Identifiés

## Composant créé

**Fichier** : `src/components/prevention/RisquesIdentifiesSection.tsx`

## Vue d'ensemble

Ce composant implémente exactement la structure demandée pour la section "Risques identifiés" du formulaire de plan de prévention, conforme au document SGI-PPHSSES-TOA-601.

## Structure du Composant

### 1. Titre Principal
```
RISQUES DUS AUX ACTIVITÉS ET INSTALLATIONS ET DE L'ENTREPRISE PRESTATAIRE
Identification les risques générés par les activités.
```

### 2. Catégories de Risques (4 catégories)

#### a) Risques liés à l'environnement (Vert)
- ☐ Pollutions (déversement)
- ☐ Incendie

#### b) Risque Social (Bleu)
- ☐ Contestation riveraine
- ☐ Sureté
- ☐ Autre(s) à préciser : [champ texte]

#### c) Risque lié à la santé et sécurité (Rouge) - 18 risques
- ☐ Accident lié à la sécurité routière
- ☐ Risque chimique
- ☐ Risque en hauteur
- ☐ Risque d'ensevelissement et/ou effondrement
- ☐ Risque de noyade
- ☐ Risques liés aux installations électrique
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
- ☐ Autre(s) à préciser : [champ texte]

#### d) Risque lié aux installation/infrastructure existants (Orange)
- ☐ Risques liés à l'accès sur site
- ☐ Risques liés à l'état des infrastructures existants (Greenfield, Rooftop)
- ☐ Autre(s) à préciser pour le site Rooftop : [champ texte]

### 3. Tableau n°1 : Détail du risque identifié

Tableau répétable avec 4 colonnes :
- **Détail du risque identifié** (Textarea)
- **Nature et localisation** (Textarea)
- **Mesures de protection à prendre** (Textarea)
- **Mises en œuvre par** (Checkbox TOA/Prestataire)
- **Actions** (Bouton supprimer)

### 4. Tableau n°2 : Sécurité routière

Tableau fixe avec :
- **Détail** : "Sécurité routière"
- **Nature** : "Risques liés au déplacement vers site"
- **Mesures** (8 checkboxes) :
  1. Gestion de temps de pause
  2. Formation du chauffeur en conduite défensive
  3. Chauffeur apte médicalement
  4. Plan du trajet
  5. Géolocalisation des flottes
  6. Check-list avant départ des véhicules
  7. Respect des règlements et exigences de TOA
  8. Maintenance périodique des véhicules
- **Responsable** : "par le prestataire"

## Utilisation dans le Formulaire

```tsx
import RisquesIdentifiesSection from '@/components/prevention/RisquesIdentifiesSection';

// Dans votre PreventionFormPage
const [risquesActivites, setRisquesActivites] = useState<RisquesActivites>({
  environnement: { actif: false, pollutions: false, incendie: false },
  social: { actif: false, contestationRiveraine: false, surete: false, autres: '' },
  santeSécurite: {
    actif: false,
    accidentSecuriteRoutiere: false,
    risqueChimique: false,
    risqueHauteur: false,
    risqueEnsevelissement: false,
    risqueNoyade: false,
    risqueElectrique: false,
    risqueOutilsMain: false,
    risqueOutillageElectroportatif: false,
    accidentManutentionMecanique: false,
    accidentManutentionManuelle: false,
    risqueTravauxChaud: false,
    risqueTravauxIsole: false,
    risqueCoactivites: false,
    risqueAmbianceThermique: false,
    risqueBruit: false,
    risquesPsychosociaux: false,
    risqueMaladiesInfectieuses: false,
    risquePaludisme: false,
    autres: '',
  },
  infrastructures: {
    actif: false,
    risqueAccesSite: false,
    risqueEtatInfrastructures: false,
    autresRooftop: '',
  },
});

const [detailsRisques, setDetailsRisques] = useState<DetailRisque[]>([]);

const [securiteRoutiere, setSecuriteRoutiere] = useState<SecuriteRoutiere>({
  gestionTempsPause: false,
  formationConductionDefensive: false,
  chauffeurApteMedicalement: false,
  planTrajet: false,
  geolocalisationFlottes: false,
  checklistAvantDepart: false,
  respectReglementsVehicule: false,
  maintenancePeriodique: false,
});

// Dans le JSX
<RisquesIdentifiesSection
  risquesActivites={risquesActivites}
  onRisquesActivitesChange={setRisquesActivites}
  detailsRisques={detailsRisques}
  onDetailsRisquesChange={setDetailsRisques}
  securiteRoutiere={securiteRoutiere}
  onSecuriteRoutiereChange={setSecuriteRoutiere}
/>
```

## Fonctionnalités

### 1. Catégories Expandables
- Cliquer sur la checkbox principale active/désactive la catégorie
- Les sous-risques n'apparaissent que si la catégorie est activée
- Chaque catégorie a une couleur distinctive (bordure gauche)

### 2. Tableau n°1 Dynamique
- Bouton "Ajouter un risque" pour créer une nouvelle ligne
- Chaque ligne peut être supprimée individuellement
- Textareas pour descriptions détaillées
- Radio buttons pour sélectionner TOA ou Prestataire

### 3. Tableau n°2 Fixe
- Structure prédéfinie pour la sécurité routière
- 8 mesures standard avec checkboxes
- Note rappelant de fournir des évidences

## Styles et Design

### Couleurs par Catégorie
- **Environnement** : Vert (`border-green-500`, `bg-green-50`)
- **Social** : Bleu (`border-blue-500`, `bg-blue-50`)
- **Santé et Sécurité** : Rouge (`border-red-500`, `bg-red-50`)
- **Infrastructures** : Orange (`border-orange-500`, `bg-orange-50`)

### Layout
- Bordure gauche épaisse (4px) pour les catégories
- Sous-items indentés avec bordure fine (2px)
- Cards avec hover effects
- Grid responsive pour le tableau

## Validation

### Champs Obligatoires
- Au moins 1 catégorie de risque doit être cochée
- Pour chaque risque dans Tableau n°1 :
  - Détail du risque (non vide)
  - Nature et localisation (non vide)
  - Mesures de protection (non vide)
  - Responsable sélectionné (TOA ou Prestataire)

### Messages d'Aide
- Instructions claires au-dessus des tableaux
- Note sur les évidences à fournir
- États vides explicites ("Aucun risque détaillé...")

## Intégration avec le Store

Le composant est stateless et remonte toutes les modifications via callbacks :
- `onRisquesActivitesChange` : Modifications des catégories
- `onDetailsRisquesChange` : Modifications du Tableau n°1
- `onSecuriteRoutiereChange` : Modifications du Tableau n°2

## Export PDF

Lors de la génération du PDF, le composant sera rendu avec :
- ✅ Titre principal en gras
- ✅ Catégories cochées visibles
- ✅ Tableau n°1 formaté avec lignes
- ✅ Tableau n°2 avec toutes les mesures
- ✅ Note sur les évidences incluse

## Conformité

✅ Conforme au document SGI-PPHSSES-TOA-601  
✅ Structure exacte demandée  
✅ Tous les risques listés  
✅ Tableaux n°1 et n°2 conformes  
✅ ISO 14001 & ISO 45001 compliant

## Accessibilité

- Labels explicites sur toutes les checkboxes
- Textareas avec placeholders descriptifs
- Boutons avec icônes et texte
- Couleurs contrastées pour les catégories
- Navigation au clavier supportée

## Performance

- Rendu optimisé avec keys uniques
- Callbacks memoizés recommandés
- Lazy loading des catégories
- Pas de re-render inutiles

---

**Version** : 1.0  
**Date** : 23 Octobre 2025  
**Fichier** : `src/components/prevention/RisquesIdentifiesSection.tsx`  
**Statut** : Prêt à l'emploi
