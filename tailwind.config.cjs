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
				'scale': 'scale 0.3s ease-in-out forwards',
			},
			keyframes: {
				'scale': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.3)' },
				},
			},
		},
	},
	plugins: [],
};
