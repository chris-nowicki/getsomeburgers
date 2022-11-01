import React from "react";
import burger from "../images/cheeseburger-landing.jpg";

function LandingPage() {
	// function for orange arrow on footer to scroll to the top
	const handleScroll = () => {
		document.documentElement.scrollTop = 0;
	};

	return (
		<div className='container mx-auto w-3/4'>
			<div className="flex w-full flex-col">
				{/* navigation */}
				<nav className="flex w-full flex-row justify-between border-b-2 border-black pb-2">
					<div className="flex items-center pt-10 text-3xl">
						<a
							href="https://www.instagram.com"
							className="mr-2"
							rel="noopener"
						>
							<ion-icon name="logo-instagram"></ion-icon>
						</a>
						<a
							href="https://www.youtube.com"
							className="mr-2"
							rel="noopener"
						>
							<ion-icon name="logo-youtube"></ion-icon>
						</a>
						<a
							href="https://www.twitter.com"
							className="mr-2"
							rel="noopener"
						>
							<ion-icon name="logo-twitter"></ion-icon>
						</a>
					</div>
					<div className="pt-10 pb-2">
						<a
							href="/login"
							className=" rounded-md border-2 border-black bg-gray-200 px-6 py-2 text-xl"
						>
							Sign In
						</a>
					</div>
				</nav>

				{/* hero section */}
				<section className="mt-12 flex w-full flex-row">
					<div className="mr-10 flex w-1/2 flex-col items-center justify-center px-4 text-center">
						<h1 className="text-5xl">Get Some Burgers!</h1>
						<p className="mt-4 text-3xl">
							Binge, Chow Down, Divulge and share your favorite
							burgers!
						</p>
						<a
							href="/register"
							className="mt-6 rounded-md border-2 border-black bg-gray-200 px-10 py-6 text-2xl shadow-md"
						>
							Sign Up
						</a>
					</div>
					<div className="w-1/2">
						<img
							src={burger}
							className="rounded-lg shadow-xl shadow-black/30"
							alt="burger"
						/>
					</div>
				</section>

				{/* cool stuff */}

				<section className="mt-14 flex w-full flex-col justify-center rounded-xl bg-orange-400 p-10 text-center  outline-8">
					<p className="py-10 text-5xl">
						Saving the world from crappy burgers!
					</p>
					<p className="mt-10 flex flex-wrap justify-center text-5xl">
						Traveling or eating local you can{" "}
					</p>
					<p className="mt-2 flex flex-wrap justify-center text-5xl">
						<strong className="my-4 underline">
							get some burgers
						</strong>
					</p>
					<p className="mt-2 flex flex-wrap justify-center text-5xl">
						and share your experience.
					</p>
					<div className="flex translate-y-1 flex-row justify-around">
						<div className="flex w-1/4 translate-y-2/3 justify-center rounded border-2 border-black bg-white shadow-lg shadow-black/50">
							<h2 className="py-20 px-10 text-4xl">EAT</h2>
						</div>
						<div className="flex w-1/4 translate-y-2/3 justify-center rounded border-2 border-black bg-white shadow-lg shadow-black/50">
							<h2 className="py-20 px-10 text-4xl">RATE</h2>
						</div>
						<div className="flex w-1/4 translate-y-2/3 justify-center rounded border-2 border-black bg-white shadow-lg shadow-black/50">
							<h2 className="py-20 px-10 text-4xl">SHARE</h2>
						</div>
					</div>
				</section>

				{/* call to action */}
				<section className="mt-40 mb-5 flex h-96 w-full flex-col items-center justify-center  bg-gray-200 px-40 text-center">
					<p className="text-6xl">
						ready to devour and binge on some burgers?
					</p>
					<button className="mt-10 w-1/4 rounded-md border-2 border-black bg-gray-200 py-6 text-2xl shadow-md">
						Sign Up
					</button>
				</section>

				{/* landing page footer */}
				<section className="mt-10 flex w-full flex-col items-center justify-center border-t border-black">
					{/* triangle click to go to top */}
					<a
						href="#"
						className="-mb-8 -translate-y-4 text-2xl text-orange-400"
						onClick={(e) => {
							handleScroll();
						}}
					>
						<ion-icon
							name="triangle"
							className="-translate-y-1/2 text-orange-400"
						/>
					</a>
					{/* footer links */}
					<div className="flex w-full flex-row">
						<div className="flex w-1/2 flex-row justify-center">
							<div className="mr-8 flex flex-col">
								<a href="#" className="text-2xl">
									Contact
								</a>
							</div>
							<div className="flex flex-col">
								<a
									href="https://www.instagram.com"
									className="mb-1 text-2xl"
								>
									Instagram
								</a>
								<a
									href="https://www.youtube.com"
									className="mb-1 text-2xl"
								>
									Youtube
								</a>
								<a
									href="https://www.twitter.com"
									className="mb-1 text-2xl"
								>
									Twitter
								</a>
							</div>
						</div>
						<div className="flex w-1/2 flex-row justify-center">
							<p className="text-2xl">
								&#169; Get Some Burgers, Inc. 2022
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default LandingPage;
