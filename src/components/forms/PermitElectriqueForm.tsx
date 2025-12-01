import { useAuthStore } from '@/store/authStore';
import { usePreventionStore } from '@/store/preventionStore';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import MultiStepForm from './MultiStepForm';
import { AlertCircle } from 'lucide-react';
import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';

// Interface pour exposer les méthodes de validation
interface StepValidationHandle {
  validate: () => Promise<boolean>;
}

interface PermitElectriqueFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete: (data: any) => void;
  onCancel?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
}

export default function PermitElectriqueForm({ onComplete, onCancel }: PermitElectriqueFormProps) {
  const { user } = useAuthStore();
  const { plansPrevention } = usePreventionStore();

  // Refs pour stocker les fonctions de validation de chaque étape
  const step1ValidationRef = useRef<StepValidationHandle>(null);
  const step2ValidationRef = useRef<StepValidationHandle>(null);
  const step3ValidationRef = useRef<StepValidationHandle>(null);
  const step4ValidationRef = useRef<StepValidationHandle>(null);
  const step5ValidationRef = useRef<StepValidationHandle>(null);
  
  // Refs pour stocker les données de chaque étape
  const step1DataRef = useRef<any>(null);
  const step2DataRef = useRef<any>(null);
  const step3DataRef = useRef<any>(null);
  const step4DataRef = useRef<any>(null);
  const step5DataRef = useRef<any>(null);

  // Filtrer les plans validés
  const plansDisponibles = plansPrevention
    .filter((p) => p.status === 'valide')
    .map((p) => ({
      value: p.id,
      label: `${p.reference} - ${p.nomSite}`,
    }));

  // Étape 1: Informations générales et type de travail
  const Step1Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      planPreventionId: '',
      codeSite: '',
      nombreIntervenants: 1,
      dateDebut: '',
      dateFin: '',
      travailSousTension: false,
      travailHorsTension: false,
      consignationEnergie: false,
      basseTension: false,
      moyenneTension: false,
      hauteTension: false,
    });

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Validation HTML5 native
        if (formRef.current) {
          const isValid = formRef.current.checkValidity();
          
          // Validation personnalisée : dateFin >= dateDebut
          if (isValid && formData.dateDebut && formData.dateFin) {
            const dateDebut = new Date(formData.dateDebut);
            const dateFin = new Date(formData.dateFin);
            if (dateFin < dateDebut) {
              const dateFinInput = formRef.current.querySelector('[name="dateFin"]') as HTMLInputElement;
              if (dateFinInput) {
                dateFinInput.setCustomValidity('La date de fin doit être postérieure ou égale à la date de début');
                formRef.current.reportValidity();
                return false;
              }
            }
          }
          
          if (!isValid) {
            formRef.current.reportValidity();
          }
          return isValid;
        }
        return true;
      },
    }));

    const handleChange = (field: string, value: string | number | boolean) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      step1DataRef.current = newData;
      
      // Réinitialiser la validation personnalisée pour dateFin
      if (field === 'dateFin' || field === 'dateDebut') {
        const dateFinInput = formRef.current?.querySelector('[name="dateFin"]') as HTMLInputElement;
        if (dateFinInput) {
          dateFinInput.setCustomValidity('');
        }
      }
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step1DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <div className="mb-4">
          <Select
            label="Référence du plan de prévention *"
            value={formData.planPreventionId}
            onChange={(e) => handleChange('planPreventionId', e.target.value)}
            options={[
              { value: '', label: 'Sélectionnez un plan de prévention' },
              ...plansDisponibles
            ]}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Code Site *"
            value={formData.codeSite}
            onChange={(e) => handleChange('codeSite', e.target.value)}
            placeholder="Ex: ANT-001"
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
            label="Date de début *"
            type="date"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={(e) => handleChange('dateDebut', e.target.value)}
            required
          />
          <Input
            label="Date de fin *"
            type="date"
            name="dateFin"
            value={formData.dateFin}
            onChange={(e) => handleChange('dateFin', e.target.value)}
            required
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Type de travail</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Travail sous tension"
              description="Intervention sur installation sous tension"
              checked={formData.travailSousTension}
              onChange={(e) => handleChange('travailSousTension', e.target.checked)}
            />
            <Checkbox
              label="Travail hors tension"
              description="Intervention après mise hors tension"
              checked={formData.travailHorsTension}
              onChange={(e) => handleChange('travailHorsTension', e.target.checked)}
            />
            <Checkbox
              label="Consignation énergétique"
              description="Procédure de consignation"
              checked={formData.consignationEnergie}
              onChange={(e) => handleChange('consignationEnergie', e.target.checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Niveau de tension</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Basse tension"
              description="≤ 1000V"
              checked={formData.basseTension}
              onChange={(e) => handleChange('basseTension', e.target.checked)}
            />
            <Checkbox
              label="Moyenne tension"
              description="1kV à 50kV"
              checked={formData.moyenneTension}
              onChange={(e) => handleChange('moyenneTension', e.target.checked)}
            />
            <Checkbox
              label="Haute tension"
              description="> 50kV"
              checked={formData.hauteTension}
              onChange={(e) => handleChange('hauteTension', e.target.checked)}
            />
          </div>
        </div>

        {formData.travailSousTension && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Travail sous tension</p>
                <p className="text-xs text-red-700 mt-1">
                  Le travail sous tension nécessite des compétences spécialisées et des équipements spécifiques.
                  Assurez-vous que le personnel est habilité et que les mesures de sécurité sont adaptées.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    );
  });
  Step1Component.displayName = 'Step1Component';

  // Étape 2: Description et risques
  const Step2Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      typeCircuitEquipement: '',
      descriptionTravail: '',
      raisonNonMiseHorsTension: '',
      electrisation: false,
      electrocution: false,
      brulure: false,
    });
    
    // Récupérer travailSousTension depuis step1DataRef
    const travailSousTension = step1DataRef.current?.travailSousTension || false;

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Validation HTML5 native
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

    const handleChange = (field: string, value: string | boolean) => {
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
        <Input
          label="Type de circuit/équipement *"
          value={formData.typeCircuitEquipement}
          onChange={(e) => handleChange('typeCircuitEquipement', e.target.value)}
          placeholder="Ex: Tableau électrique principal, Câble HT, etc."
          required
        />

        <Textarea
          label="Description du travail *"
          value={formData.descriptionTravail}
          onChange={(e) => handleChange('descriptionTravail', e.target.value)}
          placeholder="Décrivez en détail les travaux électriques à effectuer..."
          rows={3}
          required
          minLength={5}
        />

        {travailSousTension && (
          <Textarea
            label="Raison de la non mise hors tension"
            value={formData.raisonNonMiseHorsTension}
            onChange={(e) => handleChange('raisonNonMiseHorsTension', e.target.value)}
            placeholder="Justifiez pourquoi les travaux doivent être effectués sous tension..."
            rows={2}
          />
        )}

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Risques identifiés</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Électrisation"
              description="Passage du courant dans le corps"
              checked={formData.electrisation}
              onChange={(e) => handleChange('electrisation', e.target.checked)}
            />
            <Checkbox
              label="Électrocution"
              description="Électrisation mortelle"
              checked={formData.electrocution}
              onChange={(e) => handleChange('electrocution', e.target.checked)}
            />
            <Checkbox
              label="Brûlure"
              description="Brûlure par arc électrique"
              checked={formData.brulure}
              onChange={(e) => handleChange('brulure', e.target.checked)}
            />
          </div>
        </div>
      </form>
    );
  });
  Step2Component.displayName = 'Step2Component';

  // Étape 3: Matériels et mesures de prévention
  const Step3Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      multimetreDC: false,
      outilsIsolants: false,
      personnelHabilite: false,
      personnelApte: false,
      balisage: false,
      chaussuresSecurite: false,
      casque: false,
      gantsElectriques: false,
      tapisIsolant: false,
      lunetteSecurite: false,
      testTension: false,
      toolbox: false,
      consignationEnergie: false,
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
      step3DataRef.current = newData;
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step3DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Matériels de mesure et outils</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Multimètre DC"
              description="Appareil de mesure de tension"
              checked={formData.multimetreDC}
              onChange={(e) => handleCheckboxChange('multimetreDC', e.target.checked)}
            />
            <Checkbox
              label="Outils isolants"
              description="Outils avec isolation électrique"
              checked={formData.outilsIsolants}
              onChange={(e) => handleCheckboxChange('outilsIsolants', e.target.checked)}
            />
            <Checkbox
              label="Test de tension"
              description="VAT (Vérificateur d'Absence de Tension)"
              checked={formData.testTension}
              onChange={(e) => handleCheckboxChange('testTension', e.target.checked)}
            />
            <Checkbox
              label="Toolbox électrique"
              description="Boîte à outils spécialisée"
              checked={formData.toolbox}
              onChange={(e) => handleCheckboxChange('toolbox', e.target.checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Formation et compétences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Personnel habilité"
              description="Personnel formé et habilité électrique"
              checked={formData.personnelHabilite}
              onChange={(e) => handleCheckboxChange('personnelHabilite', e.target.checked)}
            />
            <Checkbox
              label="Personnel apte"
              description="Personnel médicalement apte"
              checked={formData.personnelApte}
              onChange={(e) => handleCheckboxChange('personnelApte', e.target.checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Équipements de protection individuelle</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Chaussures de sécurité"
              checked={formData.chaussuresSecurite}
              onChange={(e) => handleCheckboxChange('chaussuresSecurite', e.target.checked)}
            />
            <Checkbox
              label="Casque de sécurité"
              checked={formData.casque}
              onChange={(e) => handleCheckboxChange('casque', e.target.checked)}
            />
            <Checkbox
              label="Gants électriques"
              description="Gants isolants pour travaux électriques"
              checked={formData.gantsElectriques}
              onChange={(e) => handleCheckboxChange('gantsElectriques', e.target.checked)}
            />
            <Checkbox
              label="Tapis isolant"
              description="Tapis de protection isolant"
              checked={formData.tapisIsolant}
              onChange={(e) => handleCheckboxChange('tapisIsolant', e.target.checked)}
            />
            <Checkbox
              label="Lunettes de sécurité"
              checked={formData.lunetteSecurite}
              onChange={(e) => handleCheckboxChange('lunetteSecurite', e.target.checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Procédures de sécurité</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Balisage de la zone"
              checked={formData.balisage}
              onChange={(e) => handleCheckboxChange('balisage', e.target.checked)}
            />
            <Checkbox
              label="Consignation énergétique"
              description="Procédure de consignation effectuée"
              checked={formData.consignationEnergie}
              onChange={(e) => handleCheckboxChange('consignationEnergie', e.target.checked)}
            />
          </div>
        </div>
      </form>
    );
  });
  Step3Component.displayName = 'Step3Component';

  // Étape 4: Prévention urgence et engagement
  const Step4Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      secouristePresent: false,
      numerosUrgenceDisponibles: false,
      engagementDemandeur: false,
    });
    const [validationError, setValidationError] = useState<string>('');

    // Fonction pour valider la checkbox obligatoire
    const validateCheckbox = () => {
      if (!formData.engagementDemandeur) {
        setValidationError('L\'engagement du demandeur est obligatoire');
        return false;
      }
      setValidationError('');
      return true;
    };

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        return validateCheckbox();
      },
    }));

    const handleCheckboxChange = (field: string, checked: boolean) => {
      const newData = { ...formData, [field]: checked };
      setFormData(newData);
      step4DataRef.current = newData;
      // Réinitialiser l'erreur de validation quand la checkbox change
      if (validationError) {
        setValidationError('');
      }
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step4DataRef.current = formData;
    }, [formData]);

    return (
      <form ref={formRef} className="space-y-6" noValidate>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Prévention urgence</p>
              <p className="text-xs text-blue-700 mt-1">
                Vérifiez que les mesures d'urgence sont en place avant de commencer les travaux électriques.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Secouriste présent"
            description="Personnel formé aux premiers secours présent sur site"
            checked={formData.secouristePresent}
            onChange={(e) => handleCheckboxChange('secouristePresent', e.target.checked)}
          />
          <Checkbox
            label="Numéros d'urgence disponibles"
            description="Numéros d'urgence affichés et accessibles"
            checked={formData.numerosUrgenceDisponibles}
            onChange={(e) => handleCheckboxChange('numerosUrgenceDisponibles', e.target.checked)}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Engagement du demandeur</h4>
          <Checkbox
            label="Je m'engage à respecter toutes les mesures de sécurité et procédures définies *"
            description="Engagement obligatoire du demandeur"
            checked={formData.engagementDemandeur}
            onChange={(e) => handleCheckboxChange('engagementDemandeur', e.target.checked)}
          />
          {validationError && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{validationError}</p>
            </div>
          )}
        </div>
      </form>
    );
  });
  Step4Component.displayName = 'Step4Component';

  // Étape 5: Consignation énergétique (optionnelle)
  const Step5Component = forwardRef<StepValidationHandle>((_props, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
      motifConsignation: '',
      equipementConcerne: '',
      electrique: '',
      dateConsignation: '',
      heureConsignation: '',
      vatVerification: false,
      visaConsignation: '',
    });
    
    // Récupérer consignationEnergie depuis step1DataRef
    const consignationEnergie = step1DataRef.current?.consignationEnergie || false;

    // Exposer la fonction de validation via ref
    useImperativeHandle(ref, () => ({
      validate: async () => {
        // Pas de validation requise pour cette étape (tous optionnels)
        return true;
      },
    }));

    const handleChange = (field: string, value: string | boolean) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      step5DataRef.current = newData;
    };
    
    // Initialiser les données au montage
    useEffect(() => {
      step5DataRef.current = formData;
    }, [formData]);

    if (!consignationEnergie) {
      // Récupérer les données réelles pour le récapitulatif
      const step1Data = step1DataRef.current || {};
      const step2Data = step2DataRef.current || {};
      
      return (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Consignation non requise</p>
                <p className="text-xs text-gray-700 mt-1">
                  Aucune consignation énergétique n'est requise pour ce type de travaux.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Récapitulatif de votre demande</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Site:</p>
                <p className="text-gray-600">{step1Data.codeSite || 'Non renseigné'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Intervenants:</p>
                <p className="text-gray-600">{step1Data.nombreIntervenants || 0} personne(s)</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Type de travail:</p>
                <p className="text-gray-600">
                  {step1Data.travailSousTension ? 'Sous tension' : 
                   step1Data.travailHorsTension ? 'Hors tension' : 'Non spécifié'}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Niveau de tension:</p>
                <p className="text-gray-600">
                  {step1Data.basseTension ? 'Basse tension' : 
                   step1Data.moyenneTension ? 'Moyenne tension' : 
                   step1Data.hauteTension ? 'Haute tension' : 'Non spécifié'}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Type de circuit/équipement:</p>
                <p className="text-gray-600">{step2Data.typeCircuitEquipement || 'Non renseigné'}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form ref={formRef} className="space-y-4" noValidate>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Consignation énergétique</p>
              <p className="text-xs text-yellow-700 mt-1">
                Remplissez les informations de consignation si applicable.
              </p>
            </div>
          </div>
        </div>

        <Input
          label="Motif de consignation"
          value={formData.motifConsignation}
          onChange={(e) => handleChange('motifConsignation', e.target.value)}
          placeholder="Ex: Maintenance préventive, Réparation..."
        />

        <Input
          label="Équipement concerné"
          value={formData.equipementConcerne}
          onChange={(e) => handleChange('equipementConcerne', e.target.value)}
          placeholder="Ex: Tableau électrique principal, Disjoncteur..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date de consignation"
            type="date"
            value={formData.dateConsignation}
            onChange={(e) => handleChange('dateConsignation', e.target.value)}
          />
          <Input
            label="Heure de consignation"
            type="time"
            value={formData.heureConsignation}
            onChange={(e) => handleChange('heureConsignation', e.target.value)}
          />
        </div>

        <Input
          label="Électrique"
          value={formData.electrique}
          onChange={(e) => handleChange('electrique', e.target.value)}
          placeholder="Détails électriques..."
        />

        <Checkbox
          label="VAT vérification"
          description="Vérification d'absence de tension effectuée"
          checked={formData.vatVerification}
          onChange={(e) => handleChange('vatVerification', e.target.checked)}
        />

        <Input
          label="Visa de consignation"
          value={formData.visaConsignation}
          onChange={(e) => handleChange('visaConsignation', e.target.value)}
          placeholder="Nom et signature du consignateur"
        />
      </form>
    );
  });
  Step5Component.displayName = 'Step5Component';

  const steps = [
    {
      id: 'informations',
      title: 'Informations générales',
      description: 'Type de travail et niveau de tension',
      component: <Step1Component ref={step1ValidationRef} />,
      validateStep: async () => {
        if (step1ValidationRef.current) {
          return await step1ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'description',
      title: 'Description et risques',
      description: 'Détails des travaux et risques identifiés',
      component: <Step2Component ref={step2ValidationRef} />,
      validateStep: async () => {
        if (step2ValidationRef.current) {
          return await step2ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'materiels',
      title: 'Matériels et prévention',
      description: 'Équipements et mesures de prévention',
      component: <Step3Component ref={step3ValidationRef} />,
      validateStep: async () => {
        if (step3ValidationRef.current) {
          return await step3ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'urgence',
      title: 'Prévention urgence',
      description: 'Mesures d\'urgence et engagement',
      component: <Step4Component ref={step4ValidationRef} />,
      validateStep: async () => {
        if (step4ValidationRef.current) {
          return await step4ValidationRef.current.validate();
        }
        return true;
      },
    },
    {
      id: 'consignation',
      title: 'Consignation énergétique',
      description: 'Informations de consignation (si applicable)',
      component: <Step5Component ref={step5ValidationRef} />,
      validateStep: async () => {
        if (step5ValidationRef.current) {
          return await step5ValidationRef.current.validate();
        }
        return true;
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleComplete = (_data: any) => {
    // Récupérer les données de toutes les étapes
    const step1Data = step1DataRef.current || {};
    const step2Data = step2DataRef.current || {};
    const step3Data = step3DataRef.current || {};
    const step4Data = step4DataRef.current || {};
    const step5Data = step5DataRef.current || {};
    
    // Récupérer la référence du plan de prévention
    const selectedPlan = plansPrevention.find((p) => p.id === step1Data.planPreventionId);

    // Préparer les données pour le store
    const permisData = {
      permisGeneralId: '', // Sera lié au permis général
      planPreventionReference: selectedPlan?.reference || '',
      codeSite: step1Data.codeSite,
      nombreIntervenants: step1Data.nombreIntervenants,
      typeTravail: {
        travailSousTension: step1Data.travailSousTension || false,
        travailHorsTension: step1Data.travailHorsTension || false,
        consignationEnergie: step1Data.consignationEnergie || false,
      },
      tension: {
        basseTension: step1Data.basseTension || false,
        moyenneTension: step1Data.moyenneTension || false,
        hauteTension: step1Data.hauteTension || false,
      },
      typeCircuitEquipement: step2Data.typeCircuitEquipement,
      descriptionTravail: step2Data.descriptionTravail,
      raisonNonMiseHorsTension: step2Data.raisonNonMiseHorsTension || '',
      risques: {
        electrisation: step2Data.electrisation || false,
        electrocution: step2Data.electrocution || false,
        brulure: step2Data.brulure || false,
        autres: [],
      },
      materiels: {
        multimetreDC: step3Data.multimetreDC || false,
        outilsIsolants: step3Data.outilsIsolants || false,
        autres: [],
      },
      mesuresPrevention: {
        personnelHabilite: step3Data.personnelHabilite || false,
        personnelApte: step3Data.personnelApte || false,
        balisage: step3Data.balisage || false,
        chaussuresSecurite: step3Data.chaussuresSecurite || false,
        casque: step3Data.casque || false,
        gantsElectriques: step3Data.gantsElectriques || false,
        tapisIsolant: step3Data.tapisIsolant || false,
        lunetteSecurite: step3Data.lunetteSecurite || false,
        testTension: step3Data.testTension || false,
        toolbox: step3Data.toolbox || false,
        consignationEnergie: step3Data.consignationEnergie || false,
        autres: [],
      },
      secouristePresent: step4Data.secouristePresent || false,
      numerosUrgenceDisponibles: step4Data.numerosUrgenceDisponibles || false,
      engagementDemandeur: step4Data.engagementDemandeur || false,
      demandeurNom: user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : '',
      demandeurDate: new Date(),
      personnelsExecutants: [],
      controlesJournaliers: [],
      bonConsignation: step1Data.consignationEnergie && step5Data ? {
        motif: step5Data.motifConsignation || '',
        consignations: [{
          codeSite: step1Data.codeSite,
          equipementConcerne: step5Data.equipementConcerne || '',
          electrique: step5Data.electrique || '',
          dateConsignation: step5Data.dateConsignation ? new Date(step5Data.dateConsignation) : undefined,
          heureConsignation: step5Data.heureConsignation || '',
          vatVerification: step5Data.vatVerification || false,
          visaConsignation: step5Data.visaConsignation || '',
        }],
      } : undefined,
      status: 'en_attente_validation_chef' as const,
      dateDebut: step1Data.dateDebut ? new Date(step1Data.dateDebut) : new Date(),
      dateFin: step1Data.dateFin ? new Date(step1Data.dateFin) : new Date(),
      creerPar: user?.email || '',
    };

    onComplete(permisData);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      onCancel={onCancel}
      title="Permis de Travail Électrique"
      description="Demande de permis de travail électrique"
      submitLabel="Soumettre la demande"
    />
  );
}
