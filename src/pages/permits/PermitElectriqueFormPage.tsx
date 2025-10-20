import { useNavigate } from 'react-router-dom';
import { usePermitStore } from '@/store/permitStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import PermitElectriqueForm from '@/components/forms/PermitElectriqueForm';

export default function PermitElectriqueFormPage() {
  const navigate = useNavigate();
  const { addPermisElectrique } = usePermitStore();
  const { user } = useAuthStore();
  const { success, error } = useToastStore();

  const handleComplete = async (data: any) => {
    try {
      addPermisElectrique(data);
      success('Permis électrique créé et soumis pour validation');
      navigate('/permits');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      error('Une erreur est survenue lors de la sauvegarde');
    }
  };

  const handleCancel = () => {
    navigate('/permits');
  };

  return (
    <PermitElectriqueForm 
      onComplete={handleComplete} 
      onCancel={handleCancel} 
    />
  );
}
