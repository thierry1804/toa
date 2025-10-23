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
  revision: string; // ex: "2025"
  dateCreation: Date;
  dateDebut: Date;
  dateFin: Date;
  status: 'brouillon' | 'valide' | 'en_cours' | 'termine';

  // Section 1: En-tête et Informations Générales
  projetActivite: string; // Projet / Activité
  nomSite: string;

  // Section 2: Engagement du Prestataire
  entreprisePrestataire: string;
  numeroRCS: string; // Numéro d'inscription au registre du commerce
  siegeSocial: string; // Adresse du siège social
  representantPrestataire: string; // Nom complet (Mr/Mme/Mlle)
  qualiteFonctionRepresentant: string; // Fonction du représentant
  contactPrestataire: string;
  emailPrestataire?: string;

  // Détails du site d'intervention
  localite: string;
  fokontany: string;
  commune: string;
  district: string;
  region: string;
  coordonneesGPS?: string;
  situationGeographique: 'en_ville' | 'rurale' | 'sur_montagne' | 'autre';
  situationGeographiqueAutre?: string; // Si "autre" est sélectionné
  dateSignature: Date;

  // Signatures
  signatureDonneurOrdre: {
    nomPrenom: string;
    fonction: string;
    signature?: string; // URL ou données de signature
  };
  signaturePrestataire: {
    nomSociete: string;
    nomPrenom: string;
    fonction: string;
    signature?: string;
  };

  // Section 4: Risques Dus aux Activités et Installations
  risquesActivites: {
    // A. Identification des risques
    environnement: {
      actif: boolean;
      pollutions: boolean;
      incendie: boolean;
    };
    social: {
      actif: boolean;
      contestationRiveraine: boolean;
      surete: boolean;
      autres: string;
    };
    santeSécurite: {
      actif: boolean;
      accidentSecuriteRoutiere: boolean;
      risqueChimique: boolean;
      risqueHauteur: boolean;
      risqueEnsevelissement: boolean;
      risqueNoyade: boolean;
      risqueElectrique: boolean;
      risqueOutilsMain: boolean;
      risqueOutillageElectroportatif: boolean;
      accidentManutentionMecanique: boolean;
      accidentManutentionManuelle: boolean;
      risqueTravauxChaud: boolean;
      risqueTravauxIsole: boolean;
      risqueCoactivites: boolean;
      risqueAmbianceThermique: boolean;
      risqueBruit: boolean;
      risquesPsychosociaux: boolean;
      risqueMaladiesInfectieuses: boolean;
      risquePaludisme: boolean;
      autres: string;
    };
    infrastructures: {
      actif: boolean;
      risqueAccesSite: boolean;
      risqueEtatInfrastructures: boolean;
      autresRooftop: string;
    };
  };

  // Détails des risques (Tableau 1)
  detailsRisques: DetailRisque[];

  // Sécurité routière spécifique (Tableau 2)
  securiteRoutiere: {
    gestionTempsPause: boolean;
    formationConductionDefensive: boolean;
    chauffeurApteMedicalement: boolean;
    planTrajet: boolean;
    geolocalisationFlottes: boolean;
    checklistAvantDepart: boolean;
    respectReglementsVehicule: boolean;
    maintenancePeriodique: boolean;
    evidences: Document[]; // Upload d'évidences pour chaque mesure
  };

  // B. Installations et Équipements
  installations: Installation[];
  materielsEquipements: MaterielEquipement[];

  // Section 5: Documents HSSES à Fournir
  documentsHSSES: DocumentHSSES[];

  // Sections existantes
  // Section Description des Travaux
  natureIntervention: string;
  descriptionTravaux: string;
  nombreIntervenants: number;
  dureeEstimee: number; // en heures
  horairesTravail: {
    debut: string;
    fin: string;
    pause: string;
  };

  // Risques Identifiés et Mesures de Prévention (format existant)
  risques: RisqueIdentifie[];

  // Équipements et Matériels
  equipements: {
    equipementsProtection: string[];
    outilsTravail: string[];
    materielSecurite: string[];
    equipementsUrgence: string[];
  };

  // Formation et Compétences
  formation: {
    personnelForme: boolean;
    formationsRequises: string[];
    certifications: string[];
    personnelHabilite: string[];
  };

  // Procédures d'Urgence
  proceduresUrgence: {
    planEvacuation: boolean;
    numerosUrgence: string[];
    secouristePresent: boolean;
    nomSecouriste?: string;
    posteSecours: string;
    hopitalReference: string;
  };

  // Surveillance et Contrôle
  surveillance: {
    controlesReguliers: boolean;
    frequenceControles: string;
    responsableControle: string;
    pointsControle: string[];
  };

  // Documents et Attestations
  documents: Document[];
  attestations: {
    assuranceResponsabilite: boolean;
    attestationFormation: boolean;
    certificatHabilitation: boolean;
    autres: string[];
  };

  // Validation et Approbation
  validation: {
    validePar?: string;
    dateValidation?: Date;
    commentaires?: string;
    signature?: string;
  };

  // Suivi et Clôture
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

// Détail d'un risque (Tableau 1)
export interface DetailRisque {
  id: string;
  detailRisque: string;
  naturelocalisation: string;
  mesuresProtection: string;
  misesEnOeuvrePar: 'donneur_ordre' | 'prestataire';
}

