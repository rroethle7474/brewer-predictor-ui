import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  text,
  disabled = false
}) => {
  return (
    <div className="mt-6">
      <button
        type="submit"
        disabled={isSubmitting || disabled}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-brewers-navy bg-brewers-gold hover:bg-brewers-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brewers-navy ${
          (isSubmitting || disabled) ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-brewers-navy" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Submitting...
          </>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default SubmitButton;