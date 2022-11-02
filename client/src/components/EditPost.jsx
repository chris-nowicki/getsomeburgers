import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { TextArea } from "./elements/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import EditModal from "./EditModal.jsx";

function EditPost() {
	const { errors, setOpen, open } = useContext(MyContext);
	const [post, setPost] = useState();
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	// get one posts
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				setPost({
					id: res.data.id,
					content: res.data.content,
					restaurantName: res.data.restaurant.restaurantName,
					burgerName: res.data.burger.burgerName,
					_burgerRating: res.data.burgerRating,
					picture: res.data.burger.picture,
					burgerId: res.data.burger.id,
					restaurantId: res.data.restaurant.id,
				});
				setLoaded(true);
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put("http://localhost:8000/api/posts/update", {
				content: post.content,
				burgerRating: post.burgerRating,
				postId: post.id,
			})
			.then((res) => {
				console.log(res.data);

				axios
					.put("http://localhost:8000/api/burgers/update", {
						burgerName: post.burgerName,
						picture: post.picture,
						burgerId: post.burgerId,
					})
					.then((res) => {
						console.log(res.data);
						axios
							.put(
								"http://localhost:8000/api/restaurants/update",
								{
									restaurantName: post.restaurantName,
									restaurantId: post.restaurantId,
								}
							)
							.then((res) => {
								console.log(res.data)
								navigate("feed")
							});
					});
			})
			.catch((err) => {
				console.log(err);
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
						<Input
							label="Restaurant Name"
							type="text"
							name="restaurantName"
							value={post.restaurantName}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.restaurantName : false}
						/>
						<Input
							label="Burger Name"
							type="text"
							name="burgerName"
							value={post.burgerName}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.burgerName : false}
						/>
						<Input
							label="Rating"
							type="number"
							name="_burgerRating"
							value={post.burgerRating}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.burgerName : false}
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
							errorProps={errors ? errors.content : false}
						/>
						<button className="w-full bg-orange-400 p-4 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none">
							Submit
						</button>
					</form>
				)}
				<EditModal />
			</div>
		</>
	);
}

export default EditPost;
