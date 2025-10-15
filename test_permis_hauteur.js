/**
 * Script de Test Automatisé - Permis de Travail en Hauteur
 * 
 * Instructions d'utilisation:
 * 1. Ouvrir http://localhost:5174 dans le navigateur
 * 2. Se connecter comme Prestataire
 * 3. Ouvrir la console développeur (F12)
 * 4. Coller ce script et l'exécuter
 * 5. Suivre les instructions affichées
 */

console.log('🚀 Démarrage des tests - Permis de Travail en Hauteur');
console.log('====================================================');

// Configuration des tests
const TEST_CONFIG = {
  baseUrl: 'http://localhost:5174',
  testData: {
    prestataire: 'ACME Construction SARL',
    description: 'Installation d\'antennes sur pylône de 35 mètres',
    codeSite: 'ANT-007',
    region: 'Analamanga',
    nombreIntervenants: 3,
    hauteurChute: '8-40m', // Pour tester la logique > 20m
    travailToiture: true,
    typePente: 'forte'
  }
};

// Fonction utilitaire pour attendre
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction pour vérifier si un élément existe
const elementExists = (selector) => {
  return document.querySelector(selector) !== null;
};

// Fonction pour vérifier le texte d'un élément
const getElementText = (selector) => {
  const element = document.querySelector(selector);
  return element ? element.textContent.trim() : null;
};

// Fonction pour vérifier si un checkbox est coché
const isCheckboxChecked = (selector) => {
  const checkbox = document.querySelector(selector);
  return checkbox ? checkbox.checked : false;
};

// Fonction pour simuler un clic
const clickElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.click();
    return true;
  }
  return false;
};

// Fonction pour remplir un champ
const fillField = (selector, value) => {
  const field = document.querySelector(selector);
  if (field) {
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }
  return false;
};

// Test 1: Vérification de la page d'accueil
async function testPageLoad() {
  console.log('\n📋 Test 1: Vérification de la page d\'accueil');
  
  // Vérifier que nous sommes sur la bonne page
  if (window.location.href.includes('localhost:5174')) {
    console.log('✅ Page chargée correctement');
  } else {
    console.log('❌ Mauvaise URL:', window.location.href);
    return false;
  }
  
  // Vérifier la présence d'éléments de base
  const hasLogin = elementExists('input[type="email"]') || elementExists('button[type="submit"]');
  if (hasLogin) {
    console.log('✅ Page de connexion détectée');
    console.log('⚠️  Veuillez vous connecter comme Prestataire avant de continuer');
    return 'login_required';
  }
  
  return true;
}

// Test 2: Navigation vers le formulaire de permis
async function testNavigationToForm() {
  console.log('\n📋 Test 2: Navigation vers le formulaire de permis');
  
  // Chercher le lien ou bouton pour créer un permis de hauteur
  const possibleSelectors = [
    'a[href*="hauteur"]',
    'button:contains("hauteur")',
    'a:contains("Permis")',
    'button:contains("Nouveau")',
    'a:contains("Créer")'
  ];
  
  let found = false;
  for (const selector of possibleSelectors) {
    if (elementExists(selector)) {
      console.log(`✅ Élément trouvé: ${selector}`);
      found = true;
      break;
    }
  }
  
  if (!found) {
    console.log('❌ Impossible de trouver le lien vers le formulaire de permis');
    console.log('🔍 Éléments disponibles sur la page:');
    const links = document.querySelectorAll('a, button');
    links.forEach((el, i) => {
      if (i < 10) { // Limiter l'affichage
        console.log(`  - ${el.tagName}: "${el.textContent.trim()}"`);
      }
    });
    return false;
  }
  
  return true;
}

