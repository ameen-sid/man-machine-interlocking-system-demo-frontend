import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Download, Filter, FileBarChart } from 'lucide-react';

const SHIFT_DATA = [
  { shift: 'Shift A (Morning)', output: 2450, target: 2500, quality: 98.2 },
  { shift: 'Shift B (Evening)', output: 2180, target: 2500, quality: 96.5 },
  { shift: 'Shift C (Night)', output: 1950, target: 2000, quality: 99.1 },
];

export const ShiftReport: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Shift <span className="text-industrial-accent">Reports</span></h2>
          <p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">Multi-Shift Yield & Quality Performance Logs</p>
        </div>
        <div className="flex gap-2 sm:gap-4">
           <button className="glass-card px-3 sm:px-4 py-2 rounded-lg border border-white/5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
              <Download className="w-3 h-3" />
              Export
           </button>
           <button className="glass-card px-3 sm:px-4 py-2 rounded-lg border border-white/5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto justify-center">
              <Filter className="w-3 h-3" />
              Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {SHIFT_DATA.map((s) => (
           <div key={s.shift} className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-start">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.shift}</h3>
                 <span className={`text-[10px] font-black ${s.output >= s.target * 0.95 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {(s.output/s.target * 100).toFixed(1)}% TARGET
                 </span>
              </div>
              <div className="space-y-1">
                 <p className="text-3xl font-mono font-bold">{s.output.toLocaleString()} <span className="text-sm text-gray-500">units</span></p>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${s.output >= s.target ? 'bg-green-500' : 'bg-industrial-accent'}`} 
                      style={{ width: `${Math.min(100, (s.output/s.target * 100))}%` }} 
                    />
                 </div>
              </div>
              <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-gray-500 uppercase">
                 <span>Avg. Quality Score</span>
                 <span className="text-white">{s.quality}%</span>
              </div>
           </div>
         ))}
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/5">
         <div className="flex items-center gap-3 mb-8">
            <FileBarChart className="w-5 h-5 text-industrial-accent" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Yield Variance vs Target</h3>
         </div>
         <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={SHIFT_DATA}>
                  <XAxis dataKey="shift" axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#4B5563', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', color: '#9CA3AF' }} />
                  <Bar dataKey="output" name="Actual Yield" fill="#FCA311" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target Objective" fill="rgba(252,163,17,0.1)" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="p-8 glass-card rounded-2xl border border-white/5 space-y-6">
         <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Shift Highlights & Comments</h3>
         <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border-l-4 border-industrial-accent">
               <p className="text-xs font-bold mb-1">High Throughput on CNC-01 (Shift A)</p>
               <p className="text-[10px] text-gray-500 italic">"Achieved 102% of target due to optimized tooling sequence." - Supervisor A</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border-l-4 border-red-500">
               <p className="text-xs font-bold mb-1">Power Fluctuations (Shift B)</p>
               <p className="text-[10px] text-gray-500 italic">"Minor lag in Line-04 attributed to grid instability at 19:40." - Supervisor B</p>
            </div>
         </div>
      </div>
    </div>
  );
};
