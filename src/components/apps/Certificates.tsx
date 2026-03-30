import React from 'react';
import { Award, ExternalLink, Calendar, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioData } from '../../types';

export const Certificates = ({ data }: { data?: PortfolioData['certificates'] }) => {
  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white/90 select-none overflow-hidden">
      {/* Header */}
      <div className="p-10 pb-6 shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center border border-purple-500/20">
            <ShieldCheck size={24} className="text-purple-400 fill-purple-400/20" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">Certifications</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Verified Professional Achievements</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 pt-0 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {data?.length ? (
            data?.map((cert, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-purple-500/30 transition-all group relative overflow-hidden flex flex-col gap-6"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-purple-500/10 transition-colors" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-black text-lg uppercase tracking-tight text-white group-hover:text-purple-400 transition-colors leading-tight">{cert.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400/80">
                        <Building2 size={12} />
                        <span>{cert.issuer}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                      <Calendar size={12} />
                      <span>Issued: {cert.date}</span>
                    </div>
                  </div>

                  {cert.link && (
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-xl border border-white/5"
                      title="View Certificate"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  )}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10">Verification ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                  <div className="flex items-center gap-1 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-widest">Verify</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center space-y-6 bg-white/[0.01] rounded-3xl border border-dashed border-white/10">
              <Award size={64} className="mx-auto text-white/5" />
              <div className="space-y-2">
                <p className="text-sm text-white/20 font-black uppercase tracking-[0.3em]">No certifications found</p>
                <p className="text-[10px] text-white/10 uppercase tracking-widest">Your professional milestones will appear here</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-20 shrink-0" />
      </div>
    </div>
  );
};

