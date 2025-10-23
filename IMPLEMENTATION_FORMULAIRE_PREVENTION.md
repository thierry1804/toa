# Guide d'Implémentation - Formulaire Plan de Prévention Complet

## Vue d'ensemble

Ce document guide l'implémentation du formulaire de Plan de Prévention avec tous les champs identifiés. Le formulaire complet comprend **plus de 100 champs** organisés en sections.

## Structure des Types (Déjà Implémentée)

✅ Les types TypeScript ont été mis à jour dans `src/types/index.ts` avec :
- Interface `PlanPrevention` complète
- Interface `DetailRisque` pour les risques détaillés
- Interface `Installation` pour les installations
- Interface `MaterielEquipement` pour les matériels
- Interface `DocumentHSSES` pour les documents HSSES

## Architecture du Formulaire

### Approche Recommandée : Formulaire Multi-Étapes

Le formulaire doit être divisé en **6 étapes** pour une meilleure expérience utilisateur :

```
Étape 1: En-tête et Engagement du Prestataire (20 champs)
Étape 2: Description des Travaux (10 champs)
Étape 3: Identification des Risques (40+ checkboxes + tableaux)
Étape 4: Installations et Équipements (tableaux répétables)
Étape 5: Documents HSSES à Fournir (tableau 6 lignes)
Étape 6: Validation et Signatures
```

## Exemple d'Implémentation - Étape 1

Voici un exemple concret pour l'Étape 1 du formulaire :

```tsx
// src/pages/prevention/PreventionFormPage.tsx (extrait)

const [formData, setFormData] = useState<Partial<PlanPrevention>>({
  // Section 1: En-tête
  projetActivite: '',
  nomSite: '',
  reference: '',
  revision: '2025', // Par défaut
  
  // Section 2: Engagement du Prestataire
  entreprisePrestataire: '',
  numeroRCS: '',
  siegeSocial: '',
  representantPrestataire: '',
  qualiteFonctionRepresentant: '',
  contactPrestataire: '',
  emailPrestataire: '',
  
  // Détails du site
  localite: '',
  fokontany: '',
  commune: '',
  district: '',
  region: '',
  coordonneesGPS: '',
  situationGeographique: 'en_ville',
  situationGeographiqueAutre: '',
  dateSignature: new Date(),
  
  // Signatures
  signatureDonneurOrdre: {
    nomPrenom: '',
    fonction: '',
    signature: '',
  },
  signaturePrestataire: {
    nomSociete: '',
    nomPrenom: '',
    fonction: '',
    signature: '',
  },
  
  // ... autres sections
});

// Rendu Étape 1
{currentStep === 1 && (
  <>
    <Card>
      <CardHeader>
        <CardTitle>En-tête et Informations Générales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Projet / Activité *"
            value={formData.projetActivite}
            onChange={(e) => setFormData({ ...formData, projetActivite: e.target.value })}
            placeholder="Installation équipements télécommunication"
            required
          />
          <Input
            label="Site *"
            value={formData.nomSite}
            onChange={(e) => setFormData({ ...formData, nomSite: e.target.value })}
            placeholder="Site Antananarivo Centre"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Référence"
            value={formData.reference}
            onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
            placeholder="Auto-généré"
            disabled
          />
          <Input
            label="Révision"
            value={formData.revision}
            onChange={(e) => setFormData({ ...formData, revision: e.target.value })}
            placeholder="2025"
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Engagement du Prestataire</CardTitle>
        <CardDescription>
          Informations sur la société et le représentant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Société (Prestataire) *"
            value={formData.entreprisePrestataire}
            onChange={(e) => setFormData({ ...formData, entreprisePrestataire: e.target.value })}
            placeholder="eTech Consulting"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="N° Inscription au Registre du Commerce *"
            value={formData.numeroRCS}
            onChange={(e) => setFormData({ ...formData, numeroRCS: e.target.value })}
            placeholder="2023-B-12345"
            required
          />
          <Input
            label="Siège Social *"
            value={formData.siegeSocial}
            onChange={(e) => setFormData({ ...formData, siegeSocial: e.target.value })}
            placeholder="Lot II J 123 Analamahitsy, Antananarivo"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Représentant *"
            value={formData.representantPrestataire}
            onChange={(e) => setFormData({ ...formData, representantPrestataire: e.target.value })}
            placeholder="M. Paul RANDRIA"
            required
          />
          <Input
            label="Qualité / Fonction *"
            value={formData.qualiteFonctionRepresentant}
            onChange={(e) => setFormData({ ...formData, qualiteFonctionRepresentant: e.target.value })}
            placeholder="Directeur Technique"
            required
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Détails du Site d'Intervention</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Localité *"
            value={formData.localite}
            onChange={(e) => setFormData({ ...formData, localite: e.target.value })}
            placeholder="Ankorondrano"
            required
          />
          <Input
            label="Fokontany *"
            value={formData.fokontany}
            onChange={(e) => setFormData({ ...formData, fokontany: e.target.value })}
            placeholder="Ankorondrano Nord"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Commune *"
            value={formData.commune}
            onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
            placeholder="Antananarivo Renivohitra"
            required
          />
          <Input
            label="District *"
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            placeholder="Antananarivo"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Région *"
            value={formData.region}
            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            placeholder="Analamanga"
            required
          />
          <Input
            label="Coordonnées GPS"
            value={formData.coordonneesGPS}
            onChange={(e) => setFormData({ ...formData, coordonneesGPS: e.target.value })}
            placeholder="-18.8792, 47.5079"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Situation Géographique *"
            options={[
              { value: 'en_ville', label: 'En ville' },
              { value: 'rurale', label: 'Rurale' },
              { value: 'sur_montagne', label: 'Sur montagne' },
              { value: 'autre', label: 'Autre' },
            ]}
            value={formData.situationGeographique}
            onChange={(e) => setFormData({ ...formData, situationGeographique: e.target.value as any })}
            required
          />
          
          {formData.situationGeographique === 'autre' && (
            <Input
              label="Précisez la situation *"
              value={formData.situationGeographiqueAutre}
              onChange={(e) => setFormData({ ...formData, situationGeographiqueAutre: e.target.value })}
              placeholder="Zone côtière"
              required
            />
          )}
        </div>
        
        <Input
          label="Date de Signature *"
          type="date"
          value={formData.dateSignature?.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, dateSignature: new Date(e.target.value) })}
          required
        />
      </CardContent>
    </Card>
  </>
)}
```

