import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Award, Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const DUMMY_OPERATORS = [
  { id: 'OP-01', name: 'John Doe', level: 3, certifications: ['CNC Milling', 'Safety-L3', 'Maintenance'] },
  { id: 'OP-02', name: 'Jane Smith', level: 2, certifications: ['Quality Control', 'Assembly-L2'] },
  { id: 'OP-03', name: 'Mike Ross', level: 1, certifications: ['Safety-L1', 'Manual Lathe'] },
  { id: 'OP-04', name: 'Sarah Connor', level: 3, certifications: ['Robotics Specialist', 'Cybernetics', 'PLC Programming'] },
  { id: 'OP-05', name: 'David Chen', level: 2, certifications: ['Electronics', 'PCB Soldering', 'ESD Safety'] }
];

export const SkillMapping: React.FC = () => {
  const operators = DUMMY_OPERATORS;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight">Skill <span className="text-industrial-accent">Mapping</span></h2>
        <p className="text-gray-500 text-sm font-mono uppercase">Workforce Competency & Certification Matrix</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operators.map((op) => (
          <motion.div 
            key={op.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-industrial-gray rounded-full border border-white/10 flex items-center justify-center font-bold text-industrial-accent text-sm sm:text-base">
                  {op.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">{op.name}</h3>
                  <div className="px-2 py-0.5 bg-industrial-accent/10 border border-industrial-accent/20 rounded text-[9px] font-black uppercase text-industrial-accent inline-block">
                    Level {op.level} Operator
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < op.level ? 'text-industrial-accent fill-industrial-accent' : 'text-gray-800'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-3 h-3" />
                Active Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {op.certifications.map(cert => (
                  <span key={cert} className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px] text-gray-300 font-mono">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
               <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                     <p className="text-[10px] text-gray-500 uppercase font-bold">Safety</p>
                     <div className="h-1 bg-green-500/20 rounded-full mt-2">
                        <div className="h-full bg-green-500 w-[95%] rounded-full" />
                     </div>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] text-gray-500 uppercase font-bold">Quality</p>
                     <div className="h-1 bg-industrial-accent/20 rounded-full mt-2">
                        <div className="h-full bg-industrial-accent w-[80%] rounded-full" />
                     </div>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] text-gray-500 uppercase font-bold">Speed</p>
                     <div className="h-1 bg-blue-500/20 rounded-full mt-2">
                        <div className="h-full bg-blue-500 w-[70%] rounded-full" />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-4 sm:p-8 rounded-2xl border border-white/5 space-y-6">
         <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-industrial-accent" />
            Skill Gap Analysis
         </h3>
         <div className="space-y-4">
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <span className="text-xs font-bold uppercase tracking-wide">CNC Multi-Axis Protocol</span>
               <span className="px-2 py-1 bg-red-500 text-black font-black text-[9px] rounded uppercase w-fit">Critical Gap</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-50">
               <span className="text-xs font-bold uppercase tracking-wide">Basic Lathe Operation</span>
               <span className="px-2 py-1 bg-green-500/20 text-green-500 font-black text-[9px] rounded uppercase w-fit">Surplus</span>
            </div>
         </div>
      </div>
    </div>
  );
};
