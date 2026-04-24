import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Clock, 
  MapPin, 
  Search, 
  MoreHorizontal, 
  ArrowRightLeft, 
  FileSearch,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

export const OperatorAttendance: React.FC = () => {
  const { operators, machines } = useSimulation();
  const [activeActions, setActiveActions] = React.useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Operator <span className="text-industrial-accent">Attendance</span></h2>
          <p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">Workforce Presence & Station Dynamics</p>
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
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">On-Duty Population</p>
            <p className="text-3xl font-mono font-bold">14<span className="text-gray-600"> / 16</span></p>
         </div>
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Station Coverage</p>
            <p className="text-3xl font-mono font-bold">88%</p>
         </div>
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Average On-Station Time</p>
            <p className="text-3xl font-mono font-bold">6.2h</p>
         </div>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-x-auto">
         <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-white/5">
               <tr>
                  <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Operator Name</th>
                  <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Shift Status</th>
                  <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Clock-In Time</th>
                  <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Assigned Station</th>
                  <th className="p-4 font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               {operators.map((op, i) => {
                  const assignedMachine = machines.find(m => m.currentOperatorId === op.id);
                  return (
                     <motion.tr 
                       key={op.id}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: i * 0.05 }}
                       className="hover:bg-white/5 transition-colors group"
                     >
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold group-hover:bg-industrial-accent group-hover:text-black transition-colors">
                                 {op.name.charAt(0)}
                              </div>
                              <span className="font-bold">{op.name}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase border border-green-500/20">
                              Logged-In
                           </span>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2 text-gray-400 font-mono">
                              <Clock className="w-3 h-3 text-industrial-accent" />
                              08:14:22
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-industrial-accent" />
                              <span className="font-bold">{assignedMachine ? assignedMachine.name : 'FLOATING'}</span>
                           </div>
                        </td>
                        <td className="p-4 text-right relative">
                           <button 
                             onClick={() => setActiveActions(activeActions === op.id ? null : op.id)}
                             className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                           >
                              <MoreHorizontal className="w-4 h-4 text-gray-600 group-hover:text-white" />
                           </button>

                           {activeActions === op.id && (
                             <>
                               <div className="fixed inset-0 z-40" onClick={() => setActiveActions(null)} />
                               <div className="absolute right-4 top-12 w-48 bg-industrial-black border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl">
                                  <button onClick={() => setActiveActions(null)} className="w-full text-left p-3 text-[9px] font-black uppercase tracking-widest hover:bg-industrial-accent hover:text-black flex items-center gap-3 transition-colors border-b border-white/5">
                                     <UserPlus className="w-3 h-3" /> Assign Station
                                  </button>
                                  <button onClick={() => setActiveActions(null)} className="w-full text-left p-3 text-[9px] font-black uppercase tracking-widest hover:bg-industrial-accent hover:text-black flex items-center gap-3 transition-colors border-b border-white/5">
                                     <ArrowRightLeft className="w-3 h-3" /> Shift Swap
                                  </button>
                                  <button onClick={() => setActiveActions(null)} className="w-full text-left p-3 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center gap-3 transition-colors">
                                     <FileSearch className="w-3 h-3" /> Full Logs
                                  </button>
                               </div>
                             </>
                           )}
                        </td>
                     </motion.tr>
                  );
               })}
            </tbody>
          </table>
      </div>

      <div className="p-4 bg-industrial-accent/5 rounded-xl border border-industrial-accent/10 flex items-center justify-center gap-3">
         <span className="w-2 h-2 bg-industrial-accent rounded-full animate-ping" />
         <span className="text-[10px] font-black uppercase text-industrial-accent tracking-widest">
            Live Stream: Synchronizing Hand-Held RFID Terminal Logs...
         </span>
      </div>
    </div>
  );
};
