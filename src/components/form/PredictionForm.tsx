"use client";

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import { validatePredictionForm } from '../utils/validationUtils';
import { PredictionRequestDto } from '../types/predictionRequestDto';
import { PredictionDto } from '../types/predictionDto';

interface PredictionFormProps {
  onSubmit: (prediction: PredictionRequestDto) => Promise<PredictionDto>;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wins: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validatePredictionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        wins: parseInt(formData.wins, 0)
      });
      
      // Success notification
      toast.success('Your prediction has been submitted!');
      
      // Reset form
      setFormData({ firstName: '', lastName: '', wins: '' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle duplicate entry error
      if (error.response && error.response.status === 400 && 
          error.response.data.includes('already exists')) {
        toast.error('A prediction with this name already exists.');
        setErrors({ 
          firstName: 'A prediction with this name already exists' 
        });
      } else {
        // Handle other errors
        toast.error('Failed to submit prediction. Please try again.');
        console.error('Prediction submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-brewers-navy">Make Your Prediction</h2>
      
      <form onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        
        <InputField
          label="Predicted Wins"
          name="wins"
          type="number"
          min="0"
          max="162"
          value={formData.wins}
          onChange={handleChange}
          error={errors.wins}
          required
        />
        
        <SubmitButton 
          isSubmitting={isSubmitting} 
          text="Submit Prediction" 
        />
      </form>
    </div>
  );
};

export default PredictionForm;