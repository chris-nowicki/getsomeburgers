const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

module.exports = {
	// user registration
	register: async (req, res) => {
		const { first_name, last_name, email, password } = req.body;

		// check to see if email exists
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		// if email does not exist then create user
		// if email does exist then throw error
		if (user === null) {
			// hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			try {
				const user = await prisma.user.create({
					data: {
						first_name,
						last_name,
						email,
						password: {
							create: {
								hash: hashedPassword,
							},
						},
					},
				});

				// if registration is successful create and return the session cookie
				const userToken = jwt.sign(
					{
						id: user.id,
					},
					secret
				);

				res.cookie("usertoken", userToken, secret, {
					httpOnly: true,
				}).json({ msg: "success!", user: user });

				// if there is an error then return the error
			} catch (err) {
				res.json(err);
				console.log(err);
			}
		} else {
			// error that is returned if email exists
			return res.status(400).json({
				errors: { email: { message: "Email already exists!" } },
			});
		}
	},

	// user login
	login: async (req, res) => {
		const { email, password } = req.body;

		// retrieve the user and password from database
		const user = await prisma.user.findUnique({
			where: { email: email },
			include: {
				password: true,
			},
		});

		// if user is not found then return error
		// this means either the email was not found
		if (user === null) {
			return res.sendStatus(400);
		}

		// if user is found then check to ensure the password entered at login
		// matches the hashed password in the database
		const correctPassword = await bcrypt.compare(
			password,
			user.password.hash
		);

		// if password doesn't match then return an error
		if (!correctPassword) {
			return res.sendStatus(400);
		}

		// if password does match then create the cookie
		const userToken = jwt.sign(
			{
				id: user.id,
			},
			secret
		);

		// return the cookie with a login success message
		res.cookie("usertoken", userToken, secret, {
			httpOnly: true,
		}).json({ msg: "success!" });
	},

	// get logged in user
	getLoggedInUser: async (req, res) => {
		const decodeJWT = jwt.decode(req.cookies.usertoken, {
			complete: true,
		});

		try {
			const user = await prisma.user.findUnique({
				where: {
					id: decodeJWT.payload.id,
				},
			});
			res.json(user);
		} catch (err) {
			res.json(err);
		}
	},

	// user logout
	logout: (req, res) => {
		// clear cookie for logged in user
		res.clearCookie("usertoken");
		res.sendStatus(200);
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
