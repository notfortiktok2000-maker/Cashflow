import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'La livraison est-elle gratuite ?',
    answer:
      'Oui, la livraison est 100% gratuite (0 DH) partout au Maroc, que vous choisissiez le Pack Solo (199 DH) ou le Pack Duo (269 DH).',
  },
  {
    question: 'Comment commander ?',
    answer:
      'Choisissez votre pack sur cette page en cliquant sur « Commander ce pack », saisissez vos coordonnées de livraison, puis validez pour ouvrir WhatsApp.',
  },
  {
    question: 'Comment confirmer ma commande ?',
    answer:
      'Votre récapitulatif complet de commande est automatiquement rédigé. Il vous suffit d’appuyer sur Envoyer dans la conversation WhatsApp avec notre service client.',
  },
  {
    question: 'Quand est-ce que je paie ?',
    answer:
      'Le paiement s’effectue uniquement à la livraison en espèces au livreur lors de la réception de votre colis. Aucun paiement par carte bancaire n’est demandé en ligne.',
  },
  {
    question: 'Comment choisir ma taille ?',
    answer:
      'Vous pouvez indiquer votre taille de sous-vêtement (M, L, XL, XXL) directement dans le message de confirmation WhatsApp ou en répondant à notre conseiller avant l’envoi.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Questions fréquentes
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600">
          Toutes les réponses à vos questions concernant la commande et la livraison.
        </p>

        <div className="mt-8 border-t border-b border-stone-200 divide-y divide-stone-200">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left gap-4 font-semibold text-stone-900 hover:text-stone-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E293B] rounded-sm py-1"
                >
                  <span className="text-base sm:text-lg">{item.question}</span>
                  <span
                    className="text-stone-500 text-xl leading-none w-6 h-6 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed pr-6">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
