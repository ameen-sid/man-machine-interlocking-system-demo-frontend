import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		// Simulate network delay
		setTimeout(() => {
			if (login(username, password)) {
				navigate("/monitor"); // Default redirect to monitor
			} else {
				setError("Invalid Security Credentials");
				setIsLoading(false);
			}
		}, 800);
	};

	return (
		<div className="min-h-screen bg-industrial-black flex items-center justify-center p-6 relative overflow-hidden">
			{/* Background Ambience */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-industrial-accent/10 rounded-full blur-[120px]" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-industrial-accent/5 rounded-full blur-[100px]" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full max-w-md">
				<div className="text-center mb-12 space-y-3">
					<div className="w-16 h-16 bg-industrial-accent/10 border border-industrial-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(252,163,17,0.1)]">
						<Shield className="w-8 h-8 text-industrial-accent" />
					</div>
					<h1 className="text-3xl font-black tracking-tighter uppercase">
						MMI{" "}
						<span className="text-industrial-accent">
							Secure Portal
						</span>
					</h1>
					<p className="text-gray-500 font-mono text-xs uppercase tracking-widest leading-loose">
						UNAUTHORIZED ACCESS IS STRICTLY MONITORED
						<br />
						SYSTEM NODE: SECURE-GATEWAY-01
					</p>
				</div>

				<div className="glass-card p-10 rounded-3xl border border-white/5 relative overflow-hidden shadow-3xl">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
								Username
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<User className="h-4 w-4 text-gray-600 group-focus-within:text-industrial-accent transition-colors" />
								</div>
								<input
									type="text"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-gray-600 focus:outline-none focus:border-industrial-accent focus:bg-white/10 transition-all font-mono"
									placeholder="IDENTIFICATION CODE"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
								Secure Key
							</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 text-gray-600 group-focus-within:text-industrial-accent transition-colors" />
								</div>
								<input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-sm placeholder-gray-600 focus:outline-none focus:border-industrial-accent focus:bg-white/10 transition-all font-mono"
									placeholder="SECRET PHRASE"
									required
								/>
							</div>
						</div>

						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-[10px] font-bold flex items-center gap-3 uppercase tracking-wider">
									<AlertCircle className="w-4 h-4" />
									{error}
								</motion.div>
							)}
						</AnimatePresence>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex items-center justify-center py-4 bg-industrial-accent text-black rounded-xl font-black uppercase text-sm tracking-[0.2em] shadow-[0_0_40px_rgba(252,163,17,0.2)] hover:shadow-[0_0_60px_rgba(252,163,17,0.4)] active:scale-95 transition-all disabled:opacity-50">
							{isLoading ? (
								<Loader2 className="w-5 h-5 animate-spin" />
							) : (
								"Initiate Secure Session"
							)}
						</button>
					</form>

					<div className="mt-8 text-center">
						<a
							href="#"
							className="text-[10px] font-bold text-gray-600 uppercase hover:text-industrial-accent transition-colors tracking-widest underline decoration-white/10 underline-offset-4">
							Emergency Protocol Access
						</a>
					</div>
				</div>

				<div className="mt-12 text-center text-[10px] font-mono text-gray-700 tracking-[0.3em] uppercase">
					&copy; 2026 INDUSTRIAL SOLUTIONS GROUP // ENCRYPTED-RSA-4096
				</div>
			</motion.div>
		</div>
	);
};
