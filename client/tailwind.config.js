module.exports = {
  darkMode: false, // Or set to 'class' or 'media' for automatic dark mode switching
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // glob pattern for all your React components
  ],
  theme: {
    extend: {}, // Add your custom Tailwind CSS theme extensions here
  },
  plugins: [
    require('@tailwindcss/forms'), // Import Tailwind CSS Forms plugin
  ],
};
