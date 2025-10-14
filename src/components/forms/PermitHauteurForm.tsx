import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePermitStore } from '@/store/permitStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { useI18n } from '@/lib/i18n';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Textarea from '@/components/ui/Textarea';
import MultiStepForm from './MultiStepForm';
import { AlertCircle } from 'lucide-react';

// Schémas de validation pour chaque étape
const step1Schema = z.object({
  descriptionOperation: z.string().min(5, 'Description trop courte (min 5 caractères)'),
  codeSite: z.string().min(1, 'Code site requis'),
  region: z.string().min(1, 'Région requise'),
  nombreIntervenants: z.number().min(1, 'Minimum 1 intervenant'),
  hauteurChute: z.enum(['<=3m', '3-8m', '8-40m', '>40m']),
  travailToiture: z.boolean(),
  typePente: z.enum(['plat', 'legere', 'forte', 'tres_forte', 'extreme']).optional(),
});

const step2Schema = z.object({
  effondrement: z.boolean(),
  incendie: z.boolean(),
  deversement: z.boolean(),
  electrisation: z.boolean(),
  chutePersonnes: z.boolean(),
  blessure: z.boolean(),
  chuteObjet: z.boolean(),
  expositionSubstances: z.boolean(),
  ecrasement: z.boolean(),
  mauvaiseMeteo: z.boolean(),
  autres: z.array(z.string()).optional(),
});

const step3Schema = z.object({
  echafaudageRoulant: z.boolean(),
  echafaudageFixe: z.boolean(),
  filetSecurite: z.boolean(),
  ligneVieVerticale: z.boolean(),
  ligneVieHorizontale: z.boolean(),
  pointAncrage: z.boolean(),
  echelleCrinoline: z.boolean(),
  plateformeElevatrice: z.boolean(),
  travailCordes: z.boolean(),
  echelle: z.boolean(),
  escabeau: z.boolean(),
  autres: z.array(z.string()).optional(),
});

const step4Schema = z.object({
  personnelHabilite: z.boolean(),
  personnelApte: z.boolean(),
  balisage: z.boolean(),
  chaussuresSecurite: z.boolean(),
  casque: z.boolean(),
  gantsNitrile: z.boolean(),
  gantsIsolants: z.boolean(),
  gantsManutention: z.boolean(),
  bouchonOreille: z.boolean(),
  casqueAntiBruit: z.boolean(),
  longeAbsorbeur: z.boolean(),
  doubleLonge: z.boolean(),
  ligneVieConforme: z.boolean(),
  harnaisVerifie: z.boolean(),
  echafaudageConforme: z.boolean(),
  echelleConforme: z.boolean(),
  sanglageOutils: z.boolean(),
  travailDeux: z.boolean(),
  mesureVent: z.boolean(),
  autres: z.array(z.string()).optional(),
});

