import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Shield, UserPlus, Trash2, Edit2, X, Check } from "lucide-react";
import { api } from "../utils/api";

interface UserData {
	id: number;
	username: string;
	role: "admin" | "manager" | "operator";
	created_at: string;
}

export const UserManagement: React.FC = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<UserData | null>(null);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		role: "operator" as UserData["role"],
	});

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const data = await api.get("/users");
			setUsers(data);
		} catch (error) {
			console.error("Failed to fetch users", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (editingUser) {
				await api.put(`/users/${editingUser.id}`, {
					username: formData.username,
					role: formData.role,
				});
			} else {
				await api.post("/users", formData);
			}
			setIsModalOpen(false);
			setEditingUser(null);
			setFormData({ username: "", password: "", role: "operator" });
			fetchUsers();
		} catch (error) {
			alert("Operation failed");
		}
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("Delete this user?")) return;
		try {
			await api.delete(`/users/${id}`);
			fetchUsers();
		} catch (error) {
			alert("Delete failed");
		}
	};

	return (
		<div className="p-6 space-y-6">
			<header className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-white tracking-tight">
						User Management
					</h1>
					<p className="text-slate-400 mt-1">
						Manage system access and roles
					</p>
				</div>
				<button
					onClick={() => {
						setEditingUser(null);
						setFormData({
							username: "",
							password: "",
							role: "operator",
						});
						setIsModalOpen(true);
					}}
					className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
					<UserPlus size={20} />
					Add User
				</button>
			</header>

			<div className="grid grid-cols-1 gap-4">
				{loading ? (
					<div className="text-center py-10 text-slate-500 uppercase tracking-widest text-xs animate-pulse">
						Synchronizing Security Directory...
					</div>
				) : (
					users.map((user, index) => (
						<motion.div
							key={user.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center justify-between group hover:border-slate-700 transition-colors">
							<div className="flex items-center gap-4">
								<div
									className={`p-3 rounded-xl ${
										user.role === "admin"
											? "bg-rose-500/10 text-rose-500"
											: user.role === "manager"
												? "bg-amber-500/10 text-amber-500"
												: "bg-blue-500/10 text-blue-500"
									}`}>
									{user.role === "admin" ? (
										<Shield size={24} />
									) : (
										<User size={24} />
									)}
								</div>
								<div>
									<h3 className="text-lg font-semibold text-white">
										{user.username}
									</h3>
									<span
										className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-widest ${
											user.role === "admin"
												? "bg-rose-500/20 text-rose-500"
												: user.role === "manager"
													? "bg-amber-500/20 text-amber-500"
													: "bg-blue-500/20 text-blue-500"
										}`}>
										{user.role}
									</span>
								</div>
							</div>

							<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
								<button
									onClick={() => {
										setEditingUser(user);
										setFormData({
											username: user.username,
											password: "",
											role: user.role,
										});
										setIsModalOpen(true);
									}}
									className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
									<Edit2 size={18} />
								</button>
								<button
									onClick={() => handleDelete(user.id)}
									className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
									<Trash2 size={18} />
								</button>
							</div>
						</motion.div>
					))
				)}
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => setIsModalOpen(false)}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-xl font-bold text-white">
								{editingUser ? "Edit User" : "Add New User"}
							</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-slate-500 hover:text-white transition-colors">
								<X size={24} />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-1">
								<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
									Username
								</label>
								<input
									required
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
									value={formData.username}
									onChange={(e) =>
										setFormData({
											...formData,
											username: e.target.value,
										})
									}
								/>
							</div>

							{!editingUser && (
								<div className="space-y-1">
									<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
										Password
									</label>
									<input
										required
										type="password"
										className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
										value={formData.password}
										onChange={(e) =>
											setFormData({
												...formData,
												password: e.target.value,
											})
										}
									/>
								</div>
							)}

							<div className="space-y-1">
								<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
									Access Role
								</label>
								<select
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
									value={formData.role}
									onChange={(e) =>
										setFormData({
											...formData,
											role: e.target
												.value as UserData["role"],
										})
									}>
									<option value="operator">
										Operator (Basic)
									</option>
									<option value="manager">
										Manager (Production Control)
									</option>
									<option value="admin">
										Admin (Full System Access)
									</option>
								</select>
							</div>

							<button
								type="submit"
								className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
								<Check size={20} />
								{editingUser
									? "Update Credentials"
									: "Create Access Account"}
							</button>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
};
