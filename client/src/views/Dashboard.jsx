import React, { useContext, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
	const {
		user,
		setUser,
		totalRatings,
		setTotalRatings,
		uniqueRatings,
		setUniqueRatings,
		loaded,
		setLoaded,
		setRestaurantList,
	} = useContext(MyContext);
	const navigate = useNavigate();

	// retrieve logged in user and return to login page if there is no logged in user
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/users/getUser", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				setLoaded(true);
			})
			.catch((err) => {
				setLoaded(false);
				navigate("/");
			});

		// eslint-disable-next-line
	}, []);

	// get list of restaurants
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/restaurants", {
				withCredentials: true,
			})
			.then((res) => {
				setRestaurantList(res.data)
			})
			.catch((err) => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	const getPostStats = () => {
		axios
			.get(`http://localhost:8000/api/posts/user-total/${user.id}`, {withCredentials: true})
			.then((res) => {
				setTotalRatings(res.data.totalCount);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get(`http://localhost:8000/api/posts/user-unique/${user.id}`, {
				withCredentials: true,
			})
			.then((res) => {
				setUniqueRatings(res.data.uniqueCount);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{/* page will only load if user is logged in and data is loaded */}
			{loaded && (
				<>
					<Navbar />

					<div className="container mx-auto w-3/4 max-w-6xl">
						{/* main dashboard */}
						<main className="mt-12 flex w-full flex-row">
							{/* left column user information */}
							<div className="flex w-2/4 flex-col items-center">
								{/* profile picture and location */}
								<img
									src={user.profile.profilePicture}
									alt="profile"
									className="profile-pic rounded-lg"
								/>
								<p className="text-center text-xl">
									{user.first_name} {user.last_name}
								</p>
								{user.profile.location !== null && (
									<p className="flex flex-row items-center justify-center text-sm text-orange-400">
										<ion-icon name="location-outline"></ion-icon>
										<span>{user.profile.location}</span>
									</p>
								)}

								{/* total and unique burger rating count */}
								<div className="mt-10 flex w-full flex-col items-center rounded border bg-white shadow shadow-black/25">
									{/* call get post stats.  only loads when page renders AND user is loaded */}
									{getPostStats()}
									<div className="flex w-full flex-row">
										<div className="flex w-1/2 flex-col items-center justify-center border-r p-2 hover:bg-gray-200">
											<span className="text-blue-600">
												{totalRatings}
											</span>
											TOTAL
										</div>
										<div className="flex w-1/2 flex-col items-center justify-center hover:bg-gray-200">
											<span className="text-blue-600">
												{uniqueRatings}
											</span>
											UNIQUE
										</div>
									</div>
									<div className="flex w-full flex-row border-t">
										<div className="flex w-full flex-col items-center justify-center border-r p-2 hover:bg-gray-200">
											<span className="text-blue-600">
												0
											</span>
											FRIENDS
										</div>
									</div>
								</div>
							</div>

							{/* OUTLET FOR FEED, TOP RATED, SETTINGS, ADD-POST */}
							<div className="ml-20 flex w-full flex-col bg-white shadow shadow-black/25">
								<Outlet />
							</div>
						</main>
					</div>
				</>
			)}
		</>
	);
}

export default Dashboard;
