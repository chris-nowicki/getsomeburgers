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
	profilePic,
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
					<img
						src={profilePic}
						className="avatar ml-10 max-h-[48px] rounded-full"
						alt="profile"
					/>
					<div className="ml-4 flex w-full flex-col">
						<div className="mb-1 mr-10 flex flex-row items-center justify-between">
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
										<a
											href={`edit-post/${postId}`}
											className="ml-2 hover:text-orange-400"
										>
											edit
										</a>
									</p>
								</>
							)}
						</div>
						<p className="mb-4 mr-10 text-xl leading-tight">
							{fname} is chowing down a{" "}
							<span className="text-orange-400">
								{burgerName}
							</span>{" "}
							from{" "}
							<span className="text-orange-400">
								{restaurantName}
							</span>
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-center">
					<img src={picture} className="burger" alt="burger" />
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
