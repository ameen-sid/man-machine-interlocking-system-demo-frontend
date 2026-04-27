import React from "react";
import { useNavigate } from "react-router-dom";
import { useSimulation } from "../context/SimulationContext";
import {
	Clock,
	MapPin,
	Search,
	ArrowRightLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import {
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";

const ATTENDANCE_TREND = [
	{ day: "Mon", count: 12 },
	{ day: "Tue", count: 15 },
	{ day: "Wed", count: 14 },
	{ day: "Thu", count: 16 },
	{ day: "Fri", count: 15 },
	{ day: "Sat", count: 10 },
	{ day: "Sun", count: 8 },
];

export const OperatorAttendance: React.FC = () => {
	const navigate = useNavigate();
	const { operators, machines } = useSimulation();

	return (
		<div className="space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-black uppercase tracking-tight">
						Operator{" "}
						<span className="text-industrial-accent">
							Attendance
						</span>
					</h2>
					<p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">
						Workforce Presence & Station Dynamics
					</p>
				</div>
				<div className="flex gap-4">
					<div className="relative">
						<Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
						<input
							type="text"
							placeholder="Search Badge ID..."
							className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-industrial-accent w-48"
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						On-Duty Population
					</p>
					<p className="text-3xl font-mono font-bold">
						14<span className="text-gray-600"> / 16</span>
					</p>
				</div>
				<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						Active Station Coverage
					</p>
					<p className="text-3xl font-mono font-bold">88%</p>
				</div>
				<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						Average On-Station Time
					</p>
					<p className="text-3xl font-mono font-bold">6.2h</p>
				</div>
			</div>

			<div className="glass-card p-6 rounded-2xl border border-white/5 h-[300px]">
				<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
					Attendance Trend (Past 7 Days)
				</h3>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={ATTENDANCE_TREND}>
						<defs>
							<linearGradient
								id="colorCount"
								x1="0"
								y1="0"
								x2="0"
								y2="1">
								<stop
									offset="5%"
									stopColor="#fca311"
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor="#fca311"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#ffffff10"
							vertical={false}
						/>
						<XAxis
							dataKey="day"
							stroke="#666"
							fontSize={10}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							stroke="#666"
							fontSize={10}
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "#0a0a0a",
								border: "1px solid #ffffff10",
								borderRadius: "8px",
							}}
							itemStyle={{ color: "#fca311" }}
						/>
						<Area
							type="monotone"
							dataKey="count"
							stroke="#fca311"
							fillOpacity={1}
							fill="url(#colorCount)"
							strokeWidth={3}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
						Recent Attendance Events (System Catch)
					</h3>
					<span className="text-[10px] font-mono text-industrial-accent animate-pulse">
						STREAMING LIVE
					</span>
				</div>
				<div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
					<div className="divide-y divide-white/5">
						{[...Array(8)].map((_, i) => {
							const op = operators[i % (operators.length || 1)];
							const mc = machines[i % (machines.length || 1)];
							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.05 }}
									className="p-4 flex items-center justify-between group hover:bg-white/5 transition-all">
									<div className="flex items-center gap-6">
										<div className="flex items-center gap-3 w-48">
											<div className="w-8 h-8 bg-industrial-accent/10 rounded-lg flex items-center justify-center">
												<Clock className="w-4 h-4 text-industrial-accent" />
											</div>
											<div>
												<p className="text-xs font-bold text-white group-hover:text-industrial-accent transition-colors">
													{op?.name ||
														"System Operator"}
												</p>
												<p className="text-[9px] font-mono text-gray-500 uppercase">
													{op?.id || "HID-92X"}
												</p>
											</div>
										</div>

										<div className="hidden md:flex items-center gap-2 px-4 border-l border-white/5">
											<MapPin className="w-3 h-3 text-gray-600" />
											<span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
												{mc?.name || "Gate-01"}
											</span>
										</div>

										<div className="hidden lg:block px-4 border-l border-white/5">
											<span className="text-[9px] font-black uppercase text-green-500/70 py-1 px-2 bg-green-500/5 rounded-full border border-green-500/10">
												Authentication Success
											</span>
										</div>
									</div>

									<div className="flex items-center gap-6">
										<span className="text-[10px] font-mono text-gray-400">
											11:24:0{i} AM
										</span>
										<button
											onClick={() =>
												navigate(
													`/operator-logs/${op?.id || "op-01"}`,
												)
											}
											className="p-2 bg-white/5 text-gray-400 rounded-lg hover:bg-industrial-accent hover:text-black transition-all">
											<ArrowRightLeft className="w-4 h-4" />
										</button>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
};
