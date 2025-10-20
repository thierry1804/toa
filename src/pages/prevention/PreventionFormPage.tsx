// import { useEffect } from 'react'; // Unused import
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePermitStore } from '@/store/permitStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { ArrowLeft, Save, Plus, Trash2, AlertTriangle } from 'lucide-react';
// import type { PlanPrevention, RisqueIdentifie } from '@/types'; // Unused imports

// Schéma de validation Zod - SGI-PPHSSES-TOA-601
const planPreventionSchema = z.object({
  // Section 1: Informations Entreprise Prestataire
  entreprisePrestataire: z.string().min(1, 'Entreprise requise'),
  representantPrestataire: z.string().min(1, 'Représentant requis'),
  contactPrestataire: z.string().min(1, 'Contact requis'),
  emailPrestataire: z.string().email('Email invalide').optional().or(z.literal('')),
  adressePrestataire: z.string().optional(),

  // Section 2: Informations Maître d'Ouvrage
  maitreOuvrage: z.string().min(1, 'Maître d\'ouvrage requis'),
  representantMaitreOuvrage: z.string().min(1, 'Représentant maître d\'ouvrage requis'),
  contactMaitreOuvrage: z.string().min(1, 'Contact maître d\'ouvrage requis'),
  emailMaitreOuvrage: z.string().email('Email invalide').optional().or(z.literal('')),

  // Section 3: Localisation
  nomSite: z.string().min(1, 'Nom du site requis'),
  codeSite: z.string().min(1, 'Code site requis'),
  region: z.string().min(1, 'Région requise'),
  adresseSite: z.string().min(1, 'Adresse du site requise'),
  coordonneesGPS: z.string().optional(),

  // Section 4: Description des Travaux
  natureIntervention: z.string().min(1, 'Nature intervention requise'),
  descriptionTravaux: z.string().min(10, 'Description trop courte (min 10 caractères)'),
  nombreIntervenants: z.number().min(1, 'Minimum 1 intervenant'),
  dureeEstimee: z.number().min(1, 'Durée estimée requise'),
  horairesTravail: z.object({
    debut: z.string().min(1, 'Heure de début requise'),
    fin: z.string().min(1, 'Heure de fin requise'),
    pause: z.string().min(1, 'Heure de pause requise'),
  }),
  dateDebut: z.string().min(1, 'Date de début requise'),
  dateFin: z.string().min(1, 'Date de fin requise'),

  // Section 5: Risques Identifiés
  risques: z.array(
    z.object({
      categorie: z.string().min(1, 'Catégorie requise'),
      description: z.string().min(1, 'Description requise'),
      niveauGravite: z.enum(['faible', 'moyen', 'eleve', 'critique']),
      probabilite: z.enum(['faible', 'moyenne', 'elevee']),
      impact: z.enum(['faible', 'moyen', 'eleve', 'critique']),
      mesuresPrevention: z.array(z.string()).min(1, 'Au moins une mesure requise'),
      equipementsNecessaires: z.array(z.string()).min(1, 'Au moins un équipement requis'),
      responsableMesure: z.string().min(1, 'Responsable de la mesure requis'),
      dateMiseEnPlace: z.string().min(1, 'Date de mise en place requise'),
      verification: z.boolean(),
    })
  ).min(1, 'Au moins un risque doit être identifié'),

  // Section 6: Équipements
  equipements: z.object({
    equipementsProtection: z.array(z.string()).min(1, 'Au moins un équipement de protection requis'),
    outilsTravail: z.array(z.string()).min(1, 'Au moins un outil de travail requis'),
    materielSecurite: z.array(z.string()).min(1, 'Au moins un matériel de sécurité requis'),
    equipementsUrgence: z.array(z.string()).min(1, 'Au moins un équipement d\'urgence requis'),
  }),

  // Section 7: Formation
  formation: z.object({
    personnelForme: z.boolean(),
    formationsRequises: z.array(z.string()).min(1, 'Au moins une formation requise'),
    certifications: z.array(z.string()).optional(),
    personnelHabilite: z.array(z.string()).min(1, 'Au moins une personne habilitée requise'),
  }),

  // Section 8: Procédures d'Urgence
  proceduresUrgence: z.object({
    planEvacuation: z.boolean(),
    numerosUrgence: z.array(z.string()).min(1, 'Au moins un numéro d\'urgence requis'),
    secouristePresent: z.boolean(),
    nomSecouriste: z.string().optional(),
    posteSecours: z.string().min(1, 'Poste de secours requis'),
    hopitalReference: z.string().min(1, 'Hôpital de référence requis'),
  }),

  // Section 9: Surveillance
  surveillance: z.object({
    controlesReguliers: z.boolean(),
    frequenceControles: z.string().min(1, 'Fréquence des contrôles requise'),
    responsableControle: z.string().min(1, 'Responsable du contrôle requis'),
    pointsControle: z.array(z.string()).min(1, 'Au moins un point de contrôle requis'),
  }),

  // Section 10: Attestations
  attestations: z.object({
    assuranceResponsabilite: z.boolean(),
    attestationFormation: z.boolean(),
    certificatHabilitation: z.boolean(),
    autres: z.array(z.string()).optional(),
  }),
});

