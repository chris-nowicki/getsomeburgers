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
					restaurantName: "asc"
				},
				select: {
					id: true,
					restaurantName: true
				}
			});
			res.json(getRestaurantNames);
		} catch (err) {
			res.json(err);
		}
	},

	// update restaurant
	update: async (req, res) => {
		const { restaurantId, restaurantName } = req.body;

		try {
			const updateRestaurant = await prisma.restaurant.update({
				where: {
					id: restaurantId,
				},
				data: {
					restaurantName,
				},
			});
			res.json(updateRestaurant);
		} catch (err) {
			res.json(err);
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
