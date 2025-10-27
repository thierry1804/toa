# DONNÉES DE TEST POUR DÉMONSTRATION
## TOA HSSES - Préparation des Scénarios

**Date :** 16 Janvier 2025  
**Version :** 1.0  

---

## 👥 **UTILISATEURS DE DÉMONSTRATION**

### **Identifiants de Connexion :**

| Rôle | Email | Mot de Passe | Nom | Prénom |
|------|-------|--------------|-----|--------|
| **Super Admin** | `admin@toa.mg` | `admin123` | Administrateur | Système |
| **Chef de Projet** | `chef@toa.mg` | `chef123` | RAJAONARISON | Jean |
| **HSE** | `hse@toa.mg` | `hse123` | RAKOTO | Marie |
| **Prestataire** | `prestataire@etech.mg` | `prest123` | RANDRIA | Paul |

---

## 🏢 **DONNÉES DE TEST PRINCIPALES**

### **Site de Travaux :**
```json
{
  "nom": "Station Service Antananarivo",
  "adresse": "Route d'Antsirabe, Antananarivo 101",
  "codeSite": "SS-ANT-001",
  "type": "Station Service",
  "responsable": "TOA Madagascar"
}
```

### **Prestataire :**
```json
{
  "nom": "eTech Solutions",
  "email": "prestataire@etech.mg",
  "telephone": "+261 34 00 000 03",
  "specialite": "Maintenance industrielle",
  "certification": "ISO 14001, ISO 45001"
}
```

### **Travaux à Effectuer :**
```json
{
  "intitule": "Maintenance des pompes à essence",
  "description": "Maintenance préventive des pompes à essence de la station service",
  "nature": "Maintenance",
  "nombreIntervenants": 3,
  "duree": 2,
  "unite": "jours"
}
```

---

## 📋 **SCÉNARIOS DE DÉMONSTRATION**

### **Scénario 1 : Plan de Prévention Standard**

#### **Étape 1 - Informations Générales :**
```json
{
  "titre": "Maintenance des pompes à essence",
  "description": "Maintenance préventive des pompes à essence de la station service Antananarivo",
  "maitreOuvrage": "TOA Madagascar",
  "prestataire": "eTech Solutions"
}
```

#### **Étape 2 - Localisation :**
```json
{
  "site": "Station Service Antananarivo",
  "adresse": "Route d'Antsirabe, Antananarivo 101",
  "codeSite": "SS-ANT-001",
  "coordonnees": {
    "latitude": -18.8792,
    "longitude": 47.5079
  }
}
```

#### **Étape 3 - Responsables :**
```json
{
  "maitreOuvrage": {
    "nom": "TOA Madagascar",
    "contact": "direction@toa.mg",
    "telephone": "+261 20 22 123 45"
  },
  "prestataire": {
    "nom": "eTech Solutions",
    "contact": "prestataire@etech.mg",
    "telephone": "+261 34 00 000 03"
  }
}
```

#### **Étape 4 - Nature des Travaux :**
```json
{
  "nature": "Maintenance",
  "description": "Maintenance préventive des pompes à essence, vérification des joints, remplacement des filtres, contrôle des systèmes de sécurité",
  "nombreIntervenants": 3,
  "dureeEstimee": 2,
  "unite": "jours"
}
```

#### **Étape 5 - Planning :**
```json
{
  "dateDebut": "2025-01-17",
  "dateFin": "2025-01-18",
  "horaires": {
    "debut": "08:00",
    "fin": "17:00",
    "pause": "12:00-13:00"
  }
}
```

#### **Étape 6 - Identification des Risques :**
```json
{
  "risques": [
    {
      "categorie": "sante_securite",
      "sousCategorie": "risque_chimique",
      "risque": "Exposition aux vapeurs d'essence",
      "niveauGravite": "eleve",
      "probabilite": "probable",
      "niveauRisque": "eleve",
      "mesures": "Ventilation forcée, EPI appropriés, formation du personnel"
    },
    {
      "categorie": "sante_securite",
      "sousCategorie": "electrique",
      "risque": "Travaux à proximité d'installations électriques",
      "niveauGravite": "critique",
      "probabilite": "peu_probable",
      "niveauRisque": "eleve",
      "mesures": "Coupure électrique, cadenassage, habilitation électrique"
    },
    {
      "categorie": "sante_securite",
      "sousCategorie": "travaux_chaud",
      "risque": "Travaux sur équipements contenant des hydrocarbures",
      "niveauGravite": "critique",
      "probabilite": "peu_probable",
      "niveauRisque": "eleve",
      "mesures": "Permis de feu, extincteurs, surveillance continue"
    }
  ]
}
```

