const yup = require("yup");

const burgerSchema = yup.object({
	burgerName: yup
		.string()
		.trim()
		.min(6, {
			burgerName: "Burger name must be at least 6 characters long",
		})
		.required({
			burgerName: "Burger name is required",
		}),
	burgerPicture: yup.string().trim().optional(),
});

module.exports = burgerSchema;
