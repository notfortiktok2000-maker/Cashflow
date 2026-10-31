import React from 'react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface HeroProps {
  onSelectPackClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPackClick }) => {
  return (
    <section className="py-10 sm:py-16 md:py-20 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight text-balance">
              Les essentiels du quotidien, à prix malin.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Des packs de sous-vêtements pratiques pour renouveler votre tiroir sans vous ruiner.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onSelectPackClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#1E293B] hover:bg-slate-800 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E293B] cursor-pointer shadow-sm active:translate-y-px"
              >
                Choisir mon pack
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <ImagePlaceholder
              label="Collection Essentiels Homme"
              piecesCount={10}
              aspectRatio="product"
              className="shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