## Exemple - Étape 3 : Identification des Risques

```tsx
{currentStep === 3 && (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Risques dus aux Activités et Installations</CardTitle>
        <CardDescription>
          Cochez toutes les catégories de risques applicables, puis détaillez chaque risque
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Catégorie 1: Environnement */}
        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center gap-3 mb-3">
            <Checkbox
              label={<span className="font-semibold text-green-900">Risques liés à l'environnement</span>}
              checked={formData.risquesActivites?.environnement.actif}
              onChange={(e) => setFormData({
                ...formData,
                risquesActivites: {
                  ...formData.risquesActivites!,
                  environnement: {
                    ...formData.risquesActivites!.environnement,
                    actif: e.target.checked,
                  },
                },
              })}
            />
          </div>
          
          {formData.risquesActivites?.environnement.actif && (
            <div className="ml-6 space-y-2">
              <Checkbox
                label="Pollutions (déversement)"
                checked={formData.risquesActivites.environnement.pollutions}
                onChange={(e) => setFormData({
                  ...formData,
                  risquesActivites: {
                    ...formData.risquesActivites!,
                    environnement: {
                      ...formData.risquesActivites!.environnement,
                      pollutions: e.target.checked,
                    },
                  },
                })}
              />
              <Checkbox
                label="Incendie"
                checked={formData.risquesActivites.environnement.incendie}
                onChange={(e) => setFormData({
                  ...formData,
                  risquesActivites: {
                    ...formData.risquesActivites!,
                    environnement: {
                      ...formData.risquesActivites!.environnement,
                      incendie: e.target.checked,
                    },
                  },
                })}
              />
            </div>
          )}
        </div>

        {/* Catégorie 2: Social */}
        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <div className="flex items-center gap-3 mb-3">
            <Checkbox
              label={<span className="font-semibold text-blue-900">Risque Social</span>}
              checked={formData.risquesActivites?.social.actif}
              onChange={(e) => setFormData({
                ...formData,
                risquesActivites: {
                  ...formData.risquesActivites!,
                  social: {
                    ...formData.risquesActivites!.social,
                    actif: e.target.checked,
                  },
                },
              })}
            />
          </div>
          
          {formData.risquesActivites?.social.actif && (
            <div className="ml-6 space-y-2">
              <Checkbox
                label="Contestation riveraine"
                checked={formData.risquesActivites.social.contestationRiveraine}
                onChange={(e) => setFormData({
                  ...formData,
                  risquesActivites: {
                    ...formData.risquesActivites!,
                    social: {
                      ...formData.risquesActivites!.social,
                      contestationRiveraine: e.target.checked,
                    },
                  },
                })}
              />
              <Checkbox
                label="Sureté"
                checked={formData.risquesActivites.social.surete}
                onChange={(e) => setFormData({
                  ...formData,
                  risquesActivites: {
                    ...formData.risquesActivites!,
                    social: {
                      ...formData.risquesActivites!.social,
                      surete: e.target.checked,
                    },
                  },
                })}
              />
              <Input
                label="Autre(s) à préciser"
                value={formData.risquesActivites.social.autres}
                onChange={(e) => setFormData({
                  ...formData,
                  risquesActivites: {
                    ...formData.risquesActivites!,
                    social: {
                      ...formData.risquesActivites!.social,
                      autres: e.target.value,
                    },
                  },
                })}
                placeholder="Précisez les autres risques sociaux..."
              />
            </div>
          )}
        </div>

        {/* Tableau 1: Détails des Risques */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Détails des Risques Identifiés</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const newRisque: DetailRisque = {
                  id: `risque-${Date.now()}`,
                  detailRisque: '',
                  natureLocalisation: '',
                  mesuresProtection: '',
                  misesEnOeuvrePar: 'prestataire',
                };
                setFormData({
                  ...formData,
                  detailsRisques: [...(formData.detailsRisques || []), newRisque],
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un risque
            </Button>
          </div>

          {formData.detailsRisques?.map((risque, index) => (
            <Card key={risque.id} className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Risque #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          detailsRisques: formData.detailsRisques?.filter((_, i) => i !== index),
                        });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <Textarea
                    label="Détail du risque identifié *"
                    value={risque.detailRisque}
                    onChange={(e) => {
                      const updated = [...formData.detailsRisques!];
                      updated[index].detailRisque = e.target.value;
                      setFormData({ ...formData, detailsRisques: updated });
                    }}
                    rows={2}
                    required
                  />
                  
                  <Textarea
                    label="Nature et localisation *"
                    value={risque.natureLocalisation}
                    onChange={(e) => {
                      const updated = [...formData.detailsRisques!];
                      updated[index].natureLocalisation = e.target.value;
                      setFormData({ ...formData, detailsRisques: updated });
                    }}
                    rows={2}
                    required
                  />
                  
                  <Textarea
                    label="Mesures de protection à prendre *"
                    value={risque.mesuresProtection}
                    onChange={(e) => {
                      const updated = [...formData.detailsRisques!];
                      updated[index].mesuresProtection = e.target.value;
                      setFormData({ ...formData, detailsRisques: updated });
                    }}
                    rows={2}
                    required
                  />
                  
                  <Select
                    label="Mises en œuvre par *"
                    options={[
                      { value: 'donneur_ordre', label: 'TOA (Donneur d\'Ordre)' },
                      { value: 'prestataire', label: 'Prestataire' },
                    ]}
                    value={risque.misesEnOeuvrePar}
                    onChange={(e) => {
                      const updated = [...formData.detailsRisques!];
                      updated[index].misesEnOeuvrePar = e.target.value as any;
                      setFormData({ ...formData, detailsRisques: updated });
                    }}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          {(!formData.detailsRisques || formData.detailsRisques.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              Aucun risque détaillé. Cliquez sur "Ajouter un risque" pour commencer.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </>
)}
```

