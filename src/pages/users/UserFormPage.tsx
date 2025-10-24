import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/lib/i18n';
import { useToastStore } from '@/store/toastStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { ArrowLeft, Save, UserPlus, Shield, Building2 } from 'lucide-react';
import type { User, UserRole } from '@/types';

export default function UserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, addUser, updateUser, getUserById } = useUserStore();
  const { canAccessFeature } = useAuthStore();
  const { t } = useI18n();
  const { success, error } = useToastStore();

  const isEditMode = !!id;
  const existingUser = isEditMode ? getUserById(id) : null;

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'prestataire' as UserRole,
    entreprise: '',
    actif: true,
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingUser) {
      setFormData({
        nom: existingUser.nom,
        prenom: existingUser.prenom,
        email: existingUser.email,
        telephone: existingUser.telephone,
        role: existingUser.role,
        entreprise: existingUser.entreprise || '',
        actif: existingUser.actif,
        password: '',
        confirmPassword: '',
      });
    }
  }, [existingUser]);

  // Vérifier les permissions
  useEffect(() => {
    if (isEditMode && !canAccessFeature('edit_users')) {
      navigate('/users');
      error('Vous n\'avez pas la permission de modifier les utilisateurs');
    } else if (!isEditMode && !canAccessFeature('create_users')) {
      navigate('/users');
      error('Vous n\'avez pas la permission de créer des utilisateurs');
    }
  }, [isEditMode, canAccessFeature, navigate, error]);

  const roleOptions = [
    { value: 'super_admin', label: t('roles.super_admin') },
    { value: 'admin', label: t('roles.admin') },
    { value: 'chef_projet', label: t('roles.chef_projet') },
    { value: 'hse', label: t('roles.hse') },
    { value: 'prestataire', label: t('roles.prestataire') },
    { value: 'dg', label: t('roles.dg') },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation Nom
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est obligatoire';
    }

    // Validation Prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est obligatoire';
    }

    // Validation Email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    } else {
      // Vérifier si l'email existe déjà
      const emailExists = users.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.id !== id
      );
      if (emailExists) {
        newErrors.email = 'Cet email est déjà utilisé';
      }
    }

    // Validation Téléphone
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est obligatoire';
    } else if (!/^\+?[\d\s-]+$/.test(formData.telephone)) {
      newErrors.telephone = 'Le numéro de téléphone n\'est pas valide';
    }

    // Validation Entreprise (obligatoire pour les prestataires)
    if (formData.role === 'prestataire' && !formData.entreprise.trim()) {
      newErrors.entreprise = 'L\'entreprise est obligatoire pour les prestataires';
    }

    // Validation Mot de passe (obligatoire en création)
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = 'Le mot de passe est obligatoire';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    } else if (formData.password) {
      // En modification, valider seulement si un nouveau mot de passe est saisi
      if (formData.password.length < 6) {
        newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      error('Veuillez corriger les erreurs du formulaire');
      return;
    }

    const userData: User = {
      id: isEditMode ? id : `user-${Date.now()}`,
      nom: formData.nom.trim(),
      prenom: formData.prenom.trim(),
      email: formData.email.trim().toLowerCase(),
      telephone: formData.telephone.trim(),
      role: formData.role,
      entreprise: formData.role === 'prestataire' ? formData.entreprise.trim() : undefined,
      actif: formData.actif,
      createdAt: existingUser?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (isEditMode) {
      updateUser(id, userData);
      success('Utilisateur modifié avec succès');
    } else {
      addUser(userData);
      success('Utilisateur créé avec succès');
    }

    navigate('/users');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setFormData({
      ...formData,
      role: newRole,
      // Réinitialiser l'entreprise si ce n'est pas un prestataire
      entreprise: newRole !== 'prestataire' ? '' : formData.entreprise,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isEditMode ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h2>
            <p className="mt-1 text-gray-600">
              {isEditMode
                ? 'Modifier les informations de l\'utilisateur'
                : 'Créer un nouveau compte utilisateur'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom *"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                error={errors.nom}
                placeholder="Ex: RAKOTO"
                required
              />
              <Input
                label="Prénom *"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                error={errors.prenom}
                placeholder="Ex: Jean"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                placeholder="exemple@entreprise.mg"
                required
              />
              <Input
                label="Téléphone *"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                error={errors.telephone}
                placeholder="+261 34 12 345 67"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Rôle et permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-600" />
              Rôle et permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Rôle *"
              options={roleOptions}
              value={formData.role}
              onChange={handleRoleChange}
              error={errors.role}
              required
            />

            {formData.role === 'prestataire' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Informations prestataire
                    </h4>
                    <Input
                      label="Entreprise *"
                      value={formData.entreprise}
                      onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                      error={errors.entreprise}
                      placeholder="Ex: eTech Consulting"
                      required
                    />
                    <p className="text-xs text-blue-700 mt-2">
                      TOA travaille avec 11 prestataires partenaires. Chaque prestataire doit
                      remplir un plan de prévention et obtenir un permis avant chaque intervention.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description du rôle */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Permissions de ce rôle :</h4>
              {formData.role === 'super_admin' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Accès complet à toutes les fonctionnalités</li>
                  <li>Gestion des utilisateurs et des rôles</li>
                  <li>Configuration système</li>
                </ul>
              )}
              {formData.role === 'admin' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Gestion des permis et plans de prévention</li>
                  <li>Gestion des utilisateurs</li>
                  <li>Accès aux statistiques</li>
                </ul>
              )}
              {formData.role === 'chef_projet' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Examen et validation des demandes de permis</li>
                  <li>Ajout de commentaires sur les permis</li>
                  <li>Suivi des interventions</li>
                  <li>Consultation des statistiques</li>
                </ul>
              )}
              {formData.role === 'hse' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Attribution des références aux permis validés</li>
                  <li>Vérification des plans de prévention</li>
                  <li>Suivi quotidien des interventions</li>
                  <li>Validation des Take 5</li>
                  <li>Maîtrise des risques et incidents</li>
                  <li>Clôture des interventions</li>
                </ul>
              )}
              {formData.role === 'prestataire' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Création de plans de prévention</li>
                  <li>Demande de permis de travail</li>
                  <li>Suivi de ses propres interventions</li>
                  <li>Soumission de validations journalières</li>
                  <li>Réalisation de Take 5</li>
                  <li>Signalement d'incidents</li>
                </ul>
              )}
              {formData.role === 'dg' && (
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Vue d'ensemble de tous les permis et interventions</li>
                  <li>Accès aux tableaux de bord et KPI</li>
                  <li>Consultation des statistiques globales</li>
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle>
              Sécurité {!isEditMode && '*'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditMode && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  Laissez les champs vides pour conserver le mot de passe actuel. Remplissez-les
                  uniquement si vous souhaitez changer le mot de passe.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={`Mot de passe ${!isEditMode ? '*' : ''}`}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                placeholder="Minimum 6 caractères"
                required={!isEditMode}
              />
              <Input
                label={`Confirmer le mot de passe ${!isEditMode ? '*' : ''}`}
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                placeholder="Retaper le mot de passe"
                required={!isEditMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Statut */}
        <Card>
          <CardHeader>
            <CardTitle>Statut du compte</CardTitle>
          </CardHeader>
          <CardContent>
            <Checkbox
              label={
                <div>
                  <span className="font-medium">Compte actif</span>
                  <p className="text-sm text-gray-600">
                    Un compte inactif ne pourra pas se connecter à la plateforme
                  </p>
                </div>
              }
              checked={formData.actif}
              onChange={(e) => setFormData({ ...formData, actif: e.target.checked })}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t">
          <Link to="/users">
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </Link>
          <Button type="submit">
            {isEditMode ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Créer l'utilisateur
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
