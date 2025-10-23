import { useNavigate, useParams } from 'react-router-dom';
import { useToastStore } from '@/store/toastStore';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import PreventionMultiStepForm from '@/components/forms/PreventionMultiStepForm';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

// Define the schema for the form
const preventionPlanSchema = z.object({
  // Step 1: Entreprise Prestataire
  entreprisePrestataire: z.string().min(1, 'Entreprise requise'),
  siret: z.string().min(14, 'SIRET invalide').max(14, 'SIRET invalide'),
  representantPrestataire: z.string().min(1, 'Représentant requis'),
  fonctionPrestataire: z.string().min(1, 'Fonction requise'),
  
  // Step 2: Maître d'Ouvrage
  maitreOuvrage: z.string().min(1, 'Maître d\'ouvrage requis'),
  representantMaitreOuvrage: z.string().min(1, 'Représentant requis'),
  contactMaitreOuvrage: z.string().min(1, 'Contact requis'),
  emailMaitreOuvrage: z.string().email('Email invalide').or(z.literal('')),
  
  // Step 3: Localisation
  nomSite: z.string().min(1, 'Nom du site requis'),
  adresseSite: z.string().min(1, 'Adresse requise'),
  codePostal: z.string().regex(/^[0-9]{5}$/, 'Code postal invalide'),
  ville: z.string().min(1, 'Ville requise'),
  coordonneesGPS: z.string().optional(),
  
  // Step 4: Description des Travaux
  natureIntervention: z.string().min(1, 'Nature requise'),
  descriptionTravaux: z.string().min(10, 'Description trop courte (min 10 caractères)'),
  nombreIntervenants: z.number().min(1, 'Minimum 1 intervenant'),
  dureeEstimee: z.number().min(1, 'Durée estimée requise'),
  
  // Step 5: Planning
  dateDebut: z.string().min(1, 'Date de début requise'),
  dateFin: z.string().min(1, 'Date de fin requise'),
  horairesTravail: z.object({
    debut: z.string().min(1, 'Heure de début requise'),
    fin: z.string().min(1, 'Heure de fin requise'),
    pause: z.string().min(1, 'Heure de pause requise'),
  }),
  
  // Step 6: Risques Identifiés
  risquesIdentifies: z.array(z.object({
    risque: z.string().min(1, 'Description du risque requise'),
    niveau: z.enum(['faible', 'moyen', 'élevé']),
    mesures: z.string().min(1, 'Mesures préventives requises'),
  })).min(1, 'Au moins un risque doit être identifié'),
  
  // Step 7: Équipements de Sécurité
  equipementsSecurite: z.array(z.object({
    type: z.string().min(1, 'Type d\'équipement requis'),
    quantite: z.number().min(1, 'Quantité requise'),
    conforme: z.boolean(),
  })).min(1, 'Au moins un équipement doit être spécifié'),
  
  // Step 8: Consignes de Sécurité
  consignesSecurite: z.string().min(10, 'Les consignes de sécurité sont requises'),
  consignesUrgence: z.string().min(10, 'Les consignes d\'urgence sont requises'),
  contactsUrgence: z.string().min(1, 'Les contacts d\'urgence sont requis'),
  
  // Step 9: Formation Sécurité
  formationSecurite: z.boolean(),
  dateFormation: z.string().optional(),
  nomFormateur: z.string().optional(),
  commentaires: z.string().optional(),
  
  // Step 10: Documents et Validation
  documentsFournis: z.array(z.string()).min(1, 'Au moins un document doit être fourni'),
  accordResponsable: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions',
  }),

  // Step 8: Procédures d'Urgence
  proceduresUrgence: z.object({
    planEvacuation: z.boolean(),
    numerosUrgence: z.array(z.string()).min(1, 'Au moins un numéro d\'urgence requis'),
    secouristePresent: z.boolean(),
    nomSecouriste: z.string().optional(),
    posteSecours: z.string().min(1, 'Poste de secours requis'),
    hopitalReference: z.string().min(1, 'Hôpital de référence requis'),
  }),

  // Step 9: Surveillance
  surveillance: z.object({
    controlesReguliers: z.boolean(),
    frequenceControles: z.string().min(1, 'Fréquence des contrôles requise'),
    responsableControle: z.string().min(1, 'Responsable du contrôle requis'),
    pointsControle: z.array(z.string()).min(1, 'Au moins un point de contrôle requis'),
  }),

  // Step 10: Attestations
  attestations: z.object({
    assuranceResponsabilite: z.boolean(),
    attestationFormation: z.boolean(),
    certificatHabilitation: z.boolean(),
    autres: z.array(z.string()).optional(),
  })
});

