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
	app.get("/api/posts", PostController.getAll);
	app.get("/api/users/getUser", authenticate, UserController.getLoggedInUser);
	app.get("/api/posts/user-total/:id", PostController.userTotalPosts);
	app.get("/api/posts/user-unique/:id", PostController.userUniquePosts);
	app.post("/api/posts/create", PostController.create);
	app.put("/api/posts/update", authenticate, PostController.update);
	app.put("/api/burgers/update", authenticate, BurgerController.update);
	app.put("/api/restaurants/update", authenticate, RestaurantController.update);
	app.delete("/api/posts/delete/:id", authenticate, PostController.delete);
	app.delete("/api/burgers/delete", authenticate, BurgerController.delete);
	app.delete("/api/restaurants/delete", authenticate, RestaurantController.delete);
	app.delete("/api/users/delete", authenticate, UserController.delete);
};
