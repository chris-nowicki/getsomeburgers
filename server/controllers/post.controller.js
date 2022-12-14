const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	// create post
	create: async (req, res) => {
		const {
			restaurantName,
			burgerName,
			burgerPicture,
			email,
			content,
			_burgerRating,
		} = req.body;

		const burgerRating = Number(_burgerRating);

		// set variable to hold the burgerId and burgerPictureId
		let burgerId;
		let burgerPictureId;
		let restaurantId;

		// check to see if the restaurant exists
		const getRestaurant = await prisma.restaurant.findUnique({
			where: {
				restaurantName: restaurantName,
			},
		});

		// if it doesn't exist then create the restaurant and burger
		if (getRestaurant === null) {
			let result = await prisma.restaurant.create({
				data: {
					restaurantName: restaurantName,
					burgers: {
						create: {
							burgerName: burgerName,
							pictures: {
								create: {
									burgerPicture: burgerPicture,
								},
							},
						},
					},
				},
				include: {
					burgers: {
						include: {
							pictures: true,
						},
					},
				},
			});
			burgerId = result.burgers[0].id;
			burgerPictureId = result.burgers[0].pictures[0].id;
			restaurantId = result.id;
		} else {
			// if the restaurant exists
			// check if the burger exists
			const getBurger = await prisma.burger.findFirst({
				where: {
					burgerName: burgerName,
				},
			});

			// if the burger doesn't exist then create it and link it to the restaurant]
			restaurantId = getRestaurant.id;
			if (getBurger === null) {
				let result = await prisma.restaurant.update({
					where: {
						id: restaurantId,
					},
					data: {
						burgers: {
							create: {
								burgerName: burgerName,
								pictures: {
									create: {
										burgerPicture: burgerPicture,
									},
								},
							},
						},
					},
					include: {
						burgers: {
							include: {
								pictures: true,
							},
						},
					},
				});
				burgerId = result.burgers[0].id;
				burgerPictureId = result.burgers[0].pictures[0].id;
			} else {
				// update the burger to add the burger picture
				burgerId = getBurger.id;
				const newBurgerPicture = await prisma.burgerPicture.create({
					data: {
						burgerPicture: burgerPicture,
						relatedBurger: {
							connect: {
								id: burgerId,
							},
						},
					},
					include: {
						relatedBurger: true,
					},
				});
				burgerPictureId = newBurgerPicture.id;
			}
		}

		// once we have the restaurant and burger info
		// create the post
		try {
			const post = await prisma.post.create({
				data: {
					author: {
						connect: {
							email: email,
						},
					},
					restaurant: {
						connect: {
							id: restaurantId,
						},
					},
					burger: {
						connect: {
							id: burgerId,
						},
					},
					burgerPic: {
						connect: {
							id: burgerPictureId,
						},
					},
					content,
					burgerRating,
				},
				include: {
					restaurant: true,
					burger: true,
					burgerPic: true,
				},
			});
			res.json(post);
		} catch (err) {
			res.json(err);
		}
	},

	// update post
	update: async (req, res) => {
		const { content, _burgerRating, id } = req.body;

		const burgerRating = Number(_burgerRating);

		try {
			const updatePost = await prisma.post.update({
				where: {
					id: id,
				},
				data: {
					content,
					burgerRating,
				},
			});
			res.json(updatePost);
		} catch (err) {
			res.json(err);
		}
	},

	//  get all posts
	getOne: async (req, res) => {
		let { id } = req.params;

		// convert the id to an integer
		id = Number(id);

		const post = await prisma.post.findUnique({
			where: {
				id: id,
			},
			include: {
				author: true,
				restaurant: true,
				burger: true,
				burgerPic: true,
			},
		});

		res.json(post);
	},

	//  get all posts
	getAll: async (req, res) => {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				author: {
					include: {
						profile: true
					}
				},
				restaurant: true,
				burger: true,
				burgerPic: true,
			},
		});

		res.json(posts);
	},

	// user total posts
	userTotalPosts: async (req, res) => {
		const { id } = req.params;
		try {
			const userTotalPosts = await prisma.post.count({
				where: {
					authorId: Number(id),
				},
			});
			res.json({ totalCount: userTotalPosts });
		} catch (err) {
			res.json(err);
		}
	},

	// user unique posts
	// a unique post is the first time a user rates a burger but does not count subsequent times the burger is rated
	userUniquePosts: async (req, res) => {
		const { id } = req.params;
		try {
			const userUniquePosts = await prisma.post.findMany({
				where: {
					authorId: Number(id),
				},
				distinct: ["burgerId"],
				select: {
					id: true,
					burgerId: true,
				},
			});
			res.json({ uniqueCount: userUniquePosts.length });
		} catch (err) {
			res.json(err);
		}
	},

	// delete post
	delete: async (req, res) => {
		const { id } = req.params;
		try {
			const deletePost = await prisma.post.delete({
				where: {
					id: Number(id),
				},
			});
			res.json(deletePost);
		} catch (err) {
			res.json(err);
		}
	},
};
