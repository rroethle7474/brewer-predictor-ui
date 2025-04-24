export const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_BREWER_PREDICTOR_API_BASE_URL || 'https://localhost:7226/api',
    isDevelopment: process.env.NODE_ENV === 'development',
    // Add other configuration settings here
  };