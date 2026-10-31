import React, { useState } from 'react';
import { SIZE_CHART, PRODUCT_SPECS } from '../config/offers';

export const AccordionSection: React.FC = () => {
  const [openTab, setOpenTab] = useState<string | null>('specs');

  const toggle = (id: string) => {
    setOpenTab((curr) => (curr === id ? null : id));
  };

  return (
    <div className="mt-8 border-t border-stone-200 divide-y divide-stone-200 text-stone-900">
      {/* 1. Spécifications & Composition */}
      <div>
        <button
          type="button"
          onClick={() => toggle('specs')}
          aria-expanded={openTab === 'specs'}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-sm text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>Détails du produit & composition</span>
          </span>
          <span className="text-stone-400 text-lg">{openTab === 'specs' ? '−' : '+'}</span>
        </button>
        {openTab === 'specs' && (
          <div className="pb-5 pt-1 text-xs text-stone-600 space-y-2.5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-stone-50 p-3.5 rounded-md border border-stone-200">
              {PRODUCT_SPECS.map((item) => (
                <div key={item.label} className="border-b border-stone-200/60 pb-1.5">
                  <dt className="font-semibold text-stone-800">{item.label}</dt>
                  <dd className="text-stone-600 mt-0.5">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {/* 2. Guide des tailles */}
      <div>
        <button
          type="button"
          onClick={() => toggle('size')}
          aria-expanded={openTab === 'size'}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-sm text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <span>Guide des tailles</span>
          <span className="text-stone-400 text-lg">{openTab === 'size' ? '−' : '+'}</span>
        </button>
        {openTab === 'size' && (
          <div className="pb-5 pt-1 text-xs text-stone-600">
            <p className="mb-2 text-stone-700">
              Coupe standard marocaine. Si vous hésitez entre deux tailles, nous vous conseillons de choisir la taille au-dessus.
            </p>
            <div className="overflow-x-auto rounded-md border border-stone-200">
              <table className="w-full text-left text-xs divide-y divide-stone-200">
                <thead className="bg-stone-100 text-stone-800 font-bold">
                  <tr>
                    <th className="py-2 px-3">Taille</th>
                    <th className="py-2 px-3">Taille en cm</th>
                    <th className="py-2 px-3">Poids adapté</th>
                    <th className="py-2 px-3">Tour de taille</th>
                    <th className="py-2 px-3">Équivalence Pantalon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {SIZE_CHART.map((s) => (
                    <tr key={s.size} className="hover:bg-stone-50">
                      <td className="py-2 px-3 font-bold text-stone-900">{s.size}</td>
                      <td className="py-2 px-3 text-stone-800">{s.heightCm}</td>
                      <td className="py-2 px-3 font-semibold text-stone-900">{s.weightKg}</td>
                      <td className="py-2 px-3">{s.waistCm}</td>
                      <td className="py-2 px-3 font-mono">{s.jeansSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 3. Livraison & Paiement au Maroc */}
      <div>
        <button
          type="button"
          onClick={() => toggle('shipping')}
          aria-expanded={openTab === 'shipping'}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-sm text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <span>Livraison gratuite & Paiement à la réception</span>
          <span className="text-stone-400 text-lg">{openTab === 'shipping' ? '−' : '+'}</span>
        </button>
        {openTab === 'shipping' && (
          <div className="pb-5 pt-1 text-xs text-stone-600 space-y-2">
            <p>
              • <strong>0 DH de frais de livraison</strong> : Valable dans toutes les villes et régions du Maroc (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, Oujda, Laâyoune, etc.).
            </p>
            <p>
              • <strong>Délai</strong> : 24h à 48h ouvrées après confirmation de votre commande sur WhatsApp.
            </p>
            <p>
              • <strong>Paiement en espèces</strong> : Vous ne payez rien en ligne. Vous réglez directement le livreur en espèces à l'arrivée du colis.
            </p>
          </div>
        )}
      </div>

      {/* 4. FAQ express */}
      <div>
        <button
          type="button"
          onClick={() => toggle('faq')}
          aria-expanded={openTab === 'faq'}
          className="w-full py-4 flex items-center justify-between text-left font-bold text-sm text-stone-900 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <span>Questions fréquentes (FAQ)</span>
          <span className="text-stone-400 text-lg">{openTab === 'faq' ? '−' : '+'}</span>
        </button>
        {openTab === 'faq' && (
          <div className="pb-5 pt-1 text-xs text-stone-600 space-y-3">
            <div>
              <p className="font-bold text-stone-800">Comment confirmer ma commande ?</p>
              <p className="mt-0.5">Cliquez sur « Commander maintenant », remplissez votre adresse, puis envoyez le récapitulatif prérempli sur WhatsApp à notre conseiller.</p>
            </div>
            <div>
              <p className="font-bold text-stone-800">Quand est-ce que je paie ?</p>
              <p className="mt-0.5">Le paiement est 100% à la livraison (Cash on Delivery) en dirhams marocains au livreur.</p>
            </div>
            <div>
              <p className="font-bold text-stone-800">Puis-je échanger si la taille ne convient pas ?</p>
              <p className="mt-0.5">Oui, contactez simplement notre service client WhatsApp sous 7 jours pour un échange rapide.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
