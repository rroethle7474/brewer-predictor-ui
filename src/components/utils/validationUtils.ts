interface FormData {
    firstName: string;
    lastName: string;
    wins: string;
  }
  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  export const validatePredictionForm = (data: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};
    
    // First name validation
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (data.firstName.length > 100) {
      errors.firstName = 'First name must be less than 100 characters';
    }
    
    // Last name validation (optional but has length limit)
    if (data.lastName && data.lastName.length > 100) {
      errors.lastName = 'Last name must be less than 100 characters';
    }
    
    // Wins validation
    if (!data.wins) {
      errors.wins = 'Predicted wins is required';
    } else {
      const winsNumber = parseInt(data.wins, 10);
      if (isNaN(winsNumber)) {
        errors.wins = 'Predicted wins must be a number';
      } else if (winsNumber < 0 || winsNumber > 162) {
        errors.wins = 'Predicted wins must be between 0 and 162';
      }
    }
    
    return errors;
  };