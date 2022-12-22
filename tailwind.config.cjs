/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "768px" },
        laptop: { min: "768px" },
      },
			animation: {
				moveLeft: "moveLeft 0.8s ease-in-out forwards",
				moveRight: "moveRight 0.8s ease-in-out forwards",
				moveUp: "moveUp 0.8s ease-in-out forwards",
				moveDown: "moveDown 0.8s ease-in-out forwards",
				scaleUp: "scaleUp 0.8s ease-in-out forwards",
			},
			keyframes: {
				moveLeft: {
					'0%': { transform: 'translateX(0%)' },
					'15%': { transform: 'translateX(-51%)' },
					'40%, 100%': { transform: 'translateX(-50%)' }
				},
				moveRight: {
					'0%': { transform: 'translateX(0%)' },
					'15%': { transform: 'translateX(51%)' },
					'40%, 100%': { transform: 'translateX(50%)' }
				},
				moveUp: {
					'0%': { transform: 'translateY(0%)' },
					'15%': { transform: 'translateY(-51%)' },
					'40%, 100%': { transform: 'translateY(-50%)' }
				},
				moveDown: {
					'0%': { transform: 'translateY(0%)' },
					'15%': { transform: 'translateY(51%)' },
					'40%, 100%': { transform: 'translateY(50%)' }
				},
				scaleUp: {
					'0%': { transform: 'scale(0.8)' },
					'15%': { transform: 'scale(1)' },
					'40%, 100%': { transform: 'scale(1)' }
				},
			}
    },
  },
  plugins: [],
};
