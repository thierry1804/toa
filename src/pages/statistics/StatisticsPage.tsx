import { useMemo } from 'react';
import { usePermitStore } from '@/store/permitStore';
// import { useAuthStore } from '@/store/authStore'; // Unused import
// import { useI18n } from '@/lib/i18n'; // Unused import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  MapPin,
  // Calendar, // Unused import
} from 'lucide-react';

export default function StatisticsPage() {
  const { permisGeneraux, plansPrevention } = usePermitStore();
  // const { user } = useAuthStore(); // TODO: Use user data
  // const { t } = useI18n(); // TODO: Use translations

  // Statistiques des permis
  const permitsStats = useMemo(() => {
    const total = permisGeneraux.length;
    const enAttente = permisGeneraux.filter(
      (p) => p.status === 'en_attente_validation_chef' || p.status === 'en_attente_validation_hse'
    ).length;
    const valides = permisGeneraux.filter((p) => p.status === 'valide').length;
    const refuses = permisGeneraux.filter((p) => p.status === 'refuse').length;
    const enCours = permisGeneraux.filter((p) => p.status === 'en_cours').length;
    const clotures = permisGeneraux.filter((p) => p.status === 'cloture').length;

    return { total, enAttente, valides, refuses, enCours, clotures };
  }, [permisGeneraux]);

  // Statistiques des plans de prévention
  const plansStats = useMemo(() => {
    const total = plansPrevention.length;
    const enAttente = plansPrevention.filter(
      (p) => p.status === 'brouillon'
    ).length;
    const valides = plansPrevention.filter((p) => p.status === 'valide').length;
    const refuses = 0; // No 'refuse' status in PlanPrevention type

    return { total, enAttente, valides, refuses };
  }, [plansPrevention]);

  // Statistiques par site
  const siteStats = useMemo(() => {
    const sites = new Map<string, number>();
    permisGeneraux.forEach((p) => {
      sites.set(p.codeSite, (sites.get(p.codeSite) || 0) + 1);
    });
    return Array.from(sites.entries())
      .map(([site, count]) => ({ site, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [permisGeneraux]);

  // Statistiques par contractant
  const contractantStats = useMemo(() => {
    const contractants = new Map<string, number>();
    permisGeneraux.forEach((p) => {
      contractants.set(p.contractant, (contractants.get(p.contractant) || 0) + 1);
    });
    return Array.from(contractants.entries())
      .map(([contractant, count]) => ({ contractant, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [permisGeneraux]);

  // Statistiques des risques
  const riskStats = useMemo(() => {
    const risks = {
      travauxChaud: 0,
      travauxHauteur: 0,
      travauxElectrique: 0,
      travauxEspaceConfine: 0,
      travauxExcavation: 0,
      autres: 0,
    };

    permisGeneraux.forEach((p) => {
      if (p.travauxRisques.travauxChaud) risks.travauxChaud++;
      if (p.travauxRisques.travauxHauteur) risks.travauxHauteur++;
      if (p.travauxRisques.travauxElectrique) risks.travauxElectrique++;
      if (p.travauxRisques.travauxEspaceConfine) risks.travauxEspaceConfine++;
      if (p.travauxRisques.travauxExcavation) risks.travauxExcavation++;
      if (p.travauxRisques.autres) risks.autres++;
    });

    return risks;
  }, [permisGeneraux]);

  // Données pour les graphiques
  const chartData = useMemo(() => {
    // Données pour le graphique circulaire des statuts
    const statusChartData = [
      { name: 'Validés', value: permitsStats.valides, color: '#10b981' },
      { name: 'En attente', value: permitsStats.enAttente, color: '#f59e0b' },
      { name: 'En cours', value: permitsStats.enCours, color: '#3b82f6' },
      { name: 'Clôturés', value: permitsStats.clotures, color: '#6b7280' },
      { name: 'Refusés', value: permitsStats.refuses, color: '#ef4444' },
    ].filter(item => item.value > 0);

    // Données pour les Top 5 sites
    const siteChartData = siteStats.map((stat, index) => ({
      name: stat.site,
      value: stat.count,
      rank: index + 1,
    }));

    // Données pour les Top 5 contractants
    const contractantChartData = contractantStats.map((stat, index) => ({
      name: stat.contractant,
      value: stat.count,
      rank: index + 1,
    }));

    // Données pour les risques
    const riskChartData = [
      { name: 'Travaux à chaud', value: riskStats.travauxChaud },
      { name: 'Travaux en hauteur', value: riskStats.travauxHauteur },
      { name: 'Travaux électriques', value: riskStats.travauxElectrique },
      { name: 'Espace confiné', value: riskStats.travauxEspaceConfine },
      { name: 'Excavation', value: riskStats.travauxExcavation },
      { name: 'Autres', value: riskStats.autres },
    ].filter(item => item.value > 0);

    return { statusChartData, siteChartData, contractantChartData, riskChartData };
  }, [permitsStats, siteStats, contractantStats, riskStats]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Taux de validation
  const validationRate = useMemo(() => {
    if (permitsStats.total === 0) return 0;
    return Math.round((permitsStats.valides / permitsStats.total) * 100);
  }, [permitsStats]);

  // Taux de refus
  const refusalRate = useMemo(() => {
    if (permitsStats.total === 0) return 0;
    return Math.round((permitsStats.refuses / permitsStats.total) * 100);
  }, [permitsStats]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Statistiques</h2>
        <p className="mt-1 text-gray-600">Vue d'ensemble des permis et plans de prévention</p>
      </div>

      {/* KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permis</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{permitsStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de Validation</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{validationRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{permitsStats.enAttente}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de Refus</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{refusalRate}%</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques de répartition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique circulaire des statuts */}
        <Card>
          <CardHeader>
            <CardTitle>Statut des Permis</CardTitle>
            <CardDescription>Répartition des permis par statut</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>

        {/* Graphique des risques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Types de Travaux à Risques
            </CardTitle>
            <CardDescription>Répartition des travaux par type de risque</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.riskChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.riskChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#ef4444" name="Nombre de permis" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Répartition par statut - Version détaillée */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statut des Permis (Détails)</CardTitle>
            <CardDescription>Répartition des permis par statut</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Validés</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" size="lg">
                  {permitsStats.valides}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {permitsStats.total > 0
                    ? Math.round((permitsStats.valides / permitsStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-gray-700">En attente</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning" size="lg">
                  {permitsStats.enAttente}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {permitsStats.total > 0
                    ? Math.round((permitsStats.enAttente / permitsStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">En cours</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="info" size="lg">
                  {permitsStats.enCours}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {permitsStats.total > 0
                    ? Math.round((permitsStats.enCours / permitsStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Clôturés</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="gray" size="lg">
                  {permitsStats.clotures}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {permitsStats.total > 0
                    ? Math.round((permitsStats.clotures / permitsStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-700">Refusés</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="danger" size="lg">
                  {permitsStats.refuses}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {permitsStats.total > 0
                    ? Math.round((permitsStats.refuses / permitsStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plans de Prévention</CardTitle>
            <CardDescription>Statistiques des plans de prévention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-700">Total</span>
              </div>
              <Badge variant="primary" size="lg">
                {plansStats.total}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Validés</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" size="lg">
                  {plansStats.valides}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {plansStats.total > 0
                    ? Math.round((plansStats.valides / plansStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-gray-700">En attente</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="warning" size="lg">
                  {plansStats.enAttente}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {plansStats.total > 0
                    ? Math.round((plansStats.enAttente / plansStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-700">Refusés</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="danger" size="lg">
                  {plansStats.refuses}
                </Badge>
                <span className="text-sm text-gray-500 w-12 text-right">
                  {plansStats.total > 0
                    ? Math.round((plansStats.refuses / plansStats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Sites et Contractants avec graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top 5 Sites
            </CardTitle>
            <CardDescription>Sites avec le plus de permis</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.siteChartData.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData.siteChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" name="Nombre de permis" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {siteStats.map((stat, index) => (
                    <div key={stat.site} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-600">{index + 1}.</span>
                        <span className="text-gray-700">{stat.site}</span>
                      </div>
                      <Badge variant="primary" size="sm">
                        {stat.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top 5 Contractants
            </CardTitle>
            <CardDescription>Contractants avec le plus de permis</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.contractantChartData.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData.contractantChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" name="Nombre de permis" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {contractantStats.map((stat, index) => (
                    <div key={stat.contractant} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">{index + 1}.</span>
                        <span className="text-gray-700">{stat.contractant}</span>
                      </div>
                      <Badge variant="success" size="sm">
                        {stat.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistiques des risques - Version détaillée */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Types de Travaux à Risques (Détails)
          </CardTitle>
          <CardDescription>Répartition des travaux par type de risque</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Travaux à chaud</span>
                <Badge variant="warning" size="lg">
                  {riskStats.travauxChaud}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Travaux en hauteur</span>
                <Badge variant="danger" size="lg">
                  {riskStats.travauxHauteur}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Travaux électriques</span>
                <Badge variant="warning" size="lg">
                  {riskStats.travauxElectrique}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Espace confiné</span>
                <Badge variant="primary" size="lg">
                  {riskStats.travauxEspaceConfine}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Travaux d'excavation</span>
                <Badge variant="info" size="lg">
                  {riskStats.travauxExcavation}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Autres</span>
                <Badge variant="gray" size="lg">
                  {riskStats.autres}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
