import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessFeature: (feature: string) => boolean;
}

// Permissions par rôle
const rolePermissions: Record<UserRole, string[]> = {
  super_admin: ['*'], // Tous les accès
  admin: [
    'view_dashboard',
    'view_permits',
    'create_permits',
    'edit_permits',
    'delete_permits',
    'view_prevention_plans',
    'create_prevention_plans',
    'edit_prevention_plans',
    'view_users',
    'create_users',
    'edit_users',
    'view_statistics',
  ],
  chef_projet: [
    'view_dashboard',
    'view_permits',
    'validate_permits_chef',
    'view_prevention_plans',
    'create_prevention_plans',
    'edit_prevention_plans',
    'view_interventions',
    'view_statistics',
  ],
  hse: [
    'view_dashboard',
    'view_permits',
    'validate_permits_hse',
    'assign_permit_reference',
    'view_prevention_plans',
    'validate_prevention_plans',
    'view_interventions',
    'track_daily_interventions',
    'view_risks',
    'view_statistics',
  ],
  prestataire: [
    'view_dashboard_limited',
    'view_my_permits',
    'create_permits',
    'edit_my_permits',
    'view_my_prevention_plans',
    'create_prevention_plans',
    'edit_my_prevention_plans',
    'view_my_interventions',
    'close_my_permits',
  ],
  dg: [
    'view_dashboard',
    'view_permits',
    'view_prevention_plans',
    'view_interventions',
    'view_statistics',
    'view_kpis',
  ],
};

// Utilisateurs de démo (à remplacer par une vraie API)
const demoUsers: Record<string, { password: string; user: User }> = {
  'admin@toa.mg': {
    password: 'admin123',
    user: {
      id: '1',
      nom: 'Administrateur',
      prenom: 'Système',
      email: 'admin@toa.mg',
      telephone: '+261 34 00 000 00',
      role: 'super_admin',
      actif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'chef@toa.mg': {
    password: 'chef123',
    user: {
      id: '2',
      nom: 'RAJAONARISON',
      prenom: 'Jean',
      email: 'chef@toa.mg',
      telephone: '+261 34 00 000 01',
      role: 'chef_projet',
      actif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'hse@toa.mg': {
    password: 'hse123',
    user: {
      id: '3',
      nom: 'RAKOTO',
      prenom: 'Marie',
      email: 'hse@toa.mg',
      telephone: '+261 34 00 000 02',
      role: 'hse',
      actif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'prestataire@etech.mg': {
    password: 'prest123',
    user: {
      id: '4',
      nom: 'RANDRIA',
      prenom: 'Paul',
      email: 'prestataire@etech.mg',
      telephone: '+261 34 00 000 03',
      role: 'prestataire',
      entreprise: 'eTech',
      actif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  'dg@toa.mg': {
    password: 'dg123',
    user: {
      id: '5',
      nom: 'RAZAFY',
      prenom: 'Michel',
      email: 'dg@toa.mg',
      telephone: '+261 34 00 000 04',
      role: 'dg',
      actif: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulation d'appel API
        await new Promise((resolve) => setTimeout(resolve, 500));

        const demoUser = demoUsers[email];

        if (!demoUser || demoUser.password !== password) {
          throw new Error('Email ou mot de passe incorrect');
        }

        set({
          user: demoUser.user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      hasRole: (roles: UserRole[]) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },

      canAccessFeature: (feature: string) => {
        const { user } = get();
        if (!user) return false;

        const permissions = rolePermissions[user.role];

        // Super admin a tous les accès
        if (permissions.includes('*')) return true;

        return permissions.includes(feature);
      },
    }),
    {
      name: 'toa-auth-storage',
    }
  )
);