// Test 3: Vérification de l'étape 1 - Champs conformes au PDF
async function testStep1Fields() {
  console.log('\n📋 Test 3: Vérification de l\'étape 1 - Champs conformes au PDF');
  
  const expectedFields = [
    { selector: 'select, input[type="text"]', label: 'Plan de prévention' },
    { selector: 'input[placeholder*="prestataire"], input[placeholder*="entreprise"]', label: 'Prestataires' },
    { selector: 'input[type="date"]', label: 'Dates (début/fin)' },
    { selector: 'textarea', label: 'Description opération' },
    { selector: 'input[placeholder*="ANT"]', label: 'Nom du site' },
    { selector: 'input[placeholder*="Analamanga"]', label: 'Région' },
    { selector: 'input[type="number"]', label: 'Nombre d\'intervenants' },
    { selector: 'select', label: 'Hauteur de chute potentielle' }
  ];
  
  let allFieldsFound = true;
  
  for (const field of expectedFields) {
    if (elementExists(field.selector)) {
      console.log(`✅ ${field.label}: trouvé`);
    } else {
      console.log(`❌ ${field.label}: manquant`);
      allFieldsFound = false;
    }
  }
  
  // Vérifier les libellés spécifiques
  const pageText = document.body.textContent;
  const expectedLabels = [
    'Hauteur de chute potentielle',
    'Description de l\'opération / travaux',
    'Prestataires - Sous-traitants',
    'Nom du site'
  ];
  
  for (const label of expectedLabels) {
    if (pageText.includes(label)) {
      console.log(`✅ Libellé correct: "${label}"`);
    } else {
      console.log(`❌ Libellé manquant ou incorrect: "${label}"`);
      allFieldsFound = false;
    }
  }
  
  return allFieldsFound;
}

// Test 4: Vérification des options de hauteur
async function testHeightOptions() {
  console.log('\n📋 Test 4: Vérification des options de hauteur');
  
  const expectedOptions = [
    'Hauteur ≤ 3m',
    '3m < hauteur ≤ 8m',
    '8m < hauteur ≤ 40m',
    'Hauteur > 40m'
  ];
  
  const pageText = document.body.textContent;
  let allOptionsFound = true;
  
  for (const option of expectedOptions) {
    if (pageText.includes(option)) {
      console.log(`✅ Option correcte: "${option}"`);
    } else {
      console.log(`❌ Option manquante ou incorrecte: "${option}"`);
      allOptionsFound = false;
    }
  }
  
  return allOptionsFound;
}

// Test 5: Vérification des options de pente
async function testSlopeOptions() {
  console.log('\n📋 Test 5: Vérification des options de pente');
  
  const expectedSlopes = [
    'Toit plat',
    'Légère pente < 20°',
    'Forte pente ≥ 20° et < 45°',
    'Très forte pente ≥ 45° et < 60°',
    'Pente extrême ≥ 60°'
  ];
  
  const pageText = document.body.textContent;
  let allSlopesFound = true;
  
  for (const slope of expectedSlopes) {
    if (pageText.includes(slope)) {
      console.log(`✅ Option de pente correcte: "${slope}"`);
    } else {
      console.log(`❌ Option de pente manquante: "${slope}"`);
      allSlopesFound = false;
    }
  }
  
  return allSlopesFound;
}

// Test 6: Vérification des risques (étape 2)
async function testRisksStep2() {
  console.log('\n📋 Test 6: Vérification des risques (étape 2)');
  
  const expectedRisks = [
    'Effondrement',
    'Incendie',
    'Déversement accidentel',
    'Electrisation / Electrocution',
    'Chute de personnes',
    'Blessure (coupure…)',
    'Chute d\'objet',
    'Exposition aux substances dangereuses',
    'Ecrasement',
    'Mauvaise condition météorologique'
  ];
  
  const pageText = document.body.textContent;
  let allRisksFound = true;
  
  for (const risk of expectedRisks) {
    if (pageText.includes(risk)) {
      console.log(`✅ Risque correct: "${risk}"`);
    } else {
      console.log(`❌ Risque manquant ou incorrect: "${risk}"`);
      allRisksFound = false;
    }
  }
  
  return allRisksFound;
}

// Test 7: Vérification des matériels (étape 3)
async function testMaterialsStep3() {
  console.log('\n📋 Test 7: Vérification des matériels (étape 3)');
  
  const expectedMaterials = [
    'Echafaudage roulant',
    'Echafaudage fixe',
    'Filet de sécurité',
    'Ligne de vie verticale',
    'Ligne de vie horizontale',
    'Point d\'ancrage',
    'Echelle crinoline', // Important: pas "à crinoline"
    'Plateforme élévatrice',
    'Travail sur cordes',
    'Echelle',
    'Escabeau'
  ];
  
  const pageText = document.body.textContent;
  let allMaterialsFound = true;
  
  for (const material of expectedMaterials) {
    if (pageText.includes(material)) {
      console.log(`✅ Matériel correct: "${material}"`);
    } else {
      console.log(`❌ Matériel manquant ou incorrect: "${material}"`);
      allMaterialsFound = false;
    }
  }
  
  return allMaterialsFound;
}

