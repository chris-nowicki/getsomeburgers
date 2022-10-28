const UserController = require("../controllers/user.controller");

// jwt authentication
const { authenticate } = require("../middlewares/authenticateMiddleware")

// yup validation
const validation = require("../middlewares/validationMiddleware");

// yup validation schemas
const userSchema = require("../validations/userValidation");

// routes
module.exports = (app) => {
	app.post(
		"/api/users/register",
		validation(userSchema),
		UserController.register
	);
	app.post("/api/users/login", UserController.login);
	app.post("/api/users/logout", UserController.logout);
	// app.put('/api/users/profilePicture/:id', authenticate, UserController.updateProfilePicture)
};
