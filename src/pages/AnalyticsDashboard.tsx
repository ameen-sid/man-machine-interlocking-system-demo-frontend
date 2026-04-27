import React from "react";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";
import {
	ArrowUpRight,
	ArrowDownRight,
	Clock,
	Zap,
	PackageCheck,
	Info,
} from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

const OEE_DATA = [
	{ label: "Availability", value: 87, color: "#FCA311" },
	{ label: "Performance", value: 92, color: "#FCA311" },
	{ label: "Quality", value: 99, color: "#FCA311" },
];

const CYCLE_TIME_DATA = [
	{ name: "CNC-01", time: 42, standard: 40 },
	{ name: "CNC-02", time: 38, standard: 40 },
	{ name: "Latch-01", time: 55, standard: 50 },
	{ name: "Latch-02", time: 52, standard: 50 },
	{ name: "Mill-01", time: 65, standard: 60 },
];

const OEERing = ({
	label,
	value,
	color,
}: {
	label: string;
	value: number;
	color: string;
}) => {
	const data = [{ value: value }, { value: 100 - value }];

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="relative w-32 h-32">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={35}
							outerRadius={45}
							startAngle={90}
							endAngle={450}
							paddingAngle={0}
							dataKey="value"
							stroke="none">
							<Cell fill={color} />
							<Cell fill="rgba(255,255,255,0.05)" />
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-xl font-mono font-bold">
						{value}%
					</span>
				</div>
			</div>
			<span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
				{label}
			</span>
		</div>
	);
};

export const AnalyticsDashboard: React.FC = () => {
	useSimulation();

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-black uppercase tracking-tight">
					OEE{" "}
					<span className="text-industrial-accent">Analytics</span>
				</h2>
				<p className="text-gray-500 text-sm font-mono uppercase">
					Performance Multipliers & Cycle Efficiency
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* OEE Metrics */}
				<div className="lg:col-span-2 glass-card p-4 sm:p-8 rounded-2xl border border-white/5 space-y-8">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
							<Zap className="w-4 h-4 text-industrial-accent" />
							Overall Equipment Effectiveness
						</h3>
						<div className="flex items-center gap-2 px-3 py-1 bg-industrial-accent/10 rounded-full border border-industrial-accent/20 w-fit">
							<span className="text-xs font-bold text-industrial-accent">
								85.4% TOTAL
							</span>
							<ArrowUpRight className="w-3 h-3 text-industrial-accent" />
						</div>
					</div>

					<div className="flex flex-wrap justify-center gap-8 sm:justify-around items-center">
						{OEE_DATA.map((item) => (
							<OEERing key={item.label} {...item} />
						))}
					</div>
				</div>

				{/* Quick Insights */}
				<div className="space-y-6">
					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
						<div className="flex items-center gap-3 text-gray-500">
							<Clock className="w-4 h-4" />
							<span className="text-xs font-bold uppercase tracking-widest">
								Active Runtime
							</span>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-mono font-bold">
								18h 42m
							</p>
							<p className="text-[10px] text-green-500 flex items-center gap-1">
								<ArrowUpRight className="w-3 h-3" />
								+12% vs Yesterday
							</p>
						</div>
					</div>

					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
						<div className="flex items-center gap-3 text-gray-500">
							<PackageCheck className="w-4 h-4" />
							<span className="text-xs font-bold uppercase tracking-widest">
								Defect Rate
							</span>
						</div>
						<div className="space-y-1">
							<p className="text-3xl font-mono font-bold">
								0.82%
							</p>
							<p className="text-[10px] text-green-500 flex items-center gap-1">
								<ArrowDownRight className="w-3 h-3" />
								-0.04% Improvement
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Cycle Time Analysis */}
			<div className="glass-card p-4 sm:p-8 rounded-2xl border border-white/5 space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">
						Cycle Time Analysis
					</h3>
					<Info className="w-4 h-4 text-gray-700" />
				</div>

				<div className="h-64 mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={CYCLE_TIME_DATA}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="rgba(255,255,255,0.05)"
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								axisLine={false}
								tickLine={false}
								tick={{
									fill: "#4B5563",
									fontSize: 10,
									fontWeight: 700,
								}}
								dy={10}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{
									fill: "#4B5563",
									fontSize: 10,
									fontWeight: 700,
								}}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#0A0A0A",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: "8px",
									fontSize: "12px",
								}}
								itemStyle={{ color: "#FCA311" }}
							/>
							<Bar
								dataKey="standard"
								fill="rgba(255,255,255,0.05)"
								radius={[4, 4, 0, 0]}
								name="Standard (sec)"
							/>
							<Bar
								dataKey="time"
								fill="#FCA311"
								radius={[4, 4, 0, 0]}
								name="Actual (sec)"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left text-xs min-w-[600px]">
						<thead>
							<tr className="border-b border-white/5">
								<th className="py-4 font-black uppercase text-gray-500 tracking-widest px-4">
									Machine ID
								</th>
								<th className="py-4 font-black uppercase text-gray-500 tracking-widest px-4">
									Standard Code
								</th>
								<th className="py-4 font-black uppercase text-gray-500 tracking-widest px-4">
									Variance
								</th>
								<th className="py-4 font-black uppercase text-gray-500 tracking-widest px-4">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/5">
							{CYCLE_TIME_DATA.map((row) => (
								<tr
									key={row.name}
									className="hover:bg-white/5 transition-colors">
									<td className="py-4 font-bold px-4">
										{row.name}
									</td>
									<td className="py-4 font-mono text-gray-400 px-4">
										ST-{row.standard}-ABS
									</td>
									<td
										className={`py-4 font-mono px-4 ${row.time > row.standard ? "text-red-500" : "text-green-500"}`}>
										{row.time > row.standard
											? `+${row.time - row.standard}s`
											: `-${row.standard - row.time}s`}
									</td>
									<td className="py-4 px-4">
										<span
											className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${row.time > row.standard ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-green-500/10 text-green-500 border border-green-500/20"}`}>
											{row.time > row.standard
												? "LAG DETECTED"
												: "OPTIMAL"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
