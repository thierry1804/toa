import { useNavigate } from 'react-router-dom';
import { usePermitStore } from '@/store/permitStore';
import { useAuthStore } from '@/store/authStore';
import { useToastStore } from '@/store/toastStore';
import PermitHauteurForm from '@/components/forms/PermitHauteurForm';

export default function PermitHauteurFormPage() {
  const navigate = useNavigate();
  const { addPermisHauteur } = usePermitStore();
  const { user } = useAuthStore();
  const { success, error } = useToastStore();

  const handleComplete = async (data: any) => {
    try {
      addPermisHauteur(data);
      success('Permis hauteur créé et soumis pour validation');
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
    <PermitHauteurForm 
      onComplete={handleComplete} 
      onCancel={handleCancel} 
    />
  );
}
