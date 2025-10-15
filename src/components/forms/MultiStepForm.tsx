import { useState, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
  component: ReactNode | ((formData: any, updateFormData: (data: any) => void) => ReactNode);
  isValid?: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
  onCancel?: () => void;
  title: string;
  description?: string;
  submitLabel?: string;
  loading?: boolean;
  formData?: any;
  updateFormData?: (data: any) => void;
}

export default function MultiStepForm({
  steps,
  onComplete,
  onCancel,
  title,
  description,
  submitLabel = 'Soumettre',
  loading = false,
  formData = {},
  updateFormData,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepData = steps[currentStep] || steps[0];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };



  const canProceed = currentStepData?.isValid !== false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="mt-2 text-gray-600">{description}</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-primary-500">Étape {currentStep + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{steps.length}</span>
            <span className="text-gray-900">- {currentStepData.title}</span>
          </CardTitle>
          {currentStepData.description && (
            <p className="text-gray-600">{currentStepData.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {typeof currentStepData.component === 'function'
              ? currentStepData.component(formData, updateFormData || (() => { }))
              : currentStepData.component}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {!isFirstStep && (
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              Annuler
            </Button>
          )}
          
          <Button 
            onClick={handleNext} 
            disabled={!canProceed || loading}
            loading={loading}
          >
            {isLastStep ? submitLabel : 'Suivant'}
            {!isLastStep && <ChevronRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
