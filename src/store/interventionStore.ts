import { create } from 'zustand';
import type {
  Intervention,
  InterventionStatus,
  ValidationInterventionJournaliere,
  Take5Record,
  DocumentProgres,
  Incident,
} from '@/types';

interface InterventionStore {
  interventions: Intervention[];
  selectedIntervention: Intervention | null;

  // Actions
  setInterventions: (interventions: Intervention[]) => void;
  addIntervention: (intervention: Intervention) => void;
  updateIntervention: (id: string, intervention: Partial<Intervention>) => void;
  deleteIntervention: (id: string) => void;
  setSelectedIntervention: (intervention: Intervention | null) => void;

  // Validation journalière
  addValidationJournaliere: (
    interventionId: string,
    validation: ValidationInterventionJournaliere
  ) => void;
  updateValidationJournaliere: (
    interventionId: string,
    validationId: string,
    validation: Partial<ValidationInterventionJournaliere>
  ) => void;

  // Take 5
  addTake5Record: (interventionId: string, take5: Take5Record) => void;
  updateTake5Record: (interventionId: string, take5Id: string, take5: Partial<Take5Record>) => void;

  // Documents
  addDocumentProgres: (interventionId: string, document: DocumentProgres) => void;

  // Incidents
  addIncident: (interventionId: string, incident: Incident) => void;
  updateIncident: (interventionId: string, incidentId: string, incident: Partial<Incident>) => void;

  // Statut
  updateInterventionStatus: (id: string, status: InterventionStatus) => void;

  // Clôture
  cloturerIntervention: (
    id: string,
    cloturePar: string,
    commentaires: string,
    dateClotureFormelle: Date
  ) => void;

  // Helpers
  getInterventionById: (id: string) => Intervention | undefined;
  getInterventionsByStatus: (status: InterventionStatus) => Intervention[];
  getInterventionsByPrestataire: (prestataire: string) => Intervention[];
  getInterventionsActives: () => Intervention[];
  getInterventionsByPermis: (permisId: string) => Intervention[];
}

export const useInterventionStore = create<InterventionStore>((set, get) => ({
  interventions: [],
  selectedIntervention: null,

  setInterventions: (interventions) => set({ interventions }),

  addIntervention: (intervention) =>
    set((state) => ({
      interventions: [...state.interventions, intervention],
    })),

  updateIntervention: (id, updatedIntervention) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === id
          ? { ...intervention, ...updatedIntervention, updatedAt: new Date() }
          : intervention
      ),
    })),

  deleteIntervention: (id) =>
    set((state) => ({
      interventions: state.interventions.filter((intervention) => intervention.id !== id),
    })),

  setSelectedIntervention: (intervention) => set({ selectedIntervention: intervention }),

  addValidationJournaliere: (interventionId, validation) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              validationsJournalieres: [...intervention.validationsJournalieres, validation],
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  updateValidationJournaliere: (interventionId, validationId, updatedValidation) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              validationsJournalieres: intervention.validationsJournalieres.map((v) =>
                v.id === validationId ? { ...v, ...updatedValidation } : v
              ),
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  addTake5Record: (interventionId, take5) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              take5Records: [...intervention.take5Records, take5],
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  updateTake5Record: (interventionId, take5Id, updatedTake5) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              take5Records: intervention.take5Records.map((t) =>
                t.id === take5Id ? { ...t, ...updatedTake5, updatedAt: new Date() } : t
              ),
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  addDocumentProgres: (interventionId, document) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              documentsProgres: [...intervention.documentsProgres, document],
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  addIncident: (interventionId, incident) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              incidents: [...(intervention.incidents || []), incident],
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  updateIncident: (interventionId, incidentId, updatedIncident) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === interventionId
          ? {
              ...intervention,
              incidents: (intervention.incidents || []).map((inc) =>
                inc.id === incidentId ? { ...inc, ...updatedIncident } : inc
              ),
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  updateInterventionStatus: (id, status) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === id
          ? {
              ...intervention,
              status,
              ...(status === 'en_cours' && !intervention.dateDebutReel
                ? { dateDebutReel: new Date() }
                : {}),
              ...(status === 'terminee' && !intervention.dateFinReelle
                ? { dateFinReelle: new Date() }
                : {}),
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  cloturerIntervention: (id, cloturePar, commentaires, dateClotureFormelle) =>
    set((state) => ({
      interventions: state.interventions.map((intervention) =>
        intervention.id === id
          ? {
              ...intervention,
              status: 'terminee',
              cloturePar,
              commentairesCloture: commentaires,
              dateClotureFormelle,
              dateFinReelle: intervention.dateFinReelle || new Date(),
              updatedAt: new Date(),
            }
          : intervention
      ),
    })),

  // Helpers
  getInterventionById: (id) => {
    return get().interventions.find((intervention) => intervention.id === id);
  },

  getInterventionsByStatus: (status) => {
    return get().interventions.filter((intervention) => intervention.status === status);
  },

  getInterventionsByPrestataire: (prestataire) => {
    return get().interventions.filter((intervention) => intervention.prestataire === prestataire);
  },

  getInterventionsActives: () => {
    return get().interventions.filter(
      (intervention) =>
        intervention.status === 'en_cours' ||
        intervention.status === 'planifiee' ||
        intervention.status === 'suspendue'
    );
  },

  getInterventionsByPermis: (permisId) => {
    return get().interventions.filter((intervention) => intervention.permisId === permisId);
  },
}));

