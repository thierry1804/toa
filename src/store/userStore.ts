import { create } from 'zustand';
import type { User, UserRole } from '@/types';

interface UserStore {
  users: User[];
  selectedUser: User | null;

  // Actions
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  setSelectedUser: (user: User | null) => void;

  // Helpers
  getUserById: (id: string) => User | undefined;
  getUsersByRole: (role: UserRole) => User[];
  getUsersByEntreprise: (entreprise: string) => User[];
  getActiveUsers: () => User[];
  getPrestataires: () => User[];
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,

  setUsers: (users) => set({ users }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser, updatedAt: new Date() } : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  toggleUserStatus: (id) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id
          ? { ...user, actif: !user.actif, updatedAt: new Date() }
          : user
      ),
    })),

  setSelectedUser: (user) => set({ selectedUser: user }),

  // Helpers
  getUserById: (id) => {
    return get().users.find((user) => user.id === id);
  },

  getUsersByRole: (role) => {
    return get().users.filter((user) => user.role === role);
  },

  getUsersByEntreprise: (entreprise) => {
    return get().users.filter((user) => user.entreprise === entreprise);
  },

  getActiveUsers: () => {
    return get().users.filter((user) => user.actif);
  },

  getPrestataires: () => {
    return get().users.filter((user) => user.role === 'prestataire');
  },
}));

// Mock data pour le développement - Les 11 prestataires + équipe TOA
const mockUsers: User[] = [
  // Super Admin
  {
    id: '1',
    nom: 'Administrateur',
    prenom: 'Système',
    email: 'admin@toa.mg',
    telephone: '+261 34 00 000 00',
    role: 'super_admin',
    actif: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  // Chef de projet
  {
    id: '2',
    nom: 'RAJAONARISON',
    prenom: 'Jean',
    email: 'jean.rajaonarison@toa.mg',
    telephone: '+261 34 12 345 01',
    role: 'chef_projet',
    actif: true,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01'),
  },
  {
    id: '3',
    nom: 'ANDRIANASOLO',
    prenom: 'Michel',
    email: 'michel.andrianasolo@toa.mg',
    telephone: '+261 34 12 345 02',
    role: 'chef_projet',
    actif: true,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01'),
  },
  // Responsables HSE
  {
    id: '4',
    nom: 'RAVAKA',
    prenom: 'Responsable',
    email: 'ravaka.hse@toa.mg',
    telephone: '+261 34 12 345 03',
    role: 'hse',
    actif: true,
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: '5',
    nom: 'RAKOTO',
    prenom: 'Marie',
    email: 'marie.rakoto@toa.mg',
    telephone: '+261 34 12 345 04',
    role: 'hse',
    actif: true,
    createdAt: new Date('2025-02-05'),
    updatedAt: new Date('2025-02-05'),
  },
  // Direction Générale
  {
    id: '6',
    nom: 'RAZAFY',
    prenom: 'Michel',
    email: 'michel.razafy@toa.mg',
    telephone: '+261 34 12 345 05',
    role: 'dg',
    actif: true,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
  // Les 11 Prestataires
  {
    id: '7',
    nom: 'RANDRIA',
    prenom: 'Paul',
    email: 'paul.randria@etech.mg',
    telephone: '+261 34 20 000 01',
    role: 'prestataire',
    entreprise: 'eTech Consulting',
    actif: true,
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date('2025-02-10'),
  },
  {
    id: '8',
    nom: 'RASOAMANARIVO',
    prenom: 'Nirina',
    email: 'nirina@telma.mg',
    telephone: '+261 34 20 000 02',
    role: 'prestataire',
    entreprise: 'TELMA',
    actif: true,
    createdAt: new Date('2025-02-12'),
    updatedAt: new Date('2025-02-12'),
  },
  {
    id: '9',
    nom: 'ANDRIAMIHAJA',
    prenom: 'Hery',
    email: 'hery@orange.mg',
    telephone: '+261 34 20 000 03',
    role: 'prestataire',
    entreprise: 'Orange Madagascar',
    actif: true,
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-15'),
  },
  {
    id: '10',
    nom: 'RAKOTOARISON',
    prenom: 'Tiana',
    email: 'tiana@airtel.mg',
    telephone: '+261 34 20 000 04',
    role: 'prestataire',
    entreprise: 'Airtel Madagascar',
    actif: true,
    createdAt: new Date('2025-02-18'),
    updatedAt: new Date('2025-02-18'),
  },
  {
    id: '11',
    nom: 'RAHARISON',
    prenom: 'Fidy',
    email: 'fidy@technoserv.mg',
    telephone: '+261 34 20 000 05',
    role: 'prestataire',
    entreprise: 'TechnoServ',
    actif: true,
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-02-20'),
  },
  {
    id: '12',
    nom: 'RANDRIANASOLO',
    prenom: 'Nivo',
    email: 'nivo@madatelecom.mg',
    telephone: '+261 34 20 000 06',
    role: 'prestataire',
    entreprise: 'Madagascar Telecom',
    actif: true,
    createdAt: new Date('2025-02-22'),
    updatedAt: new Date('2025-02-22'),
  },
  {
    id: '13',
    nom: 'ANDRIANJAFY',
    prenom: 'Toky',
    email: 'toky@infratech.mg',
    telephone: '+261 34 20 000 07',
    role: 'prestataire',
    entreprise: 'InfraTech Solutions',
    actif: true,
    createdAt: new Date('2025-02-25'),
    updatedAt: new Date('2025-02-25'),
  },
  {
    id: '14',
    nom: 'RAKOTONDRABE',
    prenom: 'Lova',
    email: 'lova@btp-services.mg',
    telephone: '+261 34 20 000 08',
    role: 'prestataire',
    entreprise: 'BTP Services',
    actif: true,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-01'),
  },
  {
    id: '15',
    nom: 'RAJAONARY',
    prenom: 'Ny Aina',
    email: 'nyaina@electricite-pro.mg',
    telephone: '+261 34 20 000 09',
    role: 'prestataire',
    entreprise: 'Électricité Pro',
    actif: true,
    createdAt: new Date('2025-03-03'),
    updatedAt: new Date('2025-03-03'),
  },
  {
    id: '16',
    nom: 'ANDRIAMAMPIANINA',
    prenom: 'Rija',
    email: 'rija@network-install.mg',
    telephone: '+261 34 20 000 10',
    role: 'prestataire',
    entreprise: 'Network Install',
    actif: true,
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05'),
  },
  {
    id: '17',
    nom: 'RAKOTONDRAZAKA',
    prenom: 'Miora',
    email: 'miora@maintenance-plus.mg',
    telephone: '+261 34 20 000 11',
    role: 'prestataire',
    entreprise: 'Maintenance Plus',
    actif: true,
    createdAt: new Date('2025-03-08'),
    updatedAt: new Date('2025-03-08'),
  },
  // Un prestataire inactif
  {
    id: '18',
    nom: 'RABEMANANJARA',
    prenom: 'Haja',
    email: 'haja@ancien-presta.mg',
    telephone: '+261 34 20 000 12',
    role: 'prestataire',
    entreprise: 'Ancien Prestataire',
    actif: false,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2025-01-15'),
  },
];

// Initialiser le store avec les données mock
if (typeof window !== 'undefined') {
  useUserStore.setState({ users: mockUsers });
}
