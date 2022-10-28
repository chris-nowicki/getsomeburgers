const { PrismaClient } = require("@prisma/client");
const { string, date, object } = require("yup");

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	register: async (req, res) => {
		const {
			first_name,
			last_name,
			location,
			email,
			password,
			profilePic,
			birthday
		} = req.body;

		// check to see if email exists
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		// if email does not exist then create user
		// if email does exist then throw error
		if (user === null) {
			try {
				const user = await prisma.user.create({
					data: {
						first_name,
						last_name,
						location,
						email,
						password,
						profilePic,
						birthday
					},
				});
				res.json(user);
			} catch (e) {
				res.json(e);
				console.log(e);
			}
		} else {
			return res.status(400).json({
				errors: { email: { message: "Email already exists!" } },
			});
		}
	},

	// create post
	// 1. check if restaurant exists.  IF not, then create restaurant using form data AND create burger
	// 2. if the restaurant EXISTS then return restaurant information and check for burger.
	// 3. if burger doesn't exist create it.  if it does return burger information
	// 4. Create post with required information.
};
