import React, { useContext, useState, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import burgerIcon from "../images/hamburger-icon.png";
import Post from "./Post";

function Feed() {
	const {
		loaded,
		setLoaded,
		posts,
		setPosts,
	} = useContext(MyContext);
	const navigate = useNavigate();

	// get all posts
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/posts", {
				withCredentials: true,
			})
			.then((res) => {
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	return (
		<div className="flex flex-col items-center">
			{loaded && (
				<>
					{/* burger feed */}

					<h1 className="mb-12 border-b pb-1 pt-6 text-4xl font-bold">
						Recent Activity
					</h1>
					{posts.map((post) => (
						<Post
							key={post.id}
							fname={post.author.first_name}
							burgerName={post.burger.burgerName}
							restaurantName={post.restaurant.restaurantName}
							content={post.content}
							date={post.createdAt}
							author={post.author.id}
							postId={post.id}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default Feed;
