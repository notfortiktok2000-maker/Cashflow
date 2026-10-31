import React, { useState } from 'react';
import { Offer } from '../config/offers';
import { CustomerFormData, validateAndNormalizeMoroccanPhone, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { saveNewOrder } from '../utils/orderStorage';
import { useNavigate } from 'react-router-dom';

interface QuickCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer;
  size: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export const QuickCheckoutModal: React.FC<QuickCheckoutModalProps> = ({
  isOpen,
  onClose,
  offer,
  size,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'Prénom requis.';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Nom requis.';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Numéro de téléphone requis.';
    } else {
      const phoneValidation = validateAndNormalizeMoroccanPhone(formData.phone);
      if (!phoneValidation.isValid) {
        nextErrors.phone = phoneValidation.errorMessage || 'Numéro marocain invalide.';
      }
    }
    if (!formData.city.trim()) {
      nextErrors.city = 'Ville requise.';
    }
    if (!formData.address.trim()) {
      nextErrors.address = 'Adresse de livraison requise.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // 1. Save order into storage for instant tracking
    const order = saveNewOrder(offer, size, formData);
    setConfirmedOrderId(order.orderId);

    // 2. Generate WhatsApp URL
    const url = generateWhatsAppOrderUrl(offer, formData, size, order.orderId);
    setWhatsappLink(url);

    // 3. Trigger WhatsApp redirect
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              Commande Express — {offer.name} ({size})
            </h2>
            <p className="text-xs text-stone-600">
              Total : <strong className="text-stone-900">{offer.price} DH</strong> · Livraison 0 DH · Paiement à la réception
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {confirmedOrderId && whatsappLink ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Commande {confirmedOrderId} enregistrée !
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Votre récapitulatif a été préparé pour WhatsApp. Si la fenêtre ne s'est pas ouverte automatiquement :
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors text-center"
                >
                  Ouvrir WhatsApp maintenant
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/suivi');
                  }}
                  className="w-full py-2.5 px-4 rounded-md border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
                >
                  Suivre l'état de ce colis en direct ({confirmedOrderId})
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Offer Summary mini pill */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900">{offer.name}</span>
                  <span className="text-stone-500"> ({offer.piecesLabel} · Taille {size})</span>
                </div>
                <span className="font-bold text-stone-900 tabular-nums">{offer.price} DH</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Prénom */}
                <div>
                  <label htmlFor="modal-fn" className="block text-xs font-bold text-stone-800 mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-fn"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Mohamed"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.firstName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-[10px] text-red-600 mt-0.5">{errors.firstName}</p>}
                </div>

                {/* Nom */}
                <div>
                  <label htmlFor="modal-ln" className="block text-xs font-bold text-stone-800 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-ln"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Bennani"
                    className={`w-full px-3 py-2 text-xs rounded border ${
                      errors.lastName ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-[10px] text-red-600 mt-0.5">{errors.lastName}</p>}
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold text-stone-800 mb-1">
                  Téléphone marocain (06 / 07 / +212) <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    errors.phone ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-600 mt-0.5">{errors.phone}</p>}
              </div>

              {/* Ville */}
              <div>
                <label htmlFor="modal-city" className="block text-xs font-bold text-stone-800 mb-1">
                  Ville de livraison <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-city"
                  name="city"
                  type="text"
                  required
                  placeholder="Casablanca, Rabat, Marrakech, Tanger..."
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    errors.city ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.city && <p className="text-[10px] text-red-600 mt-0.5">{errors.city}</p>}
              </div>

              {/* Adresse */}
              <div>
                <label htmlFor="modal-addr" className="block text-xs font-bold text-stone-800 mb-1">
                  Adresse exacte de livraison <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="modal-addr"
                  name="address"
                  rows={2}
                  required
                  placeholder="Quartier, rue, numéro de maison, appartement…"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs rounded border ${
                    errors.address ? 'border-red-500 bg-red-50/20' : 'border-stone-300'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-red-600 mt-0.5">{errors.address}</p>}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-md bg-[#1E293B] hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer shadow-sm active:translate-y-px"
                >
                  Confirmer sur WhatsApp — {offer.price} DH
                </button>
                <p className="mt-2 text-[11px] text-stone-500 text-center">
                  Aucun paiement par carte requis · Règlement en espèces au livreur
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
