import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Plus, Power, Trash2, Edit2, X, Check, AlertCircle } from 'lucide-react';
import { api } from '../utils/api';

interface Station {
  id: string;
  name: string;
  status: 'Running' | 'Idle' | 'Breakdown';
  required_level: number;
  current_operator_id: string | null;
}

export const StationManagement: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [formData, setFormData] = useState({ id: '', name: '', required_level: 1, status: 'Idle' as Station['status'] });

  const fetchStations = async () => {
    try {
      setLoading(true);
      const data = await api.get('/stations');
      setStations(data);
    } catch (error) {
      console.error('Failed to fetch stations', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStation) {
        await api.put(`/stations/${editingStation.id}`, formData);
      } else {
        await api.post('/stations', formData);
      }
      setIsModalOpen(false);
      setEditingStation(null);
      setFormData({ id: '', name: '', required_level: 1, status: 'Idle' });
      fetchStations();
    } catch (error) {
      alert('Operation failed. Check if ID is unique.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this station? This may affect historical logs.')) return;
    try {
      await api.delete(`/stations/${id}`);
      fetchStations();
    } catch (error) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Station Management</h1>
          <p className="text-slate-400 mt-1">Configure and monitor production stations</p>
        </div>
        <button 
          onClick={() => {
            setEditingStation(null);
            setFormData({ id: '', name: '', required_level: 1, status: 'Idle' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={20} />
          New Station
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-20 text-slate-500 animate-pulse uppercase tracking-[0.3em] text-xs">Scanning Factory Mesh Network...</div>
        ) : (
          stations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative group overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 blur-3xl opacity-20 transition-colors ${
                station.status === 'Running' ? 'bg-emerald-500' :
                station.status === 'Breakdown' ? 'bg-rose-500' : 'bg-amber-500'
              }`} />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-4 rounded-2xl ${
                  station.status === 'Running' ? 'bg-emerald-500/10 text-emerald-500' :
                  station.status === 'Breakdown' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  <Cpu size={32} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setEditingStation(station);
                      setFormData({ id: station.id, name: station.name, required_level: station.required_level, status: station.status });
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(station.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{station.name}</h3>
                  <p className="text-sm text-slate-500">ID: {station.id}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    station.status === 'Running' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' :
                    station.status === 'Breakdown' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]' : 
                    'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  }`} />
                  <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">{station.status}</span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-500">Required Skill Level</span>
                  <span className="text-white font-bold bg-slate-800 px-2 py-1 rounded-lg">L{station.required_level}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{editingStation ? 'Edit Station' : 'Provision New Station'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Station ID</label>
                <input 
                  required
                  disabled={!!editingStation}
                  placeholder="e.g. MC-05"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                  value={formData.id}
                  onChange={e => setFormData({...formData, id: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Station Name</label>
                <input 
                  required
                  placeholder="e.g. Laser Cutter Alpha"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Skill Level</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none"
                    value={formData.required_level}
                    onChange={e => setFormData({...formData, required_level: parseInt(e.target.value)})}
                  >
                    <option value={1}>L1 (Basic)</option>
                    <option value={2}>L2 (Intermediate)</option>
                    <option value={3}>L3 (Expert)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as Station['status']})}
                  >
                    <option value="Idle">Idle</option>
                    <option value="Running">Running</option>
                    <option value="Breakdown">Breakdown</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl mt-6 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                {editingStation ? 'Commit Changes' : 'Initialize Station'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
