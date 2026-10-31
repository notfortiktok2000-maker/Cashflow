import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProductGallery } from '../components/ProductGallery';
import { StockTrigger } from '../components/StockTrigger';
import { TrustBadges } from '../components/TrustBadges';
import { AccordionSection } from '../components/AccordionSection';
import { QuickCheckoutModal } from '../components/QuickCheckoutModal';
import { OfferId, OFFERS, AVAILABLE_SIZES, SIZE_CHART, BRAND_NAME } from '../config/offers';

interface PDPPageProps {
  selectedOfferId: OfferId;
  onSelectOffer: (id: OfferId) => void;
}

export const PDPPage: React.FC<PDPPageProps> = ({
  selectedOfferId,
  onSelectOffer,
}) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeOffer = OFFERS[selectedOfferId] || OFFERS.duo;

  const handleOpenCheckout = () => {
    setIsModalOpen(true);
  };

  const handleFullCheckoutPage = () => {
    navigate(`/checkout?pack=${activeOffer.id}&size=${selectedSize}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-stone-200">
      <Header />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb kicker */}
          <nav className="mb-4 text-xs text-stone-500 flex items-center gap-2">
            <span>Accueil</span>
            <span aria-hidden="true">/</span>
            <span>Sous-Vêtements Homme</span>
            <span aria-hidden="true">/</span>
            <span className="text-stone-900 font-medium">Collection Essentiels Maroc</span>
          </nav>

          {/* Main Shopify 2-Column Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Gallery (Sticky on desktop) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <ProductGallery
                activeOfferId={selectedOfferId}
                onSelectOffer={onSelectOffer}
              />
            </div>

            {/* Right Column: Shopify Purchase Module */}
            <div className="lg:col-span-6 space-y-5">
              {/* Review Stars & Social Proof */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500 text-sm tracking-tighter" aria-label="5 étoiles sur 5">
                  ★★★★★
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  4.9 / 5
                </span>
                <span className="text-stone-400 text-xs">·</span>
                <span className="text-xs text-stone-600">
                  Avis vérifiés au Maroc
                </span>
              </div>

              {/* Title & Price Header */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                  Packs Boxers Homme Coton Confort
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-600">
                  Les essentiels du quotidien pour renouveler votre tiroir sans vous ruiner.
                </p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 tabular-nums">
                    {activeOffer.price} DH
                  </span>
                  {activeOffer.unitPrice && (
                    <span className="text-xs sm:text-sm font-semibold text-stone-500">
                      ({activeOffer.unitPrice})
                    </span>
                  )}
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Livraison 0 DH Gratuite
                  </span>
                </div>
              </div>

              {/* Conversion Triggers: Stock Urgency & Dispatch */}
              <StockTrigger />

              {/* Pack Variant Selector */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    1. Choisissez votre Pack :
                  </label>
                  <span className="text-xs text-stone-500">
                    {activeOffer.piecesLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Choix du pack">
                  {/* Pack Solo */}
                  <button
                    type="button"
                    onClick={() => onSelectOffer('solo')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                      selectedOfferId === 'solo'
                        ? 'border-[#1E293B] ring-2 ring-[#1E293B] bg-white shadow-xs'
                        : 'border-stone-200 bg-[#F9F8F5] hover:bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block text-sm font-bold text-stone-900">Pack Solo</span>
                        <span className="block text-xs text-stone-600 mt-0.5">10 pièces · 19,90 DH/u</span>
                      </div>
                      <span className="text-base font-bold text-stone-900 tabular-nums">199 DH</span>
                    </div>
                  </button>

                  {/* Pack Duo */}
                  <button
                    type="button"
                    onClick={() => onSelectOffer('duo')}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                      selectedOfferId === 'duo'
                        ? 'border-[#1E293B] ring-2 ring-[#1E293B] bg-white shadow-xs'
                        : 'border-stone-200 bg-[#F9F8F5] hover:bg-white text-stone-700'
                    }`}
                  >
                    <div className="absolute -top-2 right-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1E293B] text-white shadow-xs">
                        Meilleure valeur
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block text-sm font-bold text-stone-900">Pack Duo</span>
                        <span className="block text-xs text-stone-600 mt-0.5">20 pièces (2x10)</span>
                      </div>
                      <span className="text-base font-bold text-stone-900 tabular-nums">269 DH</span>
                    </div>
                  </button>
                </div>
                {selectedOfferId === 'duo' && (
                  <p className="text-xs text-emerald-800 font-medium">
                    ✓ Un pack pour vous et un pack pour un proche (ou double stock longue durée).
                  </p>
                )}
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Sélectionnez votre taille :
                  </label>
                  <span className="text-xs font-semibold text-stone-700">
                    Taille choisie : <strong className="text-stone-900">{selectedSize}</strong>
                  </span>
                </div>

                <div className="flex gap-2">
                  {AVAILABLE_SIZES.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`flex-1 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-xs'
                            : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                {/* Guide : Quelle taille pour quelle taille d'homme & poids */}
                <div className="p-3.5 rounded-lg bg-stone-100/90 border border-stone-200 text-xs space-y-2.5">
                  {/* Dynamic active recommendation */}
                  {(() => {
                    const activeSizeItem = SIZE_CHART.find((s) => s.size === selectedSize);
                    return activeSizeItem ? (
                      <div className="flex items-center gap-2 text-stone-900 font-medium">
                        <span className="text-stone-700 font-bold">👉 Taille {activeSizeItem.size} adaptée pour :</span>
                        <span>
                          Homme de <strong className="text-stone-900">{activeSizeItem.heightCm}</strong> et{' '}
                          <strong className="text-emerald-800">{activeSizeItem.weightKg}</strong>
                        </span>
                      </div>
                    ) : null;
                  })()}

                  {/* Quick-reference grid for all sizes */}
                  <div className="pt-2 border-t border-stone-200/80">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 mb-1.5">
                      <span>Guide taille d'homme & poids adapté :</span>
                      <span className="text-[10px] text-stone-500 font-normal">Cliquez pour sélectionner</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                      {SIZE_CHART.map((item) => {
                        const isCurrent = selectedSize === item.size;
                        return (
                          <button
                            key={item.size}
                            type="button"
                            onClick={() => setSelectedSize(item.size)}
                            className={`p-2 rounded-md border text-left transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-white border-[#1E293B] ring-1 ring-[#1E293B] shadow-xs'
                                : 'bg-white/70 border-stone-200 hover:bg-white text-stone-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-stone-900 text-xs">{item.size}</span>
                              <span className="text-[9px] text-stone-400 font-mono">FR/MA</span>
                            </div>
                            <div className="text-[10px] text-stone-600 mt-1 font-medium leading-tight">
                              {item.heightCm}
                            </div>
                            <div className="text-[10px] text-emerald-800 font-bold mt-0.5 leading-tight">
                              {item.weightKg}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-[10px] text-stone-500 mt-2">
                      💡 <em>Conseil : Si vous hésitez entre 2 tailles ou préférez être plus à l'aise, optez pour la taille supérieure.</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Buy Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleOpenCheckout}
                  className="w-full py-4 px-6 rounded-lg bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-base transition-all cursor-pointer shadow-md active:translate-y-px flex items-center justify-center gap-2"
                >
                  <span>Commander maintenant — {activeOffer.price} DH</span>
                  <span aria-hidden="true">→</span>
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                  <span>⚡ Paiement en espèces à la livraison</span>
                  <button
                    type="button"
                    onClick={handleFullCheckoutPage}
                    className="underline text-stone-600 hover:text-stone-900 font-medium"
                  >
                    Formulaire complet
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <TrustBadges />

              {/* Compact Collapsible Accordions */}
              <AccordionSection />
            </div>
          </div>
        </div>
      </main>

      {/* Quick Checkout Modal */}
      <QuickCheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={activeOffer}
        size={selectedSize}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 py-8 bg-white text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-stone-800">
            {BRAND_NAME} — Sous-vêtements essentiels pour homme au Maroc
          </p>
          <p>
            Livraison gratuite partout au Maroc. Paiement en espèces à la livraison (Cash on Delivery).
          </p>
          <div className="pt-2 flex justify-center gap-4 text-stone-600">
            <button
              type="button"
              onClick={() => navigate('/suivi')}
              className="hover:underline font-medium"
            >
              Suivi de commande
            </button>
            <span>·</span>
            <span>Support WhatsApp 7j/7</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
