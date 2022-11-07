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

	getBurgers: async (req, res) => {
		let { id } = req.params;
		try {
			const getBurgers = await prisma.burger.findMany({
				where: {
					relatedRestaurantId: Number(id),
				},
			});
			res.json(getBurgers);
		} catch (err) {
			res.json(err)
		}
	},
};
