import React, { useState, useContext } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import Input from "./elements/Input";
import burgerIcon from "../images/hamburger-icon.png";
import { useNavigate } from "react-router-dom";

function Login() {
	const { user, setUser } = useContext(MyContext);
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	// submit registration form function
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8000/api/users/login", user, {
				withCredentials: true,
			})
			.then((user) => {
				console.log(user.data);
				setErrors([]);
				navigate("/dashboard/feed");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center">
			{/* register form container */}
			<div className="login-reg flex w-1/2 flex-col rounded border border-black bg-gray-600/25 p-16 shadow-lg shadow-black/25">
				<div className="mb-2 flex flex-row items-center justify-center">
					<img src={burgerIcon} alt="burger icon" />
					<p className="ml-4 text-4xl">Get Some Burgers!</p>
				</div>
				<p className="ml-4 text-2xl text-center">Sign in to your account</p>
				<p className="ml-4 text-xl text-center">
					or <a href="/register">register</a>
				</p>
				<form onSubmit={handleSubmit}>
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
					<button className="mt-3 w-full border border-black bg-white py-4 text-xl shadow-md shadow-black/25 transition-all ease-in-out hover:bg-orange-400 hover:text-white hover:shadow-none">
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