### **Scénario 2 : Permis de Travail Général**

#### **Informations de Base :**
```json
{
  "intituleTravaux": "Maintenance des pompes à essence",
  "localisation": "Station Service Antananarivo",
  "codeSite": "SS-ANT-001",
  "contractant": "eTech Solutions",
  "nombreIntervenants": 3,
  "dateDebut": "2025-01-17",
  "dateFin": "2025-01-18",
  "dureeMaxJours": 2
}
```

#### **Types de Travaux à Risques :**
```json
{
  "travauxChaud": true,
  "travauxElectrique": true,
  "travauxHauteur": false,
  "travauxEspaceConfine": false,
  "travauxExcavation": false,
  "autres": true,
  "autresDescription": "Travaux sur équipements contenant des hydrocarbures"
}
```

#### **Personnel Exécutant :**
```json
{
  "personnelsExecutants": [
    {
      "nom": "RANDRIA Paul",
      "fonction": "Chef d'équipe",
      "habilitation": "Habilitation électrique H1V",
      "formation": "Travaux en atmosphère explosive"
    },
    {
      "nom": "RAKOTO Jean",
      "fonction": "Technicien",
      "habilitation": "Habilitation électrique B1V",
      "formation": "Sécurité chimique"
    },
    {
      "nom": "RAZAFY Michel",
      "fonction": "Technicien",
      "habilitation": "Habilitation électrique B1V",
      "formation": "Sécurité chimique"
    }
  ]
}
```

### **Scénario 3 : Intervention et Take 5**

#### **Informations de l'Intervention :**
```json
{
  "reference": "INT-2025-001",
  "description": "Maintenance pompes à essence - Station Antananarivo",
  "equipe": "Équipe eTech - 3 personnes",
  "localisation": "Station Service Antananarivo",
  "dateDebut": "2025-01-17",
  "dateFin": "2025-01-18"
}
```

#### **Take 5 - Étape 1 (Arrêter) :**
```json
{
  "etape1_arreter": {
    "travauxArretes": [
      "Arrêt des pompes à essence",
      "Coupure électrique des équipements",
      "Isolation des canalisations"
    ],
    "verifications": [
      "Vérification de l'arrêt complet",
      "Contrôle de l'isolation électrique",
      "Validation de la coupure des fluides"
    ]
  }
}
```

#### **Take 5 - Étape 2 (Observer) :**
```json
{
  "etape2_observer": {
    "observations": [
      "Absence de vapeurs d'essence",
      "Équipements correctement isolés",
      "Zone de travail sécurisée",
      "Extincteurs disponibles"
    ],
    "risquesIdentifies": [
      "Résidus d'essence dans les canalisations",
      "Risque d'étincelle électrique",
      "Vapeurs résiduelles"
    ]
  }
}
```

#### **Take 5 - Étape 3 (Analyser) :**
```json
{
  "etape3_analyser": {
    "analyseRisques": [
      "Risque chimique : Exposition aux vapeurs d'essence",
      "Risque électrique : Travaux à proximité d'installations électriques",
      "Risque d'incendie : Travaux sur équipements contenant des hydrocarbures"
    ],
    "evaluation": "Risques élevés nécessitant des mesures de protection renforcées"
  }
}
```

#### **Take 5 - Étape 4 (Contrôler) :**
```json
{
  "etape4_controler": {
    "mesuresControle": [
      {
        "type": "epi",
        "description": "Masques à gaz avec filtres A2B2E2K2",
        "miseEnPlace": true,
        "responsable": "RANDRIA Paul"
      },
      {
        "type": "epi",
        "description": "Gants nitrile résistants aux hydrocarbures",
        "miseEnPlace": true,
        "responsable": "RAKOTO Jean"
      },
      {
        "type": "equipement",
        "description": "Ventilateur d'extraction d'air",
        "miseEnPlace": true,
        "responsable": "RAZAFY Michel"
      }
    ]
  }
}
```

#### **Take 5 - Étape 5 (Procéder) :**
```json
{
  "etape5_proceder": {
    "consignes": [
      "Respecter les procédures de sécurité",
      "Utiliser les EPI appropriés",
      "Surveiller en permanence l'atmosphère",
      "Signaler immédiatement tout incident"
    ],
    "autorisation": "Travaux autorisés avec mesures de protection renforcées"
  }
}
```

---

## 📊 **DONNÉES DE STATISTIQUES**

