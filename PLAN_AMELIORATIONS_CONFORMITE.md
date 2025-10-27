# PLAN D'AMÉLIORATIONS POUR LA CONFORMITÉ
## Roadmap Technique - Système TOA HSSES

**Date :** 15 Janvier 2025  
**Version :** 1.0  
**Priorité :** HAUTE  

---

## 🎯 **OBJECTIFS DU PLAN**

### **Objectifs Principaux :**
1. **Atteindre 100% de conformité** pour tous les profils utilisateurs
2. **Implémenter les fonctionnalités manquantes** du Super Admin
3. **Améliorer la sécurité** et la traçabilité
4. **Optimiser l'expérience utilisateur**

### **Timeline :**
- **Phase 1 :** Super Admin (2-3 semaines)
- **Phase 2 :** Améliorations générales (1-2 semaines)
- **Phase 3 :** Tests et validation (1 semaine)

---

## 🔧 **PHASE 1 : SUPER ADMIN - FONCTIONNALITÉS CRITIQUES**

### **1.1 Interface de Configuration des Permissions**

#### **Fichiers à Créer :**
```
src/pages/admin/
├── PermissionManagementPage.tsx
├── RoleConfigurationModal.tsx
└── PermissionMatrix.tsx

src/components/admin/
├── PermissionEditor.tsx
├── RoleSelector.tsx
└── PermissionGrid.tsx
```

#### **Store à Créer :**
```typescript
// src/store/adminStore.ts
interface AdminStore {
  // Configuration des permissions
  rolePermissions: Record<UserRole, string[]>;
  customPermissions: string[];
  
  // Actions
  updateRolePermissions: (role: UserRole, permissions: string[]) => void;
  createCustomPermission: (permission: string) => void;
  deleteCustomPermission: (permission: string) => void;
  
  // Configuration système
  systemConfig: SystemConfig;
  updateSystemConfig: (config: Partial<SystemConfig>) => void;
}
```

#### **Interface de Gestion :**
```typescript
// src/pages/admin/PermissionManagementPage.tsx
export default function PermissionManagementPage() {
  const { rolePermissions, updateRolePermissions } = useAdminStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Permissions</h2>
      
      {/* Matrice des permissions */}
      <PermissionMatrix 
        permissions={rolePermissions}
        onUpdate={updateRolePermissions}
      />
      
      {/* Configuration des rôles */}
      <RoleConfigurationModal />
    </div>
  );
}
```

### **1.2 Système de Logs d'Audit**

#### **Types à Créer :**
```typescript
// src/types/audit.ts
export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: Date;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export type AuditAction = 
  | 'CREATE' | 'UPDATE' | 'DELETE'
  | 'VALIDATE' | 'REJECT' | 'APPROVE'
  | 'LOGIN' | 'LOGOUT' | 'PERMISSION_CHANGE';
```

#### **Store d'Audit :**
```typescript
// src/store/auditStore.ts
interface AuditStore {
  logs: AuditLog[];
  
  // Actions
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  getLogsByUser: (userId: string) => AuditLog[];
  getLogsByAction: (action: AuditAction) => AuditLog[];
  getLogsByDateRange: (start: Date, end: Date) => AuditLog[];
  exportLogs: (format: 'csv' | 'json') => void;
}
```

#### **Middleware d'Audit :**
```typescript
// src/lib/auditMiddleware.ts
export const auditMiddleware = (action: AuditAction, resource: string) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const result = method.apply(this, args);
      
      // Enregistrer l'action
      useAuditStore.getState().addLog({
        userId: useAuthStore.getState().user?.id || '',
        userEmail: useAuthStore.getState().user?.email || '',
        action,
        resource,
        resourceId: args[0] || '',
        details: { args: args.slice(1) },
      });
      
      return result;
    };
  };
};
```

### **1.3 Paramètres Système**

#### **Configuration Système :**
```typescript
// src/types/system.ts
export interface SystemConfig {
  // Formats de référence
  permitReferenceFormat: string;
  preventionReferenceFormat: string;
  
  // Délais de validation
  validationTimeouts: {
    chef: number; // en heures
    hse: number;  // en heures
  };
  
  // Notifications
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
  };
  
  // Sauvegarde
  backup: {
    frequency: 'daily' | 'weekly' | 'monthly';
    retention: number; // en jours
    location: string;
  };
  
  // Sécurité
  security: {
    sessionTimeout: number; // en minutes
    maxLoginAttempts: number;
    passwordPolicy: PasswordPolicy;
  };
}
```

#### **Interface de Configuration :**
```typescript
// src/pages/admin/SystemConfigPage.tsx
export default function SystemConfigPage() {
  const { systemConfig, updateSystemConfig } = useAdminStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuration Système</h2>
      
      {/* Onglets de configuration */}
      <Tabs defaultValue="references">
        <TabsList>
          <TabsTrigger value="references">Références</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="references">
          <ReferenceConfigForm config={systemConfig} />
        </TabsContent>
        
        {/* Autres onglets... */}
      </Tabs>
    </div>
  );
}
```

