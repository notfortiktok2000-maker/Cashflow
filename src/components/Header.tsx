import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_NAME } from '../config/offers';

export const Header: React.FC = () => {
  const location = useLocation();
  const isTracker = location.pathname === '/suivi';

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200">
      {/* Top micro announcement bar */}
      <div className="bg-[#1E293B] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        🚚 Livraison 24-48h Gratuite partout au Maroc · Paiement en espèces à la livraison
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Brand wordmark */}
        <Link
          to="/"
          className="text-base sm:text-lg font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E293B] rounded-sm"
        >
          {BRAND_NAME}
        </Link>

        {/* Action Link: Suivre ma commande */}
        <div className="flex items-center gap-3">
          <Link
            to={isTracker ? '/' : '/suivi'}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-950 px-2.5 py-1.5 rounded-md hover:bg-stone-100 transition-colors border border-stone-300"
          >
            {isTracker ? (
              <>
                <span aria-hidden="true">←</span>
                <span>Retour à la boutique</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-stone-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span>Suivre ma commande</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
