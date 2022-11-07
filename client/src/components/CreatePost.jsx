import axios from "axios";
import React, { useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { TextArea } from "./elements/TextArea";
import { useNavigate } from "react-router-dom";

function CreatePost() {
	const { errors, setErrors, user } = useContext(MyContext);
	const [newPost, setNewPost] = useState([]);
	const [fileUpload, setFileUpload] = useState(null)
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let url

		// selects the value of the picture file from the input form
		const selectedFile = document.getElementById("file_input").files[0];

		// get secure s3 url
		await axios
			.get("http://localhost:8000/s3Url", { withCredentials: true })
			.then((res) => {
				url = (res.data.url)
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

		axios
			.post("http://localhost:8000/api/posts/create", {
				...newPost,
				email: user.email,
				burgerPicture: imageUrl,
			})
			.then((res) => {
				console.log(res);
				setTimeout(function(){
					navigate('feed')
				}, 1300)
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
		setNewPost({ ...newPost, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex flex-col p-16 shadow shadow-black/25">
			<form onSubmit={handleSubmit}>
				<Input
					label="Restaurant Name"
					type="text"
					name="restaurantName"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.restaurantName : false}
				/>
				<Input
					label="Burger Name"
					type="text"
					name="burgerName"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.burgerName : false}
				/>
				<Input
					label="Rating"
					type="number"
					name="_burgerRating"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors._burgerRating : false}
				/>

				{/* file upload */}

				<label
					className="mb-2 block text-xl text-gray-900 dark:text-gray-300"
				>
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
