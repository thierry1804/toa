import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import InterventionForm from '../../components/interventions/InterventionForm';

export default function InterventionFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/interventions')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour à la liste
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Modifier l\'intervention' : 'Nouvelle Intervention'}</CardTitle>
        </CardHeader>
        <CardContent>
          <InterventionForm interventionId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
