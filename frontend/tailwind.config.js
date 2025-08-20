/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'page-color-1': 'rgba(33, 33, 43, 1)', // <-- custom background color
        'brand-text-gray': 'rgba(255, 255, 255, 0.6)',               // <-- custom text color
        'brand-text-white': 'rgba(255, 255, 255, 1)', 
      },
      backgroundImage: {
        // You can keep or add gradients here if needed
      },
      screens: {

      
      // Custom breakpoints
      'minMobile': { 'max': '320px', 'min': '0px' },
      'sm': { 'max': '425px', 'min': '0px' },
      'md': { 'max': '1023px', 'min': '426px' },
      'lg': { 'max': '1439px', 'min': '1024px' },
      'xl': { 'min': '1440px' },
      
    },
    },
  },
  plugins: [],
};