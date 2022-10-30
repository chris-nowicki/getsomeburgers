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
			picture,
			email,
			content,
			burgerRating,
		} = req.body;

		// check to see if the restaurant exists
		const getRestaurant = await prisma.restaurant.findUnique({
			where: {
				restaurantName: restaurantName,
			},
		});

		// if it doesn't exist then create the restaurant and burger
		if (getRestaurant === null) {
			await prisma.restaurant.create({
				data: {
					restaurantName: restaurantName,
					burgers: {
						create: {
							burgerName: burgerName,
							picture,
						},
					},
				},
			});
		} else {
			// if the restaurant exists
			// check if the burger exists
			const getBurger = await prisma.burger.findUnique({
				where: {
					burgerName: burgerName,
				},
			});

			// if the burger doesn't exist then create it and link it to the restaurant
			if (getBurger === null) {
				await prisma.burger.create({
					data: {
						burgerName: burgerName,
						restaurant: {
							connect: { restaurantName: restaurantName },
						},
					},
				});
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
							restaurantName: restaurantName,
						},
					},
					burger: {
						connect: {
							burgerName: burgerName,
						},
					},
					content,
					burgerRating,
				},
				include: {
					restaurant: true,
					burger: true,
				},
			});
			res.json(post);
		} catch (err) {
			res.json(err);
		}
	},

	// update post
	update: async (req, res) => {
		const {
			restaurantId,
			restaurantName,
			burgerId,
			burgerName,
			picture,
			email,
			content,
			burgerRating,
			postId,
		} = req.body;

		try {
			const updatePost = await prisma.post.update({
				where: {
					id: postId,
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

	// delete post
	delete: async (req, res) => {
		const { id } = req.body;
		try {
			const deletePost = await prisma.post.delete({
				where: {
					id: id,
				},
			});
			res.json(deletePost);
		} catch (err) {
			res.json(err);
		}
	},
};