## Composants Réutilisables à Créer

### 1. TableauRepetable Component

```tsx
// src/components/prevention/TableauRepetable.tsx

interface TableauRepetableProps<T> {
  title: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number, onChange: (updated: T) => void) => React.ReactNode;
  addButtonLabel?: string;
  emptyMessage?: string;
}

export function TableauRepetable<T>({
  title,
  items,
  onAdd,
  onRemove,
  renderItem,
  addButtonLabel = "Ajouter",
  emptyMessage = "Aucun élément",
}: TableauRepetableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button type="button" variant="outline" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          {addButtonLabel}
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      ) : (
        items.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium">#{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {renderItem(item, index, (updated) => {
                // Logique de mise à jour
              })}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
```

### 2. RisqueCheckboxGroup Component

```tsx
// src/components/prevention/RisqueCheckboxGroup.tsx

interface RisqueCheckboxGroupProps {
  title: string;
  description?: string;
  active: boolean;
  onActiveChange: (active: boolean) => void;
  children: React.ReactNode;
  colorScheme?: 'green' | 'blue' | 'red' | 'orange';
}

export function RisqueCheckboxGroup({
  title,
  description,
  active,
  onActiveChange,
  children,
  colorScheme = 'blue',
}: RisqueCheckboxGroupProps) {
  const colors = {
    green: 'border-green-200 bg-green-50 text-green-900',
    blue: 'border-blue-200 bg-blue-50 text-blue-900',
    red: 'border-red-200 bg-red-50 text-red-900',
    orange: 'border-orange-200 bg-orange-50 text-orange-900',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[colorScheme]}`}>
      <div className="flex items-center gap-3 mb-3">
        <Checkbox
          label={<span className="font-semibold">{title}</span>}
          checked={active}
          onChange={(e) => onActiveChange(e.target.checked)}
        />
      </div>
      {description && <p className="text-sm mb-3">{description}</p>}
      {active && <div className="ml-6 space-y-2">{children}</div>}
    </div>
  );
}
```

### 3. SignatureField Component

```tsx
// src/components/prevention/SignatureField.tsx

