import React, { useState, useEffect } from 'react';

export const StockTrigger: React.FC = () => {
  const [stockRemaining, setStockRemaining] = useState(14);
  const [recentOrderCity, setRecentOrderCity] = useState('Casablanca');

  useEffect(() => {
    // Subtle ticker variation to make it feel alive
    const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Meknès'];
    const interval = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setRecentOrderCity(randomCity);
    }, 28000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2.5">
      {/* Stock Urgency Bar */}
      <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/80">
        <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Forte demande au Maroc</span>
          </div>
          <span className="tabular-nums">Plus que {stockRemaining} packs disponibles</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
          <div className="bg-amber-600 h-1.5 rounded-full w-[82%]" />
        </div>
      </div>

      {/* Express Shipping Cutoff */}
      <div className="flex items-center justify-between p-2.5 rounded-md bg-stone-100/90 border border-stone-200 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <span className="text-stone-900 font-bold">⚡ Expédition 24h-48h :</span>
          <span>Prêt pour envoi immédiat</span>
        </div>
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          En stock
        </span>
      </div>

      {/* Social Proof Micro Banner */}
      <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
        <span>Dernière commande confirmée il y a 8 min à <strong className="text-stone-700 font-semibold">{recentOrderCity}</strong></span>
      </div>
    </div>
  );
};
