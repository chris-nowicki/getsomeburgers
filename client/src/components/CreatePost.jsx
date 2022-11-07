import axios from "axios";
import React, { useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { TextArea } from "./elements/TextArea";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function CreatePost() {
	const { errors, setErrors, user, restaurantList } = useContext(MyContext);
	const [newPost, setNewPost] = useState([]);
	const [burgers, setBurgers] = useState([]);
	const navigate = useNavigate();

	// new post submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		// variable to hold the Amazon S3 image upload URL
		let url;

		// selects the value of the picture file from the input form
		const selectedFile = document.getElementById("file_input").files[0];

		// get secure s3 url
		await axios
			.get("http://localhost:8000/s3Url", { withCredentials: true })
			.then((res) => {
				url = res.data.url;
			})
			.catch((err) => {
				console.log(err.response.data);
			});

		// upload picture to s3 url
		axios.put(
			url,
			selectedFile,
			{ headers: { "Content-Type": "multipart/form-data" } },
			{ withCredentials: true }
		);

		// parse out the image url link and update the burger picture image link to uploaded picture
		const imageUrl = url.split("?")[0];

		// create the post
		axios
			.post(
				"http://localhost:8000/api/posts/create",
				{
					...newPost,
					email: user.email,
					burgerPicture: imageUrl,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				setTimeout(function () {
					navigate("feed");
				}, 1300);
			})
			.catch((err) => {
				let parsedErrors = Object.assign(
					{},
					...err.response.data.error.errors
				);
				setErrors(parsedErrors);
			});
	};

	// restaurant change to get list of burgers associated with the restaurant
	const handleRestaurantChange = (e) => {
		// reset burger state
		setBurgers([]);

		// update state with restaurant name value
		setNewPost({ ...newPost, [e.target.name]: e.target.value });

		// clear the burger name
		document.getElementById("burger").value = "";

		// get the value of the restaurant selected
		let restaurant = document.getElementById("restaurant").value;

		axios
			.get(
				`http://localhost:8000/api/restaurants/findOne/${restaurant}`,
				{ withCredentials: true }
			)
			.then((res) => {
				axios
					.get(`http://localhost:8000/api/burgers/${res.data.id}`, {
						withCredentials: true,
					})
					.then((res) => {
						const newBurgers = res.data;
						setBurgers(newBurgers);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	};

	// updates state for newPost based on form input changes
	const handleChange = (e) => {
		setNewPost({ ...newPost, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col p-16 shadow shadow-black/25">
			<form onSubmit={handleSubmit}>
				{/* restaurant data list */}
				<label className="flex flex-row justify-between text-xl">
					Restaurant Name
				</label>
				<div className="relative mt-1 border border-black shadow-sm">
					<input
						list="restaurants"
						name="restaurantName"
						id="restaurant"
						className={
							!errors
								? "block w-full border-gray-300 py-2 pl-2 text-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								: !errors.restaurantName
								? "block w-full border-gray-300 py-2 pl-2 text-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								: "block w-full border border-red-300 py-2 pl-2 pr-10 text-xl  text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
						}
						onSelect={(e) => handleRestaurantChange(e)}
						onChange={(e) => handleRestaurantChange(e)}
					/>
					<datalist id="restaurants">
						{restaurantList.map((rest) => (
							<option key={rest.id}>{rest.restaurantName}</option>
						))}
					</datalist>
					{errors ? (
						errors.restaurantName ? (
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<ExclamationCircleIcon
									className="h-5 w-5 text-red-500"
									aria-hidden="true"
								/>
							</div>
						) : (
							<div></div>
						)
					) : (
						<div></div>
					)}
				</div>
				{errors ? (
					errors.restaurantName ? (
						<p className="mt-1 mb-3 text-sm text-red-600" id="">
							{errors.restaurantName}
						</p>
					) : (
						<p className="mb-3"></p>
					)
				) : (
					<p className="mb-3"></p>
				)}

				{/* restaurant data list end */}

				{/* Burger data list */}
				<label className="flex flex-row justify-between text-xl">
					Burger Name
				</label>
				<div className="relative mt-1 border border-black shadow-sm">
					<input
						list="burgers"
						name="burgerName"
						id="burger"
						className={
							!errors
								? "block w-full border-gray-300 py-2 pl-2 text-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								: !errors.burgerName
								? "block w-full border-gray-300 py-2 pl-2 text-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
								: "block w-full border border-red-300 py-2 pl-2 pr-10 text-xl  text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
						}
						onSelect={(e) => handleChange(e)}
						onChange={(e) => handleChange(e)}
					/>
					{/* data list */}
					<datalist id="burgers">
						{burgers.map((burger) => (
							<option key={burger.id}>{burger.burgerName}</option>
						))}
					</datalist>
					{/* data list end */}

					{errors ? (
						errors.burgerName ? (
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<ExclamationCircleIcon
									className="h-5 w-5 text-red-500"
									aria-hidden="true"
								/>
							</div>
						) : (
							<div></div>
						)
					) : (
						<div></div>
					)}
				</div>
				{errors ? (
					errors.burgerName ? (
						<p className="mt-1 mb-3 text-sm text-red-600" id="">
							{errors.burgerName}
						</p>
					) : (
						<p className="mb-3"></p>
					)
				) : (
					<p className="mb-3"></p>
				)}
				{/* burger data list end */}

				<Input
					label="Rating"
					type="number"
					name="_burgerRating"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors._burgerRating : false}
				/>

				{/* file upload */}
				<label className="mb-2 block text-xl text-gray-900 dark:text-gray-300">
					Upload picture
				</label>
				<input
					className="block w-full cursor-pointer rounded-lg border border-black bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
					name="burgerPicture"
				/>
				<p
					className="mt-1 mb-3 text-sm text-gray-500 dark:text-gray-300"
					id="file_input_help"
				>
					PNG, JPG (MAX. 800x400px).
				</p>
				{/* file upload end */}
				<TextArea
					label="Comment"
					name="content"
					rows="4"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.comment : false}
				/>
				<button className="w-full bg-orange-400 p-4 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none">
					Submit
				</button>
			</form>
		</div>
	);
}

export default CreatePost;
