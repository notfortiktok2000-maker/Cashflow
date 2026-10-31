import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { OfferId, OFFERS, BRAND_NAME } from '../config/offers';
import { Header } from '../components/Header';
import { OrderSummary } from '../components/OrderSummary';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateWhatsAppOrderUrl, CustomerFormData } from '../utils/whatsapp';
import { saveNewOrder } from '../utils/orderStorage';

interface CheckoutPageProps {
  selectedOfferId: OfferId | null;
  onSelectOffer: (offerId: OfferId) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedOfferId,
  onSelectOffer,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [offerError, setOfferError] = useState<string | undefined>(undefined);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);

  const sizeParam = searchParams.get('size') || 'L';

  // Sync URL query (?pack=solo|duo) with state when loaded directly
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const packParam = searchParams.get('pack');
    if (packParam === 'solo' || packParam === 'duo') {
      onSelectOffer(packParam);
    }
  }, [searchParams, onSelectOffer]);

  const handleSwitchOffer = (offerId: OfferId) => {
    onSelectOffer(offerId);
    setSearchParams({ pack: offerId, size: sizeParam }, { replace: true });
    setOfferError(undefined);
  };

  const activeOffer = selectedOfferId ? OFFERS[selectedOfferId] : null;

  const handleFormSubmit = (customerData: CustomerFormData) => {
    if (!activeOffer) {
      setOfferError('Veuillez sélectionner votre pack (Solo ou Duo) pour finaliser.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Save order in client tracking store
    const stored = saveNewOrder(activeOffer, sizeParam, customerData);
    setCreatedOrderId(stored.orderId);

    // Build WhatsApp URL with order reference
    const whatsappUrl = generateWhatsAppOrderUrl(activeOffer, customerData, sizeParam, stored.orderId);
    setRedirectUrl(whatsappUrl);

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-stone-200">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Back navigation & clean Shopify-style header */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
            >
              <span className="mr-1.5" aria-hidden="true">←</span>
              Retour à la fiche produit
            </Link>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Finaliser votre commande
              </h1>
              <span className="text-xs sm:text-sm text-stone-600 font-medium">
                Paiement à la livraison · 0 DH de frais de port
              </span>
            </div>
          </div>

          {/* Success banner if WhatsApp redirect occurred */}
          {redirectUrl && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  Commande {createdOrderId} préparée pour WhatsApp !
                </p>
                <Link
                  to="/suivi"
                  className="text-xs font-bold underline text-emerald-800 hover:text-emerald-950"
                >
                  Suivre ce colis →
                </Link>
              </div>
              <p className="mt-1 text-xs text-emerald-800">
                Si l’application WhatsApp ne s’est pas ouverte automatiquement,{' '}
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-emerald-950"
                >
                  cliquez ici pour ouvrir la conversation
                </a>
                .
              </p>
            </div>
          )}

          {/* 
            Desktop: Form on the left (col-span-7), Order summary on the right (col-span-5)
            Mobile: Order summary first (order-1), Form second (order-2)
          */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Order Summary (Mobile first, Desktop right column) */}
            <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-20">
              <OrderSummary
                selectedOffer={activeOffer}
                onSelectOffer={handleSwitchOffer}
                offerError={offerError}
                size={sizeParam}
              />

              {/* Minimalist Trust Badges */}
              <div className="mt-4 p-4 rounded-lg bg-white border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 font-medium text-stone-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Livraison gratuite 24-48h dans tout le Maroc</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-stone-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Règlement en espèces à la réception de votre colis</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-stone-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Échange de taille facile sous 7 jours</span>
                </div>
              </div>
            </div>

            {/* Customer Information Form (Mobile second, Desktop left column) */}
            <div className="order-2 lg:order-1 lg:col-span-7">
              <CheckoutForm onSubmitValidForm={handleFormSubmit} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-6 bg-white text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4">
          © {new Date().getFullYear()} {BRAND_NAME} — Commande sécurisée sans paiement en ligne
        </div>
      </footer>
    </div>
  );
};
