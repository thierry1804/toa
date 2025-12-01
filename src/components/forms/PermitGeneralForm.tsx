import { usePermitStore } from '@/store/permitStore';
import { useAuthStore } from '@/store/authStore';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import MultiStepForm from './MultiStepForm';
import { AlertCircle } from 'lucide-react';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';

interface PermitGeneralFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete: (data: any) => void;
  onCancel?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
}

// Interface pour exposer les méthodes de validation
interface StepValidationHandle {
  validate: () => Promise<boolean>;
}

export default function PermitGeneralForm({ onComplete, onCancel }: PermitGeneralFormProps) {
  const { plansPrevention } = usePermitStore();
  const { user } = useAuthStore();

  // Refs pour stocker les fonctions de validation de chaque étape
  const step1ValidationRef = useRef<StepValidationHandle>(null);
  const step2ValidationRef = useRef<StepValidationHandle>(null);
  const step3ValidationRef = useRef<StepValidationHandle>(null);
  
  // Refs pour stocker les données de chaque étape
  const step1DataRef = useRef<any>(null);
  const step2DataRef = useRef<any>(null);
  const step3DataRef = useRef<any>(null);

  // Filtrer les plans validés
  const plansDisponibles = plansPrevention
    .filter((p) => p.status === 'valide')
    .map((p) => ({
      value: p.id,
      label: `${p.reference} - ${p.nomSite}`,
    }));

  // Étape 1: Détails de l'intervention
  const Step1Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      planPreventionId: '',
      intituleTravaux: '',
      localisation: '',
      codeSite: '',
      contractant: user?.entreprise || '',
      nombreIntervenants: 1,
      dateDebut: '',
      dateFin: '',
    });

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Validation HTML5 native uniquement
        if (formRef.current) {
          const isValid = formRef.current.checkValidity();
          if (!isValid) {
            formRef.current.reportValidity();
          }
          return isValid;
        }
        return true;
      },
    }));

    const handleChange = (field: string, value: string | number) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      step1DataRef.current = newData;
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step1DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <Select
          label="Plan de Prévention Associé *"
          value={formData.planPreventionId}
          onChange={(e) => handleChange('planPreventionId', e.target.value)}
          options={plansDisponibles}
          placeholder="Sélectionner un plan de prévention validé"
          required
        />

        {plansDisponibles.length === 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Aucun plan de prévention disponible
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Vous devez d'abord créer et faire valider un plan de prévention avant de créer
                un permis de travail.
              </p>
            </div>
          </div>
        )}

        <Input
          label="Intitulé des Travaux *"
          value={formData.intituleTravaux}
          onChange={(e) => handleChange('intituleTravaux', e.target.value)}
          placeholder="Ex: Maintenance équipements télécoms"
          required
          minLength={5}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Localisation *"
            value={formData.localisation}
            onChange={(e) => handleChange('localisation', e.target.value)}
            placeholder="Ex: Antananarivo Centre - Pylône principal"
            required
          />
          <Input
            label="Code Site *"
            value={formData.codeSite}
            onChange={(e) => handleChange('codeSite', e.target.value)}
            placeholder="Ex: ANT-001"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contractant *"
            value={formData.contractant}
            onChange={(e) => handleChange('contractant', e.target.value)}
            placeholder="Nom de l'entreprise"
            required
          />
          <Input
            label="Nombre d'Intervenants *"
            type="number"
            value={formData.nombreIntervenants}
            onChange={(e) => handleChange('nombreIntervenants', parseInt(e.target.value) || 1)}
            min={1}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date de Début *"
            type="date"
            value={formData.dateDebut}
            onChange={(e) => handleChange('dateDebut', e.target.value)}
            required
          />
          <Input
            label="Date de Fin *"
            type="date"
            value={formData.dateFin}
            onChange={(e) => handleChange('dateFin', e.target.value)}
            required
          />
        </div>
      </form>
    );
  });
  Step1Component.displayName = 'Step1Component';

  // Étape 2: Types de travaux à risques
  const Step2Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      travauxChaud: false,
      travauxHauteur: false,
      travauxElectrique: false,
      travauxEspaceConfine: false,
      travauxExcavation: false,
      travauxAutres: false,
      autresDescription: '',
    });

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Pas de validation requise pour cette étape (tous optionnels)
        return true;
      },
    }));

    const handleCheckboxChange = (field: string, checked: boolean) => {
      const newData = { ...formData, [field]: checked };
      setFormData(newData);
      step2DataRef.current = newData;
    };

    const handleInputChange = (field: string, value: string) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      step2DataRef.current = newData;
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step2DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <p className="text-sm text-gray-600 mb-4">
          Cochez les types de travaux concernés par cette intervention (sélection multiple optionnelle)
        </p>

        <Checkbox
          label="Travaux à chaud"
          description="Soudure, meulage, découpe thermique, etc."
          checked={formData.travauxChaud}
          onChange={(e) => handleCheckboxChange('travauxChaud', e.target.checked)}
        />
        <Checkbox
          label="Travaux en hauteur"
          description="Intervention à plus de 3 mètres de hauteur"
          checked={formData.travauxHauteur}
          onChange={(e) => handleCheckboxChange('travauxHauteur', e.target.checked)}
        />
        <Checkbox
          label="Travaux électriques"
          description="Intervention sur installations électriques"
          checked={formData.travauxElectrique}
          onChange={(e) => handleCheckboxChange('travauxElectrique', e.target.checked)}
        />
        <Checkbox
          label="Travaux en espace confiné"
          description="Intervention dans un espace restreint"
          checked={formData.travauxEspaceConfine}
          onChange={(e) => handleCheckboxChange('travauxEspaceConfine', e.target.checked)}
        />
        <Checkbox
          label="Travaux d'excavation"
          description="Terrassement, forage, creusement"
          checked={formData.travauxExcavation}
          onChange={(e) => handleCheckboxChange('travauxExcavation', e.target.checked)}
        />
        <Checkbox
          label="Autres"
          description="Autres types de travaux à risques"
          checked={formData.travauxAutres}
          onChange={(e) => handleCheckboxChange('travauxAutres', e.target.checked)}
        />

        {formData.travauxAutres && (
          <Input
            label="Description des autres travaux"
            value={formData.autresDescription}
            onChange={(e) => handleInputChange('autresDescription', e.target.value)}
            placeholder="Précisez le type de travaux..."
          />
        )}
      </form>
    );
  });
  Step2Component.displayName = 'Step2Component';

  // Étape 3: Engagement du demandeur
  const Step3Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      evaluationRisquesValidee: false,
      personneCompetenteAssignee: false,
      mesuresPreventionMisesEnPlace: false,
      personnelInforme: false,
      dangersControles: false,
    });
    const [validationError, setValidationError] = useState<string>('');

    // Fonction pour valider toutes les checkboxes en une seule fois
    const validateAllCheckboxes = () => {
      const allChecked = Object.values(formData).every(value => value === true);
      
      if (!allChecked) {
        setValidationError('Veuillez cocher toutes les cases obligatoires pour continuer');
        return false;
      }
      
      setValidationError('');
      return true;
    };

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Valider toutes les checkboxes en une seule fois
        return validateAllCheckboxes();
      },
    }));

    const handleCheckboxChange = (field: string, checked: boolean) => {
      const newData = { ...formData, [field]: checked };
      setFormData(newData);
      step3DataRef.current = newData;
      // Réinitialiser l'erreur de validation quand une checkbox change
      if (validationError) {
        setValidationError('');
      }
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step3DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <p className="text-sm text-gray-600 mb-4">
          En tant que demandeur, je m'engage et je confirme que :
        </p>

        <div>
          <Checkbox
            label="L'évaluation des risques a été validée *"
            checked={formData.evaluationRisquesValidee}
            onChange={(e) => handleCheckboxChange('evaluationRisquesValidee', e.target.checked)}
          />
        </div>

        <div>
          <Checkbox
            label="Une personne compétente a été assignée pour contrôler les mesures *"
            checked={formData.personneCompetenteAssignee}
            onChange={(e) => handleCheckboxChange('personneCompetenteAssignee', e.target.checked)}
          />
        </div>

        <div>
          <Checkbox
            label="Les mesures de prévention sont mises en place *"
            checked={formData.mesuresPreventionMisesEnPlace}
            onChange={(e) => handleCheckboxChange('mesuresPreventionMisesEnPlace', e.target.checked)}
          />
        </div>

        <div>
          <Checkbox
            label="Le personnel a été informé des exigences de sécurité *"
            checked={formData.personnelInforme}
            onChange={(e) => handleCheckboxChange('personnelInforme', e.target.checked)}
          />
        </div>

        <div>
          <Checkbox
            label="Les dangers seront contrôlés tout au long des travaux *"
            checked={formData.dangersControles}
            onChange={(e) => handleCheckboxChange('dangersControles', e.target.checked)}
          />
        </div>

        {validationError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{validationError}</p>
          </div>
        )}
      </form>
    );
  });
  Step3Component.displayName = 'Step3Component';

  // Étape 4: Révision et soumission
  const Step4Component = () => {
    // Récupérer les données réelles des étapes précédentes
    const step1Data = step1DataRef.current || {};
    const step2Data = step2DataRef.current || {};
    
    // Récupérer les informations du plan de prévention sélectionné
    const selectedPlan = plansPrevention.find((p) => p.id === step1Data.planPreventionId);
    const planReference = selectedPlan?.reference || 'Non sélectionné';
    const planSite = selectedPlan?.nomSite || '';
    
    // Liste des types de travaux sélectionnés
    const travauxTypes = [];
    if (step2Data.travauxChaud) travauxTypes.push('Travaux à chaud');
    if (step2Data.travauxHauteur) travauxTypes.push('Travaux en hauteur');
    if (step2Data.travauxElectrique) travauxTypes.push('Travaux électriques');
    if (step2Data.travauxEspaceConfine) travauxTypes.push('Travaux en espace confiné');
    if (step2Data.travauxExcavation) travauxTypes.push('Travaux d\'excavation');
    if (step2Data.travauxAutres) travauxTypes.push('Autres');
    
    // Formatage des dates
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Non définie';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Information importante</p>
              <p className="text-xs text-blue-700 mt-1">
                Après soumission, votre demande sera transmise au Chef de Projet pour validation.
                Une fois validée par le Chef de Projet, elle sera transmise à l'équipe HSE pour
                validation finale et attribution d'une référence unique.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Récapitulatif de votre demande</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Plan de Prévention:</p>
              <p className="text-gray-600">{planReference} {planSite ? `- ${planSite}` : ''}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Intitulé des Travaux:</p>
              <p className="text-gray-600">{step1Data.intituleTravaux || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Localisation:</p>
              <p className="text-gray-600">{step1Data.localisation || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Code Site:</p>
              <p className="text-gray-600">{step1Data.codeSite || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Contractant:</p>
              <p className="text-gray-600">{step1Data.contractant || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Nombre d'Intervenants:</p>
              <p className="text-gray-600">{step1Data.nombreIntervenants || 0} personne(s)</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Date de Début:</p>
              <p className="text-gray-600">{formatDate(step1Data.dateDebut)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Date de Fin:</p>
              <p className="text-gray-600">{formatDate(step1Data.dateFin)}</p>
            </div>
          </div>

          {travauxTypes.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-2">Types de travaux à risques:</p>
              <div className="flex flex-wrap gap-2">
                {travauxTypes.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step2Data.travauxAutres && step2Data.autresDescription && (
            <div>
              <p className="font-medium text-gray-700 mb-2">Description des autres travaux:</p>
              <p className="text-gray-600 text-sm">{step2Data.autresDescription}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const steps = [
    {
      id: 'details',
      title: 'Détails de l\'intervention',
      description: 'Informations générales sur les travaux à effectuer',
      component: <Step1Component ref={step1ValidationRef} />,
      isValid: plansDisponibles.length > 0,
      validateStep: async () => {
        if (step1ValidationRef.current) {
          return await step1ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'risques',
      title: 'Types de travaux à risques',
      description: 'Sélection des types de travaux concernés',
      component: <Step2Component ref={step2ValidationRef} />,
      validateStep: async () => {
        if (step2ValidationRef.current) {
          return await step2ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'engagement',
      title: 'Engagement du demandeur',
      description: 'Confirmations obligatoires du demandeur',
      component: <Step3Component ref={step3ValidationRef} />,
      validateStep: async () => {
        if (step3ValidationRef.current) {
          return await step3ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'revision',
      title: 'Révision et soumission',
      description: 'Vérification des informations et soumission',
      component: <Step4Component />,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (_data: any) => {
    // Récupérer les données de toutes les étapes
    const step1Data = step1DataRef.current || {};
    const step2Data = step2DataRef.current || {};
    const step3Data = step3DataRef.current || {};
    
    // Préparer les données pour le store
    const permisData = {
      planPreventionId: step1Data.planPreventionId,
      planPreventionReference:
        plansPrevention.find((p) => p.id === step1Data.planPreventionId)?.reference || '',
      intituleTravaux: step1Data.intituleTravaux,
      localisation: step1Data.localisation,
      codeSite: step1Data.codeSite,
      contractant: step1Data.contractant,
      nombreIntervenants: step1Data.nombreIntervenants,
      dateDebut: new Date(step1Data.dateDebut),
      dateFin: new Date(step1Data.dateFin),
      dureeMaxJours: 30,
      travauxRisques: {
        travauxChaud: step2Data.travauxChaud || false,
        travauxHauteur: step2Data.travauxHauteur || false,
        travauxElectrique: step2Data.travauxElectrique || false,
        travauxEspaceConfine: step2Data.travauxEspaceConfine || false,
        travauxExcavation: step2Data.travauxExcavation || false,
        autres: step2Data.travauxAutres || false,
        autresDescription: step2Data.autresDescription || '',
      },
      permisAnnexes: [],
      status: 'en_attente_validation_chef' as const,
      evaluationRisquesValidee: step3Data.evaluationRisquesValidee || false,
      personneCompetenteAssignee: step3Data.personneCompetenteAssignee || false,
      mesuresPreventionMisesEnPlace: step3Data.mesuresPreventionMisesEnPlace || false,
      personnelInforme: step3Data.personnelInforme || false,
      dangersControles: step3Data.dangersControles || false,
      demandeurNom: user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : '',
      demandeurDate: new Date(),
      superviseurNom: user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : '',
      superviseurDate: new Date(),
      creerPar: user?.email || '',
    };

    onComplete(permisData);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      onCancel={onCancel}
      title="Permis de Travail Général"
      description="Demande de permis de travail général"
      submitLabel="Soumettre la demande"
    />
  );
}
