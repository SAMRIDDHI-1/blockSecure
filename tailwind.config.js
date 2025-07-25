// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable manual dark mode
  theme: {
    extend: {
      colors: {
        // Cyberpunk-inspired color palette
        dark: {
          900: '#09090b', // Deepest black
          800: '#121218', // Rich black
          700: '#1a1a24', // Dark slate
        },
        radium: {
          400: '#39ff14', // Classic radium green
          500: '#2de000', // More intense green
        },
        neon: {
          blue: '#00f5ff', // Bright cyber blue
          purple: '#b026ff', // Accent color
        },
        metal: {
          400: '#a1a1aa', // Steel gray
          600: '#71717a', // Darker metal
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 245, 255, 0.7)',
        'glow-sm': '0 0 8px rgba(0, 245, 255, 0.5)',
        'radium-glow': '0 0 15px rgba(57, 255, 20, 0.7)'
      },
      animation: {
        'pulse-slow': 'pulse 5s infinite',
        'ping-slow': 'ping 3s infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'), // For styled form elements
  ],
}
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         // Cyberpunk color palette
//         cyber: {
//           dark: '#0a0e12',  // Deep greenish-black
//           bg: '#121a1f',    // Primary background
//           card: '#1a242d',  // Card background
//           border: '#253341', // Border color
//           accent: '#39ff14', // Radium green
//           blue: '#00f5ff',   // Neon blue
//           purple: '#b026ff', // Neon purple
//           text: '#c1d6e8'   // Light text
//         },
//         // Texture gradient stops
//         texture: {
//           start: '#0a0e12',
//           mid: '#0f1a1f',
//           end: '#142028'
//         }
//       },
//       backgroundImage: {
//         'cyber-texture': `
//           linear-gradient(
//             135deg,
//             var(--tw-gradient-stops)
//           ),
//           url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d2b36' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
//         `,
//       }
//     }
//   }
// }