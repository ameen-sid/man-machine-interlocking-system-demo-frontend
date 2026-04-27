import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SimulationProvider } from "./context/SimulationContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { InterlockSimulator } from "./pages/InterlockSimulator";
import { FactoryMonitor } from "./pages/FactoryMonitor";
import { AnalyticsDashboard } from "./pages/AnalyticsDashboard";
import { PredictiveMaintenance } from "./pages/PredictiveMaintenance";
import { SkillMapping } from "./pages/SkillMapping";
import { BreakdownAnalysis } from "./pages/BreakdownAnalysis";
import { OperatorAttendance } from "./pages/OperatorAttendance";
import { ProductionPlan } from "./pages/ProductionPlan";
import { OrderDetails } from "./pages/OrderDetails";
import { ProductionPipeline } from "./pages/ProductionPipeline";
import { ProductionVault } from "./pages/ProductionVault";
import { ShiftReport } from "./pages/ShiftReport";
import { FuturePlanning } from "./pages/FuturePlanning";
import { OperatorManagement } from "./pages/OperatorManagement";
import { UserManagement } from "./pages/UserManagement";
import { StationManagement } from "./pages/StationManagement";
import { OperatorLogs } from "./pages/OperatorLogs";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
	return (
		<AuthProvider>
			<SimulationProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginPage />} />

						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Layout />
								</ProtectedRoute>
							}>
							<Route index element={<InterlockSimulator />} />
							<Route
								path="monitor"
								element={<FactoryMonitor />}
							/>
							<Route
								path="analytics"
								element={<AnalyticsDashboard />}
							/>
							<Route
								path="maintenance"
								element={<PredictiveMaintenance />}
							/>
							<Route path="skills" element={<SkillMapping />} />
							<Route
								path="breakdown"
								element={<BreakdownAnalysis />}
							/>
							<Route
								path="attendance"
								element={<OperatorAttendance />}
							/>
							<Route
								path="prod-plan"
								element={<ProductionPlan />}
							/>
							<Route
								path="prod-plan/:id"
								element={<OrderDetails />}
							/>
							<Route
								path="prod-plan/pipeline"
								element={<ProductionPipeline />}
							/>
							<Route
								path="prod-plan/vault"
								element={<ProductionVault />}
							/>
							<Route
								path="shift-report"
								element={<ShiftReport />}
							/>
							<Route path="future" element={<FuturePlanning />} />
							<Route
								path="operators"
								element={<OperatorManagement />}
							/>
							<Route
								path="operator-logs/:id"
								element={<OperatorLogs />}
							/>
							<Route path="users" element={<UserManagement />} />
							<Route
								path="stations"
								element={<StationManagement />}
							/>
						</Route>

						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</SimulationProvider>
		</AuthProvider>
	);
}

export default App;
