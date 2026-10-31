import React, { useState } from 'react';
import { Header } from '../components/Header';
import { findOrderByQuery, getStoredOrders } from '../utils/orderStorage';
import { StoredOrder } from '../types/order';
import { WHATSAPP_NUMBER } from '../config/offers';

export const OrderTrackerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('MA-8492');
  const [currentOrder, setCurrentOrder] = useState<StoredOrder | null>(() => findOrderByQuery('MA-8492'));
  const [searched, setSearched] = useState(true);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = findOrderByQuery(searchQuery);
    setCurrentOrder(result);
    setSearched(true);
  };

  const handleSelectSample = (sampleId: string) => {
    setSearchQuery(sampleId);
    const result = findOrderByQuery(sampleId);
    setCurrentOrder(result);
    setSearched(true);
  };

  const storedOrders = getStoredOrders();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Commande Confirmée', bg: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'preparing':
        return { label: 'En Préparation', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'shipped':
        return { label: 'Expédié', bg: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'out_for_delivery':
        return { label: 'En cours de livraison', bg: 'bg-emerald-50 text-emerald-800 border-emerald-300' };
      case 'delivered':
        return { label: 'Colis Livré & Encaissé', bg: 'bg-stone-100 text-stone-800 border-stone-300' };
      default:
        return { label: 'En cours', bg: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Suivi de votre commande
            </h1>
            <p className="mt-1.5 text-sm text-stone-600">
              Saisissez votre référence de commande ou votre numéro de téléphone marocain pour suivre votre colis en direct.
            </p>
          </div>

          {/* Search box */}
          <form onSubmit={handleSearch} className="bg-white p-4 sm:p-5 rounded-lg border border-stone-200 shadow-xs mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex : MA-8492 ou 06XXXXXXXX"
                  className="w-full px-4 py-3 rounded-md border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1E293B] uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-[#1E293B] hover:bg-slate-800 text-white font-semibold text-sm transition-colors cursor-pointer shrink-0"
              >
                Rechercher mon colis
              </button>
            </div>

            {/* Test samples pills */}
            <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium">Commandes de démonstration :</span>
              <button
                type="button"
                onClick={() => handleSelectSample('MA-8492')}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono transition-colors"
              >
                MA-8492 (En livraison aujourd'hui)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('MA-3104')}
                className="px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono transition-colors"
              >
                MA-3104 (Livrée)
              </button>
            </div>
          </form>

          {/* Results section */}
          {currentOrder ? (
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
              {/* Order header */}
              <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-bold text-stone-900 font-mono">
                      {currentOrder.orderId}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        getStatusBadge(currentOrder.tracking.status).bg
                      }`}
                    >
                      {getStatusBadge(currentOrder.tracking.status).label}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Passée le {currentOrder.createdAt} · Transporteur : <strong>{currentOrder.tracking.carrier}</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-stone-500 block">Montant à régler au livreur</span>
                  <span className="text-xl font-bold text-stone-900 tabular-nums">
                    {currentOrder.offer.price} DH (Espèces)
                  </span>
                </div>
              </div>

              {/* Progress timeline */}
              <div className="p-5 sm:p-6 border-b border-stone-200">
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                  Historique d'expédition
                </h2>

                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {currentOrder.tracking.history.map((step) => (
                    <div key={step.status} className="relative flex items-start gap-4 pl-8">
                      {/* Step node dot */}
                      <div
                        className={`absolute left-1.5 -translate-x-1/2 top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                          step.completed
                            ? 'border-emerald-600 bg-emerald-600'
                            : 'border-stone-300'
                        } ${step.current ? 'ring-4 ring-emerald-100' : ''}`}
                      />

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <h3
                            className={`text-sm font-bold ${
                              step.current
                                ? 'text-emerald-800'
                                : step.completed
                                ? 'text-stone-900'
                                : 'text-stone-400'
                            }`}
                          >
                            {step.label}
                          </h3>
                          <span className="text-xs font-mono text-stone-500">
                            {step.date}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination & Package summary */}
              <div className="p-5 sm:p-6 bg-stone-50/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div className="p-3 bg-white rounded border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">Détails du colis</h3>
                  <p>• <strong>{currentOrder.offer.name}</strong> ({currentOrder.offer.piecesLabel})</p>
                  <p>• Taille sélectionnée : <strong>{currentOrder.size}</strong></p>
                  <p>• N° de suivi transporteur : <span className="font-mono">{currentOrder.tracking.trackingCode}</span></p>
                </div>

                <div className="p-3 bg-white rounded border border-stone-200">
                  <h3 className="font-bold text-stone-900 mb-1">Destinataire & Adresse</h3>
                  <p>• {currentOrder.customer.firstName} {currentOrder.customer.lastName}</p>
                  <p>• Téléphone : {currentOrder.customer.phone}</p>
                  <p>• {currentOrder.customer.address}, {currentOrder.customer.city}</p>
                </div>
              </div>

              {/* WhatsApp Support footer */}
              <div className="p-4 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-stone-600">
                  Une question sur la livraison de votre colis ?
                </span>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Bonjour, je souhaite avoir des informations sur la livraison de ma commande ${currentOrder.orderId}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors"
                >
                  <span>Contacter le support WhatsApp</span>
                </a>
              </div>
            </div>
          ) : searched ? (
            <div className="p-8 text-center bg-white rounded-lg border border-stone-200 text-stone-600">
              <svg className="w-12 h-12 text-stone-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-base font-bold text-stone-900">Aucune commande trouvée</h2>
              <p className="mt-1 text-xs text-stone-500 max-w-md mx-auto">
                Vérifiez le numéro saisi ou utilisez votre numéro de téléphone marocain sans indicatif. Vous pouvez aussi tester avec l'un des exemples de démonstration ci-dessus.
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};
