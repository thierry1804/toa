import { useState } from 'react';
import { z } from 'zod';
import MultiStepForm from './MultiStepForm';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { AlertTriangle, AlertCircle, HardHat, User, MapPin, Calendar, FileText, Shield, Users, AlertOctagon, Settings } from 'lucide-react';

// Define schemas for each step
const step0Schema = z.object({
  processType: z.enum(['nouveau_site', 'vie_reseau', 'infrastructure', 'maintenance', 'energie'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de process' }),
  }),
});

const step1Schema = z.object({
  entreprisePrestataire: z.string().min(1, 'Entreprise requise'),
  siret: z.string().min(14, 'SIRET invalide').max(14, 'SIRET invalide'),
  representantPrestataire: z.string().min(1, 'Représentant requis'),
  fonctionPrestataire: z.string().min(1, 'Fonction requise'),
});

// Nouvelle étape PROJET (fusion de 3, 4, 5)
const step2Schema = z.object({
  nomProjet: z.string().min(1, 'Nom du projet requis'),
  sites: z.array(z.object({
    codeSite: z.string().min(1, 'Code du site requis'),
    nomSite: z.string().min(1, 'Nom du site requis'),
  })).min(1, 'Au moins un site est requis').max(400, 'Maximum 400 sites'),
  dateDebut: z.string().min(1, 'Date de début requise'),
  dateFin: z.string().min(1, 'Date de fin requise'),
});

const step3Schema = z.object({
  risquesIdentifies: z.array(z.object({
    id: z.string(),
    categorie: z.string().min(1),
    risque: z.string().min(1, 'Description du risque requise'),
    gravite: z.enum(['faible', 'moyenne', 'grave', 'mortelle']),
    probabilite: z.enum(['rare', 'peu_probable', 'probable', 'tres_probable']),
    niveau: z.enum(['faible', 'modere', 'eleve', 'intolerable']),
    mesures: z.string().min(1, 'Mesures préventives requises'),
    mesuresExistentes: z.boolean(),
  })).min(1, 'Au moins un risque doit être identifié'),
});

const step4Schema = z.object({
  documentsFournis: z.array(z.string()).min(1, 'Au moins un document doit être fourni'),
  accordResponsable: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions',
  }),
});

const step5Schema = z.object({
  confirmationFinale: z.boolean().refine(val => val === true, {
    message: 'Vous devez confirmer les informations',
  }),
});

// Combine all schemas for final validation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const preventionPlanSchema = step0Schema
  .merge(step1Schema)
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

type PreventionPlan = z.infer<typeof preventionPlanSchema>;

interface PreventionMultiStepFormProps {
  onSubmit: (data: PreventionPlan) => void;
  onCancel?: () => void;
  initialData?: Partial<PreventionPlan>;
}

const categoriesRisques = [
  {
    id: 'environnement',
    label: 'Risques liés à l\'environnement',
    sousCategories: [
      { id: 'pollution', label: 'Pollutions (déversement)' },
      { id: 'incendie', label: 'Incendie' }
    ]
  },
  {
    id: 'chantier',
    label: 'Risques liés au chantier',
    sousCategories: [
      { id: 'voie_circulation', label: 'Voie de circulation' },
      { id: 'zone_chargement', label: 'Zone de chargement/déchargement' },
      { id: 'stockage', label: 'Stockage' }
    ]
  },
  {
    id: 'travaux',
    label: 'Risques liés aux travaux',
    sousCategories: [
      { id: 'travaux_hauteur', label: 'Travaux en hauteur' },
      { id: 'manutention', label: 'Manutention manuelle' },
      { id: 'outillage', label: 'Utilisation d\'outils et d\'équipements' },
      { id: 'chimique', label: 'Produits chimiques' },
      { id: 'electrique', label: 'Risque électrique' },
      { id: 'tronconnage', label: 'Tronçonnage, meulage, soudage' },
      { id: 'demolition', label: 'Démolition' },
      { id: 'travaux_enterres', label: 'Travaux en milieu confiné ou enterré' },
      { id: 'coactivite', label: 'Cœxistence d\'activités' },
      { id: 'autres_travaux', label: 'Autres risques liés aux travaux' }
    ]
  },
  {
    id: 'autres',
    label: 'Autres risques',
    sousCategories: [
      { id: 'meteo', label: 'Conditions météorologiques' },
      { id: 'vandalisme', label: 'Vandalisme, vol' },
      { id: 'autres_risques', label: 'Autres risques non identifiés' }
    ]
  }
];