interface SignatureFieldProps {
  label: string;
  nomPrenom: string;
  fonction: string;
  signature?: string;
  onNomPrenomChange: (value: string) => void;
  onFonctionChange: (value: string) => void;
  onSignatureChange: (value: string) => void;
}

export function SignatureField({
  label,
  nomPrenom,
  fonction,
  signature,
  onNomPrenomChange,
  onFonctionChange,
  onSignatureChange,
}: SignatureFieldProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nom et Prénom *"
            value={nomPrenom}
            onChange={(e) => onNomPrenomChange(e.target.value)}
            required
          />
          <Input
            label="Fonction *"
            value={fonction}
            onChange={(e) => onFonctionChange(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Signature *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {signature ? (
              <div>
                <img src={signature} alt="Signature" className="max-h-20 mx-auto" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => onSignatureChange('')}
                >
                  Changer la signature
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Signature électronique à implémenter
                </p>
                <Button type="button" variant="outline" size="sm">
                  Signer
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Navigation Multi-Étapes

```tsx
const [currentStep, setCurrentStep] = useState(1);
const totalSteps = 6;

// Navigation
const nextStep = () => {
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  }
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};

// Indicateur de progression
<div className="mb-6">
  <div className="flex items-center justify-between mb-2">
    {[1, 2, 3, 4, 5, 6].map((step) => (
      <div
        key={step}
        className={`flex items-center ${step < 6 ? 'flex-1' : ''}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
            step === currentStep
              ? 'bg-primary-600 text-white'
              : step < currentStep
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {step < currentStep ? '✓' : step}
        </div>
        {step < 6 && (
          <div
            className={`h-1 flex-1 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-200'
            }`}
          />
        )}
      </div>
    ))}
  </div>
  <div className="text-center text-sm text-gray-600">
    Étape {currentStep} sur {totalSteps}
  </div>
</div>

// Boutons navigation
<div className="flex items-center justify-between pt-6 border-t">
  <Button
    type="button"
    variant="outline"
    onClick={prevStep}
    disabled={currentStep === 1}
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    Précédent
  </Button>
  
  {currentStep < totalSteps ? (
    <Button type="button" onClick={nextStep}>
      Suivant
      <ArrowRight className="h-4 w-4 ml-2" />
    </Button>
  ) : (
    <Button type="submit">
      <Save className="h-4 w-4 mr-2" />
      Soumettre le Plan
    </Button>
  )}
</div>
```

## Validation par Étape

```tsx
const validateStep = (step: number): boolean => {
  switch (step) {
    case 1:
      return !!(
        formData.projetActivite &&
        formData.nomSite &&
        formData.entreprisePrestataire &&
        formData.numeroRCS &&
        formData.siegeSocial &&
        formData.representantPrestataire &&
        formData.qualiteFonctionRepresentant &&
        formData.localite &&
        formData.fokontany &&
        formData.commune &&
        formData.district &&
        formData.region &&
        formData.situationGeographique
      );
    
    case 2:
      return !!(
        formData.natureIntervention &&
        formData.descriptionTravaux &&
        formData.nombreIntervenants &&
        formData.nombreIntervenants > 0 &&
        formData.dureeEstimee &&
        formData.dureeEstimee > 0
      );
    
    case 3:
      return (formData.detailsRisques?.length || 0) > 0;
    
    case 4:
      return true; // Optionnel
    
    case 5:
      return true; // Optionnel
    
    case 6:
      return !!(
        formData.signatureDonneurOrdre?.nomPrenom &&
        formData.signatureDonneurOrdre?.fonction &&
        formData.signaturePrestataire?.nomPrenom &&
        formData.signaturePrestataire?.fonction
      );
    
    default:
      return true;
  }
};

// Utilisation
const nextStep = () => {
  if (!validateStep(currentStep)) {
    addToast('error', 'Veuillez remplir tous les champs obligatoires');
    return;
  }
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  }
};
```

## Upload de Fichiers

```tsx
// Composant UploadField
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    // Validation taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast('error', 'Le fichier est trop volumineux (max 5MB)');
      return;
    }
    
    // Validation type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      addToast('error', 'Type de fichier non autorisé');
      return;
    }
    
    // Upload (à implémenter avec API)
    const formData = new FormData();
    formData.append('file', file);
    
    // Simulation
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      // Stocker l'URL
      addToast('success', 'Fichier uploadé avec succès');
    };
    reader.readAsDataURL(file);
  }
};

