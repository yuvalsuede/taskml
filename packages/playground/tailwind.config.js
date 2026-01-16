/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════
        // TaskML Brand Colors (see BRANDBOOK.md)
        // ═══════════════════════════════════════════

        // Signal Orange - Primary action color
        signal: {
          DEFAULT: '#F97316',
          hover: '#FB923C',
          light: '#FDBA74',
          dark: '#C2410C',
        },

        // Midnight - Dark mode palette
        midnight: {
          DEFAULT: '#0D1117',
          elevated: '#161B22',
          surface: '#21262D',
          border: '#30363D',
          'border-active': '#484F58',
        },

        // Daylight - Light mode palette
        daylight: {
          DEFAULT: '#FFFFFF',
          elevated: '#F6F8FA',
          surface: '#F0F3F6',
          border: '#D0D7DE',
          'border-active': '#A8B1BC',
        },

        // Status colors
        status: {
          pending: '#6B7280',
          progress: '#3B82F6',
          review: '#A855F7',
          completed: '#22C55E',
          blocked: '#EF4444',
          cancelled: '#6B7280',
        },

        // Priority colors
        priority: {
          0: '#EF4444',
          1: '#F97316',
          2: '#EAB308',
          3: '#6B7280',
        },

        // Extended palette for data viz
        chart: {
          blue: '#3B82F6',
          purple: '#A855F7',
          pink: '#EC4899',
          teal: '#14B8A6',
          lime: '#84CC16',
          amber: '#F59E0B',
        },
      },

      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },

      spacing: {
        '4.5': '18px',
        '18': '72px',
      },

      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },

      boxShadow: {
        'sm-dark': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'md-dark': '0 4px 6px rgba(0, 0, 0, 0.4)',
        'lg-dark': '0 10px 15px rgba(0, 0, 0, 0.5)',
        'sm-light': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md-light': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg-light': '0 10px 15px rgba(0, 0, 0, 0.10)',
        'xl-light': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },

      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },

      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-custom': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'ease-in-out-custom': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      animation: {
        'fade-in': 'fade-in 200ms ease-out forwards',
        'zoom-in': 'zoom-in 200ms ease-out forwards',
        'slide-up': 'slide-up 200ms ease-out forwards',
        'slide-down': 'slide-down 200ms ease-out forwards',
        'slide-in-right': 'slide-in-right 200ms ease-out forwards',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'zoom-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
