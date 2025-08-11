// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // ← TOP-LEVEL (not inside theme)
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          500: '#4f46e5',
          700: '#4338ca',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger:  '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

