import React, { useState } from "react";
import MyContext from "../contexts/MyContext";

function ContextWrapper({ children }) {
	const [user, setUser] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [totalRatings, setTotalRatings] = useState(0);
	const [uniqueRatings, setUniqueRatings] = useState(0);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [errors, setErrors] = useState();
	const [restaurantNames, setRestaurantNames] = useState([])

	return (
		<MyContext.Provider
			value={{
				user,
				setUser,
				totalRatings,
				setTotalRatings,
				uniqueRatings,
				setUniqueRatings,
				loaded,
				setLoaded,
				posts,
				setPosts,
				open,
				setOpen,
				errors,
				setErrors,
				restaurantNames,
				setRestaurantNames
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
