# 🛠️ Plan d'Action pour Développeurs - Corrections TOA

**Date de création:** 27 octobre 2025  
**Priorité:** URGENT  
**Destinataires:** Équipe de développement TOA

---

## 🎯 Objectif

Corriger les écarts de conformité identifiés entre l'application et les documents PDF officiels, en priorisant les bugs critiques et les fonctionnalités manquantes.

---

## 🔴 SPRINT 1 : Actions Immédiates (Semaines 1-2)

### Bug #1 : Récapitulatif Incorrect (Permis Électrique) - CRITIQUE

**Fichier:** `src/components/forms/PermitElectriqueForm.tsx`

**Problème:**
Le récapitulatif de l'étape 5 affiche des données incorrectes ou vides car les données ne sont pas correctement partagées entre les étapes du formulaire multi-étapes.

**Symptômes:**
```typescript
// Récapitulatif affiche:
Site: "" // Au lieu de "ANT-TEST-001"
Type de travail: "Hors tension" // Au lieu de "Sous tension"
Niveau de tension: "Non spécifié" // Au lieu de "Basse tension"
```

**Cause probable:**
```typescript
// Dans MultiStepForm.tsx
// Le formData n'est pas correctement partagé entre les étapes
// ou les Step components n'utilisent pas updateFormData
```

**Solution:**

1. **Vérifier MultiStepForm.tsx:**
```typescript
// src/components/forms/MultiStepForm.tsx

// S'assurer que formData est bien initialisé
const [formData, setFormData] = useState<any>(initialData || {});

// La fonction updateFormData doit merger les données
const updateFormData = (data: any) => {
  setFormData((prev: any) => ({
    ...prev,
    ...data
  }));
};

// Passer formData ET updateFormData à chaque Step
const StepComponent = steps[currentStep].component(formData, updateFormData);
```

2. **Vérifier PermitElectriqueForm.tsx - Step1Component:**
```typescript
// Ligne ~92 (dans Step1Component)
const Step1Component = (formData: any, updateFormData: (data: any) => void) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      codeSite: formData.codeSite || '',  // ✅ Utiliser formData
      nombreIntervenants: formData.nombreIntervenants || 1,
      travailSousTension: formData.travailSousTension || false,
      // ... autres champs
    },
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);  // ✅ IMPORTANT: Appeler updateFormData
    // Ne PAS naviguer ici, laisser MultiStepForm gérer
  };
  
  // ...
};
```

3. **Corriger le récapitulatif (Step 5):**
```typescript
// Ligne ~600+ (dans Step5Component)
const Step5Component = (formData: any) => {
  // Utiliser directement formData au lieu de watch()
  
  return (
    <div>
      <h4>Récapitulatif de votre demande</h4>
      <div>
        <p>Site:</p>
        <p>{formData.codeSite || 'Non spécifié'}</p>
      </div>
      <div>
        <p>Intervenants:</p>
        <p>{formData.nombreIntervenants || 0} personne(s)</p>
      </div>
      <div>
        <p>Type de travail:</p>
        <p>
          {formData.travailSousTension && formData.travailHorsTension
            ? 'Sous et hors tension'
            : formData.travailSousTension
            ? 'Sous tension'
            : formData.travailHorsTension
            ? 'Hors tension'
            : 'Non spécifié'}
        </p>
      </div>
      <div>
        <p>Niveau de tension:</p>
        <p>
          {[
            formData.basseTension && 'Basse tension',
            formData.moyenneTension && 'Moyenne tension',
            formData.hauteTension && 'Haute tension'
          ]
            .filter(Boolean)
            .join(', ') || 'Non spécifié'}
        </p>
      </div>
    </div>
  );
};
```

**Tests:**
```bash
# 1. Relancer le serveur
npm run dev

# 2. Naviguer vers le permis électrique
http://localhost:5173/permits/new/electrique

# 3. Remplir étape 1
Code site: "ANT-001"
Cocher: Travail sous tension + Basse tension

# 4. Vérifier que le récapitulatif (étape 5) affiche:
✅ Site: ANT-001
✅ Type: Sous tension
✅ Niveau: Basse tension
```

**Temps estimé:** 4 heures  
**Priorité:** 🔴 CRITIQUE

---

### Tâche #2 : Ajouter Dates de Validité (Permis Électrique)

**Fichier:** `src/components/forms/PermitElectriqueForm.tsx`

**Modification:**

