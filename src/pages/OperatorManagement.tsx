import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Users,
	UserPlus,
	Trash2,
	Edit2,
	X,
	Check,
	Award,
} from "lucide-react";
import { api } from "../utils/api";

interface Operator {
	id: string;
	name: string;
	level: number;
	certifications: string[] | string;
}

export const OperatorManagement: React.FC = () => {
	const [operators, setOperators] = useState<Operator[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingOp, setEditingOp] = useState<Operator | null>(null);
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		level: 1,
		certifications: "",
	});

	const fetchOperators = async () => {
		try {
			setLoading(true);
			const data = await api.get("/operators");
			setOperators(data);
		} catch (error) {
			console.error("Failed to fetch operators", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchOperators();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const payload = {
			...formData,
			certifications: formData.certifications
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s !== ""),
		};

		try {
			if (editingOp) {
				await api.put(`/operators/${editingOp.id}`, payload);
			} else {
				await api.post("/operators", payload);
			}
			setIsModalOpen(false);
			setEditingOp(null);
			setFormData({ id: "", name: "", level: 1, certifications: "" });
			fetchOperators();
		} catch (error) {
			alert("Operation failed. Check if ID is unique.");
		}
	};

	const handleDelete = async (id: string) => {
		if (!window.confirm("Remove this operator from registry?")) return;
		try {
			await api.delete(`/operators/${id}`);
			fetchOperators();
		} catch (error) {
			alert("Delete failed");
		}
	};

	const getCerts = (op: Operator) => {
		if (Array.isArray(op.certifications)) return op.certifications;
		try {
			return JSON.parse(op.certifications as string);
		} catch {
			return [];
		}
	};

	return (
		<div className="p-6 space-y-6">
			<header className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-white tracking-tight">
						Operator Registry
					</h1>
					<p className="text-slate-400 mt-1">
						Manage personnel certifications and skill levels
					</p>
				</div>
				<button
					onClick={() => {
						setEditingOp(null);
						setFormData({
							id: "",
							name: "",
							level: 1,
							certifications: "",
						});
						setIsModalOpen(true);
					}}
					className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20">
					<UserPlus size={20} />
					Register Operator
				</button>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{loading ? (
					<div className="col-span-full text-center py-20 text-slate-500 animate-pulse uppercase tracking-[0.3em] text-xs">
						Accessing Personnel Database...
					</div>
				) : (
					operators.map((op, index) => (
						<motion.div
							key={op.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:border-blue-500/30 transition-all group">
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
										<Users size={24} />
									</div>
									<div>
										<h3 className="text-lg font-bold text-white">
											{op.name}
										</h3>
										<p className="text-xs text-slate-500 font-mono">
											{op.id}
										</p>
									</div>
								</div>
								<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										onClick={() => {
											setEditingOp(op);
											setFormData({
												id: op.id,
												name: op.name,
												level: op.level,
												certifications:
													getCerts(op).join(", "),
											});
											setIsModalOpen(true);
										}}
										className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
										<Edit2 size={16} />
									</button>
									<button
										onClick={() => handleDelete(op.id)}
										className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg">
										<Trash2 size={16} />
									</button>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
										Skill Maturity
									</span>
									<div className="flex items-center gap-1">
										{[1, 2, 3].map((lvl) => (
											<div
												key={lvl}
												className={`w-6 h-1.5 rounded-full ${op.level >= lvl ? "bg-blue-500" : "bg-slate-800"}`}
											/>
										))}
										<span className="ml-2 text-xs font-black text-blue-400">
											L{op.level}
										</span>
									</div>
								</div>

								<div className="space-y-2">
									<span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">
										Validated Certs
									</span>
									<div className="flex flex-wrap gap-2">
										{getCerts(op).map((cert: string) => (
											<span
												key={cert}
												className="px-2 py-1 bg-slate-800 text-slate-300 text-[9px] rounded-md border border-slate-700 flex items-center gap-1">
												<Award
													size={10}
													className="text-blue-500"
												/>
												{cert}
											</span>
										))}
										{getCerts(op).length === 0 && (
											<span className="text-[10px] text-slate-600 italic">
												No certifications recorded
											</span>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/80 backdrop-blur-md"
						onClick={() => setIsModalOpen(false)}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-white">
								{editingOp
									? "Update Personnel"
									: "New Operator Registration"}
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
									Operator ID
								</label>
								<input
									required
									disabled={!!editingOp}
									placeholder="e.g. OP-10"
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono"
									value={formData.id}
									onChange={(e) =>
										setFormData({
											...formData,
											id: e.target.value,
										})
									}
								/>
							</div>

							<div className="space-y-1">
								<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
									Full Name
								</label>
								<input
									required
									placeholder="e.g. John Doe"
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
								/>
							</div>

							<div className="space-y-1">
								<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
									Skill Level (L1 - L3)
								</label>
								<select
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none"
									value={formData.level}
									onChange={(e) =>
										setFormData({
											...formData,
											level: parseInt(e.target.value),
										})
									}>
									<option value={1}>
										L1 - Beginner (Limited Access)
									</option>
									<option value={2}>
										L2 - Proficient (Standard Access)
									</option>
									<option value={3}>
										L3 - Expert (Mastery/Supervision)
									</option>
								</select>
							</div>

							<div className="space-y-1">
								<label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
									Certifications (Comma separated)
								</label>
								<textarea
									placeholder="CNC, Safety-L2, Lathe-Expert"
									className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 min-h-[100px]"
									value={formData.certifications}
									onChange={(e) =>
										setFormData({
											...formData,
											certifications: e.target.value,
										})
									}
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 uppercase tracking-widest">
								<Check size={20} />
								{editingOp
									? "Commit Updates"
									: "Finalize Registration"}
							</button>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
};