<input
  type="file"
  accept="image/*,.pdf"
  onChange={handleFileUpload}
  className="hidden"
  id="file-upload"
/>
<label
  htmlFor="file-upload"
  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
>
  <Upload className="h-4 w-4 mr-2" />
  Choisir un fichier
</label>
```

## Sauvegarde Automatique

```tsx
useEffect(() => {
  // Sauvegarder le brouillon toutes les 30 secondes
  const interval = setInterval(() => {
    if (formData.id) {
      localStorage.setItem(
        `plan-prevention-draft-${formData.id}`,
        JSON.stringify(formData)
      );
    }
  }, 30000);

  return () => clearInterval(interval);
}, [formData]);

// Récupération au chargement
useEffect(() => {
  const draftId = new URLSearchParams(window.location.search).get('draft');
  if (draftId) {
    const draft = localStorage.getItem(`plan-prevention-draft-${draftId}`);
    if (draft) {
      setFormData(JSON.parse(draft));
      addToast('info', 'Brouillon récupéré');
    }
  }
}, []);
```

## Prochaines Étapes

1. ✅ **Types mis à jour** - Fait
2. 🔄 **Implémenter le formulaire multi-étapes**
3. 🔄 **Créer les composants réutilisables**
4. 🔄 **Ajouter la validation par étape**
5. 🔄 **Implémenter l'upload de fichiers**
6. 🔄 **Ajouter la sauvegarde automatique**
7. 🔄 **Tester le formulaire complet**
8. 🔄 **Intégrer avec le backend**

## Estimation du Développement

- **Étapes 1-2** : 2-3 heures
- **Étape 3** (Risques) : 3-4 heures
- **Étape 4** (Installations) : 2 heures
- **Étape 5** (Documents HSSES) : 2 heures
- **Étape 6** (Signatures) : 1-2 heures
- **Tests et ajustements** : 2-3 heures

**Total estimé** : 12-16 heures de développement

---

**Version** : 1.0  
**Date** : 23 Octobre 2025  
**Statut** : Guide d'Implémentation  
**Types** : ✅ Complet
