const yup = require("yup");

const restaurantSchema = yup.object({
	restaurantName: yup
		.string()
		.trim()
		.min(2, {
			restaurantName:
				"Restaurant name must be at least 2 characters long",
		})
		.required({
			restaurantName: "Restaurant name is required",
		}),
});

module.exports = restaurantSchema;
