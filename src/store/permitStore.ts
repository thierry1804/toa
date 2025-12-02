import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  PermisGeneral,
  PermisHauteur,
  PermisElectrique,
  PlanPrevention,
  PermitStatus,
} from '@/types';
import { generateReference } from '@/lib/utils';

interface PermitStore {
  // Plans de prévention
  plansPrevention: PlanPrevention[];
  addPlanPrevention: (plan: Omit<PlanPrevention, 'id' | 'reference' | 'createdAt' | 'updatedAt'>) => PlanPrevention;
  updatePlanPrevention: (id: string, plan: Partial<PlanPrevention>) => void;
  deletePlanPrevention: (id: string) => void;
  getPlanPreventionById: (id: string) => PlanPrevention | undefined;

  // Permis généraux
  permisGeneraux: PermisGeneral[];
  addPermisGeneral: (permis: Omit<PermisGeneral, 'id' | 'numero' | 'reference' | 'createdAt' | 'updatedAt'>) => PermisGeneral;
  updatePermisGeneral: (id: string, permis: Partial<PermisGeneral>) => void;
  deletePermisGeneral: (id: string) => void;
  getPermisGeneralById: (id: string) => PermisGeneral | undefined;

  // Permis hauteur
  permisHauteur: PermisHauteur[];
  addPermisHauteur: (permis: Omit<PermisHauteur, 'id' | 'numero' | 'reference' | 'createdAt' | 'updatedAt'>) => PermisHauteur;
  updatePermisHauteur: (id: string, permis: Partial<PermisHauteur>) => void;
  deletePermisHauteur: (id: string) => void;
  getPermisHauteurById: (id: string) => PermisHauteur | undefined;

  // Permis électrique
  permisElectrique: PermisElectrique[];
  addPermisElectrique: (permis: Omit<PermisElectrique, 'id' | 'numero' | 'reference' | 'createdAt' | 'updatedAt'>) => PermisElectrique;
  updatePermisElectrique: (id: string, permis: Partial<PermisElectrique>) => void;
  deletePermisElectrique: (id: string) => void;
  getPermisElectriqueById: (id: string) => PermisElectrique | undefined;

  // Actions de workflow
  validerParChefProjet: (permisId: string, nom: string, commentaire?: string, permitType?: 'general' | 'hauteur' | 'electrique') => void;
  validerParHSE: (permisId: string, nom: string, commentaire?: string, permitType?: 'general' | 'hauteur' | 'electrique') => void;
  refuserPermis: (permisId: string, raison: string, permitType?: 'general' | 'hauteur' | 'electrique') => void;
  cloturerPermis: (permisId: string, nom: string, commentaire?: string, permitType?: 'general' | 'hauteur' | 'electrique') => void;

  // Actions pour les validations journalières
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addValidationJournaliere: (permisId: string, validation: any) => void;
}

// Données de démonstration
const demoPlansPrevention = [
  {
    id: '1',
    reference: 'PP-20251013-001',
    dateCreation: new Date('2025-10-13'),
    dateDebut: new Date('2025-10-15'),
    dateFin: new Date('2025-11-15'),
    status: 'valide',
    entreprisePrestataire: 'eTech',
    representantPrestataire: 'RANDRIA Paul',
    contactPrestataire: '+261 34 00 000 03',
    nomSite: 'Antananarivo Centre',
    codeSite: 'ANT-001',
    region: 'Analamanga',
    natureIntervention: 'Maintenance préventive',
    descriptionTravaux: 'Installation et maintenance des équipements télécoms',
    nombreIntervenants: 5,
    risques: [
      {
        id: '1',
        categorie: 'Travail en hauteur',
        description: 'Intervention sur pylône de 40m',
        niveauGravite: 'eleve',
        probabilite: 'moyenne',
        impact: 'eleve',
        mesuresPrevention: ['Harnais de sécurité', 'Formation travail en hauteur'],
        equipementsNecessaires: ['Harnais', 'Longe double', 'Casque'],
        responsableMesure: 'Prestataire',
        dateMiseEnPlace: '2025-10-13',
        verification: true,
      },
      {
        id: '2',
        categorie: 'Électrique',
        description: 'Travaux sur installations électriques',
        niveauGravite: 'critique',
        probabilite: 'elevee',
        impact: 'critique',
        mesuresPrevention: ['Consignation', 'Personnel habilité'],
        equipementsNecessaires: ['Gants isolants', 'VAT'],
        responsableMesure: 'Prestataire',
        dateMiseEnPlace: '2025-10-13',
        verification: true,
      },
    ],
    documents: [],
    validePar: 'hse@toa.mg',
    dateValidation: new Date('2025-10-13'),
    creerPar: 'prestataire@etech.mg',
    createdAt: new Date('2025-10-13'),
    updatedAt: new Date('2025-10-13'),
  } as unknown as PlanPrevention,
] as PlanPrevention[];

