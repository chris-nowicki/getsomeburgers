import React, { useContext } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";

function Post({
	fname,
	burgerName,
	restaurantName,
	content,
	date,
	author,
	postId,
}) {
	const { user, posts, setPosts } = useContext(MyContext);

	//get date from when post was created at through the date props
	let convertedDate = new Date(date);

	// get day of the week
	const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let dayOfWeek = weekday[convertedDate.getDay()];

	// get the month
	let month = convertedDate.getMonth();
	month = convertedDate.toLocaleDateString("en", { month: "short" });
	month = month.toUpperCase();

	// get day of month
	let day = convertedDate.getDate();

	// get full year
	let year = convertedDate.getFullYear();

	const handleDelete = () => {
		console.log(postId);
		axios
			.delete(`http://localhost:8000/api/posts/delete/${postId}`, {
				withCredentials: true,
			})
			.then((res) => {
				let updatedFeed = posts.filter((post) => post.id !== postId);
				setPosts(updatedFeed);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{/* burger rating card */}
			<div className="mb-10 flex w-full flex-col items-center rounded border-b bg-white pb-10">
				<div
					className="justify -start flex
								flex-row"
				>
					<span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
						<svg
							className="h-full w-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span>
					<div className=" ml-4 flex flex-col">
						<div className="flex flex-row items-center">
							<p className=" text-orange-400">
								{month} {day}, {year}
							</p>
							{author === user.id && (
								<>
									<p className="ml-2">
										<span className="mr-2">-</span>
										<button
											className="mr-1 hover:text-orange-400"
											onClick={() => handleDelete()}
										>
											delete
										</button>
										|
										<button className="ml-2 hover:text-orange-400">
											edit
										</button>
									</p>
								</>
							)}
						</div>
						<p className="mb-4 text-xl leading-tight">
							{fname} is chowing down a {burgerName} from{" "}
							{restaurantName}
						</p>
					</div>
				</div>
				<img src="https://via.placeholder.com/400.png" width="400" />
				<div className="mt-2 flex w-1/4 flex-row justify-around text-2xl text-orange-400">
					<span className="mx-1">
						<ion-icon name="star" />
					</span>
					<span className="mx-1">
						<ion-icon name="star" />
					</span>
					<span className="mx-1">
						<ion-icon name="star" />
					</span>
					<span className="mx-1">
						<ion-icon name="star" />
					</span>
					<span className="mx-1">
						<ion-icon name="star-half" />
					</span>
				</div>
				<p className="mt-4 w-3/4 text-center text-xl">{content}</p>
			</div>
		</>
	);
}

export default Post;
