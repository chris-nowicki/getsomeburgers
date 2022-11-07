/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms"),require("flowbite/plugin")],
};
