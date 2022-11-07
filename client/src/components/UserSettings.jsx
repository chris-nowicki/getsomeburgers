import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../contexts/MyContext";
import Input from "./elements/Input";
import { useNavigate } from "react-router-dom";

function UserSettings() {
	const { user, setUser, errors, setErrors } = useContext(MyContext);
	const [updatedUser, setUpdatedUser] = useState({});
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();

	// set current user state to updatedUser
	// load the page when state is set
	useEffect(() => {
		let userProfile = {...user}
		userProfile.location = userProfile.profile.location
		setUpdatedUser(userProfile)
		setLoaded(true);
	}, []);

	// update all user information other than profile picture
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(updatedUser.location)

		axios
			.put("http://localhost:8000/api/users/update", {
				id: user.id,
				first_name: updatedUser.first_name,
				last_name: updatedUser.last_name,
				email: updatedUser.email,
				location: updatedUser.location
			}, {
				withCredentials: true,
			})
			.then((res) => {
				setLoaded(false)
				setUpdatedUser(res.data)
				setUser(res.data);
				setLoaded(true)
			});
	};

	const handleProfilePicDelete = () => {
		// remove https:// from the image name
		const imageName = user.profile.profilePicture
			.split("/")
			.slice(3)
			.join("");

		console.log(imageName);

		// delete the image from amazon S3 bucket
		axios
			.delete(`http://localhost:8000/s3image/delete/${imageName}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		// update the image to point to default image
		axios
			.put(
				"http://localhost:8000/api/users/deleteProfilePic",
				{ id: user.id },
				{ withCredentials: true }
			)
			.then((res) => {
				let picUpdate = { ...updatedUser };
				picUpdate.profile.profilePicture = res.data.profilePicture;
				setUpdatedUser(picUpdate);
				setUser(picUpdate);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// update the profile picture
	const handleProfilePicUpdate = async () => {
		if (user.profile.profilePicture !== "/images/person-placeholder.jpg") {
			// remove https://test-image-upload-request.s3.amazonaws.com/ from the image url
			// to isolate the image name in the S3 Bucket
			const imageName = user.profile.profilePicture
				.split("/")
				.slice(3)
				.join("");

			axios
				.delete(`http://localhost:8000/s3image/delete/${imageName}`, {
					withCredentials: true,
				})
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		// variable to hold the amazon s3 url to the image we are uploading
		let url;

		// selects the value of the picture file from the input form
		const selectedFile = document.getElementById("file_input").files[0];

		// get secure s3 url
		await axios
			.get("http://localhost:8000/s3Url", { withCredentials: true })
			.then((res) => {
				url = res.data.url;
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
			.put("http://localhost:8000/api/users/updateProfilePic", {
				userId: updatedUser.id,
				profilePicture: imageUrl,
			})
			.then((res) => {
				console.log(res);
				setTimeout(function () {
					let picUpdate = { ...updatedUser };
					picUpdate.profile.profilePicture = res.data.profilePicture;
					setUpdatedUser(picUpdate);
					setUser(picUpdate);
				}, 1300);
			})
			.catch((err) => {
				let parsedErrors = Object.assign(
					{},
					...err.response.data.error.errors
				);
				setErrors(parsedErrors);
			});
	};

	// user account delete function
	const handleUserAccountDelete = () => {
		if (user.profile.profilePicture != "/images/person-placeholder.jpg") {
			handleProfilePicDelete();
		}

		// delete user from database
		axios
			.delete(`http://localhost:8000/api/users/delete/${user.id}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
			})
			.then((err) => console.log(err));

		// clear cookies and redirect to landing page
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},
				{ withCredentials: true }
			)
			.then((res) => {
				setUser([]);
				setLoaded(false);
				navigate("/");
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (e) => {
		setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="flex flex-col p-16 shadow shadow-black/25">
				{loaded && (
					<form onSubmit={handleSubmit}>
						<h1 className="mb-6 border-b text-3xl">
							Profile Settings
						</h1>
						<label className="mb-3 mt-4 block text-xl text-gray-900 dark:text-gray-300">
							Profile Picture
						</label>

						<div className="mb-4 flex flex-row items-center">
							{/* profile icon */}

							<img
								src={user.profile.profilePicture}
								className="avatar rounded-full"
							/>
							<button
								className="ml-10 rounded bg-blue-600 px-6 py-2 text-white"
								onClick={() => handleProfilePicDelete()}
							>
								delete
							</button>
						</div>

						{/* file upload */}
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
						<div className="flex flex-row">
							<button
								className="mb-6 w-2/4 bg-orange-400 px-6 py-2 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none"
								onClick={() => handleProfilePicUpdate()}
							>
								Update Profile Picture
							</button>
						</div>
						{/* file upload end */}

						<Input
							label="First Name"
							type="text"
							name="first_name"
							value={updatedUser.first_name}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.first_name : false}
						/>
						<Input
							label="Last Name"
							type="text"
							name="last_name"
							value={updatedUser.last_name}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.last_name : false}
						/>
						<Input
							label="Email"
							type="text"
							name="email"
							value={updatedUser.email}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.email : false}
						/>
						<Input
							label="Location"
							type="text"
							name="location"
							value={updatedUser.location}
							onChangeProp={(e) => handleChange(e)}
							errorProps={errors ? errors.location : false}
						/>
						<button className="w-full bg-orange-400 p-4 text-xl text-white shadow shadow-black/25 hover:bg-orange-300 hover:shadow-none">
							Save
						</button>
						<div className="mt-10 border-t-2 border-dotted border-red-600">
							<button
								className="w-full p-4 text-red-600 hover:underline"
								onClick={() => handleUserAccountDelete()}
							>
								delete account
							</button>
						</div>
					</form>
				)}
			</div>
		</>
	);
}

export default UserSettings;
