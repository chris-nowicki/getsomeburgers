import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextWrapper from "./components/ContextWrapper";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Dashboard from "./views/Dashboard";
import Login from "./components/Login";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import UserSettings from "./components/UserSettings";

function App() {
	return (
		<div>
			<ContextWrapper>
				<Router>
					<Routes>
						<Route path="/" element={<LandingPage />} default />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />}>
							<Route
								path="feed"
								index
								element={<Feed />}
								default
							/>
							<Route
								path="create-post"
								index
								element={<CreatePost />}
							/>
							<Route
								path="edit-post/:id"
								index
								element={<EditPost />}
							/>
							<Route
								path="settings"
								index
								element={<UserSettings />}
							/>
						</Route>
					</Routes>
				</Router>
			</ContextWrapper>
		</div>
	);
}

export default App;
