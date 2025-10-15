// Types d'utilisateurs et rôles
export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'chef_projet'
  | 'hse'
  | 'prestataire'
  | 'dg';

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: UserRole;
  entreprise?: string;
  actif: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Types de permis
export type PermitType =
  | 'general'
  | 'travaux_chaud'
  | 'travaux_hauteur'
  | 'travaux_electrique'
  | 'travaux_espace_confine'
  | 'travaux_excavation';

export type PermitStatus =
  | 'brouillon'
  | 'en_attente_validation_chef'
  | 'en_attente_validation_hse'
  | 'valide'
  | 'refuse'
  | 'en_cours'
  | 'cloture'
  | 'expire';

// Plan de prévention HSSES - SGI-PPHSSES-TOA-601
export interface PlanPrevention {
  id: string;
  reference: string;
  dateCreation: Date;
  dateDebut: Date;
  dateFin: Date;
  status: 'brouillon' | 'valide' | 'en_cours' | 'termine';

  // Section 1: Informations Entreprise Prestataire
  entreprisePrestataire: string;
  representantPrestataire: string;
  contactPrestataire: string;
  emailPrestataire?: string;
  adressePrestataire?: string;

  // Section 2: Informations Maître d'Ouvrage
  maitreOuvrage: string;
  representantMaitreOuvrage: string;
  contactMaitreOuvrage: string;
  emailMaitreOuvrage?: string;

  // Section 3: Localisation de l'Intervention
  nomSite: string;
  codeSite: string;
  region: string;
  adresseSite: string;
  coordonneesGPS?: string;

  // Section 4: Description des Travaux
  natureIntervention: string;
  descriptionTravaux: string;
  nombreIntervenants: number;
  dureeEstimee: number; // en heures
  horairesTravail: {
    debut: string;
    fin: string;
    pause: string;
  };

  // Section 5: Risques Identifiés et Mesures de Prévention
  risques: RisqueIdentifie[];

  // Section 6: Équipements et Matériels
  equipements: {
    equipementsProtection: string[];
    outilsTravail: string[];
    materielSecurite: string[];
    equipementsUrgence: string[];
  };

  // Section 7: Formation et Compétences
  formation: {
    personnelForme: boolean;
    formationsRequises: string[];
    certifications: string[];
    personnelHabilite: string[];
  };

  // Section 8: Procédures d'Urgence
  proceduresUrgence: {
    planEvacuation: boolean;
    numerosUrgence: string[];
    secouristePresent: boolean;
    nomSecouriste?: string;
    posteSecours: string;
    hopitalReference: string;
  };

  // Section 9: Surveillance et Contrôle
  surveillance: {
    controlesReguliers: boolean;
    frequenceControles: string;
    responsableControle: string;
    pointsControle: string[];
  };

  // Section 10: Documents et Attestations
  documents: Document[];
  attestations: {
    assuranceResponsabilite: boolean;
    attestationFormation: boolean;
    certificatHabilitation: boolean;
    autres: string[];
  };

  // Section 11: Validation et Approbation
  validation: {
    validePar?: string;
    dateValidation?: Date;
    commentaires?: string;
    signature?: string;
  };

  // Section 12: Suivi et Clôture
  suivi: {
    incidents?: string[];
    observations?: string[];
    ameliorations?: string[];
    cloturePar?: string;
    dateCloture?: Date;
  };

  // Metadata
  creerPar: string;
  modifiePar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RisqueIdentifie {
  id: string;
  categorie: string;
  description: string;
  niveauGravite: 'faible' | 'moyen' | 'eleve' | 'critique';
  probabilite: 'faible' | 'moyenne' | 'elevee';
  impact: 'faible' | 'moyen' | 'eleve' | 'critique';
  mesuresPrevention: string[];
  equipementsNecessaires: string[];
  responsableMesure: string;
  dateMiseEnPlace: string;
  verification: boolean;
}

export interface Document {
  id: string;
  nom: string;
  type: string;
  url: string;
  taille: number;
  uploadePar: string;
  uploadeLe: Date;
}

// Permis de travail général
export interface PermisGeneral {
  id: string;
  numero: string;
  reference: string;

  // Lien avec plan de prévention
  planPreventionId: string;
  planPreventionReference: string;

  // Type et détails
  intituleTravaux: string;
  localisation: string;
  codeSite: string;
  contractant: string;
  nombreIntervenants: number;

