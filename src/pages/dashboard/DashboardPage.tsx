import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building,
  TrendingUp,
  Activity,
} from 'lucide-react';

// Données de démonstration
const demoStats = {
  totalPermis: 247,
  permisActifs: 12,
  permisEnAttente: 5,
  permisValides: 218,
  interventionsJour: 8,
  sitesActifs: 45,
  risquesCritiques: 3,
};

const recentPermits = [
  {
    id: '1',
    reference: 'PTW-20251013-001',
    type: 'travaux_hauteur',
    site: 'ANT-001',
    status: 'en_attente_validation_chef',
    date: new Date(),
  },
  {
    id: '2',
    reference: 'PTW-20251013-002',
    type: 'travaux_electrique',
    site: 'MAH-045',
    status: 'valide',
    date: new Date(),
  },
  {
    id: '3',
    reference: 'PTW-20251012-045',
    type: 'general',
    site: 'TOA-123',
    status: 'en_cours',
    date: new Date(Date.now() - 86400000),
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { t } = useI18n();

  const statsCards = [
    {
      title: t('dashboard.totalPermits'),
      value: demoStats.totalPermis,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('dashboard.activePermits'),
      value: demoStats.permisActifs,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('dashboard.pendingPermits'),
      value: demoStats.permisEnAttente,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: t('dashboard.todayInterventions'),
      value: demoStats.interventionsJour,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: t('dashboard.activeSites'),
      value: demoStats.sitesActifs,
      icon: Building,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: t('dashboard.criticalRisks'),
      value: demoStats.risquesCritiques,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      en_attente_validation_chef: { label: t(`permits.statuses.${status}`), color: 'bg-yellow-100 text-yellow-800' },
      en_attente_validation_hse: { label: t(`permits.statuses.${status}`), color: 'bg-yellow-100 text-yellow-800' },
      valide: { label: t(`permits.statuses.${status}`), color: 'bg-green-100 text-green-800' },
      en_cours: { label: t(`permits.statuses.${status}`), color: 'bg-blue-100 text-blue-800' },
      refuse: { label: t(`permits.statuses.${status}`), color: 'bg-red-100 text-red-800' },
      cloture: { label: t(`permits.statuses.${status}`), color: 'bg-gray-100 text-gray-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'bg-gray-100 text-gray-800' };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('auth.welcome')}, {user?.prenom} !
        </h2>
        <p className="mt-1 text-gray-600">{t('dashboard.welcomeMessage')}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent permits */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentPermits')}</CardTitle>
          <CardDescription>Derniers permis créés ou modifiés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPermits.map((permit) => (
              <div
                key={permit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{permit.reference}</p>
                    <p className="text-sm text-gray-600">
                      {t(`permits.types.${permit.type}`)} - {permit.site}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {new Date(permit.date).toLocaleDateString('fr-FR')}
                  </span>
                  {getStatusBadge(permit.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      {user?.role === 'prestataire' && (
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                <FileText className="h-6 w-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-900">Nouveau permis</p>
                <p className="text-sm text-gray-600">Créer une demande de permis</p>
              </button>
              <button className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                <FileText className="h-6 w-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-900">Plan de prévention</p>
                <p className="text-sm text-gray-600">Créer un plan de prévention</p>
              </button>
              <button className="p-4 text-left border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary-600 mb-2" />
                <p className="font-medium text-gray-900">Mes interventions</p>
                <p className="text-sm text-gray-600">Voir mes interventions en cours</p>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
