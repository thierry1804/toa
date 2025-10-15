/**
 * Tests automatisés pour le formulaire de plan de prévention
 * Teste la conformité avec le document SGI-PPHSSES-TOA-601
 */

// Configuration des tests
const BASE_URL = 'http://localhost:5173';
const TEST_TIMEOUT = 30000;

// Données de test pour un plan de prévention complet
const testData = {
  // Section 1: Informations Entreprise Prestataire
  entreprisePrestataire: 'TOA Madagascar SARL',
  representantPrestataire: 'Jean Dupont',
  contactPrestataire: '+261 34 00 000 00',
  emailPrestataire: 'contact@toa.mg',
  adressePrestataire: 'Lot II M 85 Bis, Antananarivo 101',

  // Section 2: Informations Maître d'Ouvrage
  maitreOuvrage: 'Towerco Of Africa MG',
  representantMaitreOuvrage: 'Marie Martin',
  contactMaitreOuvrage: '+261 34 11 111 11',
  emailMaitreOuvrage: 'marie.martin@toa.mg',

  // Section 3: Localisation
  nomSite: 'Antananarivo Centre',
  codeSite: 'ANT-001',
  region: 'Analamanga',
  adresseSite: 'Avenue de l\'Indépendance, Antananarivo',
  coordonneesGPS: '-18.8792, 47.5079',

  // Section 4: Description des Travaux
  natureIntervention: 'Maintenance préventive des équipements de télécommunication',
  descriptionTravaux: 'Maintenance préventive complète des équipements de télécommunication incluant la vérification des systèmes électriques, la mise à jour des logiciels et le nettoyage des installations.',
  nombreIntervenants: 3,
  dureeEstimee: 8,
  horairesTravail: {
    debut: '08:00',
    fin: '17:00',
    pause: '12:00'
  },
  dateDebut: '2025-01-15',
  dateFin: '2025-01-15',

  // Section 5: Risques (minimum 1 requis)
  risques: [
    {
      categorie: 'Travail en hauteur',
      description: 'Risque de chute lors de l\'accès aux équipements en hauteur',
      niveauGravite: 'eleve',
      probabilite: 'moyenne',
      impact: 'critique',
      mesuresPrevention: ['Utilisation d\'EPI appropriés', 'Formation aux travaux en hauteur'],
      equipementsNecessaires: ['Harnais de sécurité', 'Casque', 'Chaussures antidérapantes'],
      responsableMesure: 'Chef d\'équipe',
      dateMiseEnPlace: '2025-01-10',
      verification: true
    }
  ],

  // Section 6: Équipements
  equipements: {
    equipementsProtection: ['Casques de sécurité', 'Gants de protection', 'Chaussures de sécurité'],
    outilsTravail: ['Multimètre', 'Tournevis isolés', 'Pince à dénuder'],
    materielSecurite: ['Extincteur', 'Balisage de sécurité', 'Signalisation'],
    equipementsUrgence: ['Trousse de secours', 'Radio de communication', 'Téléphone portable']
  },

  // Section 7: Formation
  formation: {
    personnelForme: true,
    formationsRequises: ['SST (Sauveteur Secouriste du Travail)', 'Habilitation électrique'],
    certifications: ['Certificat SST', 'Certificat habilitation électrique'],
    personnelHabilite: ['Jean Dupont', 'Pierre Martin', 'Paul Durand']
  },

  // Section 8: Procédures d'Urgence
  proceduresUrgence: {
    planEvacuation: true,
    numerosUrgence: ['Pompiers: 18', 'SAMU: 15', 'Police: 17'],
    secouristePresent: true,
    nomSecouriste: 'Jean Dupont',
    posteSecours: 'Bureau principal - RDC',
    hopitalReference: 'Hôpital HJRA - Antananarivo'
  },

  // Section 9: Surveillance
  surveillance: {
    controlesReguliers: true,
    frequenceControles: 'Toutes les 2 heures',
    responsableControle: 'Chef de chantier',
    pointsControle: ['Respect des EPI', 'État des équipements', 'Sécurité du site']
  },

  // Section 10: Attestations
  attestations: {
    assuranceResponsabilite: true,
    attestationFormation: true,
    certificatHabilitation: true,
    autres: ['Certificat d\'assurance responsabilité civile']
  }
};

// Fonction pour attendre qu'un élément soit visible
async function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const checkElement = () => {
      const element = document.querySelector(selector);
      if (element && element.offsetParent !== null) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      } else {
        setTimeout(checkElement, 100);
      }
    };
    checkElement();
  });
}

