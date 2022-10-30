const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
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

	delete: async (req, res) => {
		const { id } = req.body
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
