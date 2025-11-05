import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterventionStore } from '@/store/interventionStore';
import { useAuthStore } from '@/store/authStore';
import { usePermitStore } from '@/store/permitStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import { format } from 'date-fns';

interface InterventionFormProps {
  interventionId?: string;
}

export default function InterventionForm({ interventionId }: InterventionFormProps) {
  const navigate = useNavigate();
  const { addIntervention, updateIntervention, getInterventionById } = useInterventionStore();
  const { user } = useAuthStore();
  const { permisGeneraux, plansPrevention } = usePermitStore();
  const isEditMode = !!interventionId;

  const [formData, setFormData] = useState({
    reference: `INT-${format(new Date(), 'yyyyMMdd-HHmm')}`,
    permisId: '',
    permisReference: '',
    planPreventionId: '',
    prestataire: '',
    nomSite: '',
    codeSite: '',
    region: '',
    description: '',
    typeIntervention: '',
    dateDebut: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    dateFin: format(new Date(Date.now() + 8 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"), // Default to 8 hours later
    nombreIntervenants: 1,
    responsableChantier: '',
    responsableContact: '',
    zoneEnclavee: false,
    modeHorsLigne: false,
  });

  // Charger les données de l'intervention en mode édition
  useEffect(() => {
    if (isEditMode && interventionId) {
      const intervention = getInterventionById(interventionId);
      if (intervention) {
        setFormData({
          reference: intervention.reference,
          permisId: intervention.permisId,
          permisReference: intervention.permisReference,
          planPreventionId: intervention.planPreventionId,
          prestataire: intervention.prestataire,
          nomSite: intervention.nomSite,
          codeSite: intervention.codeSite,
          region: intervention.region,
          description: intervention.description,
          typeIntervention: intervention.typeIntervention,
          dateDebut: format(new Date(intervention.dateDebut), "yyyy-MM-dd'T'HH:mm"),
          dateFin: format(new Date(intervention.dateFin), "yyyy-MM-dd'T'HH:mm"),
          nombreIntervenants: intervention.nombreIntervenants,
          responsableChantier: intervention.responsableChantier,
          responsableContact: intervention.responsableContact,
          zoneEnclavee: intervention.zoneEnclavee,
          modeHorsLigne: intervention.modeHorsLigne,
        });
      }
    }
  }, [interventionId, isEditMode, getInterventionById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Si on change le permis, mettre à jour automatiquement certaines informations
    if (name === 'permisId' && value) {
      const permis = permisGeneraux.find(p => p.id === value);
      if (permis) {
        setFormData(prev => ({
          ...prev,
          permisId: value,
          permisReference: permis.numero || permis.reference || '',
          planPreventionId: permis.planPreventionId || prev.planPreventionId,
          prestataire: permis.contractant || prev.prestataire,
          codeSite: permis.codeSite || prev.codeSite,
          nombreIntervenants: permis.nombreIntervenants || prev.nombreIntervenants,
        }));
        return;
      }
    }
    
    // Si on change le plan de prévention, mettre à jour certaines informations
    if (name === 'planPreventionId' && value) {
      const plan = plansPrevention.find(p => p.id === value);
      if (plan) {
        setFormData(prev => ({
          ...prev,
          planPreventionId: value,
          prestataire: plan.entreprisePrestataire || prev.prestataire,
          nombreIntervenants: plan.nombreIntervenants || prev.nombreIntervenants,
        }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && interventionId) {
      // Mode édition : mettre à jour l'intervention existante
      updateIntervention(interventionId, {
        ...formData,
        dateDebut: new Date(formData.dateDebut),
        dateFin: new Date(formData.dateFin),
        modifiePar: user?.email || 'system',
      });
      navigate(`/interventions/${interventionId}`);
    } else {
      // Mode création : créer une nouvelle intervention
      const newIntervention = {
        ...formData,
        id: `INT-${Date.now()}`,
        dateDebut: new Date(formData.dateDebut),
        dateFin: new Date(formData.dateFin),
        status: 'planifiee' as const,
        validationsJournalieres: [],
        take5Records: [],
        documentsProgres: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        creerPar: user?.email || 'system',
      };

      addIntervention(newIntervention);
      navigate(`/interventions/${newIntervention.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      {/*<h2 className="text-2xl font-bold mb-6">Nouvelle Intervention</h2>*/}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reference */}
          <div className="space-y-2">
            <Label htmlFor="reference">Référence</Label>
            <Input
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              required
            />
          </div>

          {/* Permis de travail */}
          <div className="space-y-2">
            <Label htmlFor="permisId">Permis de travail</Label>
            <Select
              name="permisId"
              value={formData.permisId}
              onChange={(e) => handleChange(e)}
              options={[
                { value: '', label: 'Sélectionner un permis (optionnel)' },
                ...permisGeneraux
                  .filter(p => p.status === 'valide' || p.status === 'en_cours')
                  .map(p => ({
                    value: p.id,
                    label: `${p.numero || p.reference} - ${p.intituleTravaux}`
                  }))
              ]}
              placeholder="Sélectionner un permis"
            />
          </div>

          {/* Plan de prévention */}
          <div className="space-y-2">
            <Label htmlFor="planPreventionId">Plan de prévention</Label>
            <Select
              name="planPreventionId"
              value={formData.planPreventionId}
              onChange={(e) => handleChange(e)}
              options={[
                { value: '', label: 'Sélectionner un plan (optionnel)' },
                ...plansPrevention
                  .filter(p => p.status === 'valide')
                  .map(p => ({
                    value: p.id,
                    label: `${p.reference} - ${p.natureIntervention}`
                  }))
              ]}
              placeholder="Sélectionner un plan"
            />
          </div>

          {/* Type d'intervention */}
          <div className="space-y-2">
            <Label htmlFor="typeIntervention">Type d'intervention</Label>
            <Select
              name="typeIntervention"
              value={formData.typeIntervention}
              onChange={(e) => handleChange(e)}
              options={[
                { value: 'maintenance', label: 'Maintenance' },
                { value: 'reparation', label: 'Réparation' },
                { value: 'inspection', label: 'Inspection' },
                { value: 'nettoyage', label: 'Nettoyage' },
                { value: 'installation', label: 'Installation' },
                { value: 'autre', label: 'Autre' }
              ]}
              placeholder="Sélectionner un type"
            />
          </div>

          {/* Site */}
          <div className="space-y-2">
            <Label htmlFor="nomSite">Nom du site</Label>
            <Input
              id="nomSite"
              name="nomSite"
              value={formData.nomSite}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="codeSite">Code du site</Label>
            <Input
              id="codeSite"
              name="codeSite"
              value={formData.codeSite}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <Label htmlFor="dateDebut">Date et heure de début</Label>
            <Input
              type="datetime-local"
              id="dateDebut"
              name="dateDebut"
              value={formData.dateDebut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFin">Date et heure de fin prévue</Label>
            <Input
              type="datetime-local"
              id="dateFin"
              name="dateFin"
              value={formData.dateFin}
              onChange={handleChange}
              required
            />
          </div>

          {/* Responsable */}
          <div className="space-y-2">
            <Label htmlFor="responsableChantier">Responsable du chantier</Label>
            <Input
              id="responsableChantier"
              name="responsableChantier"
              value={formData.responsableChantier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsableContact">Contact du responsable</Label>
            <Input
              id="responsableContact"
              name="responsableContact"
              value={formData.responsableContact}
              onChange={handleChange}
              required
              type="tel"
            />
          </div>

          {/* Nombre d'intervenants */}
          <div className="space-y-2">
            <Label htmlFor="nombreIntervenants">Nombre d'intervenants</Label>
            <Input
              type="number"
              id="nombreIntervenants"
              name="nombreIntervenants"
              min="1"
              value={formData.nombreIntervenants}
              onChange={handleChange}
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 col-span-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="zoneEnclavee"
                name="zoneEnclavee"
                checked={formData.zoneEnclavee}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="zoneEnclavee" className="text-sm font-medium text-gray-700">
                Zone enclavée (hors réseau)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="modeHorsLigne"
                name="modeHorsLigne"
                checked={formData.modeHorsLigne}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="modeHorsLigne" className="text-sm font-medium text-gray-700">
                Mode hors ligne activé
              </Label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description des travaux</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Décrivez en détail l'intervention prévue..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/interventions')}
          >
            Annuler
          </Button>
          <Button type="submit">
            {isEditMode ? 'Enregistrer les modifications' : 'Créer l\'intervention'}
          </Button>
        </div>
      </form>
    </div>
  );
}
