import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Offer, OfferId, BRAND_NAME } from '../config/offers';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { OfferCards } from '../components/OfferCards';
import { ProductDetails } from '../components/ProductDetails';
import { FAQ } from '../components/FAQ';

interface LandingPageProps {
  onSelectOffer: (offerId: OfferId) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectOffer }) => {
  const navigate = useNavigate();

  const scrollToOffers = () => {
    const el = document.getElementById('offres');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChooseOffer = (offer: Offer) => {
    onSelectOffer(offer.id);
    navigate(`/checkout?pack=${offer.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900 selection:bg-stone-200">
      <Header />

      <main className="flex-1">
        <Hero onSelectPackClick={scrollToOffers} />
        <OfferCards onChooseOffer={handleChooseOffer} />
        <ProductDetails />
        <FAQ />
      </main>

      {/* Minimalist footer with verified trust information */}
      <footer className="border-t border-stone-200 py-8 bg-white text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-2">
          <p className="font-semibold text-stone-700">
            {BRAND_NAME} — Sous-vêtements essentiels pour homme
          </p>
          <p>
            Livraison 100% gratuite dans toutes les villes du Maroc. Règlement en espèces à la livraison.
          </p>
          <p className="text-stone-400 pt-2">
            © {new Date().getFullYear()} {BRAND_NAME}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};
