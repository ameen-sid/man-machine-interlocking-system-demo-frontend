import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const DUMMY_LOGS = [
  { date: '2026-04-01', station: 'CNC-01', login: '08:00', logout: '16:30', duration: '8.5h' },
  { date: '2026-04-02', station: 'CNC-01', login: '08:05', logout: '16:45', duration: '8.7h' },
  { date: '2026-04-03', station: 'LATHE-02', login: '07:55', logout: '16:00', duration: '8.1h' },
  { date: '2026-04-04', station: 'CNC-01', login: '08:10', logout: '17:00', duration: '8.8h' },
  { date: '2026-04-05', station: 'ROBOT-03', login: '08:00', logout: '16:30', duration: '8.5h' },
  { date: '2026-04-08', station: 'CNC-01', login: '08:00', logout: '16:30', duration: '8.5h' },
  { date: '2026-04-09', station: 'CNC-01', login: '08:00', logout: '16:30', duration: '8.5h' },
  { date: '2026-04-10', station: 'LATHE-02', login: '08:00', logout: '16:30', duration: '8.5h' },
];

const DAILY_HOURS = [
  { day: '01', hours: 8.5 },
  { day: '02', hours: 8.7 },
  { day: '03', hours: 8.1 },
  { day: '04', hours: 8.8 },
  { day: '05', hours: 8.5 },
  { day: '08', hours: 8.5 },
  { day: '09', hours: 8.5 },
  { day: '10', hours: 8.5 },
];

export const OperatorLogs: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { operators } = useSimulation();
  
  const operator = operators.find(o => o.id === id) || { name: 'Unknown Operator', id: id };

  return (
    <div className="space-y-8 p-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-industrial-accent hover:text-black transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Operator <span className="text-industrial-accent">Monthly Logs</span></h2>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono uppercase">
               <User className="w-3 h-3" /> {operator.name} ({operator.id})
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
           <Download className="w-3 h-3" /> Export PDF Report
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Working Days</p>
            <p className="text-3xl font-mono font-bold">18</p>
         </div>
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Hours</p>
            <p className="text-3xl font-mono font-bold">144.5h</p>
         </div>
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Avg. Shift Duration</p>
            <p className="text-3xl font-mono font-bold">8.02h</p>
         </div>
         <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency Score</p>
            <p className="text-3xl font-mono font-bold text-green-500">94%</p>
         </div>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-white/5 h-[250px]">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Daily Working Hours Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DAILY_HOURS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="day" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '8px' }}
              itemStyle={{ color: '#fca311' }}
            />
            <Bar dataKey="hours" fill="#fca311" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Date</th>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Station</th>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Clock-In</th>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Clock-Out</th>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest">Duration</th>
              <th className="p-4 font-black uppercase text-gray-400 tracking-widest text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {DUMMY_LOGS.map((log, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 font-mono">{log.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-industrial-accent" />
                    <span className="font-bold">{log.station}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{log.login}</td>
                <td className="p-4 text-gray-400">{log.logout}</td>
                <td className="p-4 font-bold">{log.duration}</td>
                <td className="p-4 text-right">
                   <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase border border-green-500/20">
                      VERIFIED
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
         <AlertCircle className="w-4 h-4 text-blue-500" />
         <p className="text-[10px] text-blue-400 font-medium">
            This log displays data for the current month (April 2026). All records are cryptographically signed by the MMI Security Module.
         </p>
      </div>
    </div>
  );
};
