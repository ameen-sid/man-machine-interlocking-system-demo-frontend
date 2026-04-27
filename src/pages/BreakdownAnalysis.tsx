import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";
import { Clock, Hammer, ShieldAlert } from "lucide-react";

const BREAKDOWN_DATA = [
	{ reason: "Mechanical", hours: 42, count: 12 },
	{ reason: "Electrical", hours: 28, count: 5 },
	{ reason: "Software", hours: 15, count: 8 },
	{ reason: "User Error", hours: 8, count: 14 },
	{ reason: "Tooling", hours: 32, count: 6 },
];

export const BreakdownAnalysis: React.FC = () => {
	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-black uppercase tracking-tight">
					Breakdown{" "}
					<span className="text-industrial-accent">Analysis</span>
				</h2>
				<p className="text-gray-500 text-sm font-mono uppercase">
					MTTR/MTBF Diagnostic Terminal
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 space-y-2">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						MTTR (Repair Time)
					</p>
					<p className="text-2xl sm:text-3xl font-mono font-bold text-red-500">
						2.4h
					</p>
					<p className="text-[9px] text-gray-600 uppercase">
						INC: 15% vs Last Mo.
					</p>
				</div>
				<div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 space-y-2">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						MTBF (Reliability)
					</p>
					<p className="text-2xl sm:text-3xl font-mono font-bold text-green-500">
						148h
					</p>
					<p className="text-[9px] text-gray-600 uppercase">
						DEC: 4% vs Last Mo.
					</p>
				</div>
				<div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 space-y-2">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						Unplanned Downtime
					</p>
					<p className="text-2xl sm:text-3xl font-mono font-bold text-industrial-accent">
						12.5%
					</p>
					<p className="text-[9px] text-gray-600 uppercase">
						THR: 10.0%
					</p>
				</div>
				<div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 space-y-2">
					<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
						Active Breakdowns
					</p>
					<p className="text-2xl sm:text-3xl font-mono font-bold">
						01
					</p>
					<p className="text-[9px] text-red-500 uppercase tracking-tighter font-black">
						NODE: MC-04
					</p>
				</div>
			</div>

			<div className="glass-card p-8 rounded-2xl border border-white/5">
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
						Downtime Hours by Category (Pareto)
					</h3>
					<ShieldAlert className="w-4 h-4 text-red-500/50" />
				</div>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={BREAKDOWN_DATA} layout="vertical">
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(255,255,255,0.05)"
								horizontal={false}
							/>
							<XAxis type="number" hide />
							<YAxis
								dataKey="reason"
								type="category"
								axisLine={false}
								tickLine={false}
								tick={{
									fill: "#9CA3AF",
									fontSize: 10,
									fontWeight: 700,
								}}
								width={100}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#0A0A0A",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "8px",
								}}
								itemStyle={{ color: "#FCA311" }}
							/>
							<Bar dataKey="hours" radius={[0, 4, 4, 0]}>
								{BREAKDOWN_DATA.map((entry, index) => (
									<Cell
										key={index}
										fill={
											entry.hours > 30
												? "#EF4444"
												: "#FCA311"
										}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col gap-6">
				<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
					<Clock className="w-4 h-4" />
					Recent Interventions
				</h3>
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5 gap-4">
							<div className="flex items-center gap-4">
								<div className="bg-red-500/10 p-2 rounded-lg shrink-0">
									<Hammer className="w-4 h-4 text-red-500" />
								</div>
								<div>
									<p className="text-xs font-bold uppercase tracking-wide">
										M/C-04 Controller replacement
									</p>
									<p className="text-[10px] text-gray-500 font-mono italic">
										Engineer: Vikram // 3h 12m
									</p>
								</div>
							</div>
							<span className="text-[10px] font-mono text-gray-700 sm:text-right">
								24-APR-2026
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
