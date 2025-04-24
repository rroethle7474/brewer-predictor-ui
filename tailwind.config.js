/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brewers: {
          navy: '#0A2351',
          gold: '#B6922E',
          yellow: '#FFCB05', // alternate accent
          blue: '#13294B', // alternate accent
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        heading: [
          'Oswald',
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
        ],
      },
      backgroundImage: {
        'brewers-pattern':
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 20px)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brewers.navy'),
            a: { color: theme('colors.brewers.gold'), fontWeight: 'bold' },
            h1: { fontFamily: theme('fontFamily.heading').join(',') },
            h2: { fontFamily: theme('fontFamily.heading').join(',') },
            h3: { fontFamily: theme('fontFamily.heading').join(',') },
          },
        },
      }),
    },
  },
  
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/typography')],
};
