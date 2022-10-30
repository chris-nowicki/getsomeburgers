const { PrismaClient } = require("@prisma/client");
const { rmSync } = require("fs");
const { json } = require("stream/consumers");

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
			id,
		} = req.body;

		const getRestaurant = await prisma.restaurant.findUnique({
			where: {
				restaurantName: restaurantName,
			},
		});

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
			const getBurger = await prisma.burger.findUnique({
				where: {
					burgerName: burgerName,
				},
			});

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
};
