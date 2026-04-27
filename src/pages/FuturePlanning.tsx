import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";
import { Zap, Brain, TrendingUp, Sparkles } from "lucide-react";

const SIX_MONTH_DATA = [
	{ month: "MAY", demand: 4200, capacity: 4000 },
	{ month: "JUN", demand: 4800, capacity: 4000 },
	{ month: "JUL", demand: 5900, capacity: 6000 },
	{ month: "AUG", demand: 5500, capacity: 6000 },
	{ month: "SEP", demand: 6200, capacity: 6000 },
	{ month: "OCT", demand: 7100, capacity: 8000 },
];

const YEAR_PLAN_DATA = [
	{ month: "Q1-26", demand: 12000, capacity: 10000 },
	{ month: "Q2-26", demand: 15800, capacity: 14000 },
	{ month: "Q3-26", demand: 19500, capacity: 18000 },
	{ month: "Q4-26", demand: 24000, capacity: 22000 },
	{ month: "Q1-27", demand: 28000, capacity: 30000 },
	{ month: "Q2-27", demand: 32000, capacity: 35000 },
];

export const FuturePlanning: React.FC = () => {
	const [view, setView] = React.useState<"6m" | "1y">("6m");
	const activeData = view === "6m" ? SIX_MONTH_DATA : YEAR_PLAN_DATA;

	return (
		<div className="space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-black uppercase tracking-tight">
						Future{" "}
						<span className="text-industrial-accent">Planning</span>
					</h2>
					<p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">
						AI-Simulated Demand Forecasting & Capacity Mapping
					</p>
				</div>
				<div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
					<button
						onClick={() => setView("6m")}
						className={`px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-black uppercase rounded-lg transition-all ${view === "6m" ? "bg-industrial-accent text-black shadow-lg" : "text-gray-500 hover:text-white"}`}>
						6 Month
					</button>
					<button
						onClick={() => setView("1y")}
						className={`px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-black uppercase rounded-lg transition-all ${view === "1y" ? "bg-industrial-accent text-black shadow-lg" : "text-gray-500 hover:text-white"}`}>
						Year Plan
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 glass-card p-4 sm:p-8 rounded-2xl border border-white/5 space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
							<TrendingUp className="w-4 h-4 text-industrial-accent" />
							{view === "6m" ? "Monthly" : "Quarterly"} Forecast
						</h3>
						<div className="flex flex-wrap gap-4 text-[10px] font-mono">
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-industrial-accent rounded-full" />
								<span className="text-gray-500 uppercase">
									Demand
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="w-2 h-2 bg-white/10 rounded-full" />
								<span className="text-gray-500 uppercase">
									Capacity
								</span>
							</div>
						</div>
					</div>

					<div className="h-80 w-full mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={activeData}>
								<defs>
									<linearGradient
										id="colorDemand"
										x1="0"
										y1="0"
										x2="0"
										y2="1">
										<stop
											offset="5%"
											stopColor="#FCA311"
											stopOpacity={0.3}
										/>
										<stop
											offset="95%"
											stopColor="#FCA311"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="rgba(255,255,255,0.05)"
									vertical={false}
								/>
								<XAxis
									dataKey="month"
									axisLine={false}
									tickLine={false}
									tick={{
										fill: "#4B5563",
										fontSize: 10,
										fontWeight: 700,
									}}
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
										borderRadius: "12px",
									}}
									itemStyle={{
										color: "#FCA311",
										fontSize: "12px",
									}}
								/>
								<Area
									type="monotone"
									dataKey="demand"
									stroke="#FCA311"
									fillOpacity={1}
									fill="url(#colorDemand)"
									strokeWidth={3}
								/>
								<Area
									type="stepAfter"
									dataKey="capacity"
									stroke="rgba(255,255,255,0.1)"
									fill="none"
									strokeDasharray="5 5"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="space-y-6">
					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
						<div className="flex items-center gap-3 text-industrial-accent">
							<Brain className="w-4 h-4" />
							<span className="text-[10px] font-bold uppercase tracking-widest">
								AI Strategy
							</span>
						</div>
						<p className="text-sm font-medium italic text-gray-200">
							{view === "6m"
								? '"Demand spike detected in Q3. Recommendation: Activate Assembly Line-05 by June 15th."'
								: '"Linear growth trajectory suggests a 25% capacity deficit by 2027. Long-term capital expenditure plan required."'}
						</p>
						<button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-industrial-accent hover:text-black transition-all">
							Approve Expansion
						</button>
					</div>

					<div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 relative overflow-hidden group">
						<Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-industrial-accent opacity-5 group-hover:opacity-10 transition-opacity" />
						<div className="flex items-center gap-3 text-gray-500">
							<Zap className="w-4 h-4" />
							<span className="text-[10px] font-bold uppercase tracking-widest">
								Growth Index
							</span>
						</div>
						<div>
							<p className="text-3xl font-mono font-bold">
								{view === "6m" ? "+24.8%" : "+112.4%"}
							</p>
							<p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter mt-1">
								Projected{" "}
								{view === "6m" ? "Expansion" : "2-Year Alpha"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="glass-card p-4 sm:p-8 rounded-2xl border border-white/5">
				<h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
					Strategic Milestones
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{[
						{
							date: "JUN 2026",
							task: "Line-05 Hardware Install",
							status: "Pending",
						},
						{
							date: "JUL 2026",
							task: "Operator L3 Training Cohort",
							status: "Planned",
						},
						{
							date: "SEP 2026",
							task: "Global Supply Chain Sync",
							status: "On-Hold",
						},
						{
							date: "OCT 2026",
							task: "System-Wide Firmware v5.0",
							status: "Planned",
						},
					].map((m) => (
						<div
							key={m.task}
							className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
							<p className="text-[9px] font-mono text-industrial-accent">
								{m.date}
							</p>
							<p className="text-xs font-bold leading-tight uppercase">
								{m.task}
							</p>
							<p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">
								{m.status}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
