import React, { useContext, useEffect, useState } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import SearchBox from "./elements/SearchBox";

function Test() {
	const { restaurantNames, setRestaurantNames, loaded } =
		useContext(MyContext);

	// get all posts
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/restaurants", {
				withCredentials: true,
			})
			.then((res) => {
				setRestaurantNames(res.data);
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
					<div className="mt-10">
						<SearchBox
							label="Restaurants"
							searchData={restaurantNames}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default Test;