const RisquesIdentifies = ({ formData, updateFormData }: { formData: Partial<PreventionPlan>; updateFormData: (data: Partial<PreventionPlan>) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedRisques = (formData.risquesIdentifies || []).map((r: { id: string }) => r.id);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const toggleRisque = (risqueId: string) => {
    const currentRisques = formData.risquesIdentifies || [];

    if (currentRisques.some((r: { id: string }) => r.id === risqueId)) {
      // remove
      const updated = currentRisques.filter(r => r.id !== risqueId);
      updateFormData({ risquesIdentifies: updated });
    } else {
      // add
      let risqueLabel = '';
      let categorieLabel = '';
      
      categoriesRisques.forEach(categorie => {
        const sousCategorie = categorie.sousCategories.find(sc => sc.id === risqueId);
        if (sousCategorie) {
          risqueLabel = sousCategorie.label;
          categorieLabel = categorie.label;
        }
      });

      const newRisque = {
        id: risqueId,
        categorie: categorieLabel,
        risque: risqueLabel,
        gravite: 'faible' as const,
        probabilite: 'rare' as const,
        niveau: 'faible' as const,
        mesures: '',
        mesuresExistentes: false,
      };

      updateFormData({ risquesIdentifies: [...currentRisques, newRisque] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <h4 className="text-sm font-medium text-yellow-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Identification des risques
        </h4>
        <p className="text-xs text-yellow-700 mt-1">
          Sélectionnez les risques potentiels liés à l'intervention
        </p>
      </div>
      
      <div className="space-y-4">
        <h5 className="font-medium text-sm text-gray-700">Catégories de risques</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoriesRisques.map((categorie) => (
            <div 
              key={categorie.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedCategory === categorie.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSelectCategory(categorie.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{categorie.label}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${
                    selectedCategory === categorie.id ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>
              
              {selectedCategory === categorie.id && (
                <div className="mt-3 space-y-2">
                  {categorie.sousCategories.map((sousCategorie) => (
                    <div 
                      key={sousCategorie.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-blue-100"
                    >
                      <input
                        type="checkbox"
                        id={`risque-${sousCategorie.id}`}
                        checked={selectedRisques.includes(sousCategorie.id)}
                        onChange={() => toggleRisque(sousCategorie.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label 
                        htmlFor={`risque-${sousCategorie.id}`}
                        className="text-sm"
                      >
                        {sousCategorie.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Détails des risques sélectionnés */}
        {(formData.risquesIdentifies || []).length > 0 && (
          <div className="mt-6 space-y-4">
            <h5 className="font-medium text-sm text-gray-700">Détails des risques sélectionnés</h5>
            
            {(formData.risquesIdentifies || []).map((risque, index) => (
              <div key={risque.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="font-medium">{risque.risque}</h6>
                    <p className="text-xs text-gray-500">{risque.categorie}</p>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 text-sm"
                    onClick={() => {
                      const updated = (formData.risquesIdentifies || []).filter((_: unknown, i: number) => i !== index);
                      updateFormData({ risquesIdentifies: updated });
                    }}
                  >
                    Retirer
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    name={`risquesIdentifies.${index}.gravite`}
                    label="Gravité"
                    options={[
                      { value: 'faible', label: 'Faible' },
                      { value: 'moyenne', label: 'Moyenne' },
                      { value: 'grave', label: 'Grave' },
                      { value: 'mortelle', label: 'Mortelle' },
                    ]}
                    required
                  />
                  
                  <Select
                    name={`risquesIdentifies.${index}.probabilite`}
                    label="Probabilité"
                    options={[
                      { value: 'rare', label: 'Rare' },
                      { value: 'peu_probable', label: 'Peu probable' },
                      { value: 'probable', label: 'Probable' },
                      { value: 'tres_probable', label: 'Très probable' },
                    ]}
                    required
                  />
                  
                  <Select
                    name={`risquesIdentifies.${index}.niveau`}
                    label="Niveau de risque"
                    options={[
                      { value: 'faible', label: 'Faible' },
                      { value: 'modere', label: 'Modéré' },
                      { value: 'eleve', label: 'Élevé' },
                      { value: 'intolerable', label: 'Intolérable' },
                    ]}
                    required
                  />
                </div>
                
                <Textarea
                  name={`risquesIdentifies.${index}.mesures`}
                  label="Mesures de prévention prévues"
                  placeholder="Décrivez les mesures de prévention spécifiques pour ce risque"
                  rows={2}
                  required
                />
                
                <div className="flex items-center">
                  <Checkbox
                    name={`risquesIdentifies.${index}.mesuresExistentes`}
                    label="Des mesures de prévention sont déjà en place"
                    className="mr-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const documentOptions = [
  { value: 'attestation_assurance', label: 'Attestation d\'assurance responsabilité civile' },
  { value: 'plan_intervention', label: 'Plan d\'intervention détaillé' },
  { value: 'fiches_risques', label: 'Fiches de poste et d\'exposition aux risques' },
  { value: 'autres', label: 'Autres documents' },
];

// Composant pour l'étape PROJET
const ProjetStep = ({ formData, updateFormData }: { formData: Partial<PreventionPlan>; updateFormData: (data: Partial<PreventionPlan>) => void }) => {
  const sites = (formData.sites || []) as Array<{ codeSite: string; nomSite: string }>;
  
  const addSite = () => {
    if (sites.length < 400) {
      updateFormData({ 
        sites: [...sites, { codeSite: '', nomSite: '' }] 
      });
    }
  };
  
  const removeSite = (index: number) => {
    const updated = sites.filter((_, i) => i !== index);
    updateFormData({ sites: updated });
  };
  
  const updateSite = (index: number, field: 'codeSite' | 'nomSite', value: string) => {
    const updated = sites.map((site, i) => 
      i === index ? { ...site, [field]: value } : site
    );
    updateFormData({ sites: updated });
  };

  return (
    <div className="space-y-6">
      {/* Nom du projet */}
      <div className="space-y-2">
        <Input
          name="nomProjet"
          label="Nom du projet"
          required
          value={formData.nomProjet || ''}
          onChange={(e) => updateFormData({ nomProjet: e.target.value })}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="dateDebut"
          label="Date de début"
          type="date"
          required
          value={formData.dateDebut || ''}
          onChange={(e) => updateFormData({ dateDebut: e.target.value })}
        />
        <Input
          name="dateFin"
          label="Date de fin"
          type="date"
          required
          value={formData.dateFin || ''}
          onChange={(e) => updateFormData({ dateFin: e.target.value })}
        />
      </div>

      {/* Sites */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Sites ({sites.length}/400)</h4>
          {sites.length < 400 && (
            <Button
              type="button"
              variant="outline"
              onClick={addSite}
            >
              + Ajouter un site
            </Button>
          )}
        </div>

        {sites.length === 0 && (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500 mb-2">Aucun site ajouté</p>
            <Button
              type="button"
              variant="outline"
              onClick={addSite}
            >
              Ajouter le premier site
            </Button>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sites.map((site, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">Site {index + 1}</h5>
                {sites.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 text-sm hover:text-red-700"
                    onClick={() => removeSite(index)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name={`sites.${index}.codeSite`}
                  label="Code du site"
                  required
                  value={site.codeSite}
                  onChange={(e) => updateSite(index, 'codeSite', e.target.value)}
                />
                <Input
                  name={`sites.${index}.nomSite`}
                  label="Nom du site"
                  required
                  value={site.nomSite}
                  onChange={(e) => updateSite(index, 'nomSite', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PreventionMultiStepForm({ onSubmit, onCancel, initialData = {} }: PreventionMultiStepFormProps) {
  const [formData, setFormData] = useState<Partial<PreventionPlan>>(initialData);

  const updateFormData = (data: Partial<PreventionPlan>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
  };

  const handleSubmit = (data: PreventionPlan) => {
    console.log('Form submitted:', data);
    onSubmit(data);
  };

  const steps = [
    // Step 0: Sélection du Process
    {
      id: 'process',
      title: 'Type de Process',
      description: 'Sélectionnez le type de process pour ce plan de prévention',
      icon: Settings,
      component: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              Veuillez sélectionner le type de process correspondant à votre projet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { value: 'nouveau_site', label: 'Nouveau site', icon: MapPin },
              { value: 'vie_reseau', label: 'Vie de réseau', icon: HardHat },
              { value: 'infrastructure', label: 'Infrastructure', icon: Shield },
              { value: 'maintenance', label: 'Maintenance', icon: Settings },
              { value: 'energie', label: 'Energie', icon: AlertTriangle },
            ].map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.value}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.processType === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => updateFormData({ processType: option.value as any })}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${
                      formData.processType === option.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">{option.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
      validationSchema: step0Schema,
    },
    // Step 1: Entreprise Prestataire
    {
      id: 'entreprise',
      title: 'Entreprise Prestataire',
      description: 'Informations sur l\'entreprise réalisant les travaux',
      icon: HardHat,
      component: (
        <div className="space-y-4">
          <Input
            name="entreprisePrestataire"
            label="Nom de l'entreprise"
            required
          />
          <Input
            name="siret"
            label="N° SIRET"
            required
            placeholder="14 chiffres"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="representantPrestataire"
              label="Représentant"
              required
            />
            <Input
              name="fonctionPrestataire"
              label="Fonction"
              required
            />
          </div>
        </div>
      ),
      validationSchema: step1Schema,
    },
    // Step 2: PROJET (fusion de Localisation, Description, Planning)
    {
      id: 'projet',
      title: 'PROJET',
      description: 'Informations sur le projet, les sites et les dates',
      icon: Calendar,
      component: <ProjetStep formData={formData} updateFormData={updateFormData} />,
      validationSchema: step2Schema,
    },
    // Step 3: Risques Identifiés
    {
      id: 'risques',
      title: 'Risques Identifiés',
      description: 'Identification des risques potentiels',
      icon: AlertTriangle,
      component: <RisquesIdentifies formData={formData} updateFormData={updateFormData} />,
      validationSchema: step3Schema,
    },
    // Step 4: Documents et Validation
    {
      id: 'documents',
      title: 'Documents et Validation',
      description: 'Pièces jointes et validation finale',
      icon: FileText,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Documents à fournir</h4>
            <div className="space-y-2">
              {documentOptions.map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`doc-${value}`}
                    checked={(formData.documentsFournis || []).includes(value)}
                onChange={(event) => {
                      const checked = event.target.checked;
                      const updated = checked
                        ? [...(formData.documentsFournis || []), value]
                        : (formData.documentsFournis || []).filter((v) => v !== value);
                      updateFormData({ documentsFournis: updated });
                    }}
                  />
                  <label
                    htmlFor={`doc-${value}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Validation</h4>
            <div className="p-4 border rounded-lg bg-gray-50">
              <Checkbox
                name="accordResponsable"
                label={
                  <span>
                    Je certifie sur l'honneur l'exactitude des informations fournies et m'engage à respecter
                    les consignes de sécurité énoncées dans ce document.
                  </span>
                }
                required
              />
            </div>
          </div>
        </div>
      ),
      validationSchema: step4Schema,
    },
    // Step 5: Confirmation (ancienne étape 11)
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Vérifiez les informations avant soumission',
      icon: AlertOctagon,
      component: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800">Vérification finale</h3>
            <p className="text-sm text-blue-700 mt-1">
              Veuillez vérifier attentivement toutes les informations avant de soumettre le plan de prévention.
              Une fois validé, vous pourrez toujours le modifier ultérieurement.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Récapitulatif</h4>
            <div className="bg-white border rounded-lg divide-y">
              {formData.processType && (
                <div className="p-4">
                  <h5 className="font-medium text-gray-900">Type de Process</h5>
                  <p className="text-sm text-gray-600">
                    {formData.processType === 'nouveau_site' && 'Nouveau site'}
                    {formData.processType === 'vie_reseau' && 'Vie de réseau'}
                    {formData.processType === 'infrastructure' && 'Infrastructure'}
                    {formData.processType === 'maintenance' && 'Maintenance'}
                    {formData.processType === 'energie' && 'Energie'}
                  </p>
                </div>
              )}
              
              <div className="p-4">
                <h5 className="font-medium text-gray-900">Entreprise Prestataire</h5>
                <p className="text-sm text-gray-600">{formData.entreprisePrestataire} - {formData.siret}</p>
                <p className="text-sm text-gray-600">
                  {formData.representantPrestataire} ({formData.fonctionPrestataire})
                </p>
              </div>
              
              {formData.nomProjet && (
                <div className="p-4">
                  <h5 className="font-medium text-gray-900">Projet</h5>
                  <p className="text-sm text-gray-600 font-semibold">{formData.nomProjet}</p>
                  <p className="text-sm text-gray-600">
                    Du {formData.dateDebut} au {formData.dateFin}
                  </p>
                </div>
              )}
              
              {(formData.sites && (formData.sites as any[]).length > 0) && (
                <div className="p-4">
                  <h5 className="font-medium text-gray-900">
                    Sites ({(formData.sites as any[]).length})
                  </h5>
                  <div className="mt-2 space-y-1">
                    {(formData.sites as any[]).slice(0, 5).map((site: any, index: number) => (
                      <p key={index} className="text-sm text-gray-600">
                        • {site.codeSite} - {site.nomSite}
                      </p>
                    ))}
                    {(formData.sites as any[]).length > 5 && (
                      <p className="text-sm text-gray-500">
                        ... et {(formData.sites as any[]).length - 5} autre(s) site(s)
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {(formData.risquesIdentifies || []).length > 0 && (
                <div className="p-4">
                  <h5 className="font-medium text-gray-900">
                    {(formData.risquesIdentifies || []).length} risque(s) identifié(s)
                  </h5>
                  <div className="mt-2 space-y-2">
                    {(formData.risquesIdentifies || []).map((risque, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {risque.risque} <span className="text-gray-400">({risque.niveau})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-amber-50">
            <Checkbox
              name="confirmationFinale"
              label={
                <span className="font-medium">
                  Je confirme que toutes les informations sont exactes et complètes.
                  En cochant cette case, je valide définitivement ce plan de prévention.
                </span>
              }
              required
            />
          </div>
        </div>
      ),
      validationSchema: step5Schema,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <MultiStepForm
        steps={steps}
        onComplete={handleSubmit}
        onCancel={onCancel}
        title="Créer un plan de prévention"
        description="Remplissez le formulaire en plusieurs étapes pour créer un nouveau plan de prévention"
        submitLabel="Soumettre le plan"
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
}