import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Clock, Settings2, Lock } from "lucide-react";
import { motion } from "framer-motion";

const QUEUE = [
	{
		id: "Q-401",
		item: "Chassis Frame B-1",
		priority: "High",
		estTime: "12h",
	},
	{
		id: "Q-402",
		item: "Hydraulic Cylinder X",
		priority: "Medium",
		estTime: "8h",
	},
	{
		id: "Q-403",
		item: "Control Panel Mod-3",
		priority: "Low",
		estTime: "24h",
	},
	{
		id: "Q-404",
		item: "Titanium Shell T-2",
		priority: "Critical",
		estTime: "4h",
	},
];

export const ProductionPipeline: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="space-y-8">
			<button
				onClick={() => navigate(-1)}
				className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
				<ArrowLeft className="w-4 h-4" /> Return
			</button>

			<div>
				<h2 className="text-3xl font-black uppercase tracking-tight">
					Active <span className="text-indigo-500">Pipeline</span>
				</h2>
				<p className="text-gray-500 text-sm font-mono uppercase">
					Upcoming Manufacturing Sequence & Resource Staging
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4">
				{QUEUE.map((item, i) => (
					<motion.div
						key={item.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: i * 0.1 }}
						className={`glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all ${item.priority === "Critical" ? "bg-indigo-500/5" : ""}`}>
						<div className="flex items-center gap-6">
							<div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500 group-hover:text-black transition-all">
								<Play className="w-6 h-6" />
							</div>
							<div>
								<h3 className="text-lg font-bold uppercase">
									{item.item}
								</h3>
								<div className="flex gap-4 mt-1">
									<span className="text-[10px] font-mono text-gray-500 uppercase">
										QUEUE-ID: {item.id}
									</span>
									<span
										className={`text-[10px] font-black uppercase ${item.priority === "Critical" ? "text-red-500" : item.priority === "High" ? "text-indigo-500" : "text-gray-500"}`}>
										{item.priority} Priority
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-12">
							<div className="text-right hidden sm:block">
								<p className="text-[10px] font-bold text-gray-500 uppercase">
									Estimated Cycle
								</p>
								<div className="flex items-center gap-2 justify-end mt-1">
									<Clock className="w-3 h-3 text-indigo-500" />
									<span className="font-mono text-xs">
										{item.estTime}
									</span>
								</div>
							</div>
							<button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
								<Settings2 className="w-4 h-4" />
							</button>
						</div>
					</motion.div>
				))}
			</div>

			<div className="glass-card p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
				<Lock className="w-10 h-10 text-gray-700" />
				<div>
					<p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
						Secondary Buffer Queue
					</p>
					<p className="text-xs italic mt-1">
						"Nodes currently waiting for material arrival or
						upstream completion"
					</p>
				</div>
			</div>
		</div>
	);
};
