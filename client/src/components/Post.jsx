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
	picture,
}) {
	const { user, posts, setPosts } = useContext(MyContext);

	//get date from when post was created at through the date props
	let convertedDate = new Date(date);

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
			<div className="mb-10 flex flex-col rounded border-b pb-10">
				<div
					className="flex flex-row
								justify-start"
				>

					{/* <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
						<svg
							className="h-full w-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span> */}
					<img src="/images/profile-pic.jpg" className='avatar rounded-full ml-10'/>
					<div className="ml-4 flex flex-col w-full">
						<div className="mb-1 flex flex-row items-center justify-between mr-10">
							<p className=" text-orange-400">
								{month} {day}, {year}
							</p>

							{/* if the author_id matches the logged in user then add option to edit/delete the post. */}
							{author === user.id && (
								<>
									<p className="ml-2">
										<button
											className="mr-1 hover:text-orange-400"
											onClick={() => handleDelete()}
										>
											delete
										</button>
										|
										<a href={`edit-post/${postId}`} className="ml-2 hover:text-orange-400">
											edit
										</a>
									</p>
								</>
							)}
						</div>
						<p className="mb-4 text-xl leading-tight mr-10">
							{fname} is chowing down a {burgerName} from{" "}
							{restaurantName}
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-center">
					<img src={picture} className="burger" />
				</div>

				<div className="mt-2 flex  flex-row justify-center text-2xl text-orange-400">
					<div>
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
				</div>
				<div className="flex w-full flex-row justify-center">
					<p className="mt-4 w-3/4 text-center text-xl">{content}</p>
				</div>
			</div>
		</>
	);
}

export default Post;