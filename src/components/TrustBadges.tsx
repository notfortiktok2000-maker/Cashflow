import React from 'react';
import { TRUST_BADGES } from '../config/offers';

export const TrustBadges: React.FC = () => {
  return (
    <div className="pt-4 border-t border-stone-200">
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
        Garanties de commande au Maroc
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {TRUST_BADGES.map((badge, idx) => (
          <div
            key={badge.title}
            className="p-3 rounded-lg bg-white border border-stone-200 flex flex-col justify-start"
          >
            <div className="flex items-center gap-2 mb-1">
              {idx === 0 && (
                <svg className="w-4 h-4 text-emerald-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
              {idx === 1 && (
                <svg className="w-4 h-4 text-[#1E293B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {idx === 2 && (
                <svg className="w-4 h-4 text-[#1E293B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {idx === 3 && (
                <svg className="w-4 h-4 text-[#1E293B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
              <span className="text-xs font-bold text-stone-900 leading-tight">
                {badge.title}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              {badge.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
