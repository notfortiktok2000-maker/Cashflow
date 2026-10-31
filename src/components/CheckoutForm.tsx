import React, { useState } from 'react';
import { CustomerFormData, validateAndNormalizeMoroccanPhone } from '../utils/whatsapp';

interface CheckoutFormProps {
  onSubmitValidForm: (data: CustomerFormData) => void;
  isSubmitting?: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmitValidForm,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'Veuillez saisir votre prénom.';
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Veuillez saisir votre nom.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Veuillez renseigner votre numéro de téléphone.';
    } else {
      const phoneValidation = validateAndNormalizeMoroccanPhone(formData.phone);
      if (!phoneValidation.isValid) {
        nextErrors.phone =
          phoneValidation.errorMessage ||
          'Numéro invalide. Utilisez un numéro marocain valide (ex: 0612345678 ou +212612345678).';
      }
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'Veuillez indiquer votre ville de livraison.';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Veuillez renseigner votre adresse de livraison complète.';
    } else if (formData.address.trim().length < 5) {
      nextErrors.address = 'Veuillez fournir une adresse plus précise (quartier, rue, etc.).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitValidForm(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-lg border border-stone-200 p-5 sm:p-7 shadow-xs space-y-5"
    >
      <div className="border-b border-stone-100 pb-3.5">
        <h2 className="text-lg font-bold text-stone-900">
          Informations de livraison
        </h2>
        <p className="mt-1 text-xs text-stone-500">
          Renseignez vos coordonnées pour recevoir votre commande. Aucun paiement en ligne.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Prénom */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-semibold text-stone-900 mb-1.5"
          >
            Prénom <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ex : Mohamed"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E293B] ${
              errors.firstName
                ? 'border-red-500 bg-red-50/20'
                : 'border-stone-300 bg-white hover:border-stone-400'
            }`}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Nom */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-semibold text-stone-900 mb-1.5"
          >
            Nom <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ex : Bennani"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E293B] ${
              errors.lastName
                ? 'border-red-500 bg-red-50/20'
                : 'border-stone-300 bg-white hover:border-stone-400'
            }`}
          />
          {errors.lastName && (
            <p id="lastName-error" className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Numéro de téléphone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-stone-900 mb-1.5"
        >
          Numéro de téléphone <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="06 12 34 56 78 ou +212 6..."
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E293B] ${
            errors.phone
              ? 'border-red-500 bg-red-50/20'
              : 'border-stone-300 bg-white hover:border-stone-400'
          }`}
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1.5 text-[11px] text-stone-500">
            Formats acceptés : 06XXXXXXXX, 07XXXXXXXX ou +2126 / +2127
          </p>
        )}
      </div>

      {/* Ville */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-semibold text-stone-900 mb-1.5"
        >
          Ville <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          required
          autoComplete="address-level2"
          placeholder="Ex : Casablanca, Rabat, Marrakech, Tanger, Fès..."
          value={formData.city}
          onChange={handleChange}
          aria-invalid={!!errors.city}
          aria-describedby={errors.city ? 'city-error' : undefined}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E293B] ${
            errors.city
              ? 'border-red-500 bg-red-50/20'
              : 'border-stone-300 bg-white hover:border-stone-400'
          }`}
        />
        {errors.city && (
          <p id="city-error" className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
            {errors.city}
          </p>
        )}
      </div>

      {/* Adresse de livraison */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-stone-900 mb-1.5"
        >
          Adresse de livraison <span className="text-red-600" aria-hidden="true">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          required
          placeholder="Quartier, rue, numéro de maison, appartement…"
          value={formData.address}
          onChange={handleChange}
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? 'address-error' : undefined}
          className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1E293B] ${
            errors.address
              ? 'border-red-500 bg-red-50/20'
              : 'border-stone-300 bg-white hover:border-stone-400'
          }`}
        />
        {errors.address && (
          <p id="address-error" className="mt-1.5 text-xs text-red-600 font-medium" role="alert">
            {errors.address}
          </p>
        )}
      </div>

      {/* Main Checkout CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-md bg-[#1E293B] hover:bg-slate-800 text-white text-base font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E293B] active:translate-y-px shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Confirmer ma commande sur WhatsApp
        </button>

        <p className="mt-3 text-xs text-stone-600 text-center leading-relaxed">
          Vous serez redirigé vers WhatsApp pour confirmer votre commande. Paiement à la livraison.
        </p>
      </div>
    </form>
  );
};
