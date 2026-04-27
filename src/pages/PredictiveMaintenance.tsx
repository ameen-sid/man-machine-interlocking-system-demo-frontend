import React from "react";
import { useSimulation, type SystemAlert } from "../context/SimulationContext";
import {
	Bell,
	Terminal,
	Search,
	Filter,
	AlertTriangle,
	Info,
	Settings,
	History,
	Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AlertRow = ({ alert }: { alert: SystemAlert }) => {
	const Icon =
		alert.type === "error"
			? AlertTriangle
			: alert.type === "warning"
				? Info
				: Bell;
	const colorClass =
		alert.type === "error"
			? "text-red-500 bg-red-500/10 border-red-500/20"
			: alert.type === "warning"
				? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
				: "text-blue-500 bg-blue-500/10 border-blue-500/20";

	return (
		<motion.div
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			className={`p-4 rounded-xl border flex gap-4 items-start transition-all hover:bg-white/5 ${colorClass.split(" ").slice(1).join(" ")}`}>
			<div
				className={`p-2 rounded-lg border ${colorClass.split(" ")[0]} ${colorClass.split(" ").slice(2, 3).join(" ")}`}>
				<Icon className="w-4 h-4" />
			</div>
			<div className="flex-1 space-y-1">
				<div className="flex justify-between items-center">
					<span
						className={`text-[10px] font-black uppercase tracking-widest ${colorClass.split(" ")[0]}`}>
						{alert.type}
					</span>
					<span className="text-[10px] font-mono text-gray-500">
						{alert.timestamp.toLocaleTimeString()}
					</span>
				</div>
				<p className="text-sm font-medium">{alert.message}</p>
			</div>
		</motion.div>
	);
};

export const PredictiveMaintenance: React.FC = () => {
	const { alerts, addAlert } = useSimulation();

	return (
		<div className="space-y-8 h-full flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-black uppercase tracking-tight">
						System{" "}
						<span className="text-industrial-accent">Alerts</span>
					</h2>
					<p className="text-gray-500 text-sm font-mono uppercase">
						Streaming Diagnostic Logs & Maintenance Triggers
					</p>
				</div>
				<div className="flex gap-4">
					<button
						onClick={() =>
							addAlert(
								"Manual System Diagnostic Triggered by User",
								"info",
							)
						}
						className="glass-card px-4 py-2 rounded-lg border border-white/5 text-xs font-bold uppercase flex items-center gap-2 hover:bg-white/10 transition-colors">
						<Terminal className="w-3 h-3" />
						Manual Diagnosis
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
				{/* Left Column: Health Stats */}
				<div className="space-y-6">
					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
						<h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
							<Activity className="w-4 h-4" />
							Predictive Health Score
						</h3>
						<div className="space-y-2">
							<div className="flex justify-between items-end">
								<span className="text-4xl font-mono font-bold">
									92
									<span className="text-gray-600">/100</span>
								</span>
								<span className="text-xs text-green-500 font-bold mb-1">
									STABLE
								</span>
							</div>
							<div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
								<div className="w-[92%] h-full bg-industrial-accent" />
							</div>
							<p className="text-[10px] text-gray-500 leading-relaxed">
								Based on vibration, temperature, and cycle time
								patterns from last 24 hours.
							</p>
						</div>
					</div>

					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
						<h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
							<History className="w-4 h-4" />
							Recent Failures
						</h3>
						<div className="space-y-3">
							<div className="p-3 bg-industrial-dark rounded-lg border border-red-500/10">
								<p className="text-xs font-bold">
									M/C-04 Controller Error
								</p>
								<p className="text-[9px] text-gray-500 font-mono">
									2026-04-24 12:15:30
								</p>
							</div>
							<div className="p-3 bg-industrial-dark rounded-lg border border-yellow-500/10">
								<p className="text-xs font-bold">
									M/C-01 Spindle Calibration
								</p>
								<p className="text-[9px] text-gray-500 font-mono">
									2026-04-23 09:44:12
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Center/Right: Live Alerts Log */}
				<div className="lg:col-span-2 glass-card rounded-2xl border border-white/5 flex flex-col overflow-hidden bg-black/40">
					<div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
						<div className="flex items-center gap-4">
							<h3 className="text-sm font-bold uppercase tracking-widest">
								Diagnostic Feed
							</h3>
							<span className="px-1.5 py-0.5 bg-red-500 text-black text-[9px] font-black rounded-sm animate-pulse">
								LIVE
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Search className="w-4 h-4 text-gray-500" />
							<Filter className="w-4 h-4 text-gray-500" />
							<Settings className="w-4 h-4 text-gray-500" />
						</div>
					</div>

					<div className="flex-1 overflow-auto p-6 space-y-4 custom-scrollbar">
						<AnimatePresence initial={false}>
							{alerts.length === 0 ? (
								<div className="h-40 flex items-center justify-center text-gray-600 uppercase text-xs font-mono tracking-widest italic">
									All systems nominal. No active alerts.
								</div>
							) : (
								alerts.map((alert) => (
									<AlertRow key={alert.id} alert={alert} />
								))
							)}
						</AnimatePresence>
					</div>

					<div className="p-3 bg-industrial-gray border-t border-white/5 flex items-center justify-center gap-4 text-[9px] font-mono text-gray-500">
						<div className="flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
							ERROR:{" "}
							{alerts.filter((a) => a.type === "error").length}
						</div>
						<div className="flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
							WARNING:{" "}
							{alerts.filter((a) => a.type === "warning").length}
						</div>
						<div className="flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
							INFO:{" "}
							{alerts.filter((a) => a.type === "info").length}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
