const yup = require("yup");

const userSchema = yup.object({
	email: yup
		.string()
		.trim()
		.required({ email: "Email required" })
		.matches(regEmail, {
			message: { email: "Invalid email address" },
			excludeEmptyString: true,
		}),
	password: yup.string().trim().required({ password: "password required" }),
	confirm_password: yup
		.string()
		.trim()
		.required({ confirm_password: "Please confirm your password" })
		.oneOf([yup.ref("password")], {
			confirm_password: "Passwords must match",
		}),
	profilePic: yup.string().trim().optional(),
});

module.exports = userSchema;
