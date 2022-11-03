const yup = require("yup");

const createPostSchema = yup.object({
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
	burgerName: yup
		.string()
		.trim()
		.min(6, {
			burgerName: "Burger name must be at least 6 characters long",
		})
		.required({
			burgerName: "Burger name is required",
		}),
	_burgerRating: yup
		.number({
			burgerRating: "Burger rating is required and must be a number",
		})
		.required({
			burgerRating: "Burger rating is required",
		}),
	content: yup
		.string()
		.trim()
		.min(8, { comment: "Comment must be at least 8 characters long" })
		.required({ comment: "Comment required" }),
});

module.exports = createPostSchema;