// Test 8: Vérification des mesures de prévention (étape 4)
async function testPreventionMeasuresStep4() {
  console.log('\n📋 Test 8: Vérification des mesures de prévention (étape 4)');
  
  const expectedMeasures = [
    'Personnel habilité (formé et compétent)',
    'Personnel apte médicalement',
    'Balisage de la zone de travaux',
    'Chaussures de sécurité',
    'Casque avec jugulaire',
    'Gants de peinture nitrile',
    'Gants isolant électrique',
    'Gants de manutention',
    'Bouchon d\'oreille',
    'Casque anti-bruit',
    'Longe avec absorbeur',
    'Double longe',
    'Lignes de vie conforme',
    'Harnais vérifié et conforme',
    'Echafaudage contrôlé et conforme',
    'Echelle en bon état (barreaux, montants, patins antidérapants)',
    'Sanglage des outils',
    'Travail à 2 obligatoire',
    'Mesure de la vitesse du vent'
  ];
  
  const pageText = document.body.textContent;
  let allMeasuresFound = true;
  
  for (const measure of expectedMeasures) {
    if (pageText.includes(measure)) {
      console.log(`✅ Mesure correcte: "${measure}"`);
    } else {
      console.log(`❌ Mesure manquante ou incorrecte: "${measure}"`);
      allMeasuresFound = false;
    }
  }
  
  return allMeasuresFound;
}

// Test 9: Vérification de l'engagement (étape 5)
async function testEngagementStep5() {
  console.log('\n📋 Test 9: Vérification de l\'engagement (étape 5)');
  
  const engagementText = 'En tant que demandeur de ce permis, je m\'engage à respecter la mise en œuvre des mesures de prévention mentionnées à chaque début de travaux impliquant un travail en hauteur';
  
  const pageText = document.body.textContent;
  
  if (pageText.includes(engagementText)) {
    console.log('✅ Texte d\'engagement complet trouvé');
    return true;
  } else {
    console.log('❌ Texte d\'engagement manquant ou incomplet');
    console.log('🔍 Texte recherché:', engagementText);
    return false;
  }
}

// Test 10: Vérification du message d'avertissement plan de sauvetage
async function testSauvetageWarning() {
  console.log('\n📋 Test 10: Vérification du message d\'avertissement plan de sauvetage');
  
  const warningText = 'Le plan de sauvetage est obligatoire pour les travaux en hauteur supérieure à 20 mètres';
  const pageText = document.body.textContent;
  
  if (pageText.includes(warningText)) {
    console.log('✅ Message d\'avertissement trouvé');
    return true;
  } else {
    console.log('❌ Message d\'avertissement manquant');
    console.log('🔍 Message recherché:', warningText);
    return false;
  }
}

// Test 11: Vérification du récapitulatif
async function testSummary() {
  console.log('\n📋 Test 11: Vérification du récapitulatif');
  
  const expectedSummaryFields = [
    'Plan de prévention',
    'Prestataire',
    'Période',
    'Site',
    'Opération',
    'Intervenants',
    'Hauteur de chute potentielle',
    'Travail en toiture'
  ];
  
  const pageText = document.body.textContent;
  let allSummaryFieldsFound = true;
  
  for (const field of expectedSummaryFields) {
    if (pageText.includes(field)) {
      console.log(`✅ Champ récapitulatif: "${field}"`);
    } else {
      console.log(`❌ Champ récapitulatif manquant: "${field}"`);
      allSummaryFieldsFound = false;
    }
  }
  
  return allSummaryFieldsFound;
}