type PlanPreventionForm = z.infer<typeof planPreventionSchema>;

export default function PreventionFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addPlanPrevention, updatePlanPrevention, getPlanPreventionById } = usePermitStore();
  const { user } = useAuthStore();
  const { success, error } = useToastStore();
  const { t } = useI18n();

  const isEdit = !!id;
  const existingPlan = id ? getPlanPreventionById(id) : null;

  const {
    register,
    handleSubmit,
    control,
    // watch, // Unused variable
    // setValue, // Unused variable
    formState: { errors, isSubmitting },
  } = useForm<PlanPreventionForm>({
    resolver: zodResolver(planPreventionSchema),
    defaultValues: existingPlan
      ? {
          // Section 1: Entreprise Prestataire
          entreprisePrestataire: existingPlan.entreprisePrestataire,
          representantPrestataire: existingPlan.representantPrestataire,
          contactPrestataire: existingPlan.contactPrestataire,
          emailPrestataire: existingPlan.emailPrestataire || '',
          adressePrestataire: existingPlan.adressePrestataire || '',
          
          // Section 2: Maître d'Ouvrage
          maitreOuvrage: existingPlan.maitreOuvrage || '',
          representantMaitreOuvrage: existingPlan.representantMaitreOuvrage || '',
          contactMaitreOuvrage: existingPlan.contactMaitreOuvrage || '',
          emailMaitreOuvrage: existingPlan.emailMaitreOuvrage || '',
          
          // Section 3: Localisation
          nomSite: existingPlan.nomSite,
          codeSite: existingPlan.codeSite,
          region: existingPlan.region,
          adresseSite: existingPlan.adresseSite || '',
          coordonneesGPS: existingPlan.coordonneesGPS || '',
          
          // Section 4: Description des Travaux
          natureIntervention: existingPlan.natureIntervention,
          descriptionTravaux: existingPlan.descriptionTravaux,
          nombreIntervenants: existingPlan.nombreIntervenants,
          dureeEstimee: existingPlan.dureeEstimee || 8,
          horairesTravail: existingPlan.horairesTravail || { debut: '08:00', fin: '17:00', pause: '12:00' },
          dateDebut: new Date(existingPlan.dateDebut).toISOString().split('T')[0],
          dateFin: new Date(existingPlan.dateFin).toISOString().split('T')[0],
          
          // Section 5: Risques
          risques: existingPlan.risques,
          
          // Section 6: Équipements
          equipements: existingPlan.equipements || {
            equipementsProtection: [''],
            outilsTravail: [''],
            materielSecurite: [''],
            equipementsUrgence: [''],
          },
          
          // Section 7: Formation
          formation: existingPlan.formation || {
            personnelForme: false,
            formationsRequises: [''],
            certifications: [],
            personnelHabilite: [''],
          },
          
          // Section 8: Procédures d'Urgence
          proceduresUrgence: existingPlan.proceduresUrgence || {
            planEvacuation: false,
            numerosUrgence: [''],
            secouristePresent: false,
            nomSecouriste: '',
            posteSecours: '',
            hopitalReference: '',
          },
          
          // Section 9: Surveillance
          surveillance: existingPlan.surveillance || {
            controlesReguliers: false,
            frequenceControles: '',
            responsableControle: '',
            pointsControle: [''],
          },
          
          // Section 10: Attestations
          attestations: existingPlan.attestations || {
            assuranceResponsabilite: false,
            attestationFormation: false,
            certificatHabilitation: false,
            autres: [],
          },
        }
      : {
          // Section 1: Entreprise Prestataire
          entreprisePrestataire: user?.entreprise || '',
          representantPrestataire: user?.prenom && user?.nom ? `${user.prenom} ${user.nom}` : '',
          contactPrestataire: user?.telephone || '',
          emailPrestataire: user?.email || '',
          adressePrestataire: '',
          
          // Section 2: Maître d'Ouvrage
          maitreOuvrage: '',
          representantMaitreOuvrage: '',
          contactMaitreOuvrage: '',
          emailMaitreOuvrage: '',
          
          // Section 3: Localisation
          nomSite: '',
          codeSite: '',
          region: '',
          adresseSite: '',
          coordonneesGPS: '',
          
          // Section 4: Description des Travaux
          natureIntervention: '',
          descriptionTravaux: '',
          nombreIntervenants: 1,
          dureeEstimee: 8,
          horairesTravail: { debut: '08:00', fin: '17:00', pause: '12:00' },
          dateDebut: '',
          dateFin: '',
          
          // Section 5: Risques
          risques: [
            {
              id: '1',
              categorie: '',
              description: '',
              niveauGravite: 'moyen',
              probabilite: 'moyenne',
              impact: 'moyen',
              mesuresPrevention: [''],
              equipementsNecessaires: [''],
              responsableMesure: '',
              dateMiseEnPlace: '',
              verification: false,
            },
          ],
          
          // Section 6: Équipements
          equipements: {
            equipementsProtection: [''],
            outilsTravail: [''],
            materielSecurite: [''],
            equipementsUrgence: [''],
          },
          
          // Section 7: Formation
          formation: {
            personnelForme: false,
            formationsRequises: [''],
            certifications: [],
            personnelHabilite: [''],
          },
          
          // Section 8: Procédures d'Urgence
          proceduresUrgence: {
            planEvacuation: false,
            numerosUrgence: [''],
            secouristePresent: false,
            nomSecouriste: '',
            posteSecours: '',
            hopitalReference: '',
          },
          
          // Section 9: Surveillance
          surveillance: {
            controlesReguliers: false,
            frequenceControles: '',
            responsableControle: '',
            pointsControle: [''],
          },
          
          // Section 10: Attestations
          attestations: {
            assuranceResponsabilite: false,
            attestationFormation: false,
            certificatHabilitation: false,
            autres: [],
          },
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'risques',
  });

  const onSubmit = async (data: PlanPreventionForm) => {
    try {
      const planData = {
        ...data,
        id: existingPlan?.id || Math.random().toString(36).substr(2, 9),
        reference: existingPlan?.reference || `PP-${Date.now()}`,
        dateCreation: existingPlan?.dateCreation || new Date(),
        dateDebut: new Date(data.dateDebut),
        dateFin: new Date(data.dateFin),
        status: 'brouillon' as const,
        documents: existingPlan?.documents || [],
        creerPar: user?.email || '',
        modifiePar: isEdit ? user?.email : undefined,
        createdAt: existingPlan?.createdAt || new Date(),
        updatedAt: new Date(),
        risques: data.risques.map((r) => ({
          ...r,
          id: r.id || Math.random().toString(36).substr(2, 9),
        })),
        validation: existingPlan?.validation || {},
        suivi: existingPlan?.suivi || {},
      };

      if (isEdit && id) {
        updatePlanPrevention(id, planData);
        success('Plan de prévention mis à jour avec succès');
      } else {
        addPlanPrevention(planData);
        success('Plan de prévention créé et soumis pour validation');
      }

      navigate('/prevention');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      error('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const graviteOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'eleve', label: 'Élevé' },
    { value: 'critique', label: 'Critique' },
  ];

  const probabiliteOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'elevee', label: 'Élevée' },
  ];

  const impactOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'eleve', label: 'Élevé' },
    { value: 'critique', label: 'Critique' },
  ];

  const regionOptions = [
    { value: 'Analamanga', label: 'Analamanga' },
    { value: 'Vakinankaratra', label: 'Vakinankaratra' },
    { value: 'Itasy', label: 'Itasy' },
    { value: 'Bongolava', label: 'Bongolava' },
    { value: 'Haute Matsiatra', label: 'Haute Matsiatra' },
    { value: 'Amoron\'i Mania', label: 'Amoron\'i Mania' },
    { value: 'Vatovavy-Fitovinany', label: 'Vatovavy-Fitovinany' },
    { value: 'Ihorombe', label: 'Ihorombe' },
    { value: 'Atsimo-Atsinanana', label: 'Atsimo-Atsinanana' },
    { value: 'Atsinanana', label: 'Atsinanana' },
    { value: 'Analanjirofo', label: 'Analanjirofo' },
    { value: 'Alaotra-Mangoro', label: 'Alaotra-Mangoro' },
    { value: 'Boeny', label: 'Boeny' },
    { value: 'Sofia', label: 'Sofia' },
    { value: 'Betsiboka', label: 'Betsiboka' },
    { value: 'Melaky', label: 'Melaky' },
    { value: 'Atsimo-Andrefana', label: 'Atsimo-Andrefana' },
    { value: 'Androy', label: 'Androy' },
    { value: 'Anosy', label: 'Anosy' },
    { value: 'Menabe', label: 'Menabe' },
    { value: 'Diana', label: 'Diana' },
    { value: 'Sava', label: 'Sava' },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/prevention')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Modifier le plan de prévention' : 'Créer un plan de prévention'}
          </h2>
          <p className="mt-1 text-gray-600">
            Plan de prévention des risques HSSES - SGI-PPHSSES-TOA-601
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: Informations Entreprise Prestataire */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">1. Informations Entreprise Prestataire</CardTitle>
            <CardDescription>Coordonnées de l'entreprise réalisant l'intervention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Entreprise Prestataire *"
                {...register('entreprisePrestataire')}
                error={errors.entreprisePrestataire?.message}
                placeholder="Nom de l'entreprise"
              />
              <Input
                label="Représentant *"
                {...register('representantPrestataire')}
                error={errors.representantPrestataire?.message}
                placeholder="Nom du représentant"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Contact *"
                {...register('contactPrestataire')}
                error={errors.contactPrestataire?.message}
                placeholder="+261 34 00 000 00"
              />
              <Input
                label="Email"
                type="email"
                {...register('emailPrestataire')}
                error={errors.emailPrestataire?.message}
                placeholder="contact@entreprise.mg"
              />
            </div>
            <Input
              label="Adresse"
              {...register('adressePrestataire')}
              error={errors.adressePrestataire?.message}
              placeholder="Adresse complète de l'entreprise"
            />
          </CardContent>
        </Card>

        {/* Section 2: Informations Maître d'Ouvrage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">2. Informations Maître d'Ouvrage</CardTitle>
            <CardDescription>Coordonnées du maître d'ouvrage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Maître d'Ouvrage *"
                {...register('maitreOuvrage')}
                error={errors.maitreOuvrage?.message}
                placeholder="Nom du maître d'ouvrage"
              />
              <Input
                label="Représentant *"
                {...register('representantMaitreOuvrage')}
                error={errors.representantMaitreOuvrage?.message}
                placeholder="Nom du représentant"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Contact *"
                {...register('contactMaitreOuvrage')}
                error={errors.contactMaitreOuvrage?.message}
                placeholder="+261 34 00 000 00"
              />
              <Input
                label="Email"
                type="email"
                {...register('emailMaitreOuvrage')}
                error={errors.emailMaitreOuvrage?.message}
                placeholder="contact@maitreouvrage.mg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Localisation de l'Intervention */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">3. Localisation de l'Intervention</CardTitle>
            <CardDescription>Informations sur le site d'intervention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom du Site *"
                {...register('nomSite')}
                error={errors.nomSite?.message}
                placeholder="Ex: Antananarivo Centre"
              />
              <Input
                label="Code Site *"
                {...register('codeSite')}
                error={errors.codeSite?.message}
                placeholder="Ex: ANT-001"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Région *"
                {...register('region')}
                error={errors.region?.message}
                options={regionOptions}
                placeholder="Sélectionner une région"
              />
              <Input
                label="Coordonnées GPS"
                {...register('coordonneesGPS')}
                error={errors.coordonneesGPS?.message}
                placeholder="Ex: -18.8792, 47.5079"
              />
            </div>
            <Input
              label="Adresse du Site *"
              {...register('adresseSite')}
              error={errors.adresseSite?.message}
              placeholder="Adresse complète du site d'intervention"
            />
          </CardContent>
        </Card>

        {/* Section 4: Description des Travaux */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">4. Description des Travaux</CardTitle>
            <CardDescription>Détails de l'intervention prévue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Nature de l'Intervention *"
              {...register('natureIntervention')}
              error={errors.natureIntervention?.message}
              placeholder="Ex: Maintenance préventive, Installation, Réparation"
            />
            <Textarea
              label="Description Détaillée des Travaux *"
              {...register('descriptionTravaux')}
              error={errors.descriptionTravaux?.message}
              placeholder="Décrivez précisément les travaux à réaliser..."
              rows={4}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre d'Intervenants *"
                type="number"
                {...register('nombreIntervenants', { valueAsNumber: true })}
                error={errors.nombreIntervenants?.message}
                min={1}
              />
              <Input
                label="Durée Estimée (heures) *"
                type="number"
                {...register('dureeEstimee', { valueAsNumber: true })}
                error={errors.dureeEstimee?.message}
                min={1}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Heure de Début *"
                type="time"
                {...register('horairesTravail.debut')}
                error={errors.horairesTravail?.debut?.message}
              />
              <Input
                label="Heure de Fin *"
                type="time"
                {...register('horairesTravail.fin')}
                error={errors.horairesTravail?.fin?.message}
              />
              <Input
                label="Heure de Pause *"
                type="time"
                {...register('horairesTravail.pause')}
                error={errors.horairesTravail?.pause?.message}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Date de Début *"
                type="date"
                {...register('dateDebut')}
                error={errors.dateDebut?.message}
              />
              <Input
                label="Date de Fin *"
                type="date"
                {...register('dateFin')}
                error={errors.dateFin?.message}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Risques Identifiés et Mesures de Prévention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              5. Risques Identifiés et Mesures de Prévention
            </CardTitle>
            <CardDescription>
              Identifier tous les risques potentiels et les mesures de prévention associées
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border-2 border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">Risque #{index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Catégorie de Risque *"
                    {...register(`risques.${index}.categorie`)}
                    error={errors.risques?.[index]?.categorie?.message}
                    placeholder="Ex: Travail en hauteur, Électrique"
                  />
                  <Select
                    label="Niveau de Gravité *"
                    {...register(`risques.${index}.niveauGravite`)}
                    error={errors.risques?.[index]?.niveauGravite?.message}
                    options={graviteOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Probabilité *"
                    {...register(`risques.${index}.probabilite`)}
                    error={errors.risques?.[index]?.probabilite?.message}
                    options={probabiliteOptions}
                  />
                  <Select
                    label="Impact *"
                    {...register(`risques.${index}.impact`)}
                    error={errors.risques?.[index]?.impact?.message}
                    options={impactOptions}
                  />
                </div>

                <Textarea
                  label="Description du Risque *"
                  {...register(`risques.${index}.description`)}
                  error={errors.risques?.[index]?.description?.message}
                  placeholder="Décrivez le risque identifié..."
                  rows={2}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesures de Prévention *
                    </label>
                    <Textarea
                      {...register(`risques.${index}.mesuresPrevention.0`)}
                      placeholder="Listez les mesures de prévention (une par ligne)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Équipements Nécessaires *
                    </label>
                    <Textarea
                      {...register(`risques.${index}.equipementsNecessaires.0`)}
                      placeholder="Listez les équipements de sécurité requis (un par ligne)"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Responsable de la Mesure *"
                    {...register(`risques.${index}.responsableMesure`)}
                    error={errors.risques?.[index]?.responsableMesure?.message}
                    placeholder="Nom du responsable"
                  />
                  <Input
                    label="Date de Mise en Place *"
                    type="date"
                    {...register(`risques.${index}.dateMiseEnPlace`)}
                    error={errors.risques?.[index]?.dateMiseEnPlace?.message}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`risques.${index}.verification`)}
                      className="rounded border-gray-300"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Vérification effectuée
                    </label>
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  id: '',
                  categorie: '',
                  description: '',
                  niveauGravite: 'moyen',
                  probabilite: 'moyenne',
                  impact: 'moyen',
                  mesuresPrevention: [''],
                  equipementsNecessaires: [''],
                  responsableMesure: '',
                  dateMiseEnPlace: '',
                  verification: false,
                })
              }
              className="w-full"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un risque
            </Button>

            {errors.risques && typeof errors.risques.message === 'string' && (
              <p className="text-sm text-red-600">{errors.risques.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Section 6: Équipements et Matériels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">6. Équipements et Matériels</CardTitle>
            <CardDescription>Liste des équipements nécessaires pour l'intervention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements de Protection *
                </label>
                <Textarea
                  {...register('equipements.equipementsProtection.0')}
                  placeholder="Casques, gants, chaussures de sécurité..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outils de Travail *
                </label>
                <Textarea
                  {...register('equipements.outilsTravail.0')}
                  placeholder="Outils spécifiques nécessaires..."
                  rows={3}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matériel de Sécurité *
                </label>
                <Textarea
                  {...register('equipements.materielSecurite.0')}
                  placeholder="Extincteurs, balisage, signalisation..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements d'Urgence *
                </label>
                <Textarea
                  {...register('equipements.equipementsUrgence.0')}
                  placeholder="Trousse de secours, radio, téléphone..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Formation et Compétences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">7. Formation et Compétences</CardTitle>
            <CardDescription>Formation et habilitations du personnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('formation.personnelForme')}
                className="rounded border-gray-300"
              />
              <label className="text-sm font-medium text-gray-700">
                Le personnel est formé aux risques spécifiques
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formations Requises *
                </label>
                <Textarea
                  {...register('formation.formationsRequises.0')}
                  placeholder="SST, Habilitation électrique, Travail en hauteur..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personnel Habilité *
                </label>
                <Textarea
                  {...register('formation.personnelHabilite.0')}
                  placeholder="Noms des personnes habilitées..."
                  rows={3}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certifications
              </label>
              <Textarea
                {...register('formation.certifications.0')}
                placeholder="Certifications spécifiques requises..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Procédures d'Urgence */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">8. Procédures d'Urgence</CardTitle>
            <CardDescription>Plan d'urgence et contacts de secours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('proceduresUrgence.planEvacuation')}
                className="rounded border-gray-300"
              />
              <label className="text-sm font-medium text-gray-700">
                Plan d'évacuation disponible et connu du personnel
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéros d'Urgence *
                </label>
                <Textarea
                  {...register('proceduresUrgence.numerosUrgence.0')}
                  placeholder="Pompiers: 18, SAMU: 15, Police: 17..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste de Secours *
                </label>
                <Input
                  {...register('proceduresUrgence.posteSecours')}
                  error={errors.proceduresUrgence?.posteSecours?.message}
                  placeholder="Localisation du poste de secours"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hôpital de Référence *
                </label>
                <Input
                  {...register('proceduresUrgence.hopitalReference')}
                  error={errors.proceduresUrgence?.hopitalReference?.message}
                  placeholder="Nom et adresse de l'hôpital"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    {...register('proceduresUrgence.secouristePresent')}
                    className="rounded border-gray-300"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Secouriste présent sur le site
                  </label>
                </div>
                <Input
                  label="Nom du Secouriste"
                  {...register('proceduresUrgence.nomSecouriste')}
                  error={errors.proceduresUrgence?.nomSecouriste?.message}
                  placeholder="Nom du secouriste (si applicable)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 9: Surveillance et Contrôle */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">9. Surveillance et Contrôle</CardTitle>
            <CardDescription>Contrôles et surveillance pendant l'intervention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('surveillance.controlesReguliers')}
                className="rounded border-gray-300"
              />
              <label className="text-sm font-medium text-gray-700">
                Contrôles réguliers prévus
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fréquence des Contrôles *"
                {...register('surveillance.frequenceControles')}
                error={errors.surveillance?.frequenceControles?.message}
                placeholder="Ex: Toutes les 2 heures"
              />
              <Input
                label="Responsable du Contrôle *"
                {...register('surveillance.responsableControle')}
                error={errors.surveillance?.responsableControle?.message}
                placeholder="Nom du responsable"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points de Contrôle *
              </label>
              <Textarea
                {...register('surveillance.pointsControle.0')}
                placeholder="Liste des points à contrôler..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 10: Documents et Attestations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">10. Documents et Attestations</CardTitle>
            <CardDescription>Documents requis et attestations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('attestations.assuranceResponsabilite')}
                  className="rounded border-gray-300"
                />
                <label className="text-sm font-medium text-gray-700">
                  Assurance responsabilité civile
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('attestations.attestationFormation')}
                  className="rounded border-gray-300"
                />
                <label className="text-sm font-medium text-gray-700">
                  Attestation de formation
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('attestations.certificatHabilitation')}
                  className="rounded border-gray-300"
                />
                <label className="text-sm font-medium text-gray-700">
                  Certificat d'habilitation
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autres Documents
              </label>
              <Textarea
                {...register('attestations.autres.0')}
                placeholder="Autres documents requis..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" loading={isSubmitting} className="flex-1">
            <Save className="h-5 w-5 mr-2" />
            {isEdit ? 'Mettre à jour' : 'Enregistrer le brouillon'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/prevention')}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
