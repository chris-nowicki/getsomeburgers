import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextWrapper from "./components/ContextWrapper";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Dashboard from "./views/Dashboard";
import Login from "./components/Login";
import Feed from "./components/Feed";

function App() {
	return (
		// <div className="container mx-auto w-3/4">
		<div>
			<ContextWrapper>
				<Router>
					<Routes>
						<Route path="/" element={<LandingPage />} default />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />}>
							<Route path="feed" index element={<Feed />} default />
						</Route>
					</Routes>
				</Router>
			</ContextWrapper>
		</div>
	);
}

export default App;