  // Dates
  dateDebut: Date;
  dateFin: Date;
  dureeMaxJours: number;

  // Types de travaux à risques
  travauxRisques: {
    travauxChaud: boolean;
    travauxHauteur: boolean;
    travauxElectrique: boolean;
    travauxEspaceConfine: boolean;
    travauxExcavation: boolean;
    autres: boolean;
    autresDescription?: string;
  };

  // Permis annexés
  permisAnnexes: string[];

  // Status et workflow
  status: PermitStatus;

  // Section 2: Demande (Prestataire)
  evaluationRisquesValidee: boolean;
  personneCompetenteAssignee: boolean;
  mesuresPreventionMisesEnPlace: boolean;
  personnelInforme: boolean;
  dangersControles: boolean;

  demandeurNom: string;
  demandeurSignature?: string;
  demandeurDate?: Date;

  // Section 3: Engagement travailleur
  superviseurNom: string;
  superviseurSignature?: string;
  superviseurDate?: Date;

  // Section 4: Autorisation Chef de projet
  chefProjetNom?: string;
  chefProjetSignature?: string;
  chefProjetDate?: Date;
  chefProjetCommentaire?: string;

  // Section 5: Validation HSE et attribution référence
  hseNom?: string;
  hseSignature?: string;
  hseDate?: Date;
  hseCommentaire?: string;

  // Section 6: Clôture
  cloturePar?: string;
  clotureDate?: Date;
  clotureCommentaire?: string;

  // Metadata
  creerPar: string;
  modifiePar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Permis travail en hauteur
export interface PermisHauteur {
  id: string;
  numero: string;
  reference: string;
  permisGeneralId: string;
  planPreventionId: string;
  planPreventionReference: string;

  // Nouveaux champs conformes au PDF
  prestataire: string;
  dateDebut: Date;
  dateFin: Date;

  // Détails spécifiques
  descriptionOperation: string;
  codeSite: string;
  region: string;
  nombreIntervenants: number;

  // Hauteur de chute
  hauteurChute: '<=3m' | '3-8m' | '8-40m' | '>40m';

  // Travail en toiture
  travailToiture: boolean;
  typePente?: 'plat' | 'legere' | 'forte' | 'tres_forte' | 'extreme';

  // Risques
  risques: {
    effondrement: boolean;
    incendie: boolean;
    deversement: boolean;
    electrisation: boolean;
    chutePersonnes: boolean;
    blessure: boolean;
    chuteObjet: boolean;
    expositionSubstances: boolean;
    ecrasement: boolean;
    mauvaiseMeteo: boolean;
    autres: string[];
  };

  // Matériels
  materiels: {
    echafaudageRoulant: boolean;
    echafaudageFixe: boolean;
    filetSecurite: boolean;
    ligneVieVerticale: boolean;
    ligneVieHorizontale: boolean;
    pointAncrage: boolean;
    echelleCrinoline: boolean;
    plateformeElevatrice: boolean;
    travailCordes: boolean;
    echelle: boolean;
    escabeau: boolean;
    autres: string[];
  };

  // Mesures de prévention
  mesuresPrevention: {
    personnelHabilite: boolean;
    personnelApte: boolean;
    balisage: boolean;
    chaussuresSecurite: boolean;
    casque: boolean;
    gantsNitrile: boolean;
    gantsIsolants: boolean;
    gantsManutention: boolean;
    bouchonOreille: boolean;
    casqueAntiBruit: boolean;
    longeAbsorbeur: boolean;
    doubleLonge: boolean;
    ligneVieConforme: boolean;
    harnaisVerifie: boolean;
    echafaudageConforme: boolean;
    echelleConforme: boolean;
    sanglageOutils: boolean;
    travailDeux: boolean;
    mesureVent: boolean;
    autres: string[];
  };

  // Prévention urgence
  planSauvetageDisponible: boolean;
  numerosUrgenceDisponibles: boolean;
  secouristePresent: boolean;

  // Engagement
  engagementDemandeur: boolean;

  // Validations
  demandeurNom: string;
  demandeurSignature?: string;
  demandeurDate?: Date;

  autorisePar?: string;
  autoriseSignature?: string;
  autoriseDate?: Date;

  responsableContractant?: string;
  responsableSignature?: string;
  responsableDate?: Date;

  personnelsExecutants: PersonnelExecutant[];

  // Validation journalière
  validationsJournalieres: ValidationJournaliere[];

