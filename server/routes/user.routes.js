// imported controllers
const UserController = require("../controllers/user.controller");
const PostController = require("../controllers/post.controller");
const BurgerController = require("../controllers/burger.controller");
const RestaurantController = require("../controllers/restaurant.controller");
const ProfileController = require("../controllers/profile.controller");
const s3Bucket = require("../controllers/s3.controller");

// jwt authentication
const { authenticate } = require("../middlewares/authenticateMiddleware");

// yup validation
const validation = require("../middlewares/validationMiddleware");

// yup validation schemas
const userSchema = require("../validations/registerValidation");
const createPostSchema = require("../validations/createPostValidation");
const updatePostSchema = require("../validations/updatePostValidation");
const burgerSchema = require("../validations/burgerValidation");
const restaurantSchema = require("../validations/restaurantUpdateValidation");

// routes
module.exports = (app) => {
	// register user
	app.post(
		"/api/users/register",
		validation(userSchema),
		UserController.register
	);

	// user login
	app.post("/api/users/login", UserController.login);

	// user logout
	app.post("/api/users/logout", UserController.logout);

	// create post
	app.post(
		"/api/posts/create",
		authenticate,
		validation(createPostSchema),
		PostController.create
	);

	// get amazon s3 promise URL
	app.get("/s3Url", authenticate, s3Bucket.getS3URL);

	// get all posts for post feed in dashboard
	app.get("/api/posts", authenticate, PostController.getAll);

	// get one post for post edit
	app.get("/api/posts/:id", authenticate, PostController.getOne);

	// get user total post count for dashboard
	app.get("/api/posts/user-total/:id", authenticate, PostController.userTotalPosts);

	// get total unique posts for dashboard
	app.get("/api/posts/user-unique/:id", authenticate, PostController.userUniquePosts);

	// get list of all restaurants for the DataList in the create/edit post components
	app.get("/api/restaurants", authenticate, RestaurantController.getRestaurantNames);

	// find one restaurant
	app.get("/api/restaurants/findOne/:name", authenticate, RestaurantController.getOne);

	// get all burgers belonging to restaurant by restaurant ID
	app.get("/api/burgers/:id", authenticate, BurgerController.getBurgers);

	// get logged in user
	app.get("/api/users/getUser", authenticate, UserController.getLoggedInUser);


	// update users profile picture when the uploaded image is deleted
	// resets users profile picture to default
	app.put(
		"/api/users/deleteProfilePic",
		authenticate,
		ProfileController.deleteProfilePicture
	);

	// updates user profile picture if a new one is uploaded
	app.put(
		"/api/users/updateProfilePic", authenticate,
		ProfileController.updateProfilePicture
	);

	// update user information from the settings menu
	app.put("/api/users/update", authenticate, UserController.update);

	// update post from the edit post section
	app.put(
		"/api/posts/update",
		authenticate,
		validation(updatePostSchema),
		PostController.update
	);

	// update burger from the edit post component
	app.put(
		"/api/burgers/update",
		authenticate,
		validation(burgerSchema),
		BurgerController.update
	);

	// update restaurant from the edit post component
	app.put(
		"/api/restaurants/update",
		authenticate,
		validation(restaurantSchema),
		RestaurantController.update
	);

	// delete post from the feed (only if post was made by logged in author/user)
	app.delete("/api/posts/delete/:id", authenticate, PostController.delete);

	// delete burger
	app.delete("/api/burgers/delete", authenticate, BurgerController.delete);

	// delete restaurant
	app.delete(
		"/api/restaurants/delete",
		authenticate,
		RestaurantController.delete
	);

	// delete user from user settings when they choose to delete account
	app.delete("/api/users/delete/:id", authenticate, UserController.delete);

	// deletes the image (burger or profile picture) from AWS S3
	app.delete(
		"/s3image/delete/:imageName",
		authenticate,
		s3Bucket.deleteS3File
	);
};
