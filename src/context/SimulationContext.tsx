import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type MachineStatus = 'Running' | 'Idle' | 'Breakdown';
export type SkillLevel = 1 | 2 | 3;

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  partsProduced: number;
  requiredLevel: SkillLevel;
  currentOperatorId: string | null;
  lastAnomaly?: string;
}

export interface Operator {
  id: string;
  name: string;
  level: SkillLevel;
  certifications: string[];
}

export interface SystemAlert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: Date;
}

export interface ProductionOrder {
  id: string;
  product: string;
  target: number;
  current: number;
  deadline: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
}

interface SimulationContextType {
  machines: Machine[];
  operators: Operator[];
  alerts: SystemAlert[];
  orders: ProductionOrder[];
  currentUser: Operator | null;
  login: (operatorId: string, machineId: string) => { success: boolean; message: string };
  logout: (machineId: string) => void;
  addAlert: (message: string, type: SystemAlert['type']) => void;
  addOrder: (order: Omit<ProductionOrder, 'current'>) => void;
}

const INITIAL_OPERATORS: Operator[] = [
  { id: 'op-01', name: 'Mohit', level: 3, certifications: ['CNC-Expert', 'Safety-L3'] },
  { id: 'op-02', name: 'Rahul', level: 1, certifications: ['Basic-Lathe'] },
  { id: 'op-03', name: 'Sneha', level: 2, certifications: ['Assembly-Advanced'] },
  { id: 'op-04', name: 'Anita', level: 2, certifications: ['Robotics-Basic'] },
];

const INITIAL_MACHINES: Machine[] = [
  { id: 'mc-01', name: 'CNC Milling-01', status: 'Running', partsProduced: 1240, requiredLevel: 2, currentOperatorId: 'op-01' },
  { id: 'mc-02', name: 'Lathe-02', status: 'Idle', partsProduced: 850, requiredLevel: 1, currentOperatorId: null },
  { id: 'mc-03', name: 'Robotic Arm-03', status: 'Running', partsProduced: 3200, requiredLevel: 3, currentOperatorId: 'op-03' },
  { id: 'mc-04', name: 'Assembly Line-04', status: 'Breakdown', partsProduced: 210, requiredLevel: 2, currentOperatorId: null },
];

const INITIAL_ORDERS: ProductionOrder[] = [
  { id: 'PO-901', product: 'Turbine Blade X-1', target: 500, current: 320, deadline: '2026-04-26', status: 'In-Progress' },
  { id: 'PO-902', product: 'Piston Head P-2', target: 1000, current: 850, deadline: '2026-04-25', status: 'In-Progress' },
  { id: 'PO-903', product: 'Cooling Fin C-3', target: 200, current: 0, deadline: '2026-04-28', status: 'Pending' },
];

const INITIAL_ALERTS: SystemAlert[] = [
  { id: 'a1', message: 'Warning: M/C-05 Vibration Anomaly Detected', type: 'warning', timestamp: new Date(Date.now() - 500000) },
  { id: 'a2', message: 'Alert: Mohit (M/C-02) High Defect Rate - Retraining Recommended', type: 'error', timestamp: new Date(Date.now() - 1200000) },
  { id: 'a3', message: 'Log: M/C-01 Spindle Temperature reaching threshold', type: 'info', timestamp: new Date(Date.now() - 1800000) },
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [machines, setMachines] = useState<Machine[]>(INITIAL_MACHINES);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [orders, setOrders] = useState<ProductionOrder[]>(INITIAL_ORDERS);
  const [currentUser, setCurrentUser] = useState<Operator | null>(null);

  const addAlert = useCallback((message: string, type: SystemAlert['type']) => {
    const newAlert: SystemAlert = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date(),
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 50));
  }, []);

  const addOrder = (order: Omit<ProductionOrder, 'current'>) => {
    setOrders(prev => [...prev, { ...order, current: 0 }]);
    addAlert(`New Production Order queued: ${order.product}`, 'info');
  };

  const login = (operatorId: string, machineId: string) => {
    const operator = INITIAL_OPERATORS.find(o => o.id === operatorId);
    const machine = machines.find(m => m.id === machineId);

    if (!operator || !machine) return { success: false, message: 'Invalid Selection' };

    if (operator.level < machine.requiredLevel) {
      addAlert(`Access Denied: ${operator.name} (L${operator.level}) attempted to unlock ${machine.name} (Requires L${machine.requiredLevel})`, 'error');
      return { success: false, message: `Access Denied: Skill Level Insufficient (Required: L${machine.requiredLevel})` };
    }

    setMachines(prev => prev.map(m => 
      m.id === machineId 
        ? { ...m, status: 'Running', currentOperatorId: operatorId } 
        : m
    ));
    
    addAlert(`${operator.name} unlocked ${machine.name}`, 'info');
    return { success: true, message: 'Machine Unlocked & Running' };
  };

  const logout = (machineId: string) => {
    setMachines(prev => prev.map(m => 
      m.id === machineId 
        ? { ...m, status: 'Idle', currentOperatorId: null } 
        : m
    ));
  };

  // Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'Running') {
          return { ...m, partsProduced: m.partsProduced + Math.floor(Math.random() * 3) + 1 };
        }
        return m;
      }));
      
      // Update orders based on production
      setOrders(prev => prev.map(order => {
        if (order.status === 'In-Progress') {
           const inc = Math.random() > 0.7 ? 1 : 0;
           return { ...order, current: Math.min(order.target, order.current + inc) };
        }
        return order;
      }));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Random events logic
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * machines.length);
      const targetMachine = machines[randomIndex];

      if (targetMachine.status === 'Running') {
        const eventRoll = Math.random();
        if (eventRoll > 0.85) {
          const newStatus: MachineStatus = Math.random() > 0.5 ? 'Idle' : 'Breakdown';
          setMachines(prev => prev.map((m, i) => i === randomIndex ? { ...m, status: newStatus } : m));
          
          if (newStatus === 'Breakdown') {
            addAlert(`Critical Failure: ${targetMachine.name} has stopped unexpectedly!`, 'error');
          } else {
            addAlert(`${targetMachine.name} entered Idle mode`, 'warning');
          }
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [machines, addAlert]);

  return (
    <SimulationContext.Provider value={{
      machines,
      operators: INITIAL_OPERATORS,
      alerts,
      orders,
      currentUser,
      login,
      logout,
      addAlert,
      addOrder
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error('useSimulation must be used within SimulationProvider');
  return context;
};
