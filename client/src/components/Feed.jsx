import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import Post from "./Post";

function Feed() {
	const { posts, setPosts, loaded } = useContext(MyContext);

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
			{loaded  && (
				<>
					{/* burger feed */}

					<h1 className="mb-4 border-b pb-1 pt-6 text-4xl font-bold">
						Recent Activity
					</h1>
					<a
						href="/dashboard/create-post"
						className="mb-16 flex w-3/4 flex-row items-center justify-center rounded bg-orange-400 py-2 text-4xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:font-bold hover:shadow-none"
					>
						<ion-icon name="add-circle-outline"></ion-icon>
					</a>
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
							picture={post.burgerPicture.burgerPicture}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default Feed;
