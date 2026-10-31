import React from 'react';
import { Offer, OFFER_LIST } from '../config/offers';
import { ImagePlaceholder } from './ImagePlaceholder';

interface OfferCardsProps {
  onChooseOffer: (offer: Offer) => void;
}

export const OfferCards: React.FC<OfferCardsProps> = ({ onChooseOffer }) => {
  return (
    <section id="offres" className="py-12 sm:py-16 md:py-20 border-b border-stone-200 scroll-mt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Choisissez votre pack
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Sélectionnez votre offre. Livraison gratuite partout au Maroc et règlement à la réception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {OFFER_LIST.map((offer) => {
            const isDuo = offer.id === 'duo';

            return (
              <div
                key={offer.id}
                className={`flex flex-col justify-between rounded-lg bg-white p-6 sm:p-7 border transition-shadow ${
                  isDuo
                    ? 'border-[#1E293B] ring-1 ring-[#1E293B] shadow-sm'
                    : 'border-stone-200 shadow-xs'
                }`}
              >
                <div>
                  {/* Top bar with count & subtle badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 min-h-[26px]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {offer.piecesLabel}
                    </span>
                    {offer.badge ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#1E293B] text-white">
                        {offer.badge}
                      </span>
                    ) : (
                      <span className="text-xs text-stone-400">Pack essentiel</span>
                    )}
                  </div>

                  {/* Clean product placeholder */}
                  <ImagePlaceholder
                    label={offer.imageLabel}
                    piecesCount={offer.pieces}
                    aspectRatio="product"
                  />

                  {/* Offer Info */}
                  <div className="mt-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                        {offer.name}
                      </h3>
                      <div className="text-right">
                        <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                          {offer.price} DH
                        </span>
                      </div>
                    </div>

                    <p className="mt-1 text-sm font-medium text-stone-700">
                      {offer.piecesLabel}
                    </p>

                    {offer.subtitle && (
                      <p className="mt-2 text-sm text-stone-600 font-medium">
                        {offer.subtitle}
                      </p>
                    )}

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center text-sm font-medium text-stone-700">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2 shrink-0" />
                      <span>{offer.deliveryText}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onChooseOffer(offer)}
                    className={`w-full py-3.5 px-6 rounded-md text-base font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E293B] active:translate-y-px ${
                      isDuo
                        ? 'bg-[#1E293B] text-white hover:bg-slate-800 shadow-sm'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    Commander ce pack
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