  // Status
  status: PermitStatus;
  dateDebut: Date;
  dateFin: Date;

  // Metadata
  creerPar: string;
  modifiePar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonnelExecutant {
  nom: string;
  signature?: string;
  date?: Date;
}

export interface ValidationJournaliere {
  date: Date;
  codeSite: string;
  vitesseVent?: number;

  // Commencement
  demandeurSignatureDebut?: string;
  utilisateurSignatureDebut?: string;

  // Clôture
  demandeurSignatureFin?: string;
  utilisateurSignatureFin?: string;
}

// Permis travail électrique
export interface PermisElectrique {
  id: string;
  numero: string;
  reference: string;
  permisGeneralId: string;
  planPreventionReference: string;

  // Détails
  codeSite: string;
  nombreIntervenants: number;

  // Type de travail
  typeTravail: {
    travailSousTension: boolean;
    travailHorsTension: boolean;
    consignationEnergie: boolean;
  };

  tension: {
    basseTension: boolean;
    moyenneTension: boolean;
    hauteTension: boolean;
  };

  // Description équipements
  typeCircuitEquipement: string;
  descriptionTravail: string;
  raisonNonMiseHorsTension: string;

  // Risques
  risques: {
    electrisation: boolean;
    electrocution: boolean;
    brulure: boolean;
    autres: string[];
  };

  // Matériels
  materiels: {
    multimetreDC: boolean;
    outilsIsolants: boolean;
    autres: string[];
  };

  // Mesures de prévention
  mesuresPrevention: {
    personnelHabilite: boolean;
    personnelApte: boolean;
    balisage: boolean;
    chaussuresSecurite: boolean;
    casque: boolean;
    gantsElectriques: boolean;
    tapisIsolant: boolean;
    lunetteSecurite: boolean;
    testTension: boolean;
    toolbox: boolean;
    consignationEnergie: boolean;
    autres: string[];
  };

  // Prévention urgence
  secouristePresent: boolean;
  numerosUrgenceDisponibles: boolean;

  // Engagement
  engagementDemandeur: boolean;

  // Validations
  autorisePar?: string;
  autoriseSignature?: string;
  autoriseDate?: Date;

  demandeurNom: string;
  demandeurSignature?: string;
  demandeurDate?: Date;

  responsableContractant?: string;
  responsableSignature?: string;
  responsableDate?: Date;

  personnelsExecutants: PersonnelExecutant[];

  // Contrôle journalier
  controlesJournaliers: ControleJournalierElectrique[];

  // Consignation
  bonConsignation?: BonConsignation;

  // Status
  status: PermitStatus;
  dateDebut: Date;
  dateFin: Date;

  // Metadata
  creerPar: string;
  modifiePar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ControleJournalierElectrique {
  date: Date;
  codeSite: string;
  intervenants: string;
  confirmationMesures?: string;
  demandeurSignature?: string;
  intervenantsSignature?: string;
}

export interface BonConsignation {
  motif: string;
  consignations: ConsignationDetail[];
}

export interface ConsignationDetail {
  codeSite: string;
  equipementConcerne: string;

  // Consignation
  electrique?: string;
  dateConsignation?: Date;
  heureConsignation?: string;
  vatVerification?: boolean;
  visaConsignation?: string;

  // Déconsignation
  controleCircuit?: boolean;
  miseSousTension?: boolean;
  testEnergie?: boolean;
  dateDeconsignation?: Date;
  heureDeconsignation?: string;
  visaDeconsignation?: string;
}

// Statistiques et KPIs
export interface DashboardStats {
  // Permis
  totalPermis: number;
  permisActifs: number;
  permisEnAttente: number;
  permisValides: number;
  permisRefuses: number;
  permisClotures: number;

  // Plans de prévention
  totalPlansPrevention: number;
  plansEnCours: number;
  plansTermines: number;

  // Interventions
  interventionsJour: number;
  interventionsSemaine: number;
  interventionsMois: number;

  // Sites
  sitesActifs: number;

  // Risques
  risquesIdentifies: number;
  risquesCritiques: number;

  // Par type
  permisParType: Record<PermitType, number>;
  permisParStatus: Record<PermitStatus, number>;
  permisParSite: Record<string, number>;

  // Tendances
  evolutionPermis: {
    date: string;
    total: number;
  }[];

  // Délais moyens
  delaiMoyenValidation: number; // en heures
  delaiMoyenTraitement: number; // en heures
}
