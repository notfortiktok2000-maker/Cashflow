import React from 'react';
import { Offer, OfferId, OFFER_LIST } from '../config/offers';

interface OrderSummaryProps {
  selectedOffer: Offer | null;
  onSelectOffer: (offerId: OfferId) => void;
  offerError?: string;
  size?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedOffer,
  onSelectOffer,
  offerError,
  size,
}) => {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3.5 mb-4">
        <h2 className="text-lg font-bold text-stone-900">
          Récapitulatif de la commande
        </h2>
        {selectedOffer && (
          <span className="text-xs text-stone-500">
            Modifier le pack
          </span>
        )}
      </div>

      {/* Offer Switcher / Selection */}
      <div className="space-y-3" role="radiogroup" aria-label="Sélectionnez votre offre">
        {OFFER_LIST.map((offer) => {
          const isSelected = selectedOffer?.id === offer.id;

          return (
            <label
              key={offer.id}
              onClick={() => onSelectOffer(offer.id)}
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-md border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#1E293B] bg-stone-50 ring-1 ring-[#1E293B]'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="checkout-offer"
                  value={offer.id}
                  checked={isSelected}
                  onChange={() => onSelectOffer(offer.id)}
                  className="h-4 w-4 text-[#1E293B] border-stone-300 focus:ring-[#1E293B] cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">
                      {offer.name}
                    </span>
                    {offer.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#1E293B] text-white">
                        {offer.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {offer.piecesLabel} · {offer.id === 'duo' ? 'Partage ou double stock' : 'Usage individuel'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-bold text-stone-900 tabular-nums">
                  {offer.price} DH
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {offerError && (
        <div className="mt-3 p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {offerError}
        </div>
      )}

      {/* Line items and breakdown */}
      <div className="mt-5 pt-4 border-t border-stone-200 space-y-2.5 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Pack sélectionné</span>
          <span className="font-semibold text-stone-900">
            {selectedOffer ? `${selectedOffer.name} (${selectedOffer.piecesLabel})` : 'Aucun (Veuillez choisir)'}
          </span>
        </div>

        <div className="flex justify-between text-stone-600">
          <span>Nombre de pièces</span>
          <span className="font-semibold text-stone-900 tabular-nums">
            {selectedOffer ? `${selectedOffer.pieces} pièces` : '—'}
          </span>
        </div>

        {size && (
          <div className="flex justify-between text-stone-600">
            <span>Taille choisie</span>
            <span className="font-semibold text-stone-900">
              {size}
            </span>
          </div>
        )}

        <div className="flex justify-between text-stone-600">
          <span>Prix du pack</span>
          <span className="font-semibold text-stone-900 tabular-nums">
            {selectedOffer ? `${selectedOffer.price} DH` : '—'}
          </span>
        </div>

        <div className="flex justify-between text-stone-600">
          <span>Livraison</span>
          <span className="font-semibold text-emerald-700">
            0 DH (Gratuite)
          </span>
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
          <div>
            <span className="text-base font-bold text-stone-900">Total à payer</span>
            <p className="text-[11px] text-stone-500">Paiement en espèces à la livraison</p>
          </div>
          <span className="text-2xl font-bold text-stone-900 tabular-nums">
            {selectedOffer ? `${selectedOffer.price} DH` : '—'}
          </span>
        </div>
      </div>
    </div>
  );
};
