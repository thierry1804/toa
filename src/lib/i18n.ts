// Système de traduction bilingue Français/Malgache

export type Language = 'fr' | 'mg';

export const translations = {
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      permits: 'Permis de travail',
      prevention: 'Plans de prévention',
      interventions: 'Interventions',
      users: 'Utilisateurs',
      statistics: 'Statistiques',
      profile: 'Mon profil',
      logout: 'Déconnexion',
    },

    // Auth
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      email: 'Adresse email',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      loginButton: 'Se connecter',
      loginError: 'Email ou mot de passe incorrect',
      welcome: 'Bienvenue',
      welcomeBack: 'Bon retour',
    },

    // Dashboard
    dashboard: {
      title: 'Tableau de bord',
      welcomeMessage: 'Bienvenue sur la plateforme TOA',
      totalPermits: 'Total des permis',
      activePermits: 'Permis actifs',
      pendingPermits: 'En attente de validation',
      validatedPermits: 'Permis validés',
      todayInterventions: "Interventions aujourd'hui",
      activeSites: 'Sites actifs',
      criticalRisks: 'Risques critiques',
      recentPermits: 'Permis récents',
      recentInterventions: 'Interventions récentes',
    },

    // Permits
    permits: {
      title: 'Permis de travail',
      create: 'Nouveau permis',
      view: 'Voir le permis',
      edit: 'Modifier',
      delete: 'Supprimer',
      validate: 'Valider',
      reject: 'Refuser',
      close: 'Clôturer',
      reference: 'Référence',
      status: 'Statut',
      type: 'Type de permis',
      site: 'Site',
      contractor: 'Prestataire',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      createdBy: 'Créé par',
      validatedBy: 'Validé par',

      // Types
      types: {
        general: 'Permis général',
        travaux_chaud: 'Travaux à chaud',
        travaux_hauteur: 'Travaux en hauteur',
        travaux_electrique: 'Travaux électriques',
        travaux_espace_confine: 'Espace confiné',
        travaux_excavation: 'Travaux d\'excavation',
      },

      // Status
      statuses: {
        brouillon: 'Brouillon',
        en_attente_validation_chef: 'En attente Chef de projet',
        en_attente_validation_hse: 'En attente HSE',
        valide: 'Validé',
        refuse: 'Refusé',
        en_cours: 'En cours',
        cloture: 'Clôturé',
        expire: 'Expiré',
      },
    },

    // Prevention plans
    prevention: {
      title: 'Plans de prévention',
      create: 'Nouveau plan de prévention',
      view: 'Voir le plan',
      edit: 'Modifier',
      reference: 'Référence',
      company: 'Entreprise prestataire',
      intervention: 'Nature de l\'intervention',
      risks: 'Risques identifiés',
      measures: 'Mesures de prévention',
      documents: 'Documents joints',
    },

    // Interventions
    interventions: {
      title: 'Interventions',
      daily: 'Suivi journalier',
      site: 'Site',
      date: 'Date',
      workers: 'Intervenants',
      status: 'Statut',
      risks: 'Risques',
      measures: 'Mesures appliquées',
    },

    // Common
    common: {
      search: 'Rechercher',
      filter: 'Filtrer',
      export: 'Exporter',
      import: 'Importer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      close: 'Fermer',
      loading: 'Chargement...',
      noData: 'Aucune donnée disponible',
      error: 'Une erreur est survenue',
      success: 'Opération réussie',
      yes: 'Oui',
      no: 'Non',
      all: 'Tous',
      actions: 'Actions',
      date: 'Date',
      from: 'Du',
      to: 'Au',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      company: 'Entreprise',
      role: 'Rôle',
      status: 'Statut',
    },

    // Roles
    roles: {
      super_admin: 'Super Administrateur',
      admin: 'Administrateur',
      chef_projet: 'Chef de Projet',
      hse: 'Responsable HSE',
      prestataire: 'Prestataire',
      dg: 'Direction Générale',
    },
  },

  mg: {
    // Navigation
    nav: {
      dashboard: 'Tondrozotra',
      permits: 'Fahazoan-dalana',
      prevention: 'Drafitry ny fisorohana',
      interventions: 'Asa',
      users: 'Mpampiasa',
      statistics: 'Statistika',
      profile: 'Ny mombamiko',
      logout: 'Hiala',
    },

    // Auth
    auth: {
      login: 'Hiditra',
      logout: 'Hiala',
      email: 'Adiresy mailaka',
      password: 'Teny miafina',
      rememberMe: 'Tsarovy aho',
      forgotPassword: 'Hadino ny teny miafina?',
      loginButton: 'Hiditra',
      loginError: 'Diso ny mailaka na ny teny miafina',
      welcome: 'Tonga soa',
      welcomeBack: 'Tonga indray',
    },

    // Dashboard
    dashboard: {
      title: 'Tondrozotra',
      welcomeMessage: 'Tonga soa eto amin\'ny sehatra TOA',
      totalPermits: 'Fahazoan-dalana rehetra',
      activePermits: 'Fahazoan-dalana mavitrika',
      pendingPermits: 'Miandry fankatoavana',
      validatedPermits: 'Fahazoan-dalana nekena',
      todayInterventions: 'Asa androany',
      activeSites: 'Toerana mavitrika',
      criticalRisks: 'Loza lehibe',
      recentPermits: 'Fahazoan-dalana farany',
      recentInterventions: 'Asa farany',
    },

    // Permits
    permits: {
      title: 'Fahazoan-dalana',
      create: 'Fahazoan-dalana vaovao',
      view: 'Hijery',
      edit: 'Hanova',
      delete: 'Hamafa',
      validate: 'Hankato',
      reject: 'Handà',
      close: 'Hihidy',
      reference: 'Fanondroana',
      status: 'Toe-javatra',
      type: 'Karazana',
      site: 'Toerana',
      contractor: 'Mpiara-miasa',
      startDate: 'Daty fanombohana',
      endDate: 'Daty famaranana',
      createdBy: 'Noforonin\'i',
      validatedBy: 'Nekin\'i',

      // Types
      types: {
        general: 'Fahazoan-dalana ankapobeny',
        travaux_chaud: 'Asa mafana',
        travaux_hauteur: 'Asa avo',
        travaux_electrique: 'Asa elektrika',
        travaux_espace_confine: 'Asa voahidy',
        travaux_excavation: 'Asa fihadian-tany',
      },

      // Status
      statuses: {
        brouillon: 'Volavola',
        en_attente_validation_chef: 'Miandry ny lehiben\'ny tetik\'asa',
        en_attente_validation_hse: 'Miandry HSE',
        valide: 'Nekena',
        refuse: 'Lavina',
        en_cours: 'Mandeha',
        cloture: 'Mihidy',
        expire: 'Lany daty',
      },
    },

    // Prevention plans
    prevention: {
      title: 'Drafitry ny fisorohana',
      create: 'Drafitra vaovao',
      view: 'Hijery',
      edit: 'Hanova',
      reference: 'Fanondroana',
      company: 'Orinasa mpiara-miasa',
      intervention: 'Karazana asa',
      risks: 'Loza hita',
      measures: 'Fepetra fisorohana',
      documents: 'Antontan-taratasy',
    },

    // Interventions
    interventions: {
      title: 'Asa',
      daily: 'Fanaraha-maso isan\'andro',
      site: 'Toerana',
      date: 'Daty',
      workers: 'Mpiasa',
      status: 'Toe-javatra',
      risks: 'Loza',
      measures: 'Fepetra ampiharina',
    },

    // Common
    common: {
      search: 'Hikaroka',
      filter: 'Sivana',
      export: 'Hamoaka',
      import: 'Hampiditra',
      save: 'Hitahiry',
      cancel: 'Hanafoana',
      confirm: 'Hamafy',
      delete: 'Hamafa',
      edit: 'Hanova',
      view: 'Hijery',
      close: 'Hihidy',
      loading: 'Eo am-pampidirana...',
      noData: 'Tsy misy angona',
      error: 'Nisy olana',
      success: 'Vita soa aman-tsara',
      yes: 'Eny',
      no: 'Tsia',
      all: 'Rehetra',
      actions: 'Hetsika',
      date: 'Daty',
      from: 'Hatramin\'ny',
      to: 'Hatramin\'ny',
      name: 'Anarana',
      email: 'Mailaka',
      phone: 'Finday',
      company: 'Orinasa',
      role: 'Andraikitra',
      status: 'Toe-javatra',
    },

    // Roles
    roles: {
      super_admin: 'Mpitantana lehibe',
      admin: 'Mpitantana',
      chef_projet: 'Lehiben\'ny tetik\'asa',
      hse: 'Tompon\'andraikitry ny HSE',
      prestataire: 'Mpiara-miasa',
      dg: 'Fitantanana ankapobeny',
    },
  },
};

class I18n {
  private currentLanguage: Language = 'fr';

  setLanguage(lang: Language) {
    this.currentLanguage = lang;
    if (typeof window !== 'undefined') {
      localStorage.setItem('toa-language', lang);
    }
  }

  getLanguage(): Language {
    return this.currentLanguage;
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: unknown = translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Retourne la clé si la traduction n'existe pas
      }
    }

    return typeof value === 'string' ? value : key;
  }

  init() {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('toa-language') as Language;
      if (savedLang && (savedLang === 'fr' || savedLang === 'mg')) {
        this.currentLanguage = savedLang;
      }
    }
  }
}

export const i18n = new I18n();
i18n.init();

// Hook pour React
import { create } from 'zustand';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useI18n = create<I18nStore>((set) => ({
  language: i18n.getLanguage(),
  setLanguage: (lang: Language) => {
    i18n.setLanguage(lang);
    set({ language: lang });
  },
  t: (key: string) => {
    return i18n.t(key);
  },
}));
