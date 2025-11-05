import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useI18n } from '@/lib/i18n';
import {
  LayoutDashboard,
  FileText,
  Shield,
  Clipboard,
  Users,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  permission?: string;
}

export default function Sidebar() {
  const { user, logout, canAccessFeature } = useAuthStore();
  const { t } = useI18n();
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      label: t('nav.interventions'),
      icon: Clipboard,
      path: '/interventions',
      permission: 'view_interventions',
    },
    {
      label: t('nav.prevention'),
      icon: Shield,
      path: '/prevention',
      permission: 'view_prevention_plans',
    },
    {
      label: t('nav.permits'),
      icon: FileText,
      path: '/permits',
      permission: 'view_permits',
    },
    {
      label: t('nav.statistics'),
      icon: BarChart3,
      path: '/statistics',
      permission: 'view_statistics',
    },
    {
      label: t('nav.users'),
      icon: Users,
      path: '/users',
      permission: 'view_users',
    },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.permission || canAccessFeature(item.permission)
  );

  if (!user) return null;

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-auto h-8 flex items-center justify-center">
              <img
                src="/assets/images/logo_scroll.webp"
                alt="TOA Logo"
                className="h-8"
              />
            </div>

          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-700 font-semibold text-sm">
              {user.prenom.charAt(0)}
              {user.nom.charAt(0)}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.prenom} {user.nom}
              </p>
              <p className="text-xs text-gray-500 truncate">{t(`roles.${user.role}`)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100',
                  collapsed && 'justify-center'
                )
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-gray-700 hover:bg-gray-100 transition-colors',
            collapsed && 'justify-center'
          )}
          title={collapsed ? t('nav.logout') : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>{t('nav.logout')}</span>}
        </button>
      </div>
    </aside>
  );
}