```typescript
// Ligne ~15 - Ajouter dans step1Schema
const step1Schema = z.object({
  // Champs existants...
  codeSite: z.string().min(1, 'Code site requis'),
  nombreIntervenants: z.number().min(1, 'Minimum 1 intervenant'),
  
  // ✅ AJOUTER:
  dateDebut: z.string().min(1, 'Date de début requise'),
  dateFin: z.string().min(1, 'Date de fin requise'),
  
  // Types de travail...
  travailSousTension: z.boolean(),
  // ...
}).refine((data) => {
  // ✅ Validation: dateFin > dateDebut
  if (data.dateDebut && data.dateFin) {
    return new Date(data.dateFin) >= new Date(data.dateDebut);
  }
  return true;
}, {
  message: 'La date de fin doit être postérieure à la date de début',
  path: ['dateFin'],
});
```

```typescript
// Ligne ~100+ - Ajouter dans le JSX de Step1Component
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input
    label="Code Site *"
    placeholder="Ex: ANT-001"
    {...register('codeSite')}
    error={errors.codeSite?.message}
  />
  <Input
    label="Nombre d'Intervenants *"
    type="number"
    {...register('nombreIntervenants', { valueAsNumber: true })}
    error={errors.nombreIntervenants?.message}
  />
</div>

{/* ✅ AJOUTER CE BLOC: */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input
    label="Date de début *"
    type="date"
    {...register('dateDebut')}
    error={errors.dateDebut?.message}
  />
  <Input
    label="Date de fin *"
    type="date"
    {...register('dateFin')}
    error={errors.dateFin?.message}
  />
</div>
```

```typescript
// Ligne ~600+ - Mettre à jour le récapitulatif
<div>
  <p>Période de validité:</p>
  <p>
    Du {formData.dateDebut ? new Date(formData.dateDebut).toLocaleDateString('fr-FR') : '—'}
    {' au '}
    {formData.dateFin ? new Date(formData.dateFin).toLocaleDateString('fr-FR') : '—'}
  </p>
</div>
```

**Fichier types:** `src/types/index.ts`

```typescript
// Ligne ~522 - Ajouter dans PermisElectrique interface
export interface PermisElectrique {
  id: string;
  numero: string;
  reference: string;
  permisGeneralId: string;
  planPreventionReference: string;
  
  // ✅ AJOUTER:
  dateDebut: Date;
  dateFin: Date;

  // Détails
  codeSite: string;
  // ...
}
```

**Tests:**
```bash
# Vérifier que:
✅ Les champs de date s'affichent dans l'étape 1
✅ Validation: dateFin >= dateDebut
✅ Message d'erreur si dates invalides
✅ Récapitulatif affiche les dates formatées
```

**Temps estimé:** 1 heure  
**Priorité:** 🔴 CRITIQUE

---

### Tâche #3 : Lien Plan de Prévention (Permis Électrique)

**Fichier:** `src/components/forms/PermitElectriqueForm.tsx`

**Modification:**

```typescript
// Ligne ~15 - Ajouter dans step1Schema
const step1Schema = z.object({
  // ✅ AJOUTER EN PREMIER:
  planPreventionId: z.string().min(1, 'Plan de prévention requis'),
  
  codeSite: z.string().min(1, 'Code site requis'),
  // ...
});
```

```typescript
// Ligne ~92 - Dans Step1Component, importer le store
import { usePreventionStore } from '@/store/preventionStore';  // ✅ À créer si n'existe pas

const Step1Component = (formData: any, updateFormData: (data: any) => void) => {
  // ✅ AJOUTER:
  const { plansPrevention } = usePreventionStore();
  const plansActifs = plansPrevention.filter(p => p.status === 'valide');
  
  const {
    register,
    handleSubmit,
    // ...
  } = useForm<Step1Data>({
    // ...
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ✅ AJOUTER EN PREMIER: */}
      <div className="mb-4">
        <Select
          label="Référence du plan de prévention *"
          {...register('planPreventionId')}
          error={errors.planPreventionId?.message}
        >
          <option value="">Sélectionnez un plan de prévention</option>
          {plansActifs.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.reference} - {plan.nomSite}
            </option>
          ))}
        </Select>
      </div>
      
      {/* Champs existants... */}
    </form>
  );
};
```

**Si preventionStore n'existe pas, créer:**

```typescript
// src/store/preventionStore.ts
import { create } from 'zustand';
import { PlanPrevention } from '@/types';

interface PreventionStore {
  plansPrevention: PlanPrevention[];
  addPlanPrevention: (plan: PlanPrevention) => void;
  // ...
}

export const usePreventionStore = create<PreventionStore>((set) => ({
  plansPrevention: [
    // Données de démo
    {
      id: 'pp-001',
      reference: 'PP-20251013-001',
      nomSite: 'Antananarivo Centre',
      status: 'valide',
      // ... autres champs
    },
  ],
  addPlanPrevention: (plan) =>
    set((state) => ({
      plansPrevention: [...state.plansPrevention, plan],
    })),
}));
```

