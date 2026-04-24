import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { ClipboardList, Calendar, ChevronRight, Play, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export const ProductionPlan: React.FC = () => {
  const { orders, addOrder } = useSimulation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNewOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addOrder({
      id: `PO-${Math.floor(Math.random() * 900) + 100}`,
      product: formData.get('product') as string,
      target: parseInt(formData.get('target') as string),
      deadline: formData.get('deadline') as string,
      status: 'Pending'
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Production <span className="text-industrial-accent">Plan</span></h2>
          <p className="text-gray-500 text-[10px] sm:text-sm font-mono uppercase">Manufacturing Order Queue & Lead-Time Analysis</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-industrial-accent text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(252,163,17,0.3)] w-fit"
        >
           <Calendar className="w-3 h-3" />
           New Order
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order, i) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 sm:p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex-1 w-full space-y-4">
               <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold">{order.product}</h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ORDER-ID: {order.id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${order.status === 'In-Progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-gray-500/10 text-gray-500 border border-white/10'}`}>
                    {order.status}
                  </span>
               </div>

               <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                     <span>Fulfillment Progress</span>
                     <span>{order.current} / {order.target} Units</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${(order.current / order.target) * 100}%` }}
                       className={`h-full ${order.status === 'In-Progress' ? 'bg-industrial-accent' : 'bg-gray-700'}`}
                     />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between md:justify-start gap-4 sm:gap-8 px-4 sm:px-8 border-t md:border-t-0 md:border-l border-white/5 w-full md:w-auto pt-4 md:pt-0">
               <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Deadline</p>
                  <p className="font-mono text-[10px] sm:text-xs mt-1 text-white">{order.deadline}</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Est. Release</p>
                  <p className="font-mono text-[10px] sm:text-xs mt-1 text-industrial-accent">IN 18H</p>
               </div>
               <Link to={`/prod-plan/${order.id}`} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-industrial-accent hover:text-black transition-all">
                  <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
         <div 
           onClick={() => navigate('/prod-plan/pipeline')}
           className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-all"
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-black transition-colors">
                  <Play className="w-5 h-5 text-indigo-500" />
               </div>
               <div>
                  <p className="text-xs font-bold uppercase tracking-wide">Next in Pipeline</p>
                  <p className="text-[10px] text-gray-500 font-mono">Structural Frame L-4</p>
               </div>
            </div>
            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">View Queue</span>
         </div>

         <div 
           onClick={() => navigate('/prod-plan/vault')}
           className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-all opacity-80"
         >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-500/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <ClipboardList className="w-5 h-5 text-gray-500" />
               </div>
               <div>
                  <p className="text-xs font-bold uppercase tracking-wide">Historical Snapshot</p>
                  <p className="text-[10px] text-gray-500 font-mono">Archive Month: MAR-2026</p>
               </div>
            </div>
            <button className="text-[10px] font-bold uppercase underline underline-offset-4 tracking-widest leading-none">Browse Vault</button>
         </div>
      </div>

      {/* New Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative w-full max-w-lg bg-industrial-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
           >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                 <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg uppercase tracking-tight">New <span className="text-industrial-accent">Production Order</span></h3>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-white">
                    <XCircle className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleNewOrder} className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Product Component Name</label>
                    <input name="product" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-industrial-accent transition-colors" placeholder="e.g. Turbine Rotor v4" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Target Units</label>
                       <input name="target" type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-industrial-accent transition-colors" placeholder="1000" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Deadline</label>
                       <input name="deadline" type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-industrial-accent transition-colors" />
                    </div>
                 </div>
                 <button type="submit" className="w-full py-4 bg-industrial-accent text-black font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(252,163,17,0.3)] hover:shadow-[0_0_30px_rgba(252,163,17,0.5)] transition-all">
                    Initialize Batch
                 </button>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};