const step5Schema = z.object({
  planSauvetageDisponible: z.boolean(),
  numerosUrgenceDisponibles: z.boolean(),
  secouristePresent: z.boolean(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;
type Step5Data = z.infer<typeof step5Schema>;

interface PermitHauteurFormProps {
  onComplete: (data: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function PermitHauteurForm({ onComplete, onCancel, initialData }: PermitHauteurFormProps) {
  const { plansPrevention } = usePermitStore();
  const { user } = useAuthStore();
  const { t } = useI18n();

  // Étape 1: Informations générales
  const Step1Component = (formData: any, updateFormData: (data: any) => void) => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<Step1Data>({
      resolver: zodResolver(step1Schema),
      defaultValues: {
        descriptionOperation: formData.descriptionOperation || '',
        codeSite: formData.codeSite || '',
        region: formData.region || '',
        nombreIntervenants: formData.nombreIntervenants || 1,
        hauteurChute: formData.hauteurChute || '<=3m',
        travailToiture: formData.travailToiture || false,
        typePente: formData.typePente || 'plat',
      },
    });

    const travailToiture = watch('travailToiture');

    const onSubmit = (data: Step1Data) => {
      updateFormData(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          label="Description de l'opération *"
          {...register('descriptionOperation')}
          error={errors.descriptionOperation?.message}
          placeholder="Décrivez en détail l'opération à effectuer en hauteur..."
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Code Site *"
            {...register('codeSite')}
            error={errors.codeSite?.message}
            placeholder="Ex: ANT-001"
          />
          <Input
            label="Région *"
            {...register('region')}
            error={errors.region?.message}
            placeholder="Ex: Analamanga"
          />
        </div>

        <Input
          label="Nombre d'Intervenants *"
          type="number"
          {...register('nombreIntervenants', { valueAsNumber: true })}
          error={errors.nombreIntervenants?.message}
          min={1}
        />

        <Select
          label="Hauteur de chute *"
          {...register('hauteurChute')}
          error={errors.hauteurChute?.message}
          options={[
            { value: '<=3m', label: '≤ 3 mètres' },
            { value: '3-8m', label: '3 à 8 mètres' },
            { value: '8-40m', label: '8 à 40 mètres' },
            { value: '>40m', label: '> 40 mètres' },
          ]}
        />

        <Checkbox
          label="Travail en toiture"
          description="Intervention sur toiture ou surface inclinée"
          {...register('travailToiture')}
        />

        {travailToiture && (
          <Select
            label="Type de pente"
            {...register('typePente')}
            options={[
              { value: 'plat', label: 'Plat (0-5°)' },
              { value: 'legere', label: 'Légère (5-15°)' },
              { value: 'forte', label: 'Forte (15-30°)' },
              { value: 'tres_forte', label: 'Très forte (30-45°)' },
              { value: 'extreme', label: 'Extrême (>45°)' },
            ]}
          />
        )}
      </form>
    );
  };

  // Étape 2: Risques identifiés
  const Step2Component = (formData: any, updateFormData: (data: any) => void) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Step2Data>({
      resolver: zodResolver(step2Schema),
      defaultValues: {
        effondrement: formData.effondrement || false,
        incendie: formData.incendie || false,
        deversement: formData.deversement || false,
        electrisation: formData.electrisation || false,
        chutePersonnes: formData.chutePersonnes || false,
        blessure: formData.blessure || false,
        chuteObjet: formData.chuteObjet || false,
        expositionSubstances: formData.expositionSubstances || false,
        ecrasement: formData.ecrasement || false,
        mauvaiseMeteo: formData.mauvaiseMeteo || false,
        autres: formData.autres || [],
      },
    });

    const onSubmit = (data: Step2Data) => {
      updateFormData(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600 mb-4">
          Identifiez tous les risques liés aux travaux en hauteur
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Effondrement"
            description="Risque d'effondrement de structure"
            {...register('effondrement')}
          />
          <Checkbox
            label="Incendie"
            description="Risque d'incendie"
            {...register('incendie')}
          />
          <Checkbox
            label="Déversement"
            description="Risque de déversement de produits"
            {...register('deversement')}
          />
          <Checkbox
            label="Électrisation"
            description="Risque d'électrisation"
            {...register('electrisation')}
          />
          <Checkbox
            label="Chute de personnes"
            description="Risque de chute de personnes"
            {...register('chutePersonnes')}
          />
          <Checkbox
            label="Blessure"
            description="Risque de blessure"
            {...register('blessure')}
          />
          <Checkbox
            label="Chute d'objets"
            description="Risque de chute d'objets"
            {...register('chuteObjet')}
          />
          <Checkbox
            label="Exposition substances"
            description="Exposition à des substances dangereuses"
            {...register('expositionSubstances')}
          />
          <Checkbox
            label="Écrasement"
            description="Risque d'écrasement"
            {...register('ecrasement')}
          />
          <Checkbox
            label="Mauvaise météo"
            description="Conditions météorologiques défavorables"
            {...register('mauvaiseMeteo')}
          />
        </div>
      </form>
    );
  };

  // Étape 3: Matériels et équipements
  const Step3Component = (formData: any, updateFormData: (data: any) => void) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Step3Data>({
      resolver: zodResolver(step3Schema),
      defaultValues: {
        echafaudageRoulant: formData.echafaudageRoulant || false,
        echafaudageFixe: formData.echafaudageFixe || false,
        filetSecurite: formData.filetSecurite || false,
        ligneVieVerticale: formData.ligneVieVerticale || false,
        ligneVieHorizontale: formData.ligneVieHorizontale || false,
        pointAncrage: formData.pointAncrage || false,
        echelleCrinoline: formData.echelleCrinoline || false,
        plateformeElevatrice: formData.plateformeElevatrice || false,
        travailCordes: formData.travailCordes || false,
        echelle: formData.echelle || false,
        escabeau: formData.escabeau || false,
        autres: formData.autres || [],
      },
    });

    const onSubmit = (data: Step3Data) => {
      updateFormData(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600 mb-4">
          Sélectionnez les matériels et équipements utilisés
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Échafaudage roulant"
            description="Échafaudage mobile sur roues"
            {...register('echafaudageRoulant')}
          />
          <Checkbox
            label="Échafaudage fixe"
            description="Échafaudage fixe monté sur structure"
            {...register('echafaudageFixe')}
          />
          <Checkbox
            label="Filet de sécurité"
            description="Filet de protection contre les chutes"
            {...register('filetSecurite')}
          />
          <Checkbox
            label="Ligne de vie verticale"
            description="Ligne de vie pour déplacement vertical"
            {...register('ligneVieVerticale')}
          />
          <Checkbox
            label="Ligne de vie horizontale"
            description="Ligne de vie pour déplacement horizontal"
            {...register('ligneVieHorizontale')}
          />
          <Checkbox
            label="Point d'ancrage"
            description="Point d'ancrage fixe"
            {...register('pointAncrage')}
          />
          <Checkbox
            label="Échelle à crinoline"
            description="Échelle avec protection anti-chute"
            {...register('echelleCrinoline')}
          />
          <Checkbox
            label="Plateforme élévatrice"
            description="PEMP (Plateforme Élévatrice Mobile de Personnel)"
            {...register('plateformeElevatrice')}
          />
          <Checkbox
            label="Travail sur cordes"
            description="Techniques d'accès et de positionnement sur cordes"
            {...register('travailCordes')}
          />
          <Checkbox
            label="Échelle"
            description="Échelle simple"
            {...register('echelle')}
          />
          <Checkbox
            label="Escabeau"
            description="Escabeau ou marchepied"
            {...register('escabeau')}
          />
        </div>
      </form>
    );
  };

  // Étape 4: Mesures de prévention
  const Step4Component = (formData: any, updateFormData: (data: any) => void) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Step4Data>({
      resolver: zodResolver(step4Schema),
      defaultValues: {
        personnelHabilite: formData.personnelHabilite || false,
        personnelApte: formData.personnelApte || false,
        balisage: formData.balisage || false,
        chaussuresSecurite: formData.chaussuresSecurite || false,
        casque: formData.casque || false,
        gantsNitrile: formData.gantsNitrile || false,
        gantsIsolants: formData.gantsIsolants || false,
        gantsManutention: formData.gantsManutention || false,
        bouchonOreille: formData.bouchonOreille || false,
        casqueAntiBruit: formData.casqueAntiBruit || false,
        longeAbsorbeur: formData.longeAbsorbeur || false,
        doubleLonge: formData.doubleLonge || false,
        ligneVieConforme: formData.ligneVieConforme || false,
        harnaisVerifie: formData.harnaisVerifie || false,
        echafaudageConforme: formData.echafaudageConforme || false,
        echelleConforme: formData.echelleConforme || false,
        sanglageOutils: formData.sanglageOutils || false,
        travailDeux: formData.travailDeux || false,
        mesureVent: formData.mesureVent || false,
        autres: formData.autres || [],
      },
    });

    const onSubmit = (data: Step4Data) => {
      updateFormData(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600 mb-4">
          Confirmez les mesures de prévention mises en place
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Formation et compétences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Personnel habilité"
                description="Personnel formé et habilité"
                {...register('personnelHabilite')}
              />
              <Checkbox
                label="Personnel apte"
                description="Personnel médicalement apte"
                {...register('personnelApte')}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Équipements de protection individuelle</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Chaussures de sécurité"
                {...register('chaussuresSecurite')}
              />
              <Checkbox
                label="Casque de sécurité"
                {...register('casque')}
              />
              <Checkbox
                label="Gants nitrile"
                {...register('gantsNitrile')}
              />
              <Checkbox
                label="Gants isolants"
                {...register('gantsIsolants')}
              />
              <Checkbox
                label="Gants de manutention"
                {...register('gantsManutention')}
              />
              <Checkbox
                label="Bouchons d'oreille"
                {...register('bouchonOreille')}
              />
              <Checkbox
                label="Casque anti-bruit"
                {...register('casqueAntiBruit')}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Équipements anti-chute</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Longe avec absorbeur"
                {...register('longeAbsorbeur')}
              />
              <Checkbox
                label="Double longe"
                {...register('doubleLonge')}
              />
              <Checkbox
                label="Ligne de vie conforme"
                {...register('ligneVieConforme')}
              />
              <Checkbox
                label="Harnais vérifié"
                {...register('harnaisVerifie')}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Vérifications et procédures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Échafaudage conforme"
                {...register('echafaudageConforme')}
              />
              <Checkbox
                label="Échelle conforme"
                {...register('echelleConforme')}
              />
              <Checkbox
                label="Sanglage des outils"
                {...register('sanglageOutils')}
              />
              <Checkbox
                label="Travail à deux"
                {...register('travailDeux')}
              />
              <Checkbox
                label="Mesure du vent"
                {...register('mesureVent')}
              />
              <Checkbox
                label="Balisage de la zone"
                {...register('balisage')}
              />
            </div>
          </div>
        </div>
      </form>
    );
  };

  // Étape 5: Prévention urgence et validation
  const Step5Component = (formData: any, updateFormData: (data: any) => void) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Step5Data>({
      resolver: zodResolver(step5Schema),
      defaultValues: {
        planSauvetageDisponible: formData.planSauvetageDisponible || false,
        numerosUrgenceDisponibles: formData.numerosUrgenceDisponibles || false,
        secouristePresent: formData.secouristePresent || false,
      },
    });

    const onSubmit = (data: Step5Data) => {
      updateFormData(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Prévention urgence</p>
              <p className="text-xs text-blue-700 mt-1">
                Vérifiez que les mesures d'urgence sont en place avant de commencer les travaux.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Plan de sauvetage disponible"
            description="Plan de sauvetage en cas d'accident"
            {...register('planSauvetageDisponible')}
          />
          <Checkbox
            label="Numéros d'urgence disponibles"
            description="Numéros d'urgence affichés et accessibles"
            {...register('numerosUrgenceDisponibles')}
          />
          <Checkbox
            label="Secouriste présent"
            description="Personnel formé aux premiers secours présent sur site"
            {...register('secouristePresent')}
          />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Récapitulatif de votre demande</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Opération:</p>
              <p className="text-gray-600">{formData.descriptionOperation}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Site:</p>
              <p className="text-gray-600">{formData.codeSite} - {formData.region}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Hauteur de chute:</p>
              <p className="text-gray-600">{formData.hauteurChute}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Intervenants:</p>
              <p className="text-gray-600">{formData.nombreIntervenants} personne(s)</p>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const steps = [
    {
      id: 'informations',
      title: 'Informations générales',
      description: 'Détails de l\'opération et caractéristiques du site',
      component: <Step1Component />,
    },
    {
      id: 'risques',
      title: 'Risques identifiés',
      description: 'Identification des risques liés aux travaux en hauteur',
      component: <Step2Component />,
    },
    {
      id: 'materiels',
      title: 'Matériels et équipements',
      description: 'Équipements utilisés pour les travaux',
      component: <Step3Component />,
    },
    {
      id: 'prevention',
      title: 'Mesures de prévention',
      description: 'Mesures de sécurité mises en place',
      component: <Step4Component />,
    },
    {
      id: 'urgence',
      title: 'Prévention urgence',
      description: 'Mesures d\'urgence et validation finale',
      component: <Step5Component />,
    },
  ];

  const handleComplete = (data: any) => {
    // Préparer les données pour le store
    const permisData = {
      permisGeneralId: '', // Sera lié au permis général
      planPreventionReference: '', // Sera récupéré du permis général
      descriptionOperation: data.descriptionOperation,
      codeSite: data.codeSite,
      region: data.region,
      nombreIntervenants: data.nombreIntervenants,
      hauteurChute: data.hauteurChute,
      travailToiture: data.travailToiture,
      typePente: data.typePente,
      risques: {
        effondrement: data.effondrement,
        incendie: data.incendie,
        deversement: data.deversement,
        electrisation: data.electrisation,
        chutePersonnes: data.chutePersonnes,
        blessure: data.blessure,
        chuteObjet: data.chuteObjet,
        expositionSubstances: data.expositionSubstances,
        ecrasement: data.ecrasement,
        mauvaiseMeteo: data.mauvaiseMeteo,
        autres: data.autres || [],
      },
      materiels: {
        echafaudageRoulant: data.echafaudageRoulant,
        echafaudageFixe: data.echafaudageFixe,
        filetSecurite: data.filetSecurite,
        ligneVieVerticale: data.ligneVieVerticale,
        ligneVieHorizontale: data.ligneVieHorizontale,
        pointAncrage: data.pointAncrage,
        echelleCrinoline: data.echelleCrinoline,
        plateformeElevatrice: data.plateformeElevatrice,
        travailCordes: data.travailCordes,
        echelle: data.echelle,
        escabeau: data.escabeau,
        autres: data.autres || [],
      },
      mesuresPrevention: {
        personnelHabilite: data.personnelHabilite,
        personnelApte: data.personnelApte,
        balisage: data.balisage,
        chaussuresSecurite: data.chaussuresSecurite,
        casque: data.casque,
        gantsNitrile: data.gantsNitrile,
        gantsIsolants: data.gantsIsolants,
        gantsManutention: data.gantsManutention,
        bouchonOreille: data.bouchonOreille,
        casqueAntiBruit: data.casqueAntiBruit,
        longeAbsorbeur: data.longeAbsorbeur,
        doubleLonge: data.doubleLonge,
        ligneVieConforme: data.ligneVieConforme,
        harnaisVerifie: data.harnaisVerifie,
        echafaudageConforme: data.echafaudageConforme,
        echelleConforme: data.echelleConforme,
        sanglageOutils: data.sanglageOutils,
        travailDeux: data.travailDeux,
        mesureVent: data.mesureVent,
        autres: data.autres || [],
      },
      planSauvetageDisponible: data.planSauvetageDisponible,
      numerosUrgenceDisponibles: data.numerosUrgenceDisponibles,
      secouristePresent: data.secouristePresent,
      demandeurNom: user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : '',
      demandeurDate: new Date(),
      personnelsExecutants: [],
      validationsJournalieres: [],
      status: 'en_attente_validation_chef' as const,
      dateDebut: new Date(),
      dateFin: new Date(),
      creerPar: user?.email || '',
    };

    onComplete(permisData);
  };

  return (
    <MultiStepForm
      steps={steps}
      onComplete={handleComplete}
      onCancel={onCancel}
      title="Permis de Travail en Hauteur"
      description="Demande de permis de travail en hauteur"
      submitLabel="Soumettre la demande"
    />
  );
}
