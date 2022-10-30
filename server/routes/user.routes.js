const UserController = require("../controllers/user.controller");
const PostController = require("../controllers/post.controller");
const BurgerController = require("../controllers/burger.controller");
const RestaurantController = require("../controllers/restaurant.controller");

// jwt authentication
const { authenticate } = require("../middlewares/authenticateMiddleware");

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
	app.post("/api/posts/create", PostController.create);
	app.put("/api/posts/update", PostController.update);
	app.put("/api/burgers/update", BurgerController.update);
	app.put("/api/restaurants/update", RestaurantController.update);
	app.delete("/api/posts/delete", PostController.delete);
	app.delete("/api/burgers/delete", BurgerController.delete);
	app.delete("/api/restaurants/delete", RestaurantController.delete);
	app.delete("/api/users/delete", UserController.delete);

	// app.put('/api/users/profilePicture/:id', authenticate, UserController.updateProfilePicture)
};
