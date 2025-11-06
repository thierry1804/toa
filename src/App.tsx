import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import PermitsListPage from './pages/permits/PermitsListPage';
import PermitFormPage from './pages/permits/PermitFormPage';
import PermitDetailPage from './pages/permits/PermitDetailPage';
import PreventionListPage from './pages/prevention/PreventionListPage';
import PreventionFormPage from './pages/prevention/PreventionFormPage';
import PreventionDetailPage from './pages/prevention/PreventionDetailPage';
import InterventionsListPage from './pages/interventions/InterventionsListPage';
import InterventionDetailPage from './pages/interventions/InterventionDetailPage';
import InterventionFormPage from './pages/interventions/InterventionFormPage';
import UsersListPage from './pages/users/UsersListPage';
import UserFormPage from './pages/users/UserFormPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import AccessManagementPage from './pages/access/AccessManagementPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="permits" element={<PermitsListPage />} />
            <Route path="permits/new" element={<PermitFormPage />} />
            <Route path="permits/new/:type" element={<PermitFormPage />} />
            <Route path="permits/:id" element={<PermitDetailPage />} />
            <Route path="permits/:id/edit" element={<PermitFormPage />} />
            <Route path="prevention" element={<PreventionListPage />} />
            <Route path="prevention/new" element={<PreventionFormPage />} />
            <Route path="prevention/:id" element={<PreventionDetailPage />} />
            <Route path="prevention/:id/edit" element={<PreventionFormPage />} />
            <Route path="interventions" element={<InterventionsListPage />} />
            <Route path="interventions/new" element={<InterventionFormPage />} />
            <Route path="interventions/:id" element={<InterventionDetailPage />} />
            <Route path="interventions/:id/edit" element={<InterventionFormPage />} />
            <Route path="users" element={<UsersListPage />} />
            <Route path="users/new" element={<UserFormPage />} />
            <Route path="users/:id/edit" element={<UserFormPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="access" element={<AccessManagementPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
