/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./inertia/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Prompt, ui-sans-serif',
        heading: 'Roboto, ui-serif',
      },
      colors: {
        border: 'hsl(20, 5.9%, 90%)',
        input: 'hsl(20, 5.9%, 90%)',
        ring: 'hsl(20, 14.3%, 4.1%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(20, 14.3%, 4.1%)',
        primary: {
          DEFAULT: 'hsl(215.55555555555554, 42.85714285714286%, 24.705882352941178%)',
          foreground: 'hsl(161.97044334975368, 93.5483870967742%, 57.45098039215686%)',
        },
        secondary: {
          DEFAULT: 'hsl(60, 4.8%, 95.9%)',
          foreground: 'hsl(24, 9.8%, 10%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(60, 9.1%, 97.8%)',
        },
        muted: {
          DEFAULT: 'hsl(60, 4.8%, 95.9%)',
          foreground: 'hsl(25, 5.3%, 44.7%)',
        },
        accent: {
          DEFAULT: 'hsl(60, 4.8%, 95.9%)',
          foreground: 'hsl(24, 9.8%, 10%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(20, 14.3%, 4.1%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(20, 14.3%, 4.1%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