const demoPermisGeneraux: PermisGeneral[] = [
  {
    id: '1',
    numero: 'PTW-20251013-001',
    reference: '2025/PTW/001',
    planPreventionId: '1',
    planPreventionReference: 'PP-20251013-001',
    intituleTravaux: 'Maintenance équipements télécoms',
    localisation: 'Antananarivo Centre - Pylône principal',
    codeSite: 'ANT-001',
    contractant: 'eTech',
    nombreIntervenants: 5,
    dateDebut: new Date('2025-10-15'),
    dateFin: new Date('2025-10-17'),
    dureeMaxJours: 30,
    travauxRisques: {
      travauxChaud: false,
      travauxHauteur: true,
      travauxElectrique: true,
      travauxEspaceConfine: false,
      travauxExcavation: false,
      autres: false,
    },
    permisAnnexes: [],
    status: 'valide',
    evaluationRisquesValidee: true,
    personneCompetenteAssignee: true,
    mesuresPreventionMisesEnPlace: true,
    personnelInforme: true,
    dangersControles: true,
    demandeurNom: 'RANDRIA Paul',
    demandeurDate: new Date('2025-10-13'),
    superviseurNom: 'RAKOTO Jean',
    superviseurDate: new Date('2025-10-13'),
    chefProjetNom: 'RAJAONARISON Jean',
    chefProjetDate: new Date('2025-10-13'),
    hseNom: 'RAKOTO Marie',
    hseDate: new Date('2025-10-13'),
    creerPar: 'prestataire@etech.mg',
    createdAt: new Date('2025-10-13'),
    updatedAt: new Date('2025-10-13'),
  },
];

