# Exemple d'Intégration - Section Risques Identifiés

## Comment intégrer dans PreventionFormPage.tsx

Voici un exemple complet d'intégration du composant `RisquesIdentifiesSection` dans votre formulaire de plan de prévention.

### 1. Import du Composant

```tsx
import RisquesIdentifiesSection from '@/components/prevention/RisquesIdentifiesSection';
```

### 2. Définir les États

```tsx
// Dans votre composant PreventionFormPage
const [formData, setFormData] = useState({
  // ... autres champs du formulaire
  
  // Section Risques Identifiés
  risquesActivites: {
    environnement: {
      actif: false,
      pollutions: false,
      incendie: false,
    },
    social: {
      actif: false,
      contestationRiveraine: false,
      surete: false,
      autres: '',
    },
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
  },
  
  detailsRisques: [],
  
  securiteRoutiere: {
    gestionTempsPause: false,
    formationConductionDefensive: false,
    chauffeurApteMedicalement: false,
    planTrajet: false,
    geolocalisationFlottes: false,
    checklistAvantDepart: false,
    respectReglementsVehicule: false,
    maintenancePeriodique: false,
  },
});
```

### 3. Utiliser le Composant dans le JSX

```tsx
return (
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* ... Autres sections du formulaire ... */}
    
    {/* Section Informations Générales */}
    <Card>
      <CardHeader>
        <CardTitle>Informations Générales</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Champs d'information générale */}
      </CardContent>
    </Card>

    {/* Section Description des Travaux */}
    <Card>
      <CardHeader>
        <CardTitle>Description des Travaux</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Champs de description */}
      </CardContent>
    </Card>

    {/* ===== SECTION RISQUES IDENTIFIÉS ===== */}
    <RisquesIdentifiesSection
      risquesActivites={formData.risquesActivites}
      onRisquesActivitesChange={(risques) =>
        setFormData({ ...formData, risquesActivites: risques })
      }
      detailsRisques={formData.detailsRisques}
      onDetailsRisquesChange={(details) =>
        setFormData({ ...formData, detailsRisques: details })
      }
      securiteRoutiere={formData.securiteRoutiere}
      onSecuriteRoutiereChange={(securite) =>
        setFormData({ ...formData, securiteRoutiere: securite })
      }
    />

    {/* ... Autres sections ... */}
    
    {/* Boutons de soumission */}
    <div className="flex items-center justify-end gap-4 pt-6 border-t">
      <Button type="button" variant="outline" onClick={() => navigate('/prevention')}>
        Annuler
      </Button>
      <Button type="submit">
        <Save className="h-4 w-4 mr-2" />
        Enregistrer le plan
      </Button>
    </div>
  </form>
);
```

### 4. Validation de la Section

```tsx
const validateRisquesSection = (): boolean => {
  const { risquesActivites, detailsRisques } = formData;
  
  // Vérifier qu'au moins une catégorie est cochée
  const hasRisque = 
    risquesActivites.environnement.actif ||
    risquesActivites.social.actif ||
    risquesActivites.santeSécurite.actif ||
    risquesActivites.infrastructures.actif;
  
  if (!hasRisque) {
    addToast('error', 'Veuillez sélectionner au moins une catégorie de risque');
    return false;
  }
  
  // Vérifier qu'il y a au moins un risque détaillé
  if (detailsRisques.length === 0) {
    addToast('error', 'Veuillez ajouter au moins un risque détaillé dans le Tableau n°1');
    return false;
  }
  
  // Vérifier que tous les risques détaillés sont complets
  for (const risque of detailsRisques) {
    if (!risque.detailRisque.trim()) {
      addToast('error', 'Veuillez renseigner le détail de tous les risques');
      return false;
    }
    if (!risque.natureLocalisation.trim()) {
      addToast('error', 'Veuillez renseigner la nature et localisation de tous les risques');
      return false;
    }
    if (!risque.mesuresProtection.trim()) {
      addToast('error', 'Veuillez renseigner les mesures de protection de tous les risques');
      return false;
    }
  }
  
  return true;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateRisquesSection()) {
    return;
  }
  
  // Soumettre le formulaire
  // ...
};
```

