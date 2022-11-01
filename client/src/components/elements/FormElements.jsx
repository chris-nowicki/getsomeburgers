import { ExclamationCircleIcon } from "@heroicons/react/solid";

// import React from "react"
export const Input = ({
	label,
	type,
	name,
	value,
	onChangeProp,
	errorProps,
}) => {
	return (
		<div className="mb-3">
			<label className="block text-xl font-medium text-gray-700">
				{label}
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<input
					type={type}
					name={name}
					className={
						!errorProps
							? "block w-full rounded-md border-gray-300 text-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							: "block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
					}
					placeholder=""
					value={value}
					aria-invalid="true"
					onChange={onChangeProp}
				/>
				{errorProps && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{errorProps && (
				<p className="mt-1 text-sm text-red-600" id="email-error">
					{errorProps.message}
				</p>
			)}
		</div>
	);
};

export const TextArea = ({
	label,
	name,
	rows,
	value,
	onChangeProp,
	errorProps,
}) => {
	return (
		<div className="mb-3">
			<label className="block text-xl font-medium text-gray-700">
				{label}
			</label>
			<div className="relative mt-1 rounded-md shadow-sm">
				<textarea
					name={name}
					rows={rows}
					className={
						!errorProps
							? "block w-full rounded-md border-gray-300 text-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							: "block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
					}
					placeholder=""
					value={value}
					onChange={onChangeProp}
				/>
				{errorProps && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<ExclamationCircleIcon
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{errorProps && (
				<p className="mt-1 text-sm text-red-600" id="email-error">
					{errorProps.message}
				</p>
			)}
		</div>
	);
};