export const usePermitStore = create<PermitStore>()(
  persist(
    (set, get) => ({
      // Plans de prévention
      plansPrevention: demoPlansPrevention,

      addPlanPrevention: (plan) => {
        const newPlan: PlanPrevention = {
          ...plan,
          id: Math.random().toString(36).substr(2, 9),
          reference: generateReference('PP'),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          plansPrevention: [...state.plansPrevention, newPlan],
        }));
        return newPlan;
      },

      updatePlanPrevention: (id, plan) => {
        set((state) => ({
          plansPrevention: state.plansPrevention.map((p) =>
            p.id === id ? { ...p, ...plan, updatedAt: new Date() } : p
          ),
        }));
      },

      deletePlanPrevention: (id) => {
        set((state) => ({
          plansPrevention: state.plansPrevention.filter((p) => p.id !== id),
        }));
      },

      getPlanPreventionById: (id) => {
        return get().plansPrevention.find((p) => p.id === id);
      },

      // Permis généraux
      permisGeneraux: demoPermisGeneraux,

      addPermisGeneral: (permis) => {
        const newPermis: PermisGeneral = {
          ...permis,
          id: Math.random().toString(36).substr(2, 9),
          numero: generateReference('PTW'),
          reference: '', // Sera attribué par HSE
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          permisGeneraux: [...state.permisGeneraux, newPermis],
        }));
        return newPermis;
      },

      updatePermisGeneral: (id, permis) => {
        set((state) => ({
          permisGeneraux: state.permisGeneraux.map((p) =>
            p.id === id ? { ...p, ...permis, updatedAt: new Date() } : p
          ),
        }));
      },

      deletePermisGeneral: (id) => {
        set((state) => ({
          permisGeneraux: state.permisGeneraux.filter((p) => p.id !== id),
        }));
      },

      getPermisGeneralById: (id) => {
        return get().permisGeneraux.find((p) => p.id === id);
      },

      // Permis hauteur
      permisHauteur: [],

      addPermisHauteur: (permis) => {
        const newPermis: PermisHauteur = {
          ...permis,
          id: Math.random().toString(36).substr(2, 9),
          numero: generateReference('PTWH'),
          reference: '', // Sera attribué par HSE
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          permisHauteur: [...state.permisHauteur, newPermis],
        }));
        return newPermis;
      },

      updatePermisHauteur: (id, permis) => {
        set((state) => ({
          permisHauteur: state.permisHauteur.map((p) =>
            p.id === id ? { ...p, ...permis, updatedAt: new Date() } : p
          ),
        }));
      },

      deletePermisHauteur: (id) => {
        set((state) => ({
          permisHauteur: state.permisHauteur.filter((p) => p.id !== id),
        }));
      },

      getPermisHauteurById: (id) => {
        return get().permisHauteur.find((p) => p.id === id);
      },

      // Permis électrique
      permisElectrique: [],

      addPermisElectrique: (permis) => {
        const newPermis: PermisElectrique = {
          ...permis,
          id: Math.random().toString(36).substr(2, 9),
          numero: generateReference('PTWE'),
          reference: '', // Sera attribué par HSE
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          permisElectrique: [...state.permisElectrique, newPermis],
        }));
        return newPermis;
      },

      updatePermisElectrique: (id, permis) => {
        set((state) => ({
          permisElectrique: state.permisElectrique.map((p) =>
            p.id === id ? { ...p, ...permis, updatedAt: new Date() } : p
          ),
        }));
      },

      deletePermisElectrique: (id) => {
        set((state) => ({
          permisElectrique: state.permisElectrique.filter((p) => p.id !== id),
        }));
      },

      getPermisElectriqueById: (id) => {
        return get().permisElectrique.find((p) => p.id === id);
      },

      // Workflow
      validerParChefProjet: (permisId, nom, commentaire, permitType = 'general') => {
        set((state) => {
          if (permitType === 'hauteur') {
            return {
              permisHauteur: state.permisHauteur.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'en_attente_validation_hse' as PermitStatus,
                      chefProjetNom: nom,
                      chefProjetDate: new Date(),
                      chefProjetCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else if (permitType === 'electrique') {
            return {
              permisElectrique: state.permisElectrique.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'en_attente_validation_hse' as PermitStatus,
                      chefProjetNom: nom,
                      chefProjetDate: new Date(),
                      chefProjetCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else {
            return {
              permisGeneraux: state.permisGeneraux.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'en_attente_validation_hse' as PermitStatus,
                      chefProjetNom: nom,
                      chefProjetDate: new Date(),
                      chefProjetCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          }
        });
      },

      validerParHSE: (permisId, nom, commentaire, permitType = 'general') => {
        const year = new Date().getFullYear();
        // Compter tous les permis validés pour générer une référence unique
        const allValidated = [
          ...get().permisGeneraux.filter((p) => p.reference),
          ...get().permisHauteur.filter((p) => p.reference),
          ...get().permisElectrique.filter((p) => p.reference),
        ];
        const count = allValidated.length + 1;
        const reference = `${year}/PTW/${count.toString().padStart(3, '0')}`;

        set((state) => {
          if (permitType === 'hauteur') {
            return {
              permisHauteur: state.permisHauteur.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'valide' as PermitStatus,
                      reference,
                      hseNom: nom,
                      hseDate: new Date(),
                      hseCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else if (permitType === 'electrique') {
            return {
              permisElectrique: state.permisElectrique.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'valide' as PermitStatus,
                      reference,
                      hseNom: nom,
                      hseDate: new Date(),
                      hseCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else {
            return {
              permisGeneraux: state.permisGeneraux.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'valide' as PermitStatus,
                      reference,
                      hseNom: nom,
                      hseDate: new Date(),
                      hseCommentaire: commentaire,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          }
        });
      },

      refuserPermis: (permisId, raison, permitType = 'general') => {
        set((state) => {
          if (permitType === 'hauteur') {
            return {
              permisHauteur: state.permisHauteur.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'refuse' as PermitStatus,
                      hseCommentaire: raison,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else if (permitType === 'electrique') {
            return {
              permisElectrique: state.permisElectrique.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'refuse' as PermitStatus,
                      hseCommentaire: raison,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          } else {
            return {
              permisGeneraux: state.permisGeneraux.map((p) =>
                p.id === permisId
                  ? {
                      ...p,
                      status: 'refuse' as PermitStatus,
                      hseCommentaire: raison,
                      updatedAt: new Date(),
                    }
                  : p
              ),
            };
          }
        });
      },

      cloturerPermis: (permisId, nom, commentaire) => {
        set((state) => ({
          permisGeneraux: state.permisGeneraux.map((p) =>
            p.id === permisId
              ? {
                  ...p,
                  status: 'cloture' as PermitStatus,
                  cloturePar: nom,
                  clotureDate: new Date(),
                  clotureCommentaire: commentaire,
                  updatedAt: new Date(),
                }
              : p
          ),
        }));
      },

      // Actions pour les validations journalières
      addValidationJournaliere: (permisId, validation) => {
        set((state) => ({
          permisHauteur: state.permisHauteur.map((p) =>
            p.id === permisId
              ? {
                  ...p,
                  validationsJournalieres: [...(p.validationsJournalieres || []), validation],
                  updatedAt: new Date(),
                }
              : p
          ),
        }));
      },
    }),
    {
      name: 'toa-permit-storage',
    }
  )
);
