import React, { useContext } from "react";
import MyContext from "../contexts/MyContext";
import burgerIcon from "../images/hamburger-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
	const { user, setUser, setLoaded } = useContext(MyContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				setUser([]);
				setLoaded(false)

				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			{/* navigation */}
			<nav className="z-0 flex w-full flex-row bg-white pb-2 pt-6 shadow-md">
				<div className="container mx-auto flex w-3/4 max-w-6xl flex-row items-center justify-between">
					<div className="flex  items-center text-3xl">
						<a
							href="/dashboard"
							className="flex flex-row items-center text-4xl"
						>
							GitSum <img src={burgerIcon} alt="burgerIcon" />
						</a>
						<ul className="ml-10 flex text-xl">
							<li className="mr-4">blog</li>
							<li className="mr-4">top rated</li>
							<li className="mr-4">store</li>
						</ul>
					</div>
					<div className="dropdown mr-2 flex flex-col items-center">
						{/* profile icon */}
						<button className="z-20">
							<img src={user.profile.profilePicture} className='avatar rounded-full' />
						</button>

						{/* dropdown hidden user menu */}
						<div className="dropdown-content absolute top-20 z-10 flex w-44 flex-col items-center divide-y divide-gray-200 rounded bg-gray-100 shadow-lg">
							<div className="py-3 px-4 text-sm text-gray-900">
								<div className="text-orange-400">
									{user.first_name} {user.last_name}
								</div>
								<div className="truncate font-medium">
									{user.email}
								</div>
							</div>
							<ul
								className="py-1 text-sm text-gray-700"
								aria-labelledby="dropdownUserAvatarButton"
							>
								<li>
									<a
										href="/dashboard/feed"
										className="block py-2 px-4 hover:bg-gray-300"
									>
										Recent Activity
									</a>
								</li>
								<li>
									<a
										href="settings"
										className="block py-2 px-4 hover:bg-gray-300"
									>
										Settings
									</a>
								</li>
							</ul>
							<div className="py-1">
								<button
									className="block w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-300"
									onClick={() => handleLogOut()}
								>
									Sign out
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
