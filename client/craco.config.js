const path = require('path');

module.exports = {
    webpack: {
        resolve: {
            alias: {
              '@tailwind': path.resolve(__dirname, 'node_modules/@tailwindcss'),
            },
          },
          
      plugins: [
        // ... other plugins
        require('postcss-import'), // Import PostCSS Import plugin
        require('postcss-url'), // Import PostCSS URL plugin
        require('tailwindcss'), // Import Tailwind CSS plugin
        require('autoprefixer'), // Import Autoprefixer plugin
      ],
    },
  };
  