import React from 'react';
import { PRODUCT_SPECS } from '../config/offers';

export const ProductDetails: React.FC = () => {
  const steps = [
    {
      step: '1',
      title: 'Choisissez votre pack',
      description: 'Sélectionnez le Pack Solo (10 pièces) ou le Pack Duo (20 pièces).',
    },
    {
      step: '2',
      title: 'Remplissez vos coordonnées',
      description: 'Indiquez votre prénom, nom, téléphone marocain et adresse de livraison.',
    },
    {
      step: '3',
      title: 'Confirmez sur WhatsApp',
      description: 'Envoyez le message prérempli à notre équipe. Vous payez en espèces à la livraison.',
    },
  ];

  return (
    <>
      {/* Product Details & Specifications */}
      <section className="py-12 sm:py-16 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Détails du produit
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Caractéristiques vérifiées des articles inclus dans vos packs.
            </p>

            <div className="mt-6 border border-stone-200 rounded-lg bg-white overflow-hidden shadow-xs">
              <dl className="divide-y divide-stone-200">
                {PRODUCT_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 sm:px-6 sm:py-4.5 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 items-baseline"
                  >
                    <dt className="text-sm font-semibold text-stone-900">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-stone-600 sm:col-span-2">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* How Ordering Works */}
      <section className="py-12 sm:py-16 border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Comment se déroule la commande
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Un processus direct en trois étapes rapides, avec paiement à la livraison (Cash on Delivery).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-lg border border-stone-200 bg-[#FAF9F6] flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-md bg-[#1E293B] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-base font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-md bg-stone-100 border border-stone-200 text-xs sm:text-sm text-stone-700 text-center font-medium">
            Rappel : Aucun paiement n’est requis en ligne. Vous réglez la totalité à la réception de votre colis.
          </div>
        </div>
      </section>
    </>
  );
};