### **Métriques Globales :**
```json
{
  "permis": {
    "total": 15,
    "enAttente": 3,
    "valides": 10,
    "refuses": 2,
    "enCours": 5,
    "clotures": 8
  },
  "plansPrevention": {
    "total": 12,
    "enAttente": 2,
    "valides": 8,
    "refuses": 2
  },
  "interventions": {
    "total": 25,
    "planifiees": 5,
    "enCours": 8,
    "terminees": 12
  }
}
```

### **Métriques par Site :**
```json
{
  "sites": [
    {
      "nom": "Station Service Antananarivo",
      "code": "SS-ANT-001",
      "permis": 8,
      "plans": 6,
      "interventions": 15
    },
    {
      "nom": "Station Service Toamasina",
      "code": "SS-TOA-001",
      "permis": 4,
      "plans": 3,
      "interventions": 7
    },
    {
      "nom": "Station Service Fianarantsoa",
      "code": "SS-FIA-001",
      "permis": 3,
      "plans": 3,
      "interventions": 3
    }
  ]
}
```

### **Taux de Performance :**
```json
{
  "tauxValidation": 87,
  "tauxRefus": 13,
  "tempsMoyenValidation": 2.5,
  "unite": "heures",
  "satisfactionUtilisateurs": 4.2,
  "unite": "sur 5"
}
```

---

## 🔧 **CONFIGURATION SYSTÈME**

### **Paramètres de Référence :**
```json
{
  "permits": {
    "format": "YYYY/PTW/XXX",
    "exemple": "2025/PTW/001"
  },
  "prevention": {
    "format": "PP-HSE-YYYY-XXX",
    "exemple": "PP-HSE-2025-001"
  },
  "interventions": {
    "format": "INT-YYYY-XXX",
    "exemple": "INT-2025-001"
  }
}
```

### **Délais de Validation :**
```json
{
  "validationTimeouts": {
    "chef": 24,
    "hse": 48,
    "unite": "heures"
  }
}
```

### **Notifications :**
```json
{
  "notifications": {
    "email": true,
    "inApp": true,
    "sms": false
  }
}
```

---

## 📝 **COMMENTAIRES DE VALIDATION**

### **Chef de Projet :**
```json
{
  "planPrevention": "Plan de prévention complet et conforme. Les risques sont bien identifiés et les mesures de prévention appropriées. Validation accordée.",
  "permis": "Permis conforme au plan de prévention validé. Les travaux à risques sont correctement identifiés. Validation accordée."
}
```

### **HSE :**
```json
{
  "planPrevention": "Plan conforme aux standards ISO 14001/45001. Tous les risques identifiés avec mesures appropriées. Validation accordée.",
  "permis": "Permis conforme. Référence attribuée automatiquement.",
  "take5": "Take 5 complet et conforme. Les mesures de protection sont appropriées. Validation accordée."
}
```

---

## 🚨 **SCÉNARIOS D'URGENCE**

### **Permis d'Urgence :**
```json
{
  "intitule": "Réparation urgente fuite essence",
  "localisation": "Station Service Antananarivo",
  "urgence": true,
  "motifUrgence": "Fuite détectée sur pompe principale",
  "mesuresUrgence": [
    "Évacuation de la zone",
    "Coupure d'urgence des équipements",
    "Mise en place de barrières de sécurité",
    "Appel des services d'urgence"
  ]
}
```

### **Incident :**
```json
{
  "type": "Incident mineur",
  "description": "Petite fuite d'essence détectée",
  "gravite": "Mineur",
  "actions": [
    "Arrêt immédiat des travaux",
    "Évacuation préventive",
    "Mise en place de mesures de confinement",
    "Nettoyage et décontamination"
  ],
  "rapport": "Incident maîtrisé sans blessé. Zone sécurisée."
}
```

---

## 📋 **CHECKLIST DE PRÉPARATION**

### **Avant la Démonstration :**
- [ ] Vérifier que tous les utilisateurs de test existent
- [ ] S'assurer que les données de test sont créées
- [ ] Tester tous les scénarios
- [ ] Vérifier la connectivité
- [ ] Préparer les captures d'écran de secours

### **Pendant la Démonstration :**
- [ ] Suivre le script chronométré
- [ ] Utiliser les données de test fournies
- [ ] Souligner les points clés
- [ ] Répondre aux questions
- [ ] Garder le timing

### **Après la Démonstration :**
- [ ] Nettoyer les données de test
- [ ] Collecter les retours
- [ ] Noter les questions en suspens
- [ ] Planifier les actions de suivi

---

**Document généré le :** 16 Janvier 2025  
**Version :** 1.0  
**Prochaine révision :** Après la démonstration  

---

*Ces données de test sont conçues pour une démonstration fluide et réaliste du système TOA HSSES, en suivant les workflows documentés et en mettant en valeur toutes les fonctionnalités.*
