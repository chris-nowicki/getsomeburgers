const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	deleteProfilePicture: async (req, res) => {
		const { id } = req.body;
		try {
			const updateUserProfile = await prisma.profile.update({
				where: {
					userId: id,
				},
				data: {
					profilePicture: "/images/person-placeholder.jpg",
				},
			});
			res.json(updateUserProfile);
		} catch (err) {
			res.json(err)
		}
	},

	updateProfilePicture: async (req, res) => {
		const { userId, profilePicture } = req.body;
		try {
			const updateUserProfile = await prisma.profile.update({
				where: {
					userId
				},
				data: {
					profilePicture: profilePicture,
				},
			});
			res.json(updateUserProfile);
		} catch (err) {
			res.json(err)
		}
	},

	// user delete
	delete: async (req, res) => {
		const { id } = req.body;
		try {
			const deleteUser = await prisma.user.delete({
				where: {
					id: id,
				},
			});
			res.json(deleteUser);
		} catch (err) {
			res.json(err);
		}
	},
};
