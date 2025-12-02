import { useNavigate, useParams } from 'react-router-dom';
import { useToastStore } from '@/store/toastStore';
import { usePreventionStore } from '@/store/preventionStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import PreventionMultiStepForm from '@/components/forms/PreventionMultiStepForm';
import { generateReference } from '@/lib/utils';
import type { PlanPrevention } from '@/types/prevention';

export default function PreventionFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { addPlanPrevention, updatePlanPrevention, getPlanPreventionById } = usePreventionStore();
  const { user } = useAuthStore();
  
  const isEditing = Boolean(id);

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
      navigate('/prevention');
    }
  };

  // Fonction pour soumettre le plan
  const submitPreventionPlan = async (data: any) => {
    try {
      console.log('Submitting prevention plan:', data);
      
      const now = new Date();
      const userEmail = user?.email || '';
      
      if (isEditing && id) {
        const existingPlan = getPlanPreventionById(id);
        if (existingPlan) {
          updatePlanPrevention(id, {
            ...data,
            modifiePar: userEmail,
            updatedAt: now,
          } as Partial<PlanPrevention>);
        }
      } else {
        const newPlan: PlanPrevention = {
          id: `plan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          reference: generateReference('PP', now),
          revision: String(now.getFullYear()),
          dateCreation: now,
          dateDebut: data.dateDebut ? new Date(data.dateDebut) : now,
          dateFin: data.dateFin ? new Date(data.dateFin) : now,
          status: 'brouillon',
          projetActivite: data.nomProjet || '',
          nomSite: data.sites && data.sites.length > 0 ? data.sites[0].nomSite : '',
          codeSite: data.sites && data.sites.length > 0 ? data.sites[0].codeSite : '',
          entreprisePrestataire: data.entreprisePrestataire || '',
          numeroRCS: data.siret || '',
          siegeSocial: '',
          representantPrestataire: data.representantPrestataire || '',
          qualiteFonctionRepresentant: data.fonctionPrestataire || '',
          contactPrestataire: '',
          emailPrestataire: '',
          localite: '',
          fokontany: '',
          commune: '',
          district: '',
          region: '',
          coordonneesGPS: '',
          situationGeographique: 'en_ville',
          dateSignature: now,
          signatureDonneurOrdre: {
            nomPrenom: '',
            fonction: '',
            signature: '',
          },
          signaturePrestataire: {
            nomSociete: data.entreprisePrestataire || '',
            nomPrenom: data.representantPrestataire || '',
            fonction: data.fonctionPrestataire || '',
            signature: '',
          },
          risquesActivites: {
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
            infrastructures: { actif: false, risqueAccesSite: false, risqueEtatInfrastructures: false, autresRooftop: '' },
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
            evidences: [],
          },
          installations: [],
          materielsEquipements: [],
          documentsHSSES: [],
          natureIntervention: data.nomProjet || '',
          descriptionTravaux: '',
          nombreIntervenants: 1,
          dureeEstimee: 8,
          horairesTravail: { debut: '08:00', fin: '17:00', pause: '12:00-13:00' },
          risques: (data.risquesIdentifies || []).map((r: any, idx: number) => ({
            id: r.id || `risque-${idx}`,
            categorie: r.categorie || 'Autre',
            description: r.risque || '',
            niveauGravite: r.niveau === 'faible' ? 'faible' : r.niveau === 'modere' ? 'moyen' : r.niveau === 'eleve' ? 'eleve' : 'faible',
            probabilite: r.probabilite === 'rare' ? 'faible' : r.probabilite === 'peu_probable' ? 'moyenne' : 'elevee',
            impact: 'moyen',
            mesuresPrevention: [r.mesures || ''],
            equipementsNecessaires: [],
            responsableMesure: '',
            dateMiseEnPlace: '',
            verification: false,
          })),
          equipements: {
            equipementsProtection: [],
            outilsTravail: [],
            materielSecurite: [],
            equipementsUrgence: [],
          },
          formation: {
            personnelForme: false,
            formationsRequises: [],
            certifications: [],
            personnelHabilite: [],
          },
          proceduresUrgence: {
            planEvacuation: false,
            numerosUrgence: [],
            secouristePresent: false,
            posteSecours: '',
            hopitalReference: '',
          },
          surveillance: {
            controlesReguliers: false,
            frequenceControles: '',
            responsableControle: '',
            pointsControle: [],
          },
          documents: [],
          attestations: {
            assuranceResponsabilite: false,
            attestationFormation: false,
            certificatHabilitation: false,
            autres: data.documentsFournis || [],
          },
          suivi: {
            incidents: [],
            observations: [],
            ameliorations: [],
          },
          creerPar: userEmail,
          createdAt: now,
          updatedAt: now,
        };
        
        addPlanPrevention(newPlan);
      }
      
      addToast(
        isEditing 
          ? 'Plan de prévention mis à jour avec succès'
          : 'Plan de prévention créé avec succès',
        'success'
      );
      
      navigate('/interventions');
    } catch (error) {
      console.error('Error submitting prevention plan:', error);
      addToast('Une erreur est survenue lors de la soumission du formulaire', 'error');
    }
  };

  // Fonction pour accepter les données directement (depuis PreventionMultiStepForm)
  const onSubmit = async (data: any) => {
    // Pas de validation, on sauvegarde directement
    await submitPreventionPlan(data);
  };

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit={onSubmit as unknown as (data: any) => void} 
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
};
