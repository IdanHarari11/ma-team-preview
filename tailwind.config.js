/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["var(--font-rubik)", "sans-serif"],
      },
      colors: {
        'ma-primary': '#E8A04B', // Golden accent color
        'ma-black': '#1A1A1A',  // Dark color for text
        'ma-gray': '#E5E5E5',   // Light gray for backgrounds
        'ma-light': '#FAFAFA',  // Very light color for main backgrounds
      },
      animation: {
        'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}; 