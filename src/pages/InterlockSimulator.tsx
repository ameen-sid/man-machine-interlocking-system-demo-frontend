import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Scan, 
  Lock, 
  Unlock, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InterlockSimulator: React.FC = () => {
  const { operators, machines, login } = useSimulation();
  
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [authStatus, setAuthStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = () => {
    if (!selectedOperator || !selectedMachine) {
      setAuthStatus({ type: 'error', message: 'Please select operator and machine' });
      return;
    }

    setIsScanning(true);
    setAuthStatus({ type: 'idle', message: '' });

    // Simulate Delay
    setTimeout(() => {
      setIsScanning(false);
      const result = login(selectedOperator, selectedMachine);
      if (result.success) {
        setAuthStatus({ type: 'success', message: result.message });
      } else {
        setAuthStatus({ type: 'error', message: result.message });
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 min-h-full flex flex-col items-center py-8 md:justify-center md:py-0 md:-mt-16">
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
          Interlock <span className="text-industrial-accent underline decoration-industrial-accent/30 underline-offset-8">Unit-01</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] md:text-sm">HMI PROTOCOL: SECURE-RFID v4.2</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Input Panel */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock className="w-24 h-24" />
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Operator</label>
              <div className="relative">
                <select 
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(e.target.value)}
                  className="w-full bg-industrial-gray border border-white/10 p-3 rounded-lg text-sm focus:outline-none focus:border-industrial-accent transition-colors appearance-none"
                >
                  <option value="">Choose Operator...</option>
                  {operators.map(op => (
                    <option key={op.id} value={op.id}>{op.name} - Level {op.level}</option>
                  ))}
                </select>
                <UserCheck className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Target Equipment</label>
              <div className="relative">
                <select 
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full bg-industrial-gray border border-white/10 p-3 rounded-lg text-sm focus:outline-none focus:border-industrial-accent transition-colors appearance-none"
                >
                  <option value="">Identify Machine...</option>
                  {machines.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (Requires L{m.requiredLevel})</option>
                  ))}
                </select>
                <Zap className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSimulateScan}
            disabled={isScanning}
            className={`w-full py-4 bg-industrial-accent text-black font-black uppercase text-sm tracking-widest rounded-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${!isScanning ? 'shadow-[0_0_30px_rgba(252,163,17,0.3)] hover:shadow-[0_0_50px_rgba(252,163,17,0.5)]' : ''}`}
          >
            {isScanning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Scan className="w-5 h-5" />
              </motion.div>
            ) : <Scan className="w-5 h-5" />}
            {isScanning ? 'Reading RFID...' : 'Simulate RFID Scan'}
          </button>
        </div>

        {/* Status Display */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <div className="w-20 h-20 border-4 border-industrial-accent/20 border-t-industrial-accent rounded-full animate-spin mx-auto" />
                <p className="text-industrial-accent font-mono animate-pulse">ENCRYPTED AUTHENTICATION IN PROGRESS...</p>
              </motion.div>
            ) : authStatus.type === 'idle' ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                   <Lock className="w-10 h-10 text-gray-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Awaiting Scan</h3>
                  <p className="text-gray-500 text-sm max-w-[200px]">Please select operator credentials and target hardware to initiate.</p>
                </div>
              </motion.div>
            ) : authStatus.type === 'success' ? (
              <motion.div 
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                   <Unlock className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-green-400">ACCESS GRANTED</h3>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                     <p className="text-green-500 text-xs font-mono">{authStatus.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SAFETY INTERLOCK RELEASED</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="error"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                   <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase text-red-400">ACCESS DENIED</h3>
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                     <p className="text-red-500 text-xs font-mono">{authStatus.message}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-loose">
                  Incident logged in master registry.<br/>Supervisory intervention required.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-[10px] font-mono text-gray-600">
         <div className="flex items-center gap-2 border-r border-white/5 pr-8">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            RFID READER ONLINE
         </div>
         <div className="flex items-center gap-2 border-r border-white/5 pr-8">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            CORE SERVER SYNC
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full" />
            PLC HANDSHAKE READY
         </div>
      </div>
    </div>
  );
};