// Installation
export interface Installation {
  id: string;
  description: string;
  present: boolean;
  conditionsUtilisation: string;
}

// Matériel et Équipement
export interface MaterielEquipement {
  id: string;
  description: string;
  present: boolean;
  conditionsUtilisation: string;
  dateVerification?: Date;
  verifiePar: string;
  checklistAnnexe?: Document;
}

// Document HSSES à fournir
export interface DocumentHSSES {
  id: string;
  numero: number;
  action: string;
  actionRealisee: boolean;
  documentLivrable: string;
  livrableFourni: boolean;
  annexes: Document[];
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

// Interventions et suivi journalier
export type InterventionStatus =
  | 'planifiee'
  | 'en_cours'
  | 'suspendue'
  | 'terminee'
  | 'annulee';

export interface Intervention {
  id: string;
  reference: string;
  permisId: string;
  permisReference: string;
  planPreventionId: string;

  // Informations de base
  prestataire: string;
  nomSite: string;
  codeSite: string;
  region: string;
  description: string;
  typeIntervention: string;

  // Dates
  dateDebut: Date;
  dateFin: Date;
  dateDebutReel?: Date;
  dateFinReelle?: Date;

  // Statut
  status: InterventionStatus;

  // Équipe
  nombreIntervenants: number;
  responsableChantier: string;
  responsableContact: string;

  // Suivi journalier
  validationsJournalieres: ValidationInterventionJournaliere[];
  take5Records: Take5Record[];
  documentsProgres: DocumentProgres[];

  // Zone enclavée (hors réseau)
  zoneEnclavee: boolean;
  modeHorsLigne: boolean;

  // Observations
  incidents?: Incident[];
  observations?: string[];

  // Clôture
  cloturePar?: string;
  dateClotureFormelle?: Date;
  commentairesCloture?: string;

  // Metadata
  creerPar: string;
  modifiePar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValidationInterventionJournaliere {
  id: string;
  date: Date;
  heureDebut: string;
  heureFin?: string;

  // Personnel présent
  nombrePersonnes: number;
  listePersonnel: string[];

  // Conditions
  conditionsMeteo?: string;
  temperatureC?: number;
  vitesseVentKmh?: number;

  // Vérifications
  verificationsSecurite: {
    epiVerifies: boolean;
    outillageVerifie: boolean;
    zoneSecurisee: boolean;
    consignesRappelees: boolean;
    planSauvetageRevu: boolean;
  };

  // Activités réalisées
  activitesRealisees: string;
  avancementPourcentage: number;

  // Take 5 journalier
  take5Effectue: boolean;
  take5Id?: string;

  // Incidents/Observations
  incidents: boolean;
  incidentsDetails?: string;
  observationsJour: string;

  // Photos/Documents
  photosAvancement: string[];
  documents: string[];

  // Signatures
  signatureResponsable?: string;
  signatureSuperviseur?: string;
  valideParHSE?: boolean;
  validateurHSE?: string;

  // Statut
  validee: boolean;
  dateValidation?: Date;
}

export interface Take5Record {
  id: string;
  interventionId: string;
  date: Date;
  heure: string;

  // Identification
  responsableNom: string;
  equipe: string[];
  localisation: string;
  tacheDescription: string;

  // Les 5 étapes du Take 5
  etape1_arreter: {
    complete: boolean;
    observations: string;
  };

  etape2_observer: {
    complete: boolean;
    dangersIdentifies: string[];
    autresDangers: string;
  };

  etape3_analyser: {
    complete: boolean;
    risquesEvalues: RisqueEvalue[];
  };

  etape4_controler: {
    complete: boolean;
    mesuresControle: MesureControle[];
  };

  etape5_proceder: {
    complete: boolean;
    securiteConfirmee: boolean;
    autorisationProceder: boolean;
  };

  // Validation
  signature?: string;
  validePar?: string;
  dateValidation?: Date;

  // Transmission HSE
  transmisHSE: boolean;
  dateTransmission?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface RisqueEvalue {
  danger: string;
  niveauRisque: 'faible' | 'moyen' | 'eleve' | 'critique';
  probabilite: 'faible' | 'moyenne' | 'elevee';
  gravite: 'mineure' | 'moderee' | 'grave' | 'critique';
}

export interface MesureControle {
  type: 'elimination' | 'substitution' | 'controle_ingenierie' | 'controle_administratif' | 'epi';
  description: string;
  miseEnPlace: boolean;
  responsable: string;
}

export interface DocumentProgres {
  id: string;
  date: Date;
  type: 'photo' | 'rapport' | 'schema' | 'autre';
  description: string;
  url: string;
  uploadePar: string;
}

export interface Incident {
  id: string;
  date: Date;
  heure: string;
  type: 'accident' | 'presquaccident' | 'observation' | 'non_conformite';
  gravite: 'faible' | 'moyenne' | 'elevee' | 'critique';
  description: string;
  personnesImpliquees: string[];
  mesuresImmerdiates: string;
  rapportComplet?: string;
  photosIncident?: string[];
  declarePar: string;
  traitePar?: string;
  dateTraitement?: Date;
  statut: 'en_cours' | 'traite' | 'clos';
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
  interventionsActives: number;

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
