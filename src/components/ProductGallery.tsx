import React, { useState, useEffect } from 'react';
import { OfferId } from '../config/offers';

interface ProductGalleryProps {
  activeOfferId: OfferId;
  onSelectOffer?: (id: OfferId) => void;
}

interface GallerySlide {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  accent: string;
  type: 'solo' | 'duo' | 'fabric' | 'package';
}

const SLIDES: GallerySlide[] = [
  {
    id: 'solo',
    title: 'Pack Solo — 10 Boxers Essentiels',
    badge: '10 Pièces · 199 DH',
    subtitle: 'Assortiment de 10 sous-vêtements (Noir, Gris, Bleu)',
    accent: '#334155',
    type: 'solo',
  },
  {
    id: 'duo',
    title: 'Pack Duo — 20 Boxers (2x10)',
    badge: '20 Pièces · 269 DH (Meilleure Offre)',
    subtitle: 'Double pack complet : 1 pour vous, 1 à offrir',
    accent: '#1E293B',
    type: 'duo',
  },
  {
    id: 'fabric',
    title: 'Coton Doux Respirant & Ceinture Confort',
    badge: 'Finitions Soignées',
    subtitle: 'Élastique souple sans frottement, maintien durable',
    accent: '#475569',
    type: 'fabric',
  },
  {
    id: 'package',
    title: 'Colis Discret & Expédition Rapide',
    badge: 'Livraison 24-48h',
    subtitle: 'Emballage opaque et protecteur partout au Maroc',
    accent: '#047857',
    type: 'package',
  },
];

export const ProductGallery: React.FC<ProductGalleryProps> = ({ activeOfferId }) => {
  const [activeIndex, setActiveIndex] = useState(activeOfferId === 'duo' ? 1 : 0);

  // Sync gallery view when user changes pack variant in the purchase module
  useEffect(() => {
    if (activeOfferId === 'solo' && activeIndex === 1) {
      setActiveIndex(0);
    } else if (activeOfferId === 'duo' && activeIndex === 0) {
      setActiveIndex(1);
    }
  }, [activeOfferId]);

  const currentSlide = SLIDES[activeIndex];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Main Feature Display Card */}
      <div className="relative w-full aspect-[4/3] rounded-lg bg-gradient-to-b from-[#F5F4F0] to-[#EBE9E2] border border-stone-200 overflow-hidden flex flex-col items-center justify-between p-6 sm:p-8 select-none shadow-xs">
        {/* Top Badges overlay */}
        <div className="w-full flex items-center justify-between gap-2 z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded shadow-xs border border-stone-200">
            {currentSlide.badge}
          </span>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            ✓ Livraison 0 DH
          </span>
        </div>

        {/* Central Graphic Composition */}
        <div className="my-auto flex flex-col items-center justify-center text-center">
          {currentSlide.type === 'solo' && (
            <div className="relative flex flex-col items-center">
              {/* Boxers Graphic Representation */}
              <div className="w-24 h-20 sm:w-28 sm:h-24 rounded-lg bg-[#1E293B] shadow-md border border-slate-700 flex flex-col justify-between p-2 text-white transform -rotate-2">
                <div className="h-2 w-full bg-slate-600 rounded-xs" />
                <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <span>ESSENTIELS</span>
                  <span>10x</span>
                </div>
              </div>
              <div className="w-24 h-20 sm:w-28 sm:h-24 -mt-16 ml-6 rounded-lg bg-stone-700 shadow-sm border border-stone-600 flex flex-col justify-between p-2 text-white transform rotate-3">
                <div className="h-2 w-full bg-stone-500 rounded-xs" />
                <span className="text-[9px] text-stone-300 font-mono text-right">PACK SOLO</span>
              </div>
              {/* Quantity indicator pill */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-semibold shadow-xs">
                <span>10 Boxers Inclus</span>
              </div>
            </div>
          )}

          {currentSlide.type === 'duo' && (
            <div className="relative flex items-center justify-center gap-3">
              {/* Bundle 1 */}
              <div className="w-20 h-22 sm:w-24 sm:h-24 rounded-lg bg-[#1E293B] shadow-md border border-slate-700 flex flex-col justify-between p-2 text-white">
                <div className="h-2 w-full bg-slate-600 rounded-xs" />
                <span className="text-[10px] text-slate-200 font-bold">PACK 1 (10x)</span>
                <span className="text-[9px] text-slate-400">Pour Vous</span>
              </div>
              {/* Plus icon */}
              <span className="text-xl font-bold text-stone-500">+</span>
              {/* Bundle 2 */}
              <div className="w-20 h-22 sm:w-24 sm:h-24 rounded-lg bg-[#0F172A] shadow-md border border-slate-800 flex flex-col justify-between p-2 text-white">
                <div className="h-2 w-full bg-slate-600 rounded-xs" />
                <span className="text-[10px] text-slate-200 font-bold">PACK 2 (10x)</span>
                <span className="text-[9px] text-emerald-400 font-medium">Pour Proche</span>
              </div>
            </div>
          )}

          {currentSlide.type === 'fabric' && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-stone-800 to-stone-600 border-2 border-white shadow-md flex items-center justify-center text-white">
                <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mt-3 text-xs font-semibold text-stone-800">
                Coton peigné doux & coutures renforcées
              </p>
            </div>
          )}

          {currentSlide.type === 'package' && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-20 rounded-md bg-stone-300 border border-stone-400 flex items-center justify-center text-stone-700 shadow-sm">
                <svg className="w-10 h-10 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="mt-3 text-xs font-semibold text-stone-800">
                Colis discret sans mention apparente
              </p>
            </div>
          )}
        </div>

        {/* Bottom caption bar */}
        <div className="w-full text-center z-10 pt-2 border-t border-stone-300/60">
          <h2 className="text-sm sm:text-base font-bold text-stone-900">
            {currentSlide.title}
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            {currentSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Thumbnails row */}
      <div className="grid grid-cols-4 gap-2">
        {SLIDES.map((slide, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#1E293B] ring-2 ring-[#1E293B]/20 bg-white shadow-xs'
                  : 'border-stone-200 bg-[#F9F8F5] hover:bg-white text-stone-600'
              }`}
            >
              <span className="block text-[11px] font-bold truncate text-stone-900">
                {slide.type === 'solo' ? 'Pack Solo (10)' : slide.type === 'duo' ? 'Pack Duo (20)' : slide.type === 'fabric' ? 'Matière' : 'Livraison'}
              </span>
              <span className="block text-[10px] text-stone-500 truncate">
                {slide.type === 'solo'
                  ? '199 DH'
                  : slide.type === 'duo'
                  ? '269 DH'
                  : slide.type === 'fabric'
                  ? 'Confort'
                  : '24-48h'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