// Define the form type from the schema
type PreventionPlan = z.infer<typeof preventionPlanSchema>;

export default function PreventionFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { t } = useI18n();
  
  const isEditing = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PreventionPlan>({
    resolver: zodResolver(preventionPlanSchema),
    defaultValues: {
      // Default values will be set by the multi-step form
      entreprisePrestataire: '',
      siret: '',
      representantPrestataire: '',
      fonctionPrestataire: '',
      maitreOuvrage: '',
      representantMaitreOuvrage: '',
      contactMaitreOuvrage: '',
      emailMaitreOuvrage: '',
      nomSite: '',
      adresseSite: '',
      codePostal: '',
      ville: '',
      coordonneesGPS: '',
      natureIntervention: '',
      descriptionTravaux: '',
      nombreIntervenants: 1,
      dureeEstimee: 8,
      horairesTravail: { debut: '08:00', fin: '17:00', pause: '12:00' },
      dateDebut: '',
      dateFin: '',
      risquesIdentifies: [
        {
          risque: '',
          niveau: 'faible',
          mesures: '',
        },
      ],
      equipementsSecurite: [
        {
          type: '',
          quantite: 1,
          conforme: true,
        },
      ],
      consignesSecurite: '',
      consignesUrgence: '',
      contactsUrgence: '',
      formationSecurite: false,
      dateFormation: '',
      nomFormateur: '',
      commentaires: '',
      documentsFournis: [],
      accordResponsable: false,
    }
  });

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
      navigate('/prevention');
    }
  };

  const onSubmit = form.handleSubmit(async (data: PreventionPlan) => {
    try {
      setIsSubmitting(true);
      console.log('Submitting prevention plan:', data);
      
      // Here you would typically send the data to your API
      // const response = isEditing && id 
      //   ? await updatePlanPrevention(id, data)
      //   : await createPlanPrevention(data);
      
      addToast({
        type: 'success',
        message: isEditing 
          ? 'Plan de prévention mis à jour avec succès'
          : 'Plan de prévention créé avec succès',
      });
      
      navigate('/prevention');
    } catch (error) {
      console.error('Error submitting prevention plan:', error);
      addToast({
        type: 'error',
        message: 'Une erreur est survenue lors de la soumission du formulaire',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Modifier le plan de prévention' : 'Créer un plan de prévention'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire de plan de prévention</CardTitle>
          <p className="text-sm text-gray-500">
            Remplissez le formulaire en plusieurs étapes pour créer un nouveau plan de prévention
          </p>
        </CardHeader>
        <CardContent>
          <PreventionMultiStepForm 
            form={form}
            onSubmit={onSubmit} 
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            steps={[
              { label: 'Entreprise' },
              { label: 'Maître d\'Ouvrage' },
              { label: 'Localisation' },
              { label: 'Description des Travaux' },
              { label: 'Planning' },
              { label: 'Risques Identifiés' },
              { label: 'Équipements de Sécurité' },
              { label: 'Consignes de Sécurité' },
              { label: 'Formation et Compétences' },
              { label: 'Documents et Validation' },
              { label: 'Confirmation' }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};
