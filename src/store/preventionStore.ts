import { create } from 'zustand';
import { PlanPrevention } from '../types/prevention';

interface PreventionStore {
  plansPrevention: PlanPrevention[];
  addPlanPrevention: (plan: PlanPrevention) => void;
  updatePlanPrevention: (id: string, plan: Partial<PlanPrevention>) => void;
  deletePlanPrevention: (id: string) => void;
  getPlanPreventionById: (id: string) => PlanPrevention | undefined;
  
  // Actions de workflow de validation
  soumettreValidationChef: (planId: string) => void;
  validerParChef: (planId: string, userId: string, commentaires?: string) => void;
  refuserParChef: (planId: string, userId: string, motif: string) => void;
  validerParHSE: (planId: string, userId: string, reference: string, commentaires?: string) => void;
  refuserParHSE: (planId: string, userId: string, motif: string) => void;
}

// Données de démonstration
const demoPlans: PlanPrevention[] = [
  {
    id: '1',
    reference: 'PP-20251013-001',
    revision: '2025',
    dateCreation: new Date('2025-10-01'),
    dateDebut: new Date('2025-10-15'),
    dateFin: new Date('2025-12-31'),
    status: 'valide',
    projetActivite: 'Maintenance préventive des installations électriques',
    nomSite: 'Site Antananarivo - Zone Industrielle',
    codeSite: 'ANT-001',
    entreprisePrestataire: 'ACME Services SARL',
    numeroRCS: 'RCS-2024-123456',
    siegeSocial: 'Lot IVA 123, Antananarivo, Madagascar',
    representantPrestataire: 'M. Jean Rakoto',
    qualiteFonctionRepresentant: 'Directeur Technique',
    contactPrestataire: '+261 34 12 345 67',
    emailPrestataire: 'j.rakoto@acme-services.mg',
    localite: 'Zone Industrielle',
    fokontany: 'Anosibe',
    commune: 'Antananarivo Renivohitra',
    district: 'Antananarivo Atsimondrano',
    region: 'Analamanga',
    coordonneesGPS: '-18.9186, 47.5326',
    situationGeographique: 'en_ville',
    dateSignature: new Date('2025-10-01'),
    signatureDonneurOrdre: {
      nomPrenom: 'Mme. Marie Rasoamanana',
      fonction: 'Responsable HSE',
      signature: '',
    },
    signaturePrestataire: {
      nomSociete: 'ACME Services SARL',
      nomPrenom: 'M. Jean Rakoto',
      fonction: 'Directeur Technique',
      signature: '',
    },
    risquesActivites: {
      environnement: {
        actif: true,
        pollutions: false,
        incendie: true,
      },
      social: {
        actif: false,
        contestationRiveraine: false,
        surete: false,
        autres: '',
      },
      santeSécurite: {
        actif: true,
        accidentSecuriteRoutiere: false,
        risqueChimique: false,
        risqueHauteur: false,
        risqueEnsevelissement: false,
        risqueNoyade: false,
        risqueElectrique: true,
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
      evidences: [],
    },
    installations: [],
    materielsEquipements: [],
    documentsHSSES: [],
    natureIntervention: 'Maintenance préventive',
    descriptionTravaux: 'Maintenance préventive des installations électriques du site',
    nombreIntervenants: 3,
    dureeEstimee: 8,
    horairesTravail: {
      debut: '08:00',
      fin: '17:00',
      pause: '12:00-13:00',
    },
    risques: [],
    equipements: {
      equipementsProtection: ['Casques de sécurité', 'Gants isolants'],
      outilsTravail: ['Multimètre', 'Outils isolants'],
      materielSecurite: ['Balisage', 'Signalisations'],
      equipementsUrgence: ['Trousse de secours'],
    },
    formation: {
      personnelForme: true,
      formationsRequises: ['Travaux électriques'],
      certifications: ['Habilitation électrique'],
      personnelHabilite: ['Jean Rakoto', 'Marie Ranaivo'],
    },
    proceduresUrgence: {
      planEvacuation: true,
      numerosUrgence: ['+261 34 12 345 67'],
      secouristePresent: true,
      nomSecouriste: 'Jean Rakoto',
      posteSecours: 'Poste de secours principal',
      hopitalReference: 'Hôpital HJRA',
    },
    surveillance: {
      controlesReguliers: true,
      frequenceControles: 'Quotidien',
      responsableControle: 'Marie Rasoamanana',
      pointsControle: ['Vérification EPI', 'Contrôle zone de travail'],
    },
    documents: [],
    attestations: {
      assuranceResponsabilite: true,
      attestationFormation: true,
      certificatHabilitation: true,
      autres: [],
    },
    validation: {
      validePar: 'Marie Rasoamanana',
      dateValidation: new Date('2025-10-01'),
      commentaires: 'Plan validé conformément aux procédures',
      signature: '',
    },
    suivi: {
      incidents: [],
      observations: [],
      ameliorations: [],
      cloturePar: '',
      dateCloture: undefined,
    },
    creerPar: 'hse@company.mg',
    modifiePar: '',
    validePar: 'Marie Rasoamanana',
    dateValidation: new Date('2025-10-01'),
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-01'),
  },
  {
    id: '2',
    reference: 'PP-20251020-002',
    revision: '2025',
    dateCreation: new Date('2025-10-15'),
    dateDebut: new Date('2025-10-25'),
    dateFin: new Date('2025-11-30'),
    status: 'valide',
    projetActivite: 'Travaux en hauteur - Inspection toiture',
    nomSite: 'Site Toamasina - Bâtiment Principal',
    codeSite: 'TOA-001',
    entreprisePrestataire: 'Hauteur Plus Madagascar',
    numeroRCS: 'RCS-2024-789012',
    siegeSocial: 'Boulevard Joffre, Toamasina, Madagascar',
    representantPrestataire: 'M. Paul Andrianasolo',
    qualiteFonctionRepresentant: 'Chef de Chantier',
    contactPrestataire: '+261 33 98 765 43',
    emailPrestataire: 'p.andrianasolo@hauteurplus.mg',
    localite: 'Centre-ville',
    fokontany: 'Tanambao',
    commune: 'Toamasina I',
    district: 'Toamasina I',
    region: 'Atsinanana',
    coordonneesGPS: '-18.1443, 49.4021',
    situationGeographique: 'en_ville',
    dateSignature: new Date('2025-10-15'),
    signatureDonneurOrdre: {
      nomPrenom: 'M. David Rajoelina',
      fonction: 'Chef de projet',
      signature: '',
    },
    signaturePrestataire: {
      nomSociete: 'Hauteur Plus Madagascar',
      nomPrenom: 'M. Paul Andrianasolo',
      fonction: 'Chef de Chantier',
      signature: '',
    },
    risquesActivites: {
      environnement: {
        actif: true,
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
        actif: true,
        accidentSecuriteRoutiere: false,
        risqueChimique: false,
        risqueHauteur: true,
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
        risqueAmbianceThermique: true,
        risqueBruit: false,
        risquesPsychosociaux: false,
        risqueMaladiesInfectieuses: false,
        risquePaludisme: false,
        autres: 'Conditions météorologiques',
      },
      infrastructures: {
        actif: true,
        risqueAccesSite: true,
        risqueEtatInfrastructures: true,
        autresRooftop: 'Toiture en pente',
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
      evidences: [],
    },
    installations: [],
    materielsEquipements: [],
    documentsHSSES: [],
    natureIntervention: 'Travaux en hauteur',
    descriptionTravaux: 'Inspection et maintenance de la toiture',
    nombreIntervenants: 2,
    dureeEstimee: 6,
    horairesTravail: {
      debut: '08:00',
      fin: '15:00',
      pause: '12:00-13:00',
    },
    risques: [],
    equipements: {
      equipementsProtection: ['Harnais de sécurité', 'Casques', 'Chaussures antidérapantes'],
      outilsTravail: ['Échelle', 'Corde de sécurité'],
      materielSecurite: ['Balisage', 'Filet de sécurité'],
      equipementsUrgence: ['Trousse de secours'],
    },
    formation: {
      personnelForme: true,
      formationsRequises: ['Travaux en hauteur'],
      certifications: ['Certification hauteur'],
      personnelHabilite: ['Paul Andrianasolo', 'Jean Ravelo'],
    },
    proceduresUrgence: {
      planEvacuation: true,
      numerosUrgence: ['+261 33 98 765 43'],
      secouristePresent: true,
      nomSecouriste: 'Paul Andrianasolo',
      posteSecours: 'Poste de secours principal',
      hopitalReference: 'Hôpital de Toamasina',
    },
    surveillance: {
      controlesReguliers: true,
      frequenceControles: 'Quotidien',
      responsableControle: 'David Rajoelina',
      pointsControle: ['Vérification harnais', 'Contrôle conditions météo'],
    },
    documents: [],
    attestations: {
      assuranceResponsabilite: true,
      attestationFormation: true,
      certificatHabilitation: true,
      autres: [],
    },
    validation: {
      validePar: 'David Rajoelina',
      dateValidation: new Date('2025-10-15'),
      commentaires: 'Plan validé pour travaux en hauteur',
      signature: '',
    },
    suivi: {
      incidents: [],
      observations: [],
      ameliorations: [],
      cloturePar: '',
      dateCloture: undefined,
    },
    creerPar: 'projet@company.mg',
    modifiePar: '',
    validePar: 'David Rajoelina',
    dateValidation: new Date('2025-10-15'),
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-15'),
  },
];

export const usePreventionStore = create<PreventionStore>((set, get) => ({
  plansPrevention: demoPlans,

  addPlanPrevention: (plan) =>
    set((state) => ({
      plansPrevention: [...state.plansPrevention, plan],
    })),

  updatePlanPrevention: (id, updatedPlan) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      ),
    })),

  deletePlanPrevention: (id) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.filter((plan) => plan.id !== id),
    })),

  getPlanPreventionById: (id) => {
    return get().plansPrevention.find((plan) => plan.id === id);
  },

  // Actions de workflow de validation
  soumettreValidationChef: (planId) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === planId
          ? { ...plan, status: 'soumis_validation_chef', updatedAt: new Date() }
          : plan
      ),
    })),

  validerParChef: (planId, userId, commentaires) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: 'valide_chef_attente_hse',
              validationChef: {
                valideePar: userId,
                dateValidation: new Date(),
                commentaires,
              },
              updatedAt: new Date(),
            }
          : plan
      ),
    })),

  refuserParChef: (planId, userId, motif) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: 'refuse_chef',
              refusChef: {
                refusePar: userId,
                dateRefus: new Date(),
                motif,
              },
              updatedAt: new Date(),
            }
          : plan
      ),
    })),

  validerParHSE: (planId, userId, reference, commentaires) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: 'valide',
              reference,
              validationHSE: {
                valideePar: userId,
                dateValidation: new Date(),
                commentaires,
                referenceAttribuee: reference,
              },
              updatedAt: new Date(),
            }
          : plan
      ),
    })),

  refuserParHSE: (planId, userId, motif) =>
    set((state) => ({
      plansPrevention: state.plansPrevention.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              status: 'refuse_hse',
              refusHSE: {
                refusePar: userId,
                dateRefus: new Date(),
                motif,
              },
              updatedAt: new Date(),
            }
          : plan
      ),
    })),
}));