**Temps estimé:** 1 heure  
**Priorité:** 🔴 CRITIQUE

---

### Tâche #4 : Corriger Valeurs Type Pente (Permis Hauteur)

**Fichier:** `src/components/forms/PermitHauteurForm.tsx`

**Modification:**

```typescript
// Rechercher les lignes avec les valeurs de pente (environ ligne 400-450)

// AVANT (INCORRECT):
const pentesOptions = [
  { value: 'plat', label: 'Plat (0-5°)' },
  { value: 'legere', label: 'Légère (5-15°)' },
  { value: 'forte', label: 'Forte (15-30°)' },
  { value: 'tres_forte', label: 'Très forte (30-45°)' },
  { value: 'extreme', label: 'Extrême (>45°)' }
];

// APRÈS (CORRECT selon PDF):
const pentesOptions = [
  { value: 'plat', label: 'Toit plat' },
  { value: 'legere', label: 'Légère pente < 20°' },
  { value: 'forte', label: 'Forte pente ≥ 20° et < 45°' },
  { value: 'tres_forte', label: 'Très forte pente ≥ 45° et < 60°' },
  { value: 'extreme', label: 'Pente extrême ≥ 60°' }
];
```

**Ou si c'est directement dans le JSX:**

```typescript
// Rechercher et remplacer:
<Select
  label="Type de pente"
  {...register('typePente')}
  disabled={!watchTravailToiture}
>
  <option value="">Sélectionnez</option>
  <option value="plat">Toit plat</option>
  <option value="legere">Légère pente &lt; 20°</option>
  <option value="forte">Forte pente ≥ 20° et &lt; 45°</option>
  <option value="tres_forte">Très forte pente ≥ 45° et &lt; 60°</option>
  <option value="extreme">Pente extrême ≥ 60°</option>
</Select>
```

**Tests:**
```bash
# 1. Naviguer vers permis hauteur
http://localhost:5173/permits/new/hauteur

# 2. Cocher "Travail en toiture"
# 3. Vérifier dropdown "Type de pente" affiche les bonnes valeurs
✅ "Toit plat" (pas d'angles)
✅ "Légère pente < 20°"
✅ "Forte pente ≥ 20° et < 45°"
✅ "Très forte pente ≥ 45° et < 60°"
✅ "Pente extrême ≥ 60°"
```

**Temps estimé:** 30 minutes  
**Priorité:** 🔴 CRITIQUE

---

## 📊 Récapitulatif Sprint 1

| Tâche | Fichier(s) | Temps | Priorité |
|-------|------------|-------|----------|
| Bug récapitulatif | PermitElectriqueForm.tsx, MultiStepForm.tsx | 4h | 🔴 |
| Dates validité | PermitElectriqueForm.tsx, types/index.ts | 1h | 🔴 |
| Lien plan prévention | PermitElectriqueForm.tsx, preventionStore.ts | 1h | 🔴 |
| Valeurs type pente | PermitHauteurForm.tsx | 30min | 🔴 |
| **TOTAL** | | **6.5h** | |

**Livrable Sprint 1:** Permis Électrique et Hauteur fonctionnels et conformes à 85%

---

## 🟡 SPRINT 2 : Fonctionnalités Manquantes (Semaines 3-4)

### Tâche #5 : Contrôle Journalier (Permis Électrique)

**Nouveau fichier:** `src/components/permits/ControleJournalierModal.tsx`

```typescript
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { ControleJournalierElectrique } from '@/types';

interface ControleJournalierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (controle: ControleJournalierElectrique) => void;
  permisNumero: string;
}

export default function ControleJournalierModal({
  isOpen,
  onClose,
  onSave,
  permisNumero,
}: ControleJournalierModalProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    codeSite: '',
    intervenants: '',
    confirmationMesures: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: new Date(formData.date),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contrôle Journalier">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Permis : {permisNumero}
        </p>
        
        <Input
          label="Date *"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        
        <Input
          label="Code Site *"
          placeholder="Ex: ANT-001"
          value={formData.codeSite}
          onChange={(e) => setFormData({ ...formData, codeSite: e.target.value })}
          required
        />
        
        <Input
          label="Intervenants *"
          placeholder="Noms des intervenants"
          value={formData.intervenants}
          onChange={(e) => setFormData({ ...formData, intervenants: e.target.value })}
          required
        />
        
        <Input
          label="Confirmation mise en œuvre mesures"
          placeholder="Observations"
          value={formData.confirmationMesures}
          onChange={(e) => setFormData({ ...formData, confirmationMesures: e.target.value })}
        />
        
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Enregistrer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
```

