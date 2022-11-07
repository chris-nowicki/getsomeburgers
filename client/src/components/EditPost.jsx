import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { TextArea } from "./elements/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

function EditPost() {
	const { errors, setErrors, restaurantList } = useContext(MyContext);
	const [post, setPost] = useState();
	const [loaded, setLoaded] = useState(false);
	const [burgers, setBurgers] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	// get one posts
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setPost({
					id: res.data.id,
					content: res.data.content,
					burgerRating: res.data.burgerRating,
					burgerId: res.data.burger.id,
					burgerName: res.data.burger.burgerName,
					burgerPictureId: res.data.burgerPic.id,
					picture: res.data.burgerPic.burgerPicture,
					restaurantName: res.data.restaurant.restaurantName,
					restaurantId: res.data.restaurant.id,
					oldRestaurant: res.data.restaurant.restaurantName,
				});
				setLoaded(true);
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	// restaurant change to get list of burgers associated with the restaurant
	const handleRestaurantChange = (e) => {
		// reset burger state
		setBurgers([]);

		// update state with restaurant name value
		setPost({ ...post, [e.target.name]: e.target.value });

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

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(
				"http://localhost:8000/api/posts/update",
				{
					id: post.id,
					content: post.content,
					_burgerRating: post.burgerRating,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				axios
					.put(
						"http://localhost:8000/api/burgers/update",
						{
							burgerId: post.burgerId,
							burgerName: post.burgerName,
							burgerPictureId: post.burgerPictureId,
							burgerPicture: post.picture,
						},
						{ withCredentials: true }
					)
					.then((res) => {
						axios
							.put(
								"http://localhost:8000/api/restaurants/update",
								{
									restaurantName: post.restaurantName,
									restaurantId: post.restaurantId,
									postId: post.id,
									oldRestaurant: post.oldRestaurant,
								},
								{ withCredentials: true }
							)
							.then((res) => {
								navigate("feed");
							})
							.catch((err) => {
								let parsedErrors = Object.assign(
									{},
									...err.response.data.error.errors
								);
								setErrors(parsedErrors);
							});
					})
					.catch((err) => {
						let parsedErrors = Object.assign(
							{},
							...err.response.data.error.errors
						);
						setErrors(parsedErrors);
					});
			})
			.catch((err) => {
				let parsedErrors = Object.assign(
					{},
					...err.response.data.error.errors
				);
				setErrors(parsedErrors);
			});
	};

	const handleChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="flex flex-col p-16 shadow shadow-black/25">
				{loaded && (
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
								value={post.restaurantName}
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
									<option key={rest.id}>
										{rest.restaurantName}
									</option>
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
								<p
									className="mt-1 mb-3 text-sm text-red-600"
									id=""
								>
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
								value={post.burgerName}
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
									<option key={burger.id}>
										{burger.burgerName}
									</option>
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
								<p
									className="mt-1 mb-3 text-sm text-red-600"
									id=""
								>
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
							name="burgerRating"
							value={post.burgerRating}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.burgerRating : false}
						/>
						<Input
							label="Photo"
							type="text"
							name="picture"
							value={post.picture}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.photo : false}
						/>
						<TextArea
							label="Comment"
							name="content"
							value={post.content}
							rows="4"
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.comment : false}
						/>
						<button className="w-full bg-orange-400 p-4 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none">
							Submit
						</button>
					</form>
				)}
			</div>
		</>
	);
}

export default EditPost;