### 5. Formulaire Multi-Étapes (Recommandé)

Si vous utilisez un formulaire multi-étapes, voici comment intégrer la section :

```tsx
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 6;

const renderStep = () => {
  switch (currentStep) {
    case 1:
      return <InformationsGeneralesStep {...props} />;
    
    case 2:
      return <DescriptionTravauxStep {...props} />;
    
    case 3:
      // Étape dédiée aux Risques Identifiés
      return (
        <RisquesIdentifiesSection
          risquesActivites={formData.risquesActivites}
          onRisquesActivitesChange={(risques) =>
            setFormData({ ...formData, risquesActivites: risques })
          }
          detailsRisques={formData.detailsRisques}
          onDetailsRisquesChange={(details) =>
            setFormData({ ...formData, detailsRisques: details })
          }
          securiteRoutiere={formData.securiteRoutiere}
          onSecuriteRoutiereChange={(securite) =>
            setFormData({ ...formData, securiteRoutiere: securite })
          }
        />
      );
    
    case 4:
      return <InstallationsEquipementsStep {...props} />;
    
    case 5:
      return <DocumentsHSSESStep {...props} />;
    
    case 6:
      return <SignaturesValidationStep {...props} />;
    
    default:
      return null;
  }
};

return (
  <div className="space-y-6">
    {/* Indicateur de progression */}
    <ProgressIndicator current={currentStep} total={totalSteps} />
    
    {/* Contenu de l'étape */}
    {renderStep()}
    
    {/* Navigation */}
    <div className="flex items-center justify-between pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={() => setCurrentStep(currentStep - 1)}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Précédent
      </Button>
      
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={() => {
            if (currentStep === 3 && !validateRisquesSection()) {
              return;
            }
            setCurrentStep(currentStep + 1);
          }}
        >
          Suivant
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button type="submit" onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Soumettre
        </Button>
      )}
    </div>
  </div>
);
```

### 6. Sauvegarde et Chargement des Données

```tsx
// Sauvegarder dans le store
const savePlanPrevention = () => {
  const planData = {
    id: formData.id || `PREV-${Date.now()}`,
    reference: formData.reference || generateReference(),
    
    // ... autres champs
    
    // Risques
    risquesActivites: formData.risquesActivites,
    detailsRisques: formData.detailsRisques,
    securiteRoutiere: formData.securiteRoutiere,
    
    // Metadata
    creerPar: user?.email || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  addPlanPrevention(planData);
  navigate('/prevention');
};

// Charger depuis le store (mode édition)
useEffect(() => {
  if (id) {
    const plan = getPlanPreventionById(id);
    if (plan) {
      setFormData({
        ...formData,
        risquesActivites: plan.risquesActivites,
        detailsRisques: plan.detailsRisques,
        securiteRoutiere: plan.securiteRoutiere,
      });
    }
  }
}, [id]);
```

### 7. Export PDF

```tsx
const generatePDF = () => {
  const pdfContent = {
    // ... autres sections
    
    risques: {
      titre: 'RISQUES DUS AUX ACTIVITÉS ET INSTALLATIONS',
      categories: [
        {
          nom: 'Risques liés à l\'environnement',
          actif: formData.risquesActivites.environnement.actif,
          sousRisques: [
            { nom: 'Pollutions', coche: formData.risquesActivites.environnement.pollutions },
            { nom: 'Incendie', coche: formData.risquesActivites.environnement.incendie },
          ],
        },
        // ... autres catégories
      ],
      tableau1: formData.detailsRisques,
      tableau2: {
        titre: 'Sécurité routière',
        mesures: Object.entries(formData.securiteRoutiere).map(([key, value]) => ({
          nom: formatMesureName(key),
          coche: value,
        })),
      },
    },
  };
  
  // Générer le PDF avec les données
  generatePDFDocument(pdfContent);
};
```

