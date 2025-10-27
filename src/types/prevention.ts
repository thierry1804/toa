// Types spécifiques aux plans de prévention
export interface PlanPrevention {
  id: string;
  reference: string;
  revision: string; // ex: "2025"
  dateCreation: Date;
  dateDebut: Date;
  dateFin: Date;
  status: 'brouillon' | 'soumis_validation_chef' | 'valide_chef_attente_hse' | 'refuse_chef' | 'refuse_hse' | 'valide' | 'en_cours' | 'termine';

  // Section 1: En-tête et Informations Générales
  projetActivite: string; // Projet / Activité
  nomSite: string;
  codeSite: string; // Code unique du site

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

  // Validation et Approbation (workflow en double étape)
  validationChef?: {
    valideePar: string;
    dateValidation: Date;
    commentaires?: string;
  };
  validationHSE?: {
    valideePar: string;
    dateValidation: Date;
    commentaires?: string;
    referenceAttribuee?: string;
  };
  refusChef?: {
    refusePar: string;
    dateRefus: Date;
    motif: string;
  };
  refusHSE?: {
    refusePar: string;
    dateRefus: Date;
    motif: string;
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
  validePar?: string;
  dateValidation?: Date;
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
