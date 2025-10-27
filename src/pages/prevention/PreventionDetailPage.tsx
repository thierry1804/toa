import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePreventionStore } from '@/store/preventionStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ValidationChefModal from '@/components/prevention/ValidationChefModal';
import ValidationHSEModal from '@/components/prevention/ValidationHSEModal';
import { ArrowLeft, Edit, Printer, Download, Shield, AlertTriangle, Clock, MapPin, Building, FileText, CheckCircle, Send } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PreventionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getPlanPreventionById,
    soumettreValidationChef,
    validerParChef,
    refuserParChef,
    validerParHSE,
    refuserParHSE
  } = usePreventionStore();
  const { user, canAccessFeature } = useAuthStore();

  const [showValidationChefModal, setShowValidationChefModal] = useState(false);
  const [showValidationHSEModal, setShowValidationHSEModal] = useState(false);

  const plan = getPlanPreventionById(id || '');

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Shield className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Plan de prévention non trouvé</h3>
        <p className="text-gray-500 mt-2">Le plan demandé n'existe pas ou a été supprimé.</p>
        <Button onClick={() => navigate('/prevention')} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
      </div>
    );
  }

  const getRisqueLevel = (niveau: string) => {
    switch (niveau) {
      case 'critique':
        return { label: 'Critique', color: 'bg-red-100 text-red-800' };
      case 'eleve':
        return { label: 'Élevé', color: 'bg-orange-100 text-orange-800' };
      case 'moyen':
        return { label: 'Moyen', color: 'bg-yellow-100 text-yellow-800' };
      default:
        return { label: 'Faible', color: 'bg-green-100 text-green-800' };
    }
  };

  const handleSoumettre = () => {
    if (confirm('Voulez-vous soumettre ce plan pour validation par le Chef de Projet ?')) {
      soumettreValidationChef(plan.id);
    }
  };

  const handleValiderChef = (commentaires?: string) => {
    validerParChef(plan.id, user?.email || '', commentaires);
    setShowValidationChefModal(false);
  };

  const handleRefuserChef = (motif: string) => {
    refuserParChef(plan.id, user?.email || '', motif);
    setShowValidationChefModal(false);
  };

  const handleValiderHSE = (reference: string, commentaires?: string) => {
    validerParHSE(plan.id, user?.email || '', reference, commentaires);
    setShowValidationHSEModal(false);
  };

  const handleRefuserHSE = (motif: string) => {
    refuserParHSE(plan.id, user?.email || '', motif);
    setShowValidationHSEModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimer
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>

          {/* Boutons de workflow selon le statut et le rôle */}
          {plan.status === 'brouillon' && user?.role === 'prestataire' && (
            <Button onClick={handleSoumettre}>
              <Send className="h-4 w-4 mr-2" />
              Soumettre pour validation
            </Button>
          )}

          {plan.status === 'soumis_validation_chef' && user?.role === 'chef_projet' && canAccessFeature('validate_prevention_plans_chef') && (
            <Button onClick={() => setShowValidationChefModal(true)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Valider
            </Button>
          )}

          {plan.status === 'valide_chef_attente_hse' && user?.role === 'hse' && canAccessFeature('validate_prevention_plans_hse') && (
            <Button onClick={() => setShowValidationHSEModal(true)}>
              <Shield className="h-4 w-4 mr-2" />
              Valider (HSE)
            </Button>
          )}

          {plan.status === 'valide' && (
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary-600" />
                <CardTitle className="text-2xl">{plan.reference}</CardTitle>
              </div>
              <p className="text-gray-500 mt-1">
                Créé le {formatDate(plan.createdAt)} • Dernière mise à jour le {formatDate(plan.updatedAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                plan.status === 'valide' 
                  ? 'bg-green-100 text-green-800' 
                  : plan.status === 'en_cours' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {plan.status === 'valide' ? 'Validé' : plan.status === 'en_cours' ? 'En cours' : 'Brouillon'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informations générales */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-2" />
                  Entreprise prestataire
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{plan.entreprisePrestataire}</p>
                  <p className="text-sm text-gray-600">Numéro RCS: {plan.numeroRCS}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Représentant:</span> {plan.representantPrestataire}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Fonction:</span> {plan.qualiteFonctionRepresentant}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  Localisation
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{plan.nomSite}</p>
                  <p className="text-sm">{plan.siegeSocial}</p>
                  <p className="text-sm">
                    {plan.localite}, {plan.commune}, {plan.region}
                  </p>
                  {plan.coordonneesGPS && (
                    <p className="text-sm text-gray-500 mt-1">
                      Coordonnées GPS: {plan.coordonneesGPS}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  Période d'intervention
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date de début</p>
                      <p>{formatDate(plan.dateDebut)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date de fin</p>
                      <p>{formatDate(plan.dateFin)}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-500 mb-2">Horaires de travail</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Début</p>
                        <p>{plan.horairesTravail?.debut || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fin</p>
                        <p>{plan.horairesTravail?.fin || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Pause</p>
                        <p>{plan.horairesTravail?.pause || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nature des travaux et risques */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  Nature de l'intervention
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">{plan.natureIntervention}</p>
                  <p className="text-sm text-gray-700">{plan.descriptionTravaux}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm">
                      <span className="font-medium">Nombre d'intervenants:</span> {plan.nombreIntervenants}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Durée estimée:</span> {plan.dureeEstimee} heures
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  Risques identifiés
                </h3>
                <div className="space-y-3">
                  {plan.risques.map((risque, index) => {
                    const niveau = getRisqueLevel(risque.niveauGravite);
                    return (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{risque.description}</p>
                            <p className="text-sm text-gray-600 mt-1">{risque.categorie}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${niveau.color}`}>
                            {niveau.label}
                          </span>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">Mesures de prévention:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {risque.mesuresPrevention.map((mesure, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>{mesure}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {risque.equipementsNecessaires && risque.equipementsNecessaires.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Équipements nécessaires:</p>
                              <div className="flex flex-wrap gap-1.5">
                                {risque.equipementsNecessaires.map((equipement, i) => (
                                  <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {equipement}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals de validation */}
      <ValidationChefModal
        isOpen={showValidationChefModal}
        onClose={() => setShowValidationChefModal(false)}
        onValidate={handleValiderChef}
        onReject={handleRefuserChef}
        plan={plan}
      />

      <ValidationHSEModal
        isOpen={showValidationHSEModal}
        onClose={() => setShowValidationHSEModal(false)}
        onValidate={handleValiderHSE}
        onReject={handleRefuserHSE}
        plan={plan}
      />
    </div>
  );
}
