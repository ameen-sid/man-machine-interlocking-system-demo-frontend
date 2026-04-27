import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
	ShieldCheck,
	LayoutDashboard,
	Activity,
	AlertTriangle,
	Factory,
	LogOut,
	Users,
	BarChart3,
	ClipboardList,
	FileText,
	LineChart,
	UserCheck,
	X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../context/AuthContext";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const navCategories = [
	{
		label: "Operations",
		items: [
			{
				icon: LayoutDashboard,
				label: "Factory Monitor",
				path: "/monitor",
			},
			{ icon: ShieldCheck, label: "Interlock Sim", path: "/" },
			{
				icon: ClipboardList,
				label: "Production Plan",
				path: "/prod-plan",
			},
		],
	},
	{
		label: "Workforce",
		items: [
			{ icon: UserCheck, label: "Skill Mapping", path: "/skills" },
			{ icon: Users, label: "Operator Management", path: "/operators" },
			{ icon: Users, label: "Attendance", path: "/attendance" },
		],
	},
	{
		label: "Analytics",
		items: [
			{ icon: Activity, label: "OEE Analytics", path: "/analytics" },
			{
				icon: BarChart3,
				label: "Breakdown Analysis",
				path: "/breakdown",
			},
		],
	},
	{
		label: "Reports & Planning",
		items: [
			{
				icon: AlertTriangle,
				label: "Maintenance Log",
				path: "/maintenance",
			},
			{ icon: LineChart, label: "Future Planning", path: "/future" },
			{ icon: FileText, label: "Shift Report", path: "/shift-report" },
		],
	},
	{
		label: "System",
		items: [
			{ icon: Factory, label: "Station Management", path: "/stations" },
			{ icon: ShieldCheck, label: "User Management", path: "/users" },
		],
	},
];

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const sidebarClasses = cn(
		"fixed inset-y-0 left-0 z-50 w-64 bg-industrial-black border-r border-white/10 flex flex-col transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto h-screen",
		isOpen ? "translate-x-0" : "-translate-x-full",
	);

	return (
		<>
			{/* Mobile Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
					onClick={onClose}
				/>
			)}
			<aside className={sidebarClasses}>
				<div className="p-6 flex items-center justify-between border-b border-white/5 lg:border-none">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-industrial-accent flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(252,163,17,0.4)]">
							<Factory className="text-black w-6 h-6" />
						</div>
						<h1 className="font-bold text-lg tracking-tighter uppercase">
							MMI{" "}
							<span className="text-industrial-accent">
								System
							</span>
						</h1>
					</div>
					<button
						onClick={onClose}
						className="lg:hidden p-2 text-gray-500 hover:text-white">
						<X className="w-5 h-5" />
					</button>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
					{navCategories.map((category) => (
						<div key={category.label} className="space-y-2">
							<h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">
								{category.label}
							</h3>
							<div className="space-y-1">
								{category.items.map((item) => (
									<NavLink
										key={item.path}
										to={item.path}
										className={({ isActive }) =>
											cn(
												"flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
												isActive
													? "bg-industrial-accent text-black font-semibold shadow-[0_0_20px_rgba(252,163,17,0.2)]"
													: "text-gray-400 hover:text-white hover:bg-white/5",
											)
										}>
										<item.icon
											className={cn(
												"w-5 h-5",
												"group-hover:scale-110 transition-transform",
											)}
										/>
										<span className="text-sm">
											{item.label}
										</span>
									</NavLink>
								))}
							</div>
						</div>
					))}
				</nav>

				<div className="p-4 border-t border-white/5 mt-auto">
					<div className="bg-industrial-dark/60 p-4 rounded-xl border border-white/5">
						<div className="flex items-center gap-3 mb-3">
							<div className="w-8 h-8 rounded-full bg-industrial-gray border border-white/10 flex items-center justify-center text-xs">
								AD
							</div>
							<div>
								<p className="text-xs font-medium text-white">
									System Admin
								</p>
								<p className="text-[10px] text-gray-500">
									Root Access
								</p>
							</div>
						</div>
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors w-full">
							<LogOut className="w-3 h-3" />
							Logout Securely
						</button>
					</div>
				</div>
			</aside>
		</>
	);
};
