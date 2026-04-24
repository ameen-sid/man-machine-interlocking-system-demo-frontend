import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  Box
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const MOCK_HISTORICAL = [
  { time: '08:00', rate: 45 },
  { time: '09:00', rate: 52 },
  { time: '10:00', rate: 48 },
  { time: '11:00', rate: 61 },
  { time: '12:00', rate: 55 },
  { time: '13:00', rate: 67 },
  { time: '14:00', rate: 72 },
];

export const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useSimulation();
  const order = orders.find(o => o.id === id);

  if (!order) return <div className="p-8 text-white uppercase font-black">Order Not Found</div>;

  const progress = (order.current / order.target) * 100;

  return (
    <div className="space-y-8 pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4" /> Back to planning
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
         <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-industrial-accent text-black text-[10px] font-black uppercase rounded">ACTIVE BATCH</span>
               <span className="text-gray-500 font-mono text-xs">{order.id}</span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">{order.product}</h2>
         </div>
         <div className="flex gap-4">
            <div className="text-right">
               <p className="text-[10px] font-bold text-gray-500 uppercase">Target fulfillment</p>
               <p className="text-2xl font-mono font-bold text-industrial-accent">{order.target} Units</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Production Rate (Units/Hr)</h3>
                  <TrendingUp className="w-4 h-4 text-industrial-accent" />
               </div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={MOCK_HISTORICAL}>
                        <defs>
                           <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FCA311" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#FCA311" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Area type="monotone" dataKey="rate" stroke="#FCA311" fill="url(#colorRate)" strokeWidth={3} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                     <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Estimated Completion</p>
                     <p className="font-mono text-sm">Tomorrow, 14:00</p>
                  </div>
               </div>
               <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                     <Box className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-gray-500 uppercase">Current Inventory</p>
                     <p className="font-mono text-sm">{order.current} Finished Units</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-white/5 text-center space-y-6">
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest text-left">Total Progress</p>
                <div className="relative w-40 h-40 mx-auto">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="rgba(252,163,17,0.05)" strokeWidth="12" fill="transparent" />
                      <circle 
                        cx="80" cy="80" r="70" 
                        stroke="#FCA311" strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray={440} 
                        strokeDashoffset={440 - (440 * progress) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black font-mono">{Math.round(progress)}%</span>
                      <span className="text-[9px] text-gray-500 uppercase">FULFILLED</span>
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-xs font-bold">{order.current} of {order.target} Units</p>
                   <p className="text-[10px] text-gray-500 uppercase">DEADLINE: {order.deadline}</p>
                </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/5 space-y-4">
               <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Quality Metrics</h4>
               <div className="space-y-3">
                  {[
                     { label: 'Defect Rate', val: '0.2%', status: 'optimal' },
                     { label: 'Tolerance Sync', val: '99.8%', status: 'optimal' },
                     { label: 'Material Yield', val: '94.2%', status: 'warning' },
                  ].map(m => (
                     <div key={m.label} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase font-bold text-gray-400">{m.label}</span>
                        <span className={`font-mono text-xs ${m.status === 'optimal' ? 'text-green-500' : 'text-industrial-accent'}`}>{m.val}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
