const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	// get restaurant names
	getRestaurantNames: async (req, res) => {
		try {
			const getRestaurantNames = await prisma.restaurant.findMany({
				orderBy: {
					restaurantName: "asc",
				},
				select: {
					id: true,
					restaurantName: true,
				},
			});
			res.json(getRestaurantNames);
		} catch (err) {
			res.json(err);
		}
	},

	// get one restaurant
	getOne: async (req, res) => {
		const { name } = req.params;

		try {
			const getRestaurant = await prisma.restaurant.findUnique({
				where: {
					restaurantName: name,
				},
			});
			res.json(getRestaurant);
		} catch (err) {
			res.json(err);
		}
	},

	// update restaurant
	update: async (req, res) => {
		const { restaurantId, restaurantName, postId, oldRestaurant } = req.body;

		const getRestaurant = await prisma.restaurant.findUnique({
			where: {
				restaurantName: restaurantName,
			},
		});

		if (getRestaurant === null) {
			try {
				const updateRestaurant = await prisma.restaurant.update({
					where: {
						id: restaurantId,
					},
					data: {
						restaurantName: restaurantName,
					},
				});
				res.json(updateRestaurant);
			} catch (err) {
				res.json(err);
			}
		} else {
			try {
				const updateRestaurant = await prisma.restaurant.update({
					where: {
						restaurantName: restaurantName,
					},
					data: {
						posts: {
							connect: {
								id: postId
							},
						},
					},
					include: {
						posts: true,
					},
				})
				res.json(updateRestaurant)
			} catch (err) {
				res.json(err)
			}
		}
	},

	// delete restaurant
	delete: async (req, res) => {
		const { id } = req.body;
		try {
			const deleteRestaurant = await prisma.restaurant.delete({
				where: {
					id: id,
				},
			});
			res.json(deleteRestaurant);
		} catch (err) {
			res.json(err);
		}
	},
};
