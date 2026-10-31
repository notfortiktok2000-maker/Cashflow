import { Offer, WHATSAPP_NUMBER } from '../config/offers';

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  address: string;
}

/**
 * Validates and normalizes Moroccan phone numbers.
 * Accepts numbers beginning with 06, 07, +2126, +2127, 002126, 002127, or 2126/2127.
 * Normalizes to standard 10-digit format (06XXXXXXXX / 07XXXXXXXX).
 */
export function validateAndNormalizeMoroccanPhone(rawPhone: string): {
  isValid: boolean;
  normalized: string;
  errorMessage?: string;
} {
  const trimmed = rawPhone.trim();
  const cleaned = trimmed.replace(/[\s\-().]/g, '');

  if (!cleaned) {
    return {
      isValid: false,
      normalized: '',
      errorMessage: 'Veuillez saisir votre numéro de téléphone.',
    };
  }

  // International format with +212, 00212, or 212 followed by 6 or 7 and 8 digits
  const intlMatch = cleaned.match(/^(?:\+212|00212|212)([67]\d{8})$/);
  if (intlMatch) {
    return {
      isValid: true,
      normalized: `0${intlMatch[1]}`,
    };
  }

  // Local Moroccan mobile format: 06XXXXXXXX or 07XXXXXXXX (10 digits total)
  const localMatch = cleaned.match(/^(0[67]\d{8})$/);
  if (localMatch) {
    return {
      isValid: true,
      normalized: localMatch[1],
    };
  }

  return {
    isValid: false,
    normalized: trimmed,
    errorMessage:
      'Numéro invalide. Utilisez un numéro marocain valide (ex : 0612345678 ou +212612345678).',
  };
}

/**
 * Generates the pre-filled WhatsApp click-to-chat URL using the exact requested message format.
 */
export function generateWhatsAppOrderUrl(
  offer: Offer,
  customer: CustomerFormData,
  size?: string,
  orderRef?: string
): string {
  const phoneResult = validateAndNormalizeMoroccanPhone(customer.phone);
  const normalizedPhone = phoneResult.isValid ? phoneResult.normalized : customer.phone.trim();

  const lines = [
    'Bonjour, je souhaite confirmer ma commande.',
    '',
    ...(orderRef ? [`Référence : ${orderRef}`, ''] : []),
    'Récapitulatif de ma commande',
    '',
    `Pack : ${offer.name}`,
    `Quantité : ${offer.pieces} pièces`,
    ...(size ? [`Taille : ${size}`] : []),
    `Prix du pack : ${offer.price} DH`,
    'Livraison : Gratuite',
    `Total : ${offer.price} DH`,
    '',
    'Informations de livraison',
    '',
    `Prénom : ${customer.firstName.trim()}`,
    `Nom : ${customer.lastName.trim()}`,
    `Téléphone : ${normalizedPhone}`,
    `Ville : ${customer.city.trim()}`,
    `Adresse : ${customer.address.trim()}`,
    '',
    'Merci de confirmer ma commande.',
  ];

  const cleanBusinessNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  const encodedText = encodeURIComponent(lines.join('\n'));

  return `https://wa.me/${cleanBusinessNumber}?text=${encodedText}`;
}
