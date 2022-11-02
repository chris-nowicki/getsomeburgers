import React, { useState, useContext } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import Input from "./elements/Input";
import burgerIcon from "../images/hamburger-icon.png";
import { useNavigate } from "react-router-dom";

function Register() {
	const { user, setUser, errors, setErrors } = useContext(MyContext);

	const navigate = useNavigate();

	// submit registration form function
	const handleSubmit = (e) => {
		e.preventDefault();
		if (user.length === 0) {
			navigate("/");
		}

		axios
			.post("http://localhost:8000/api/users/register", user, {
				withCredentials: true,
			})
			.then((user) => {
				console.log(user.data);
				setErrors({});
				navigate("/dashboard/feed");
			})
			.catch((err) => {
				console.log(err.response);
				let newErrors;
				if (!err.response.data.errors) {
					newErrors = err.response.data.error.errors;
					let registerErrors = Object.assign({}, ...newErrors);
					setErrors(registerErrors);
				} else {
					newErrors = err.response.data.errors.email.message;
					setErrors({email: newErrors})
					console.log(newErrors)
				}

			});
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			{/* register form container */}
			<div className="login-reg flex w-1/2 flex-col rounded border border-black bg-gray-600/25 p-16 shadow-lg shadow-black/25">
				<div className="mb-6 flex flex-row items-center">
					<img src={burgerIcon} alt="burger icon" />
					<p className="ml-4 text-xl">
						Get ready to discover and eat some
						<b>amazing burgers!</b>
					</p>
				</div>
				<form onSubmit={handleSubmit}>
					<Input
						label="First Name:"
						type="text"
						name="first_name"
						onChangeProp={(e) => handleChange(e)}
						errorProps={errors ? errors.first_name : false}
					/>
					<Input
						label="Last Name:"
						type="text"
						name="last_name"
						onChangeProp={(e) => handleChange(e)}
						errorProps={errors ? errors.last_name : false}
					/>
					<Input
						label="Email:"
						type="text"
						name="email"
						onChangeProp={(e) => handleChange(e)}
						errorProps={errors ? errors.email : false}
					/>
					<Input
						label="Password:"
						type="password"
						name="password"
						value={user.password}
						onChangeProp={(e) => handleChange(e)}
						errorProps={errors ? errors.password : false}
					/>
					<Input
						label="Confirm Password:"
						type="password"
						name="confirm_password"
						value={user.confirm_password}
						onChangeProp={(e) => handleChange(e)}
						errorProps={errors ? errors.confirm_password : false}
					/>
					<button className="mt-3 w-full border border-black bg-white py-4 text-xl shadow-md shadow-black/25 transition-all ease-in-out hover:bg-orange-400 hover:text-white hover:shadow-none">
						SIGN UP
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