### 8. Exemple Complet de Données

```tsx
// Exemple de plan de prévention complété
const exemplePlan = {
  risquesActivites: {
    environnement: {
      actif: true,
      pollutions: true,
      incendie: false,
    },
    social: {
      actif: false,
      contestationRiveraine: false,
      surete: false,
      autres: '',
    },
    santeSécurite: {
      actif: true,
      accidentSecuriteRoutiere: true,
      risqueChimique: false,
      risqueHauteur: true,
      risqueEnsevelissement: false,
      risqueNoyade: false,
      risqueElectrique: true,
      risqueOutilsMain: true,
      risqueOutillageElectroportatif: false,
      accidentManutentionMecanique: false,
      accidentManutentionManuelle: true,
      risqueTravauxChaud: false,
      risqueTravauxIsole: false,
      risqueCoactivites: true,
      risqueAmbianceThermique: false,
      risqueBruit: false,
      risquesPsychosociaux: false,
      risqueMaladiesInfectieuses: false,
      risquePaludisme: false,
      autres: '',
    },
    infrastructures: {
      actif: true,
      risqueAccesSite: true,
      risqueEtatInfrastructures: false,
      autresRooftop: '',
    },
  },
  
  detailsRisques: [
    {
      id: 'risque-1',
      detailRisque: 'Risque de chute de hauteur lors de travaux sur pylône',
      natureLocalisation: 'Pylône de 40m, accès par échelle à crinoline',
      mesuresProtection: 'Port du harnais obligatoire, ligne de vie verticale, formation travail en hauteur',
      misesEnOeuvrePar: 'prestataire',
    },
    {
      id: 'risque-2',
      detailRisque: 'Risque électrique lors de manipulation des équipements',
      natureLocalisation: 'Armoire électrique BT, zone technique au sol',
      mesuresProtection: 'Personnel habilité électrique, EPI isolants, consignation préalable',
      misesEnOeuvrePar: 'prestataire',
    },
    {
      id: 'risque-3',
      detailRisque: 'Pollution par déversement de fuel du groupe électrogène',
      natureLocalisation: 'Zone groupe électrogène, local technique',
      mesuresProtection: 'Bac de rétention, kit anti-pollution disponible, procédure d\'urgence',
      misesEnOeuvrePar: 'toa',
    },
  ],
  
  securiteRoutiere: {
    gestionTempsPause: true,
    formationConductionDefensive: true,
    chauffeurApteMedicalement: true,
    planTrajet: true,
    geolocalisationFlottes: true,
    checklistAvantDepart: true,
    respectReglementsVehicule: true,
    maintenancePeriodique: true,
  },
};
```

## Résumé

### Étapes d'Intégration
1. ✅ Importer le composant `RisquesIdentifiesSection`
2. ✅ Définir les états dans `formData`
3. ✅ Utiliser le composant dans le JSX avec les callbacks
4. ✅ Ajouter la validation
5. ✅ Gérer la sauvegarde et le chargement
6. ✅ Intégrer dans l'export PDF

### Avantages
- ✅ Composant réutilisable et isolé
- ✅ Structure exacte du document officiel
- ✅ Validation intégrée
- ✅ Interface claire et intuitive
- ✅ Conforme ISO 14001 & 45001

### Prochaines Étapes
1. Intégrer le composant dans `PreventionFormPage.tsx`
2. Tester avec des données réelles
3. Ajouter la génération PDF
4. Implémenter l'upload d'évidences pour la sécurité routière
5. Connecter au backend

---

**Version** : 1.0  
**Date** : 23 Octobre 2025  
**Composant** : `RisquesIdentifiesSection`  
**Statut** : Prêt pour intégration
