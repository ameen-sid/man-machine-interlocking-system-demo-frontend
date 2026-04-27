import React from "react";
import { useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Archive,
	FileText,
	Download,
	Lock,
	Search,
} from "lucide-react";
import { motion } from "framer-motion";

const ARCHIVES = [
	{ month: "March 2026", orders: 142, yield: "98.4%", status: "Locked" },
	{ month: "February 2026", orders: 128, yield: "97.2%", status: "Locked" },
	{ month: "January 2026", orders: 156, yield: "99.1%", status: "Locked" },
	{ month: "December 2025", orders: 110, yield: "96.8%", status: "Locked" },
];

export const ProductionVault: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="space-y-8">
			<button
				onClick={() => navigate(-1)}
				className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
				<ArrowLeft className="w-4 h-4" /> Return
			</button>

			<div className="flex justify-between items-end">
				<div>
					<h2 className="text-3xl font-black uppercase tracking-tight text-gray-400">
						Production <span className="text-white">Vault</span>
					</h2>
					<p className="text-gray-600 text-sm font-mono uppercase">
						Historical Imprints & Audited Execution Logs
					</p>
				</div>
				<div className="relative hidden md:block">
					<Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-600" />
					<input
						type="text"
						placeholder="Lookup Transaction Hash..."
						className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-[10px] w-64 focus:outline-none focus:border-white/20"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{ARCHIVES.map((arc, i) => (
					<motion.div
						key={arc.month}
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: i * 0.1 }}
						className="glass-card p-6 rounded-3xl border border-white/5 space-y-6 group hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden">
						<div className="flex justify-between items-start">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
									<Archive className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
								</div>
								<div>
									<h3 className="font-bold text-lg">
										{arc.month}
									</h3>
									<p className="text-[10px] font-mono text-gray-600 uppercase">
										Archive ID: SR-{200 + i}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
								<Lock className="w-3 h-3 text-gray-700" />
								<span className="text-[9px] font-black uppercase text-gray-600">
									{arc.status}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-white/5 rounded-2xl border border-white/5">
								<p className="text-[10px] font-bold text-gray-500 uppercase">
									Total Orders
								</p>
								<p className="font-mono text-xl font-bold">
									{arc.orders}
								</p>
							</div>
							<div className="p-4 bg-white/5 rounded-2xl border border-white/5">
								<p className="text-[10px] font-bold text-gray-500 uppercase">
									Avg Yield
								</p>
								<p className="font-mono text-xl font-bold text-green-500">
									{arc.yield}
								</p>
							</div>
						</div>

						<div className="flex gap-3">
							<button className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
								<FileText className="w-3 h-3" /> Report
							</button>
							<button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-industrial-accent hover:text-black transition-all">
								<Download className="w-4 h-4" />
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};