// Mock data pour le développement
const mockInterventions: Intervention[] = [
  {
    id: '1',
    reference: 'INT-2025-001',
    permisId: 'PERM-001',
    permisReference: 'TOA-PERM-2025-001',
    planPreventionId: 'PREV-001',
    prestataire: 'Entreprise ABC',
    nomSite: 'Site Antananarivo Centre',
    codeSite: 'ANA-001',
    region: 'Analamanga',
    description: 'Installation et configuration de nouveaux équipements de télécommunication',
    typeIntervention: 'Installation équipements',
    dateDebut: new Date('2025-10-20'),
    dateFin: new Date('2025-10-27'),
    dateDebutReel: new Date('2025-10-20T08:00:00'),
    status: 'en_cours',
    nombreIntervenants: 5,
    responsableChantier: 'Jean Rakoto',
    responsableContact: '+261 34 12 345 67',
    validationsJournalieres: [
      {
        id: 'VAL-001',
        date: new Date('2025-10-20'),
        heureDebut: '08:00',
        heureFin: '17:00',
        nombrePersonnes: 5,
        listePersonnel: [
          'Jean Rakoto',
          'Marie Randria',
          'Paul Razafy',
          'Sophie Andriana',
          'David Rabe',
        ],
        conditionsMeteo: 'Ensoleillé',
        temperatureC: 28,
        vitesseVentKmh: 12,
        verificationsSecurite: {
          epiVerifies: true,
          outillageVerifie: true,
          zoneSecurisee: true,
          consignesRappelees: true,
          planSauvetageRevu: true,
        },
        activitesRealisees:
          'Préparation du site, installation des supports, début du montage des équipements',
        avancementPourcentage: 25,
        take5Effectue: true,
        take5Id: 'T5-001',
        incidents: false,
        observationsJour: 'Journée productive, aucun incident',
        photosAvancement: [],
        documents: [],
        validee: true,
        dateValidation: new Date('2025-10-20T18:00:00'),
      },
    ],
    take5Records: [
      {
        id: 'T5-001',
        interventionId: '1',
        date: new Date('2025-10-20'),
        heure: '07:45',
        responsableNom: 'Jean Rakoto',
        equipe: ['Jean Rakoto', 'Marie Randria', 'Paul Razafy', 'Sophie Andriana', 'David Rabe'],
        localisation: 'Site ANA-001 - Zone pylône',
        tacheDescription: 'Installation équipements télécommunication en hauteur',
        etape1_arreter: {
          complete: true,
          observations: 'Pause effectuée avant de commencer',
        },
        etape2_observer: {
          complete: true,
          dangersIdentifies: [
            'Travail en hauteur',
            'Risque électrique',
            'Chute d\'objets',
            'Conditions météo',
          ],
          autresDangers: 'Présence de lignes électriques à proximité',
        },
        etape3_analyser: {
          complete: true,
          risquesEvalues: [
            {
              danger: 'Travail en hauteur (> 8m)',
              niveauRisque: 'eleve',
              probabilite: 'moyenne',
              gravite: 'critique',
            },
            {
              danger: 'Risque électrique',
              niveauRisque: 'eleve',
              probabilite: 'faible',
              gravite: 'critique',
            },
            {
              danger: 'Chute d\'objets',
              niveauRisque: 'moyen',
              probabilite: 'moyenne',
              gravite: 'moderee',
            },
          ],
        },
        etape4_controler: {
          complete: true,
          mesuresControle: [
            {
              type: 'epi',
              description: 'Port de harnais, casque, chaussures de sécurité',
              miseEnPlace: true,
              responsable: 'Jean Rakoto',
            },
            {
              type: 'controle_ingenierie',
              description: 'Vérification ligne de vie et points d\'ancrage',
              miseEnPlace: true,
              responsable: 'Marie Randria',
            },
            {
              type: 'controle_administratif',
              description: 'Balisage de la zone, signalisation',
              miseEnPlace: true,
              responsable: 'Paul Razafy',
            },
          ],
        },
        etape5_proceder: {
          complete: true,
          securiteConfirmee: true,
          autorisationProceder: true,
        },
        transmisHSE: true,
        dateTransmission: new Date('2025-10-20T08:00:00'),
        createdAt: new Date('2025-10-20T07:45:00'),
        updatedAt: new Date('2025-10-20T07:55:00'),
      },
    ],
    documentsProgres: [],
    zoneEnclavee: false,
    modeHorsLigne: false,
    incidents: [],
    observations: ['Début d\'intervention dans de bonnes conditions'],
    creerPar: 'jean.rakoto@abc.mg',
    createdAt: new Date('2025-10-19'),
    updatedAt: new Date('2025-10-20'),
  },
  {
    id: '2',
    reference: 'INT-2025-002',
    permisId: 'PERM-002',
    permisReference: 'TOA-PERM-2025-002',
    planPreventionId: 'PREV-002',
    prestataire: 'Entreprise XYZ',
    nomSite: 'Site Mahajanga Nord',
    codeSite: 'MAJ-015',
    region: 'Boeny',
    description: 'Maintenance préventive et remplacement de composants',
    typeIntervention: 'Maintenance préventive',
    dateDebut: new Date('2025-10-22'),
    dateFin: new Date('2025-10-24'),
    status: 'planifiee',
    nombreIntervenants: 3,
    responsableChantier: 'Hery Randriamanantsoa',
    responsableContact: '+261 33 98 765 43',
    validationsJournalieres: [],
    take5Records: [],
    documentsProgres: [],
    zoneEnclavee: true,
    modeHorsLigne: true,
    creerPar: 'hery.randria@xyz.mg',
    createdAt: new Date('2025-10-18'),
    updatedAt: new Date('2025-10-18'),
  },
];

// Initialiser le store avec les données mock
if (typeof window !== 'undefined') {
  useInterventionStore.setState({ interventions: mockInterventions });
}