### **1.4 Monitoring et Alertes**

#### **Système de Monitoring :**
```typescript
// src/store/monitoringStore.ts
interface MonitoringStore {
  metrics: SystemMetrics;
  alerts: Alert[];
  
  // Métriques
  getSystemHealth: () => SystemHealth;
  getPerformanceMetrics: () => PerformanceMetrics;
  getErrorRates: () => ErrorRates;
  
  // Alertes
  createAlert: (alert: Omit<Alert, 'id'>) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
}
```

#### **Dashboard de Monitoring :**
```typescript
// src/pages/admin/MonitoringDashboard.tsx
export default function MonitoringDashboard() {
  const { metrics, alerts } = useMonitoringStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Monitoring Système</h2>
      
      {/* Métriques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Utilisateurs Actifs"
          value={metrics.activeUsers}
          trend={metrics.userTrend}
        />
        <MetricCard 
          title="Permis en Cours"
          value={metrics.activePermits}
          trend={metrics.permitTrend}
        />
        <MetricCard 
          title="Taux d'Erreur"
          value={`${metrics.errorRate}%`}
          trend={metrics.errorTrend}
        />
        <MetricCard 
          title="Performance"
          value={`${metrics.performance}ms`}
          trend={metrics.perfTrend}
        />
      </div>
      
      {/* Alertes */}
      <AlertsPanel alerts={alerts} />
    </div>
  );
}
```

---

## 🚀 **PHASE 2 : AMÉLIORATIONS GÉNÉRALES**

### **2.1 Signatures Numériques**

#### **Composant de Signature :**
```typescript
// src/components/ui/SignaturePad.tsx
export default function SignaturePad({ 
  onSave, 
  onClear, 
  disabled = false 
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDrawing(true);
    // Logique de dessin...
  };
  
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      onSave(dataURL);
    }
  };
  
  return (
    <div className="border rounded-lg p-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border rounded cursor-crosshair"
        onMouseDown={handleMouseDown}
        // ... autres événements
      />
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave} disabled={disabled}>
          Sauvegarder
        </Button>
        <Button variant="outline" onClick={onClear}>
          Effacer
        </Button>
      </div>
    </div>
  );
}
```

#### **Intégration dans les Formulaires :**
```typescript
// Ajout dans les formulaires de validation
const [signature, setSignature] = useState<string>('');

<SignaturePad
  onSave={setSignature}
  onClear={() => setSignature('')}
  disabled={!canSign}
/>
```

### **2.2 Upload de Documents**

#### **Composant d'Upload :**
```typescript
// src/components/ui/DocumentUpload.tsx
export default function DocumentUpload({ 
  onUpload, 
  acceptedTypes = ['pdf', 'jpg', 'png'],
  maxSize = 10 * 1024 * 1024 // 10MB
}: DocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };
  
  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return acceptedTypes.includes(extension || '');
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };
  
  return (
    <div 
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-600 mb-2">
        Glissez-déposez vos documents ici
      </p>
      <p className="text-sm text-gray-500">
        Formats acceptés: {acceptedTypes.join(', ')}
      </p>
      
      <input
        type="file"
        multiple
        accept={acceptedTypes.map(type => `.${type}`).join(',')}
        onChange={(e) => handleFiles(Array.from(e.target.files || []))}
        className="hidden"
        id="document-upload"
      />
      <label 
        htmlFor="document-upload"
        className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded cursor-pointer"
      >
        Sélectionner des fichiers
      </label>
    </div>
  );
}
```

### **2.3 Validation GPS**

#### **Composant de Géolocalisation :**
```typescript
// src/components/ui/GPSValidation.tsx
export default function GPSValidation({ 
  onLocationUpdate,
  requiredAccuracy = 10 // en mètres
}: GPSValidationProps) {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setAccuracy(position.coords.accuracy);
        onLocationUpdate(position);
      },
      (error) => {
        setError(`Erreur de géolocalisation: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };
  
  return (
    <div className="space-y-4">
      <Button onClick={getCurrentLocation}>
        <MapPin className="h-4 w-4 mr-2" />
        Valider la localisation
      </Button>
      
      {location && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Latitude:</strong> {location.coords.latitude.toFixed(6)}
          </p>
          <p className="text-sm text-green-800">
            <strong>Longitude:</strong> {location.coords.longitude.toFixed(6)}
          </p>
          <p className="text-sm text-green-800">
            <strong>Précision:</strong> {accuracy?.toFixed(1)}m
          </p>
          {accuracy && accuracy <= requiredAccuracy && (
            <p className="text-sm text-green-600 font-medium">
              ✓ Localisation validée
            </p>
          )}
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}
```

### **2.4 Notifications en Temps Réel**

#### **Système de Notifications :**
```typescript
// src/store/notificationStore.ts
interface NotificationStore {
  notifications: Notification[];
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  
  // WebSocket
  connect: () => void;
  disconnect: () => void;
}

// src/lib/websocket.ts
export class NotificationWebSocket {
  private ws: WebSocket | null = null;
  
  connect() {
    this.ws = new WebSocket(process.env.REACT_APP_WS_URL || 'ws://localhost:8080');
    
    this.ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      useNotificationStore.getState().addNotification(notification);
    };
  }
  
  disconnect() {
    this.ws?.close();
  }
}
```

---

## 🧪 **PHASE 3 : TESTS ET VALIDATION**

### **3.1 Tests Unitaires**

#### **Tests des Stores :**
```typescript
// src/store/__tests__/authStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';