**Intégration dans PermitDetailPage:**

```typescript
// src/pages/permits/PermitDetailPage.tsx

import ControleJournalierModal from '@/components/permits/ControleJournalierModal';

export default function PermitDetailPage() {
  const [showControleModal, setShowControleModal] = useState(false);
  const { permit } = usePermitStore();
  
  const handleSaveControle = (controle: ControleJournalierElectrique) => {
    // Sauvegarder dans le store
    updatePermit({
      ...permit,
      controlesJournaliers: [...(permit.controlesJournaliers || []), controle],
    });
  };
  
  return (
    <div>
      {/* Détails du permis */}
      
      {/* Bouton pour ouvrir modal */}
      <Button onClick={() => setShowControleModal(true)}>
        Ajouter Contrôle Journalier
      </Button>
      
      {/* Tableau des contrôles existants */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Code Site</th>
            <th>Intervenants</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          {permit.controlesJournaliers?.map((controle, index) => (
            <tr key={index}>
              <td>{new Date(controle.date).toLocaleDateString('fr-FR')}</td>
              <td>{controle.codeSite}</td>
              <td>{controle.intervenants}</td>
              <td>{controle.confirmationMesures}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal */}
      <ControleJournalierModal
        isOpen={showControleModal}
        onClose={() => setShowControleModal(false)}
        onSave={handleSaveControle}
        permisNumero={permit.numero}
      />
    </div>
  );
}
```

**Temps estimé:** 3 heures  
**Priorité:** 🔴 CRITIQUE

---

## 🎯 Checklist Complète

### Sprint 1 (Urgent)
- [ ] Bug #1: Récapitulatif Permis Électrique
- [ ] Tâche #2: Dates validité Permis Électrique
- [ ] Tâche #3: Lien plan prévention Permis Électrique
- [ ] Tâche #4: Valeurs type pente Permis Hauteur
- [ ] Tests de régression

### Sprint 2 (Important)
- [ ] Tâche #5: Contrôle journalier (modal + tableau)
- [ ] Tâche #6: Bon consignation complet
- [ ] Tâche #7: Validations conditionnelles
- [ ] Tâche #8: Libellés EPI Permis Hauteur
- [ ] Tests de régression

### Sprint 3 (Plan Prévention)
- [ ] Section engagement prestataire
- [ ] Section signatures
- [ ] Upload documents HSSES
- [ ] Champs localisation (Fokontany, Commune, District)
- [ ] Tests de régression

### Sprint 4 (UX & Workflow)
- [ ] Workflow validation multi-rôles complet
- [ ] Améliorer récapitulatifs
- [ ] Optimisations UX
- [ ] Corrections libellés mineurs
- [ ] Tests complets

---

## 📚 Ressources

### Documentation
- [Rapport complet](./RAPPORT_TESTS_CONFORMITE_COMPLET.md)
- [Synthèse](./SYNTHESE_CONFORMITE_TOA.md)
- [Types TypeScript](./src/types/index.ts)

### PDF de Référence
- `doc/Permis electrique_.pdf` (SGHS-TMP-TOA-301_02)
- `doc/Permis hauteur.pdf` (SGHS-TMP-TOM-301_01)
- `doc/SGI-PPHSSES-TOA-601_Plan de prévention HSSES.pdf`

### Screenshots des Tests
- Localisation: `C:\Users\B88CD~1.RAN\AppData\Local\Temp\playwright-mcp-output\1761576219128\`
- 8 screenshots disponibles pour référence

---

## 🤝 Coordination

### Avant de Commencer
1. ✅ Lire ce plan d'action
2. ✅ Consulter le rapport détaillé
3. ✅ Créer une branche: `fix/conformite-sprint-1`
4. ✅ Créer les tickets dans le système de gestion

### Pendant le Développement
1. Commit réguliers avec messages clairs
2. Tests unitaires pour chaque correction
3. Documentation inline si nécessaire
4. Mettre à jour ce document si blocage

### Après Chaque Tâche
1. Tests manuels complets
2. Tests de régression
3. Pull Request avec description détaillée
4. Demander code review

---

**Document créé le:** 27 octobre 2025  
**Dernière mise à jour:** 27 octobre 2025  
**Version:** 1.0  
**Statut:** ✅ Prêt pour développement

