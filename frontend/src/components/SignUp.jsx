import React, { useState } from 'react';

const SignUp = () => {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [submitted, setSubmitted] = useState(false);

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		setSubmitted(true);
		// Add API call or further logic here
	};

	return (
		<section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md bg-[#21212b] rounded-lg shadow-lg p-8 flex flex-col gap-6">
				<h2 className="text-[#fffced] text-3xl md:text-4xl font-bold font-['Roboto'] mb-2 text-center">Sign Up</h2>
				<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Full Name"
						className="w-full px-4 py-3 rounded-md bg-[#1d1e26] text-[#fffced] border border-[#aa2a46] focus:outline-none focus:border-[#fffced] font-medium"
						required
					/>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Email Address"
						className="w-full px-4 py-3 rounded-md bg-[#1d1e26] text-[#fffced] border border-[#aa2a46] focus:outline-none focus:border-[#fffced] font-medium"
						required
					/>
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="Password"
						className="w-full px-4 py-3 rounded-md bg-[#1d1e26] text-[#fffced] border border-[#aa2a46] focus:outline-none focus:border-[#fffced] font-medium"
						required
					/>
					<button
						type="submit"
						className="w-full py-3 bg-[#aa2a46] text-[#fffced] rounded-md font-bold text-lg hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors"
					>
						Sign Up
					</button>
				</form>
				{submitted && (
					<div className="text-[#fffced] text-center mt-4">Thank you for signing up!</div>
				)}
			</div>
		</section>
	);
};

export default SignUp;
