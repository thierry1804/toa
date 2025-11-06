import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import {
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Building2,
  Shield,
  Briefcase,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { UserRole } from '@/types';

export default function UsersListPage() {
  const { users, toggleUserStatus, deleteUser } = useUserStore();
  const { user: currentUser, canAccessFeature } = useAuthStore();
  const { t } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtrer les utilisateurs
  const filteredUsers = users.filter((user) => {
    // Filtre par recherche
    const matchSearch =
      searchQuery === '' ||
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.telephone.includes(searchQuery) ||
      (user.entreprise && user.entreprise.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filtre par rôle
    const matchRole = roleFilter === 'all' || user.role === roleFilter;

    // Filtre par statut
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'actif' && user.actif) ||
      (statusFilter === 'inactif' && !user.actif);

    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadge = (role: UserRole) => {
    const roleConfig = {
      super_admin: { label: t('roles.super_admin'), variant: 'error' as const, icon: Shield },
      admin: { label: t('roles.admin'), variant: 'warning' as const, icon: Shield },
      chef_projet: { label: t('roles.chef_projet'), variant: 'primary' as const, icon: Briefcase },
      hse: { label: t('roles.hse'), variant: 'success' as const, icon: Shield },
      prestataire: { label: t('roles.prestataire'), variant: 'secondary' as const, icon: Building2 },
      collaborateur: { label: t('roles.collaborateur'), variant: 'secondary' as const, icon: Users },
      dg: { label: t('roles.dg'), variant: 'primary' as const, icon: Briefcase },
    };

    const config = roleConfig[role] || {
      label: role,
      variant: 'secondary' as const,
      icon: Users,
    };

    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const roleOptions = [
    { value: 'all', label: 'Tous les rôles' },
    { value: 'super_admin', label: t('roles.super_admin') },
    { value: 'admin', label: t('roles.admin') },
    { value: 'chef_projet', label: t('roles.chef_projet') },
    { value: 'hse', label: t('roles.hse') },
    { value: 'prestataire', label: t('roles.prestataire') },
    { value: 'dg', label: t('roles.dg') },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'actif', label: 'Actifs' },
    { value: 'inactif', label: 'Inactifs' },
  ];

  const handleToggleStatus = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir changer le statut de cet utilisateur ?')) {
      toggleUserStatus(userId);
    }
  };

  const handleDelete = (userId: string, userName: string) => {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${userName}" ? Cette action est irréversible.`
      )
    ) {
      deleteUser(userId);
    }
  };

  // Statistiques
  const stats = {
    total: users.length,
    actifs: users.filter((u) => u.actif).length,
    inactifs: users.filter((u) => !u.actif).length,
    prestataires: users.filter((u) => u.role === 'prestataire').length,
    toa: users.filter((u) => u.role !== 'prestataire').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t('nav.users')}</h2>
          <p className="mt-1 text-gray-600">
            Gestion des utilisateurs et des accès à la plateforme
          </p>
        </div>
        {canAccessFeature('create_users') && (
          <Link to="/users/new">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Nouvel utilisateur
            </Button>
          </Link>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.actifs}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactifs</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactifs}</p>
              </div>
              <UserX className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prestataires</p>
                <p className="text-2xl font-bold text-blue-600">{stats.prestataires}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Équipe TOA</p>
                <p className="text-2xl font-bold text-purple-600">{stats.toa}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Rechercher par nom, email, téléphone, entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="Filtrer par rôle"
            />
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Filtrer par statut"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
          <CardDescription>
            {stats.prestataires} prestataires sur 11 entreprises partenaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
              {canAccessFeature('create_users') && (
                <Link to="/users/new">
                  <Button className="mt-4" variant="outline">
                    <Plus className="h-5 w-5 mr-2" />
                    Créer un utilisateur
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Utilisateur
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Rôle
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Entreprise
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Statut
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Créé le
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-700 font-semibold text-sm">
                              {user.prenom.charAt(0)}
                              {user.nom.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.prenom} {user.nom}
                            </p>
                            {user.id === currentUser?.id && (
                              <span className="text-xs text-primary-600">(Vous)</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{user.email}</p>
                          <p className="text-gray-500">{user.telephone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {user.entreprise || (
                          <span className="text-gray-400 italic">TOA</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {user.actif ? (
                          <Badge variant="success">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Actif
                          </Badge>
                        ) : (
                          <Badge variant="error">
                            <UserX className="h-3 w-3 mr-1" />
                            Inactif
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/users/${user.id}`}>
                            <button
                              className="p-1.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                              title="Voir"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </Link>
                          {canAccessFeature('edit_users') && (
                            <Link to={`/users/${user.id}/edit`}>
                              <button
                                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Modifier"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </Link>
                          )}
                          {canAccessFeature('edit_users') && user.id !== currentUser?.id && (
                            <button
                              onClick={() => handleToggleStatus(user.id)}
                              className={`p-1.5 rounded transition-colors ${
                                user.actif
                                  ? 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                              }`}
                              title={user.actif ? 'Désactiver' : 'Activer'}
                            >
                              {user.actif ? (
                                <UserX className="h-4 w-4" />
                              ) : (
                                <UserCheck className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          {canAccessFeature('delete_users') && user.id !== currentUser?.id && (
                            <button
                              onClick={() =>
                                handleDelete(user.id, `${user.prenom} ${user.nom}`)
                              }
                              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info ISO 14001 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Certification ISO 14001</h4>
              <p className="text-sm text-blue-700 mt-1">
                TowerCo of Africa est certifiée ISO 14001 (Management environnemental) et ISO 45001
                (Santé et sécurité au travail). La gestion des utilisateurs et des accès fait
                partie intégrante du système de maîtrise des risques HSE.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
