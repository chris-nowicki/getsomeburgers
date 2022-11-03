const yup = require("yup");

const updatePostSchema = yup.object({
	_burgerRating: yup
		.string()
		.required({
			burgerRating: "Burger rating is required",
		}),
	content: yup
		.string()
		.trim()
		.min(8, { comment: "Comment must be at least 8 characters long" })
		.required({ comment: "Comment required" }),
});

module.exports = updatePostSchema;