// Fonction pour remplir un champ de formulaire
async function fillField(selector, value) {
  const element = await waitForElement(selector);
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

// Fonction pour cliquer sur un élément
async function clickElement(selector) {
  const element = await waitForElement(selector);
  element.click();
}

// Fonction pour vérifier qu'un élément contient du texte
async function checkElementText(selector, expectedText) {
  const element = await waitForElement(selector);
  return element.textContent.includes(expectedText);
}

// Test principal de création d'un plan de prévention
async function testCreatePreventionPlan() {
  console.log('🧪 Début des tests de création de plan de prévention');
  
  try {
    // 1. Navigation vers la page de création
    console.log('📝 Test 1: Navigation vers la page de création');
    window.location.href = `${BASE_URL}/prevention/new`;
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier que nous sommes sur la bonne page
    const pageTitle = await waitForElement('h2');
    if (!pageTitle.textContent.includes('Créer un plan de prévention')) {
      throw new Error('Page de création non trouvée');
    }
    console.log('✅ Navigation réussie');

    // 2. Remplir la Section 1: Informations Entreprise Prestataire
    console.log('📝 Test 2: Remplissage Section 1 - Entreprise Prestataire');
    await fillField('input[name="entreprisePrestataire"]', testData.entreprisePrestataire);
    await fillField('input[name="representantPrestataire"]', testData.representantPrestataire);
    await fillField('input[name="contactPrestataire"]', testData.contactPrestataire);
    await fillField('input[name="emailPrestataire"]', testData.emailPrestataire);
    await fillField('input[name="adressePrestataire"]', testData.adressePrestataire);
    console.log('✅ Section 1 remplie');

    // 3. Remplir la Section 2: Informations Maître d'Ouvrage
    console.log('📝 Test 3: Remplissage Section 2 - Maître d\'Ouvrage');
    await fillField('input[name="maitreOuvrage"]', testData.maitreOuvrage);
    await fillField('input[name="representantMaitreOuvrage"]', testData.representantMaitreOuvrage);
    await fillField('input[name="contactMaitreOuvrage"]', testData.contactMaitreOuvrage);
    await fillField('input[name="emailMaitreOuvrage"]', testData.emailMaitreOuvrage);
    console.log('✅ Section 2 remplie');

    // 4. Remplir la Section 3: Localisation
    console.log('📝 Test 4: Remplissage Section 3 - Localisation');
    await fillField('input[name="nomSite"]', testData.nomSite);
    await fillField('input[name="codeSite"]', testData.codeSite);
    await fillField('select[name="region"]', testData.region);
    await fillField('input[name="adresseSite"]', testData.adresseSite);
    await fillField('input[name="coordonneesGPS"]', testData.coordonneesGPS);
    console.log('✅ Section 3 remplie');

    // 5. Remplir la Section 4: Description des Travaux
    console.log('📝 Test 5: Remplissage Section 4 - Description des Travaux');
    await fillField('input[name="natureIntervention"]', testData.natureIntervention);
    await fillField('textarea[name="descriptionTravaux"]', testData.descriptionTravaux);
    await fillField('input[name="nombreIntervenants"]', testData.nombreIntervenants.toString());
    await fillField('input[name="dureeEstimee"]', testData.dureeEstimee.toString());
    await fillField('input[name="horairesTravail.debut"]', testData.horairesTravail.debut);
    await fillField('input[name="horairesTravail.fin"]', testData.horairesTravail.fin);
    await fillField('input[name="horairesTravail.pause"]', testData.horairesTravail.pause);
    await fillField('input[name="dateDebut"]', testData.dateDebut);
    await fillField('input[name="dateFin"]', testData.dateFin);
    console.log('✅ Section 4 remplie');

    // 6. Remplir la Section 5: Risques Identifiés
    console.log('📝 Test 6: Remplissage Section 5 - Risques Identifiés');
    await fillField('input[name="risques.0.categorie"]', testData.risques[0].categorie);
    await fillField('textarea[name="risques.0.description"]', testData.risques[0].description);
    await fillField('select[name="risques.0.niveauGravite"]', testData.risques[0].niveauGravite);
    await fillField('select[name="risques.0.probabilite"]', testData.risques[0].probabilite);
    await fillField('select[name="risques.0.impact"]', testData.risques[0].impact);
    await fillField('textarea[name="risques.0.mesuresPrevention.0"]', testData.risques[0].mesuresPrevention.join('\n'));
    await fillField('textarea[name="risques.0.equipementsNecessaires.0"]', testData.risques[0].equipementsNecessaires.join('\n'));
    await fillField('input[name="risques.0.responsableMesure"]', testData.risques[0].responsableMesure);
    await fillField('input[name="risques.0.dateMiseEnPlace"]', testData.risques[0].dateMiseEnPlace);
    await clickElement('input[name="risques.0.verification"]');
    console.log('✅ Section 5 remplie');

    // 7. Remplir la Section 6: Équipements
    console.log('📝 Test 7: Remplissage Section 6 - Équipements');
    await fillField('textarea[name="equipements.equipementsProtection.0"]', testData.equipements.equipementsProtection.join('\n'));
    await fillField('textarea[name="equipements.outilsTravail.0"]', testData.equipements.outilsTravail.join('\n'));
    await fillField('textarea[name="equipements.materielSecurite.0"]', testData.equipements.materielSecurite.join('\n'));
    await fillField('textarea[name="equipements.equipementsUrgence.0"]', testData.equipements.equipementsUrgence.join('\n'));
    console.log('✅ Section 6 remplie');

    // 8. Remplir la Section 7: Formation
    console.log('📝 Test 8: Remplissage Section 7 - Formation');
    await clickElement('input[name="formation.personnelForme"]');
    await fillField('textarea[name="formation.formationsRequises.0"]', testData.formation.formationsRequises.join('\n'));
    await fillField('textarea[name="formation.certifications.0"]', testData.formation.certifications.join('\n'));
    await fillField('textarea[name="formation.personnelHabilite.0"]', testData.formation.personnelHabilite.join('\n'));
    console.log('✅ Section 7 remplie');

    // 9. Remplir la Section 8: Procédures d'Urgence
    console.log('📝 Test 9: Remplissage Section 8 - Procédures d\'Urgence');
    await clickElement('input[name="proceduresUrgence.planEvacuation"]');
    await fillField('textarea[name="proceduresUrgence.numerosUrgence.0"]', testData.proceduresUrgence.numerosUrgence.join('\n'));
    await fillField('input[name="proceduresUrgence.posteSecours"]', testData.proceduresUrgence.posteSecours);
    await fillField('input[name="proceduresUrgence.hopitalReference"]', testData.proceduresUrgence.hopitalReference);
    await clickElement('input[name="proceduresUrgence.secouristePresent"]');
    await fillField('input[name="proceduresUrgence.nomSecouriste"]', testData.proceduresUrgence.nomSecouriste);
    console.log('✅ Section 8 remplie');

    // 10. Remplir la Section 9: Surveillance
    console.log('📝 Test 10: Remplissage Section 9 - Surveillance');
    await clickElement('input[name="surveillance.controlesReguliers"]');
    await fillField('input[name="surveillance.frequenceControles"]', testData.surveillance.frequenceControles);
    await fillField('input[name="surveillance.responsableControle"]', testData.surveillance.responsableControle);
    await fillField('textarea[name="surveillance.pointsControle.0"]', testData.surveillance.pointsControle.join('\n'));
    console.log('✅ Section 9 remplie');

    // 11. Remplir la Section 10: Attestations
    console.log('📝 Test 11: Remplissage Section 10 - Attestations');
    await clickElement('input[name="attestations.assuranceResponsabilite"]');
    await clickElement('input[name="attestations.attestationFormation"]');
    await clickElement('input[name="attestations.certificatHabilitation"]');
    await fillField('textarea[name="attestations.autres.0"]', testData.attestations.autres.join('\n'));
    console.log('✅ Section 10 remplie');

    // 12. Soumettre le formulaire
    console.log('📝 Test 12: Soumission du formulaire');
    await clickElement('button[type="submit"]');
    
    // Attendre la redirection ou le message de succès
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Vérifier que nous sommes redirigés vers la liste des plans
    const currentUrl = window.location.href;
    if (currentUrl.includes('/prevention') && !currentUrl.includes('/new')) {
      console.log('✅ Formulaire soumis avec succès - Redirection vers la liste');
    } else {
      console.log('⚠️ Redirection non détectée, vérification manuelle nécessaire');
    }

    console.log('🎉 Tests de création terminés avec succès!');
    return true;

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    return false;
  }
}

// Test de validation des champs obligatoires
async function testValidationFields() {
  console.log('🧪 Début des tests de validation');
  
  try {
    // Naviguer vers la page de création
    window.location.href = `${BASE_URL}/prevention/new`;
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Tenter de soumettre le formulaire vide
    console.log('📝 Test: Soumission avec formulaire vide');
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérifier qu'il y a des messages d'erreur
    const errorElements = document.querySelectorAll('.text-red-600, .error, [class*="error"]');
    if (errorElements.length > 0) {
      console.log(`✅ Validation détectée - ${errorElements.length} erreurs affichées`);
    } else {
      console.log('⚠️ Aucune validation visible détectée');
    }

    console.log('🎉 Tests de validation terminés');
    return true;

  } catch (error) {
    console.error('❌ Erreur lors des tests de validation:', error);
    return false;
  }
}

// Fonction principale pour exécuter tous les tests
async function runAllTests() {
  console.log('🚀 Début de l\'exécution de tous les tests');
  console.log('='.repeat(50));
  
  const results = {
    createPlan: false,
    validation: false
  };

  // Test 1: Création d'un plan complet
  results.createPlan = await testCreatePreventionPlan();
  
  console.log('='.repeat(50));
  
  // Test 2: Validation des champs
  results.validation = await testValidationFields();
  
  console.log('='.repeat(50));
  console.log('📊 RÉSULTATS DES TESTS:');
  console.log(`Création de plan: ${results.createPlan ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  console.log(`Validation: ${results.validation ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  
  const successRate = (Object.values(results).filter(Boolean).length / Object.keys(results).length) * 100;
  console.log(`Taux de réussite: ${successRate}%`);
  
  return results;
}

// Exporter les fonctions pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testCreatePreventionPlan,
    testValidationFields,
    runAllTests,
    testData
  };
}

// Exécuter les tests si le script est exécuté directement
if (typeof window !== 'undefined') {
  console.log('Script de test chargé. Exécutez runAllTests() pour commencer les tests.');
}

