// tailwind.config.cjs (Final High-Fidelity Version)
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6D28D9', // A slightly deeper, more professional purple
        'brand-primary-light': '#F5F3FF', // The very light purple for icon backgrounds
        'brand-bg': '#FFFFFF',
        'brand-section-bg': '#F9FAFB', // The specific, clean off-white for the features section
        'brand-text-primary': '#1F2937',
        'brand-text-secondary': '#6B7280',
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'button-primary': '0 4px 14px 0 rgb(109 40 217 / 39%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem', // The perfect, soft radius for the feature cards
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}