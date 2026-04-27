import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Bell, Shield, Cpu, Menu } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export const Layout: React.FC = () => {
	const { alerts } = useSimulation();
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
	const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
	const location = useLocation();

	const unreadAlerts = alerts.filter((a) => a.type === "error").length;

	// Auto-close sidebar on route change (mobile)
	React.useEffect(() => {
		setIsSidebarOpen(false);
	}, [location.pathname]);

	return (
		<div className="flex min-h-screen bg-industrial-black text-white font-sans selection:bg-industrial-accent selection:text-black">
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebApplication",
					name: "Smart Man-Machine Interlocking System",
					description: "Industrial HMI and telemetry dashboard demo.",
					applicationCategory: "ManufacturingSoftware",
				})}
			</script>
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
			<main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
				<header className="h-16 border-b border-white/5 bg-industrial-black/80 backdrop-blur-sm sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
					<div className="flex items-center gap-3 md:gap-4">
						<button
							onClick={() => setIsSidebarOpen(true)}
							className="lg:hidden p-2 text-gray-400 hover:text-white">
							<Menu className="w-6 h-6" />
						</button>
						<div className="hidden sm:flex items-center gap-4 text-[10px] md:text-xs tracking-widest text-gray-500 uppercase">
							<Shield className="w-4 h-4 text-industrial-accent" />
							<span className="hidden md:inline">
								Secure Protocol Active
							</span>
							<span className="hidden md:inline w-1 h-1 bg-gray-700 rounded-full" />
							<Cpu className="w-4 h-4 text-industrial-accent" />
							<span className="hidden sm:inline">0x4F2A</span>
						</div>
					</div>

					<div className="flex items-center gap-4 md:gap-6">
						<div className="relative">
							<button
								onClick={() =>
									setIsNotificationsOpen(!isNotificationsOpen)
								}
								className="relative p-2 text-gray-400 hover:text-white transition-colors">
								<Bell className="w-5 h-5" />
								{unreadAlerts > 0 && (
									<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
								)}
							</button>

							{isNotificationsOpen && (
								<>
									<div
										className="fixed inset-0 z-40"
										onClick={() =>
											setIsNotificationsOpen(false)
										}
									/>
									<div className="absolute right-0 mt-2 w-80 bg-industrial-black border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
										<div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
											<h4 className="text-xs font-black uppercase tracking-widest text-industrial-accent">
												System Alerts
											</h4>
											<span className="text-[9px] font-mono text-gray-500">
												{alerts.length} LOGS
											</span>
										</div>
										<div className="max-h-[400px] overflow-y-auto custom-scrollbar">
											{alerts.map((alert) => (
												<div
													key={alert.id}
													className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
													<div className="flex gap-3">
														<div
															className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${alert.type === "error" ? "bg-red-500" : alert.type === "warning" ? "bg-yellow-500" : "bg-blue-500"}`}
														/>
														<div>
															<p className="text-[11px] font-medium leading-normal">
																{alert.message}
															</p>
															<p className="text-[9px] font-mono text-gray-500 mt-1 uppercase">
																{alert.timestamp instanceof
																Date
																	? alert.timestamp.toLocaleTimeString()
																	: String(
																			alert.timestamp,
																		)}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
										<div className="p-3 bg-white/5 text-center border-t border-white/5">
											<button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
												Clear All Logs
											</button>
										</div>
									</div>
								</>
							)}
						</div>
						<div className="h-4 w-[1px] bg-white/10" />
						<div className="text-right">
							<p className="text-[9px] md:text-[10px] text-gray-500 leading-tight">
								SYSTEM TIME
							</p>
							<p className="text-[10px] md:text-xs font-mono font-bold text-industrial-accent uppercase">
								{new Date().toLocaleTimeString([], {
									hour12: false,
								})}
							</p>
						</div>
					</div>
				</header>

				<section className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</section>
			</main>
		</div>
	);
};