describe('AuthStore', () => {
  test('should login user correctly', async () => {
    const { result } = renderHook(() => useAuthStore());
    
    await act(async () => {
      await result.current.login('admin@toa.mg', 'admin123');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe('admin@toa.mg');
  });
  
  test('should check permissions correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.login('admin@toa.mg', 'admin123');
    });
    
    expect(result.current.canAccessFeature('view_users')).toBe(true);
    expect(result.current.canAccessFeature('invalid_feature')).toBe(false);
  });
});
```

#### **Tests des Composants :**
```typescript
// src/components/__tests__/ValidationModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ValidationModal } from '../ValidationModal';

describe('ValidationModal', () => {
  test('should render validation form', () => {
    render(
      <ValidationModal
        isOpen={true}
        onClose={jest.fn()}
        permisId="123"
        type="chef"
      />
    );
    
    expect(screen.getByText('Validation Chef de Projet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument();
  });
  
  test('should call validation function on submit', () => {
    const mockValidate = jest.fn();
    render(
      <ValidationModal
        isOpen={true}
        onClose={jest.fn()}
        permisId="123"
        type="chef"
        onValidate={mockValidate}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Valider' }));
    expect(mockValidate).toHaveBeenCalled();
  });
});
```

### **3.2 Tests d'Intégration**

#### **Tests de Workflow :**
```typescript
// src/__tests__/workflow.test.ts
describe('Permit Workflow', () => {
  test('should complete full permit validation workflow', async () => {
    // 1. Prestataire crée un permis
    const permit = await createPermit({
      intituleTravaux: 'Test',
      localisation: 'Site A',
      // ... autres champs
    });
    
    // 2. Chef de Projet valide
    await validateByChef(permit.id, 'Chef Test', 'Commentaire');
    
    // 3. HSE valide et attribue référence
    await validateByHSE(permit.id, 'HSE Test', 'Commentaire');
    
    // 4. Vérifier le statut final
    const finalPermit = await getPermit(permit.id);
    expect(finalPermit.status).toBe('valide');
    expect(finalPermit.reference).toBeDefined();
  });
});
```

### **3.3 Tests de Performance**

#### **Tests de Charge :**
```typescript
// src/__tests__/performance.test.ts
describe('Performance Tests', () => {
  test('should handle large number of permits', async () => {
    const startTime = performance.now();
    
    // Créer 1000 permis
    const permits = await Promise.all(
      Array.from({ length: 1000 }, (_, i) => 
        createPermit({ intituleTravaux: `Permis ${i}` })
      )
    );
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(5000); // Moins de 5 secondes
    expect(permits).toHaveLength(1000);
  });
});
```

---

## 📋 **CHECKLIST DE VALIDATION**

### **Phase 1 - Super Admin :**
- [ ] Interface de gestion des permissions
- [ ] Système de logs d'audit
- [ ] Configuration des paramètres système
- [ ] Dashboard de monitoring
- [ ] Tests unitaires des nouvelles fonctionnalités

### **Phase 2 - Améliorations :**
- [ ] Signatures numériques
- [ ] Upload de documents
- [ ] Validation GPS
- [ ] Notifications temps réel
- [ ] Tests d'intégration

### **Phase 3 - Validation :**
- [ ] Tests de performance
- [ ] Tests de sécurité
- [ ] Validation utilisateur
- [ ] Documentation mise à jour
- [ ] Déploiement en production

---

## 🎯 **MÉTRIQUES DE SUCCÈS**

### **Objectifs Quantitatifs :**
- **Conformité Super Admin :** 100% (actuellement 85%)
- **Temps de réponse :** < 200ms pour toutes les actions
- **Couverture de tests :** > 90%
- **Taux d'erreur :** < 0.1%

### **Objectifs Qualitatifs :**
- **Expérience utilisateur :** Excellente
- **Sécurité :** Renforcée
- **Maintenabilité :** Améliorée
- **Documentation :** Complète

---

**Document généré le :** 15 Janvier 2025  
**Version :** 1.0  
**Prochaine révision :** Après chaque phase d'implémentation
