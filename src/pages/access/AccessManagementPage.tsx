import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { Shield, Save, AlertCircle } from 'lucide-react';
import { useToastStore } from '@/store/toastStore';
import type { UserRole } from '@/types';

interface PermissionCategory {
  id: string;
  label: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  label: string;
  description?: string;
}

// Structure des permissions par catégorie
const permissionCategories: PermissionCategory[] = [
  {
    id: 'templates',
    label: 'Gestion des Templates',
    permissions: [
      { id: 'modify_template_pphse', label: 'Modification/Mise à jour Template PPHSE' },
      { id: 'modify_template_pwhe', label: 'Modification/Mise à jour Template PWHE' },
      { id: 'modify_template_sites', label: 'Modification/Mise à jour Template Sites' },
    ],
  },
  {
    id: 'users',
    label: 'Gestion des Utilisateurs',
    permissions: [
      { id: 'add_users', label: 'Ajout d\'utilisateurs' },
      { id: 'modify_users', label: 'Modification d\'utilisateurs' },
      { id: 'delete_users', label: 'Suppression d\'utilisateurs' },
      { id: 'view_users', label: 'Visualisation des utilisateurs' },
    ],
  },
  {
    id: 'fields_validations',
    label: 'Champs et Validations',
    permissions: [
      { id: 'modify_fields', label: 'Modification des champs' },
      { id: 'modify_validations', label: 'Modification des validations' },
      { id: 'validate_prevention_plan', label: 'Validation Plan de prévention' },
    ],
  },
  {
    id: 'prevention_plans',
    label: 'Plans de Prévention',
    permissions: [
      { id: 'create_pphse', label: 'Création demande PPHSE' },
      { id: 'create_pwhe', label: 'Création demande PWHE' },
      { id: 'modify_prevention_plan', label: 'Modification Plan de prévention' },
      { id: 'view_prevention_plans', label: 'Lecture Plans de prévention' },
      { id: 'export_prevention_plans', label: 'Exportation Plans de prévention' },
    ],
  },
  {
    id: 'planning',
    label: 'Planning',
    permissions: [
      { id: 'modify_planning', label: 'Modification du Planning' },
      { id: 'view_planning', label: 'Visualisation du Planning' },
    ],
  },
  {
    id: 'data',
    label: 'Données',
    permissions: [
      { id: 'view_all_data', label: 'Lecture toutes les données' },
      { id: 'export_all_data', label: 'Exportation toutes les données' },
      { id: 'view_own_data', label: 'Lecture données propres' },
      { id: 'export_own_validated_data', label: 'Exportation PPH et PW valides liés à leur demande' },
    ],
  },
];

// Rôles à configurer
const roles: { value: UserRole; label: string }[] = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'hse', label: 'HSE TOA' },
  { value: 'chef_projet', label: 'CP TOA' },
  { value: 'prestataire', label: 'Prestataire' },
  { value: 'collaborateur', label: 'Collaborateurs TOA' },
];

// Configuration par défaut selon les exigences
const defaultRolePermissions: Record<string, string[]> = {
  super_admin: [
    'modify_template_pphse',
    'modify_template_pwhe',
    'modify_template_sites',
    'add_users',
    'modify_users',
    'delete_users',
    'view_users',
    'modify_fields',
    'modify_validations',
    'validate_prevention_plan',
    'create_pphse',
    'create_pwhe',
    'modify_prevention_plan',
    'view_prevention_plans',
    'export_prevention_plans',
    'modify_planning',
    'view_planning',
    'view_all_data',
    'export_all_data',
  ],
  hse: [
    'modify_fields',
    'modify_validations',
    'validate_prevention_plan',
    'view_prevention_plans',
    'export_prevention_plans',
    'view_planning',
    'view_all_data',
    'export_all_data',
  ],
  chef_projet: [
    'validate_prevention_plan',
    'modify_planning',
    'view_prevention_plans',
    'view_planning',
    'view_all_data',
  ],
  collaborateur: [
    'create_pphse',
    'create_pwhe',
    'view_prevention_plans',
    'view_planning',
    'view_own_data',
  ],
  prestataire: [
    'create_pphse',
    'create_pwhe',
    'view_prevention_plans',
    'view_own_data',
    'export_own_validated_data',
  ],
};

export default function AccessManagementPage() {
  const navigate = useNavigate();
  const { user, hasRole } = useAuthStore();
  const { success, error } = useToastStore();
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>(defaultRolePermissions);
  const [hasChanges, setHasChanges] = useState(false);

  // Vérifier que l'utilisateur est super admin
  useEffect(() => {
    if (!user || !hasRole(['super_admin'])) {
      navigate('/dashboard');
      error('Accès réservé aux super administrateurs');
    }
  }, [user, hasRole, navigate, error]);

  const handlePermissionToggle = (permissionId: string) => {
    setRolePermissions((prev) => {
      const currentPermissions = prev[selectedRole] || [];
      const newPermissions = currentPermissions.includes(permissionId)
        ? currentPermissions.filter((p) => p !== permissionId)
        : [...currentPermissions, permissionId];
      
      return {
        ...prev,
        [selectedRole]: newPermissions,
      };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Ici, on sauvegarderait les permissions dans une API
    // Pour l'instant, on simule la sauvegarde
    console.log('Permissions sauvegardées:', rolePermissions);
    
    // Dans un vrai système, on mettrait à jour le store authStore
    // avec les nouvelles permissions
    
    success('Permissions sauvegardées avec succès');
    setHasChanges(false);
  };

  const handleReset = () => {
    setRolePermissions(defaultRolePermissions);
    setHasChanges(false);
  };

  const isPermissionChecked = (permissionId: string) => {
    return rolePermissions[selectedRole]?.includes(permissionId) || false;
  };

  if (!user || !hasRole(['super_admin'])) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary-600" />
            Gestion des Accès
          </h1>
          <p className="text-gray-600 mt-1">
            Configurez les permissions pour chaque rôle dans l'application
          </p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              Annuler
            </Button>
          )}
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Information importante</p>
          <p>
            Les modifications apportées aux permissions affecteront immédiatement tous les utilisateurs 
            ayant le rôle sélectionné. Assurez-vous de bien comprendre les implications avant de sauvegarder.
          </p>
        </div>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Sélectionner un rôle</CardTitle>
          <CardDescription>
            Choisissez le rôle pour lequel vous souhaitez configurer les permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => {
                  setSelectedRole(role.value as UserRole);
                  setHasChanges(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRole === role.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permissions by Category */}
      <div className="space-y-4">
        {permissionCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-lg">{category.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.permissions.map((permission) => {
                  const isChecked = isPermissionChecked(permission.id);
                  const isDisabled = selectedRole === 'super_admin' && 
                    ['modify_template_pphse', 'modify_template_pwhe', 'modify_template_sites', 
                     'add_users', 'modify_fields', 'modify_validations', 'view_all_data', 'export_all_data'].includes(permission.id);

                  return (
                    <div
                      key={permission.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Checkbox
                        id={permission.id}
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={permission.id}
                        className={`flex-1 cursor-pointer ${isDisabled ? 'opacity-60' : ''}`}
                      >
                        <div className="font-medium text-gray-900">{permission.label}</div>
                        {permission.description && (
                          <div className="text-sm text-gray-500 mt-1">{permission.description}</div>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé des permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rôle sélectionné :</span>
              <span className="font-medium">{roles.find(r => r.value === selectedRole)?.label}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nombre de permissions activées :</span>
              <span className="font-medium">
                {rolePermissions[selectedRole]?.length || 0} / {permissionCategories.reduce((acc, cat) => acc + cat.permissions.length, 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

