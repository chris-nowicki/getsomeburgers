const yup = require("yup");

const regEmail =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = yup.object({
	first_name: yup
		.string()
		.trim()
		.min(2, {
			first_name: "First Name must be at least 2 characters long",
		})
		.required({
			first_name: "First Name is required",
		}),
	last_name: yup
		.string()
		.trim()
		.min(2, {
			last_name: "Last Name must be at least 2 characters long",
		})
		.required({
			last_name: "Last Name is required",
		}),
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
		})
});

module.exports = userSchema;
