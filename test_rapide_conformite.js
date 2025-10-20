/**
 * Test Rapide de Conformité - Permis de Travail en Hauteur
 * 
 * Script simple pour vérifier rapidement les corrections appliquées
 * 
 * Instructions:
 * 1. Ouvrir http://localhost:5174
 * 2. Se connecter et naviguer vers le formulaire de permis de hauteur
 * 3. Ouvrir la console (F12)
 * 4. Coller ce script et exécuter
 */

console.log('🔍 Test Rapide de Conformité - Permis de Travail en Hauteur');
console.log('==========================================================');

// Fonction pour vérifier la présence d'un texte
function checkText(text, description) {
  const found = document.body.textContent.includes(text);
  console.log(`${found ? '✅' : '❌'} ${description}: "${text}"`);
  return found;
}

// Fonction pour vérifier la présence d'un élément
function checkElement(selector, description) {
  const found = document.querySelector(selector) !== null;
  console.log(`${found ? '✅' : '❌'} ${description}: ${selector}`);
  return found;
}

// Test rapide des corrections principales
function quickConformityTest() {
  console.log('\n📋 Vérification des corrections principales...\n');
  
  let passed = 0;
  let total = 0;
  
  // Test 1: Nouveaux champs ajoutés
  console.log('🔧 NOUVEAUX CHAMPS:');
  total++; if (checkText('Référence du plan de prévention', 'Plan de prévention')) passed++;
  total++; if (checkText('Prestataires - Sous-traitants', 'Prestataires')) passed++;
  total++; if (checkElement('input[type="date"]', 'Champs dates')) passed++;
  total++; if (checkText('Engagement du demandeur', 'Engagement')) passed++;
  
  // Test 2: Libellés corrigés
  console.log('\n📝 LIBELLÉS CORRIGÉS:');
  total++; if (checkText('Hauteur de chute potentielle', 'Hauteur (libellé complet)')) passed++;
  total++; if (checkText('Description de l\'opération / travaux', 'Description (libellé complet)')) passed++;
  total++; if (checkText('Nom du site', 'Site (libellé correct)')) passed++;
  total++; if (checkText('Electrisation / Electrocution', 'Électrisation (libellé complet)')) passed++;
  total++; if (checkText('Déversement accidentel', 'Déversement (libellé complet)')) passed++;
  total++; if (checkText('Blessure (coupure…)', 'Blessure (libellé complet)')) passed++;
  total++; if (checkText('Echelle crinoline', 'Échelle crinoline (sans "à")')) passed++;
  total++; if (checkText('Casque avec jugulaire', 'Casque (libellé correct)')) passed++;
  total++; if (checkText('Gants de peinture nitrile', 'Gants nitrile (libellé complet)')) passed++;
  total++; if (checkText('Gants isolant électrique', 'Gants isolants (libellé complet)')) passed++;
  
  // Test 3: Options de pente corrigées
  console.log('\n📐 OPTIONS DE PENTE:');
  total++; if (checkText('Toit plat', 'Pente plat')) passed++;
  total++; if (checkText('Légère pente < 20°', 'Pente légère')) passed++;
  total++; if (checkText('Forte pente ≥ 20° et < 45°', 'Pente forte')) passed++;
  total++; if (checkText('Très forte pente ≥ 45° et < 60°', 'Pente très forte')) passed++;
  total++; if (checkText('Pente extrême ≥ 60°', 'Pente extrême')) passed++;
  
  // Test 4: Options de hauteur
  console.log('\n📏 OPTIONS DE HAUTEUR:');
  total++; if (checkText('Hauteur ≤ 3m', 'Hauteur ≤ 3m')) passed++;
  total++; if (checkText('3m < hauteur ≤ 8m', 'Hauteur 3-8m')) passed++;
  total++; if (checkText('8m < hauteur ≤ 40m', 'Hauteur 8-40m')) passed++;
  total++; if (checkText('Hauteur > 40m', 'Hauteur > 40m')) passed++;
  
  // Test 5: Mesures de prévention
  console.log('\n🛡️ MESURES DE PRÉVENTION:');
  total++; if (checkText('Personnel habilité (formé et compétent)', 'Personnel habilité (complet)')) passed++;
  total++; if (checkText('Personnel apte médicalement', 'Personnel apte (complet)')) passed++;
  total++; if (checkText('Balisage de la zone de travaux', 'Balisage (complet)')) passed++;
  total++; if (checkText('Travail à 2 obligatoire', 'Travail à 2 (complet)')) passed++;
  total++; if (checkText('Mesure de la vitesse du vent', 'Mesure vent (complet)')) passed++;
  total++; if (checkText('Echelle en bon état (barreaux, montants, patins antidérapants)', 'Échelle (complet)')) passed++;
  
  // Test 6: Logique métier
  console.log('\n⚙️ LOGIQUE MÉTIER:');
  total++; if (checkText('Le plan de sauvetage est obligatoire pour les travaux en hauteur supérieure à 20 mètres', 'Message sauvetage > 20m')) passed++;
  total++; if (checkText('En tant que demandeur de ce permis, je m\'engage à respecter', 'Texte engagement complet')) passed++;
  
  // Test 7: Récapitulatif
  console.log('\n📊 RÉCAPITULATIF:');
  total++; if (checkText('Plan de prévention:', 'Récap plan')) passed++;
  total++; if (checkText('Prestataire:', 'Récap prestataire')) passed++;
  total++; if (checkText('Période:', 'Récap période')) passed++;
  total++; if (checkText('Travail en toiture:', 'Récap toiture')) passed++;
  
  // Résumé
  console.log('\n📊 RÉSUMÉ:');
  console.log(`✅ Tests réussis: ${passed}/${total}`);
  console.log(`📈 Taux de conformité: ${Math.round((passed/total)*100)}%`);
  
  if (passed === total) {
    console.log('\n🎉 PARFAIT ! Toutes les corrections sont appliquées.');
    console.log('Le formulaire est conforme au PDF de référence.');
  } else if (passed >= total * 0.9) {
    console.log('\n✅ EXCELLENT ! Presque toutes les corrections sont appliquées.');
    console.log('Quelques détails mineurs à vérifier.');
  } else if (passed >= total * 0.7) {
    console.log('\n⚠️ BON ! La plupart des corrections sont appliquées.');
    console.log('Quelques éléments importants à vérifier.');
  } else {
    console.log('\n❌ ATTENTION ! Plusieurs corrections semblent manquantes.');
    console.log('Vérifiez que vous êtes sur la bonne page du formulaire.');
  }
  
  return { passed, total, percentage: Math.round((passed/total)*100) };
}

// Instructions
console.log('\n📖 INSTRUCTIONS:');
console.log('1. Assurez-vous d\'être sur le formulaire de permis de hauteur');
console.log('2. Exécutez: quickConformityTest()');
console.log('3. Consultez les résultats ci-dessus');

// Exporter la fonction
window.quickConformityTest = quickConformityTest;

console.log('\n🚀 Prêt ! Exécutez: quickConformityTest()');
