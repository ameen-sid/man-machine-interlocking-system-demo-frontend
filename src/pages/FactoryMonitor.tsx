import React from "react";
import {
	useSimulation,
	type MachineStatus,
} from "../context/SimulationContext";
import {
	Settings,
	User,
	Box,
	TrendingUp,
	AlertTriangle,
	PlayCircle,
	PauseCircle,
	XCircle,
	Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const StatusIcon = ({ status }: { status: MachineStatus }) => {
	switch (status) {
		case "Running":
			return <PlayCircle className="text-green-500 w-5 h-5" />;
		case "Idle":
			return <PauseCircle className="text-yellow-500 w-5 h-5" />;
		case "Breakdown":
			return <XCircle className="text-red-500 w-5 h-5" />;
	}
};

const StatusColor = (status: MachineStatus) => {
	switch (status) {
		case "Running":
			return "text-green-500";
		case "Idle":
			return "text-yellow-500";
		case "Breakdown":
			return "text-red-500";
	}
};

export const FactoryMonitor: React.FC = () => {
	const { machines, operators } = useSimulation();
	const [selectedMachine, setSelectedMachine] = React.useState<any>(null);

	return (
		<div className="space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-black uppercase tracking-tight">
						Factory{" "}
						<span className="text-industrial-accent">Overview</span>
					</h2>
					<p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">
						Live Field Telemetry - Node Cluster 01
					</p>
				</div>
				<div className="flex gap-4">
					<div className="glass-card px-4 py-2 rounded-lg border border-white/5 flex items-center gap-3 w-fit">
						<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
						<span className="text-[10px] sm:text-xs font-mono">
							ACTIVE SENSORS: 142/142
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
				{machines.map((machine) => {
					const operator = operators.find(
						(o) => o.id === machine.currentOperatorId,
					);

					return (
						<motion.div
							layout
							key={machine.id}
							className="glass-card rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all">
							<div className="p-6 space-y-6">
								{/* Header */}
								<div className="flex justify-between items-start">
									<div className="space-y-1">
										<h3 className="text-lg font-bold group-hover:text-industrial-accent transition-colors">
											{machine.name}
										</h3>
										<div className="flex items-center gap-2">
											<StatusIcon
												status={machine.status}
											/>
											<span
												className={`text-[10px] font-black uppercase tracking-widest ${StatusColor(machine.status)}`}>
												{machine.status}
											</span>
										</div>
									</div>
									<div className="bg-white/5 p-2 rounded-lg border border-white/5">
										<Settings
											className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors"
											onClick={() =>
												setSelectedMachine(machine)
											}
										/>
									</div>
								</div>

								{/* Stats Grid */}
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
									<div className="bg-industrial-gray/50 p-3 rounded-xl border border-white/5">
										<div className="flex items-center gap-2 mb-1 text-gray-500">
											<Box className="w-3 h-3" />
											<span className="text-[10px] font-bold uppercase tracking-tighter">
												Total Parts
											</span>
										</div>
										<p className="text-xl font-mono font-bold">
											{machine.partsProduced.toLocaleString()}
										</p>
									</div>

									<div className="bg-industrial-gray/50 p-3 rounded-xl border border-white/5 col-span-1 sm:col-span-1">
										<div className="flex items-center gap-2 mb-1 text-gray-500">
											<User className="w-3 h-3" />
											<span className="text-[10px] font-bold uppercase tracking-tighter">
												Operator
											</span>
										</div>
										<p className="text-sm font-bold truncate">
											{operator ? (
												operator.name
											) : (
												<span className="text-gray-600">
													UNMANNED
												</span>
											)}
										</p>
										{operator && (
											<p className="text-[9px] text-gray-500">
												Level {operator.level}
											</p>
										)}
									</div>

									<div className="bg-industrial-gray/50 p-3 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
										<div className="flex items-center gap-2 mb-1 text-gray-500">
											<TrendingUp className="w-3 h-3" />
											<span className="text-[10px] font-bold uppercase tracking-tighter">
												Efficiency
											</span>
										</div>
										<p className="text-xl font-mono font-bold text-industrial-accent">
											{machine.status === "Running"
												? "94%"
												: machine.status === "Idle"
													? "0%"
													: "N/A"}
										</p>
									</div>
								</div>

								{/* Progress Bar (Visual only for now) */}
								<div className="space-y-1.5">
									<div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
										<span>Shift Progress</span>
										<span>
											{Math.min(
												100,
												Math.floor(
													(machine.partsProduced /
														4000) *
														100,
												),
											)}
											%
										</span>
									</div>
									<div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											animate={{
												width: `${Math.min(100, Math.floor((machine.partsProduced / 4000) * 100))}%`,
											}}
											className={`h-full ${machine.status === "Running" ? "bg-industrial-accent shadow-[0_0_10px_rgba(252,163,17,0.5)]" : "bg-gray-700"}`}
										/>
									</div>
								</div>
							</div>

							{/* Status Footer Banner */}
							{machine.status === "Breakdown" && (
								<div className="bg-red-500/10 border-t border-red-500/20 p-3 flex items-center justify-center gap-2">
									<AlertTriangle className="w-4 h-4 text-red-500" />
									<span className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">
										IMMEDIATE MAINTENANCE REQUIRED
									</span>
								</div>
							)}
						</motion.div>
					);
				})}
			</div>

			{/* Global Pulse Indicator (moved here to allow fixed overlay) */}
			<div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
				<div className="w-12 h-12 flex items-center justify-center bg-industrial-accent/10 rounded-full border border-industrial-accent/20">
					<Activity className="w-6 h-6 text-industrial-accent" />
				</div>
				<div>
					<p className="text-[10px] font-bold text-gray-500 uppercase">
						Real-time Stream
					</p>
					<p className="text-xs font-mono font-semibold text-white">
						Aggregating telemetry from {machines.length} active
						nodes...
					</p>
				</div>
			</div>

			{/* Settings Modal */}
			{selectedMachine && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/80 backdrop-blur-md"
						onClick={() => setSelectedMachine(null)}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative w-full max-w-lg bg-industrial-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
						<div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
							<div className="flex items-center gap-3">
								<div
									className={`p-2 rounded-lg bg-white/5 border border-white/5`}>
									<Settings className="w-5 h-5 text-industrial-accent" />
								</div>
								<div>
									<h3 className="font-bold text-lg uppercase tracking-tight">
										{selectedMachine.name}
									</h3>
									<p className="text-[10px] text-gray-500 font-mono">
										NODE CONFIGURATION TERMINAL
									</p>
								</div>
							</div>
							<button
								onClick={() => setSelectedMachine(null)}
								className="p-2 text-gray-500 hover:text-white transition-colors">
								<XCircle className="w-6 h-6" />
							</button>
						</div>

						<div className="p-8 space-y-8">
							<div className="space-y-4">
								<label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
									Efficiency Goal (%)
								</label>
								<input
									type="range"
									className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-industrial-accent"
									defaultValue={95}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-industrial-accent hover:text-black transition-all group">
									<PlayCircle className="w-8 h-8 text-industrial-accent group-hover:text-black" />
									<span className="text-[10px] font-black uppercase tracking-widest">
										Restart Node
									</span>
								</button>
								<button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-red-500/20 hover:border-red-500/30 transition-all group">
									<AlertTriangle className="w-8 h-8 text-red-500" />
									<span className="text-[10px] font-black uppercase tracking-widest">
										E-Stop Override
									</span>
								</button>
							</div>

							<div className="bg-white/5 p-4 rounded-xl border border-white/5">
								<p className="text-[10px] font-bold text-gray-500 uppercase mb-2">
									Sensor Calibration
								</p>
								<div className="flex justify-between items-center text-xs font-mono">
									<span>RPM Sensor v2.1</span>
									<span className="text-green-500">
										CALIBRATED
									</span>
								</div>
							</div>
						</div>

						<div
							className="p-6 bg-industrial-accent flex justify-center cursor-pointer"
							onClick={() => setSelectedMachine(null)}>
							<span className="text-black font-black uppercase tracking-widest text-xs">
								Save Configuration
							</span>
						</div>
					</motion.div>
				</div>
			)}
		</div>
	);
};
