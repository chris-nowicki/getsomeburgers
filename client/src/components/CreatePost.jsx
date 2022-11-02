import axios from "axios";
import React, { useContext, useState } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { TextArea } from "./elements/TextArea";
import { useNavigate } from "react-router-dom";

function CreatePost() {
	const { errors, setErrors, user, posts, setPosts } = useContext(MyContext);
	const [newPost, setNewPost] = useState([]);
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post(
			"http://localhost:8000/api/posts/create",
			{...newPost, email: user.email }
		)
		.then(res => {
			console.log(res)
			navigate("/dashboard/feed")
		})
		.catch(err => {
			console.log(err)
		})
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
					min=".5"
					max="5"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.burgerName : false}
				/>
				<Input
					label="Photo"
					type="text"
					name="picture"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.photo : false}
				/>
				<TextArea
					label="Comment"
					name="content"
					rows="4"
					onChangeProp={(e) => handleChange(e)}
					errorProps={errors ? errors.content : false}
				/>
				<button className="w-full bg-orange-400 p-4 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none">
					Submit
				</button>
			</form>
		</div>
	);
}

export default CreatePost;