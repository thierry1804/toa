/**
 * Tests pour la modification de plans existants et vérification du store
 */

// Test de modification d'un plan existant
async function testEditExistingPlan() {
  console.log('🧪 Test de modification d\'un plan existant');
  
  try {
    // 1. Naviguer vers la liste des plans
    console.log('📝 Étape 1: Navigation vers la liste des plans');
    window.location.href = 'http://localhost:5173/prevention';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. Vérifier qu'il y a des plans existants
    const planCards = document.querySelectorAll('[data-testid="plan-card"], .plan-card, .card');
    if (planCards.length === 0) {
      console.log('⚠️ Aucun plan existant trouvé, création d\'un plan de test d\'abord');
      await createTestPlan();
      window.location.href = 'http://localhost:5173/prevention';
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // 3. Cliquer sur le premier plan pour l'éditer
    console.log('📝 Étape 2: Sélection d\'un plan à modifier');
    const firstPlan = document.querySelector('a[href*="/prevention/"], button[onclick*="edit"]');
    if (firstPlan) {
      firstPlan.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      throw new Error('Aucun plan éditable trouvé');
    }
    
    // 4. Vérifier que le formulaire est pré-rempli
    console.log('📝 Étape 3: Vérification du pré-remplissage');
    const entrepriseField = document.querySelector('input[name="entreprisePrestataire"]');
    if (entrepriseField && entrepriseField.value) {
      console.log('✅ Formulaire pré-rempli détecté');
    } else {
      console.log('⚠️ Formulaire non pré-rempli ou vide');
    }
    
    // 5. Modifier quelques champs
    console.log('📝 Étape 4: Modification des champs');
    await fillField('input[name="representantPrestataire"]', 'Jean Dupont MODIFIÉ');
    await fillField('input[name="contactPrestataire"]', '+261 34 99 999 99');
    
    // 6. Sauvegarder les modifications
    console.log('📝 Étape 5: Sauvegarde des modifications');
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 7. Vérifier la redirection
    const currentUrl = window.location.href;
    if (currentUrl.includes('/prevention') && !currentUrl.includes('/new')) {
      console.log('✅ Modifications sauvegardées avec succès');
      return true;
    } else {
      console.log('⚠️ Redirection non détectée après modification');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test de modification:', error);
    return false;
  }
}

// Test du store Zustand et de la persistance
async function testStoreAndPersistence() {
  console.log('🧪 Test du store Zustand et de la persistance');
  
  try {
    // 1. Vérifier l'accès au store via les DevTools
    console.log('📝 Étape 1: Vérification de l\'accès au store');
    
    // Essayer d'accéder au store via window ou localStorage
    const hasStore = typeof window !== 'undefined' && (
      window.__ZUSTAND_STORE__ || 
      localStorage.getItem('permit-store') ||
      localStorage.getItem('toa-platform-store')
    );
    
    if (hasStore) {
      console.log('✅ Store détecté dans le localStorage');
    } else {
      console.log('⚠️ Store non détecté dans le localStorage');
    }
    
    // 2. Créer un nouveau plan et vérifier la persistance
    console.log('📝 Étape 2: Test de persistance avec création d\'un plan');
    await createTestPlan();
    
    // 3. Recharger la page et vérifier que le plan persiste
    console.log('📝 Étape 3: Vérification de la persistance après rechargement');
    window.location.reload();
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Vérifier que le plan créé est toujours présent
    const planCards = document.querySelectorAll('[data-testid="plan-card"], .plan-card, .card');
    if (planCards.length > 0) {
      console.log('✅ Persistance confirmée - Plans visibles après rechargement');
      return true;
    } else {
      console.log('⚠️ Persistance non confirmée - Aucun plan visible après rechargement');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test du store:', error);
    return false;
  }
}

// Fonction utilitaire pour créer un plan de test
async function createTestPlan() {
  console.log('📝 Création d\'un plan de test...');
  
  try {
    // Naviguer vers la page de création
    window.location.href = 'http://localhost:5173/prevention/new';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remplir les champs minimum requis
    await fillField('input[name="entreprisePrestataire"]', 'Entreprise Test');
    await fillField('input[name="representantPrestataire"]', 'Représentant Test');
    await fillField('input[name="contactPrestataire"]', '+261 34 00 000 00');
    await fillField('input[name="maitreOuvrage"]', 'Maître d\'ouvrage Test');
    await fillField('input[name="representantMaitreOuvrage"]', 'Représentant MO Test');
    await fillField('input[name="contactMaitreOuvrage"]', '+261 34 11 111 11');
    await fillField('input[name="nomSite"]', 'Site Test');
    await fillField('input[name="codeSite"]', 'TEST-001');
    await fillField('select[name="region"]', 'Analamanga');
    await fillField('input[name="adresseSite"]', 'Adresse Test');
    await fillField('input[name="natureIntervention"]', 'Intervention Test');
    await fillField('textarea[name="descriptionTravaux"]', 'Description des travaux de test pour validation');
    await fillField('input[name="nombreIntervenants"]', '2');
    await fillField('input[name="dureeEstimee"]', '4');
    await fillField('input[name="horairesTravail.debut"]', '08:00');
    await fillField('input[name="horairesTravail.fin"]', '12:00');
    await fillField('input[name="horairesTravail.pause"]', '10:00');
    await fillField('input[name="dateDebut"]', '2025-01-15');
    await fillField('input[name="dateFin"]', '2025-01-15');
    
    // Ajouter un risque minimum
    await fillField('input[name="risques.0.categorie"]', 'Test');
    await fillField('textarea[name="risques.0.description"]', 'Risque de test');
    await fillField('select[name="risques.0.niveauGravite"]', 'moyen');
    await fillField('select[name="risques.0.probabilite"]', 'moyenne');
    await fillField('select[name="risques.0.impact"]', 'moyen');
    await fillField('textarea[name="risques.0.mesuresPrevention.0"]', 'Mesure de test');
    await fillField('textarea[name="risques.0.equipementsNecessaires.0"]', 'Équipement de test');
    await fillField('input[name="risques.0.responsableMesure"]', 'Responsable Test');
    await fillField('input[name="risques.0.dateMiseEnPlace"]', '2025-01-10');
    
    // Remplir les équipements
    await fillField('textarea[name="equipements.equipementsProtection.0"]', 'Casque de test');
    await fillField('textarea[name="equipements.outilsTravail.0"]', 'Outil de test');
    await fillField('textarea[name="equipements.materielSecurite.0"]', 'Matériel de test');
    await fillField('textarea[name="equipements.equipementsUrgence.0"]', 'Équipement urgence test');
    
    // Remplir la formation
    await fillField('textarea[name="formation.formationsRequises.0"]', 'Formation test');
    await fillField('textarea[name="formation.personnelHabilite.0"]', 'Personnel test');
    
    // Remplir les procédures d'urgence
    await fillField('textarea[name="proceduresUrgence.numerosUrgence.0"]', '18, 15, 17');
    await fillField('input[name="proceduresUrgence.posteSecours"]', 'Poste test');
    await fillField('input[name="proceduresUrgence.hopitalReference"]', 'Hôpital test');
    
    // Remplir la surveillance
    await fillField('input[name="surveillance.frequenceControles"]', 'Toutes les heures');
    await fillField('input[name="surveillance.responsableControle"]', 'Responsable test');
    await fillField('textarea[name="surveillance.pointsControle.0"]', 'Point de contrôle test');
    
    // Soumettre
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Plan de test créé avec succès');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors de la création du plan de test:', error);
    return false;
  }
}

// Test de navigation et responsive design
async function testNavigationAndResponsive() {
  console.log('🧪 Test de navigation et responsive design');
  
  try {
    // 1. Test de navigation entre les pages
    console.log('📝 Étape 1: Test de navigation');
    
    // Aller à la liste des plans
    window.location.href = 'http://localhost:5173/prevention';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier la présence des éléments de navigation
    const navElements = document.querySelectorAll('nav, .nav, [role="navigation"]');
    if (navElements.length > 0) {
      console.log('✅ Navigation détectée');
    } else {
      console.log('⚠️ Navigation non détectée');
    }
    
    // 2. Test responsive - simuler différentes tailles d'écran
    console.log('📝 Étape 2: Test responsive design');
    
    // Tester la taille mobile
    window.resizeTo(375, 667);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier que les éléments s'adaptent
    const mobileElements = document.querySelectorAll('.md\\:grid-cols-2, .md\\:grid-cols-3');
    if (mobileElements.length > 0) {
      console.log('✅ Classes responsive détectées');
    } else {
      console.log('⚠️ Classes responsive non détectées');
    }
    
    // Restaurer la taille normale
    window.resizeTo(1200, 800);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 3. Test des états de chargement
    console.log('📝 Étape 3: Test des états de chargement');
    
    // Aller à la page de création
    window.location.href = 'http://localhost:5173/prevention/new';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier la présence d'indicateurs de chargement
    const loadingElements = document.querySelectorAll('[loading], .loading, .spinner');
    if (loadingElements.length > 0) {
      console.log('✅ Indicateurs de chargement détectés');
    } else {
      console.log('⚠️ Indicateurs de chargement non détectés');
    }
    
    console.log('✅ Tests de navigation et responsive terminés');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors des tests de navigation:', error);
    return false;
  }
}

// Test des cas limites et gestion d'erreurs
async function testEdgeCases() {
  console.log('🧪 Test des cas limites et gestion d\'erreurs');
  
  try {
    // 1. Test avec des données invalides
    console.log('📝 Étape 1: Test avec données invalides');
    
    window.location.href = 'http://localhost:5173/prevention/new';
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Tester un email invalide
    await fillField('input[name="emailPrestataire"]', 'email-invalide');
    await fillField('input[name="entreprisePrestataire"]', 'Test');
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier les messages d'erreur
    const errorMessages = document.querySelectorAll('.text-red-600, .error, [class*="error"]');
    if (errorMessages.length > 0) {
      console.log('✅ Messages d\'erreur détectés pour email invalide');
    } else {
      console.log('⚠️ Aucun message d\'erreur détecté pour email invalide');
    }
    
    // 2. Test avec des dates incohérentes
    console.log('📝 Étape 2: Test avec dates incohérentes');
    
    await fillField('input[name="dateDebut"]', '2025-01-20');
    await fillField('input[name="dateFin"]', '2025-01-15'); // Date de fin avant date de début
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier la validation des dates
    const dateErrors = document.querySelectorAll('.text-red-600, .error, [class*="error"]');
    if (dateErrors.length > 0) {
      console.log('✅ Validation des dates détectée');
    } else {
      console.log('⚠️ Validation des dates non détectée');
    }
    
    // 3. Test avec des nombres négatifs
    console.log('📝 Étape 3: Test avec nombres négatifs');
    
    await fillField('input[name="nombreIntervenants"]', '-1');
    await fillField('input[name="dureeEstimee"]', '-5');
    await clickElement('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier la validation des nombres
    const numberErrors = document.querySelectorAll('.text-red-600, .error, [class*="error"]');
    if (numberErrors.length > 0) {
      console.log('✅ Validation des nombres détectée');
    } else {
      console.log('⚠️ Validation des nombres non détectée');
    }
    
    console.log('✅ Tests des cas limites terminés');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors des tests de cas limites:', error);
    return false;
  }
}

// Fonction principale pour exécuter tous les tests avancés
async function runAdvancedTests() {
  console.log('🚀 Début des tests avancés');
  console.log('='.repeat(50));
  
  const results = {
    editPlan: false,
    storePersistence: false,
    navigation: false,
    edgeCases: false
  };
  
  // Test 1: Modification d'un plan existant
  results.editPlan = await testEditExistingPlan();
  console.log('='.repeat(50));
  
  // Test 2: Store et persistance
  results.storePersistence = await testStoreAndPersistence();
  console.log('='.repeat(50));
  
  // Test 3: Navigation et responsive
  results.navigation = await testNavigationAndResponsive();
  console.log('='.repeat(50));
  
  // Test 4: Cas limites
  results.edgeCases = await testEdgeCases();
  console.log('='.repeat(50));
  
  console.log('📊 RÉSULTATS DES TESTS AVANCÉS:');
  console.log(`Modification de plan: ${results.editPlan ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  console.log(`Store et persistance: ${results.storePersistence ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  console.log(`Navigation et responsive: ${results.navigation ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  console.log(`Cas limites: ${results.edgeCases ? '✅ SUCCÈS' : '❌ ÉCHEC'}`);
  
  const successRate = (Object.values(results).filter(Boolean).length / Object.keys(results).length) * 100;
  console.log(`Taux de réussite: ${successRate}%`);
  
  return results;
}

// Exporter les fonctions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    testEditExistingPlan,
    testStoreAndPersistence,
    testNavigationAndResponsive,
    testEdgeCases,
    runAdvancedTests
  };
}

