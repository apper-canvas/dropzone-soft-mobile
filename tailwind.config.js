/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        surface: '#1E293B',
        background: '#0F172A',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'progress-wave': 'progress-wave 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear'
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { 
            borderColor: '#6366F1',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
          },
          '50%': { 
            borderColor: '#8B5CF6',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)'
          }
        },
        'progress-wave': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}