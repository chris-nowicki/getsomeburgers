const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	update: async (req, res) => {
		const { burgerId, burgerName, picture } = req.body;

		try {
			const updateBurger = await prisma.burger.update({
				where: {
					id: burgerId,
				},
				data: {
					burgerName,
					picture,
				},
			});
			res.json(updateBurger);
		} catch (err) {
			res.json(err);
		}
	},

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
};
