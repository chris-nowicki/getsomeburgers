import React, { useState } from "react";
import MyContext from "../contexts/MyContext";

function ContextWrapper({ children }) {
	const [user, setUser] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [totalRatings, setTotalRatings] = useState(0);
	const [uniqueRatings, setUniqueRatings] = useState(0);
	const [posts, setPosts] = useState([]);

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
			}}
		>
			{children}
		</MyContext.Provider>
	);
}

export default ContextWrapper;