// Test 12: Test de validation des champs obligatoires
async function testRequiredFieldsValidation() {
  console.log('\n📋 Test 12: Test de validation des champs obligatoires');
  
  // Essayer de soumettre sans remplir les champs
  const submitButton = document.querySelector('button[type="submit"], button:contains("Suivant"), button:contains("Soumettre")');
  
  if (submitButton) {
    submitButton.click();
    await wait(1000);
    
    // Vérifier la présence de messages d'erreur
    const errorMessages = document.querySelectorAll('.error, .text-red-500, [class*="error"]');
    
    if (errorMessages.length > 0) {
      console.log(`✅ Messages d'erreur détectés: ${errorMessages.length}`);
      errorMessages.forEach((error, i) => {
        if (i < 5) { // Limiter l'affichage
          console.log(`  - ${error.textContent.trim()}`);
        }
      });
      return true;
    } else {
      console.log('❌ Aucun message d\'erreur détecté');
      return false;
    }
  } else {
    console.log('❌ Bouton de soumission non trouvé');
    return false;
  }
}

// Fonction principale de test
async function runAllTests() {
  console.log('🎯 Démarrage de la suite de tests complète');
  console.log('==========================================');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  };
  
  const tests = [
    { name: 'Chargement de page', fn: testPageLoad },
    { name: 'Navigation vers formulaire', fn: testNavigationToForm },
    { name: 'Champs étape 1', fn: testStep1Fields },
    { name: 'Options de hauteur', fn: testHeightOptions },
    { name: 'Options de pente', fn: testSlopeOptions },
    { name: 'Risques étape 2', fn: testRisksStep2 },
    { name: 'Matériels étape 3', fn: testMaterialsStep3 },
    { name: 'Mesures prévention étape 4', fn: testPreventionMeasuresStep4 },
    { name: 'Engagement étape 5', fn: testEngagementStep5 },
    { name: 'Message sauvetage', fn: testSauvetageWarning },
    { name: 'Récapitulatif', fn: testSummary },
    { name: 'Validation champs obligatoires', fn: testRequiredFieldsValidation }
  ];
  
  for (const test of tests) {
    try {
      results.total++;
      console.log(`\n🧪 Exécution: ${test.name}`);
      
      const result = await test.fn();
      
      if (result === 'login_required') {
        console.log('⏭️  Test ignoré - Connexion requise');
        results.skipped++;
      } else if (result === true) {
        console.log(`✅ ${test.name}: RÉUSSI`);
        results.passed++;
      } else {
        console.log(`❌ ${test.name}: ÉCHEC`);
        results.failed++;
      }
    } catch (error) {
      console.log(`💥 ${test.name}: ERREUR - ${error.message}`);
      results.failed++;
    }
    
    await wait(500); // Pause entre les tests
  }
  
  // Résumé final
  console.log('\n📊 RÉSUMÉ DES TESTS');
  console.log('===================');
  console.log(`Total: ${results.total}`);
  console.log(`✅ Réussis: ${results.passed}`);
  console.log(`❌ Échecs: ${results.failed}`);
  console.log(`⏭️  Ignorés: ${results.skipped}`);
  console.log(`📈 Taux de réussite: ${Math.round((results.passed / (results.total - results.skipped)) * 100)}%`);
  
  if (results.failed === 0) {
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !');
    console.log('Le formulaire est conforme au PDF de référence.');
  } else {
    console.log('\n⚠️  Certains tests ont échoué.');
    console.log('Vérifiez les détails ci-dessus pour identifier les problèmes.');
  }
  
  return results;
}

// Instructions d'utilisation
console.log('\n📖 INSTRUCTIONS D\'UTILISATION:');
console.log('==============================');
console.log('1. Assurez-vous d\'être connecté comme Prestataire');
console.log('2. Naviguez vers le formulaire de permis de travail en hauteur');
console.log('3. Exécutez: runAllTests()');
console.log('4. Consultez les résultats dans la console');
console.log('\n💡 Pour exécuter tous les tests maintenant, tapez: runAllTests()');

// Exporter les fonctions pour utilisation manuelle
window.testPermisHauteur = {
  runAllTests,
  testPageLoad,
  testStep1Fields,
  testHeightOptions,
  testSlopeOptions,
  testRisksStep2,
  testMaterialsStep3,
  testPreventionMeasuresStep4,
  testEngagementStep5,
  testSauvetageWarning,
  testSummary,
  testRequiredFieldsValidation
};

console.log('\n🔧 Fonctions disponibles:');
console.log('- testPermisHauteur.runAllTests() : Exécuter tous les tests');
console.log('- testPermisHauteur.testStep1Fields() : Tester l\'étape 1');
console.log('- testPermisHauteur.testEngagementStep5() : Tester l\'engagement');
console.log('- etc...');


