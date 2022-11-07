const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	// update burger
	update: async (req, res) => {
		const { burgerId, burgerName, burgerPictureId, burgerPicture } =
			req.body;
		try {
			const updateBurger = await prisma.burger.update({
				where: {
					id: burgerId,
				},
				data: {
					burgerName,
					pictures: {
						update: {
							where: {
								id: burgerPictureId,
							},
							data: {
								burgerPicture: burgerPicture,
							},
						},
					},
				},
				include: {
					pictures: true,
				},
			});
			res.json(updateBurger);
		} catch (err) {
			res.json(err);
		}
	},

	// delete burger
	delete: async (req, res) => {
		const { id } = req.body;
		try {
			const deleteBurger = await prisma.burger.delete({
				where: {
					id: id,
				},
			});
			res.json(deleteBurger);
		} catch (err) {
			res.json(err);
		}
	},
	// findOne
	createBurger: async (req, res) => {
		const { restaurantName, burgerName, burgerPicture, id } = req.body;
		console.log(req.body);
		try {
			const createBurger = await prisma.restaurant.update({
				where: {
					id: id,
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
			});
			res.json(createdBurger);
		} catch (err) {
			res.json(err);
		}
	},
};
