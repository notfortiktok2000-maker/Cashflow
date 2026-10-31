export type OfferId = 'solo' | 'duo';

export interface Offer {
  id: OfferId;
  name: string;
  pieces: number;
  piecesLabel: string;
  price: number;
  unitPrice?: string;
  deliveryText: string;
  subtitle?: string;
  badge?: string;
  tagline: string;
  imageLabel: string;
  details: string;
}

/**
 * CONFIGURATION:
 * Business WhatsApp number in international Moroccan format (e.g., "212600000000").
 */
export const WHATSAPP_NUMBER = "212600000000";

export const BRAND_NAME = "ESSENTIELS.MA";

export const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const OFFERS: Record<OfferId, Offer> = {
  solo: {
    id: 'solo',
    name: 'Pack Solo',
    pieces: 10,
    piecesLabel: '10 pièces',
    price: 199,
    unitPrice: '19,90 DH / pièce',
    deliveryText: 'Livraison gratuite partout au Maroc',
    tagline: 'Renouvellement essentiel individuel',
    details: '10 boxers confort en coton respirant (coloris sobres assortis)',
    imageLabel: 'Pack Solo — 10 Boxers',
  },
  duo: {
    id: 'duo',
    name: 'Pack Duo',
    pieces: 20,
    piecesLabel: '20 pièces',
    price: 269,
    unitPrice: '13,45 DH / pièce',
    deliveryText: 'Livraison gratuite partout au Maroc',
    subtitle: 'Un pack pour toi, un pack pour ton proche',
    badge: 'Meilleure valeur',
    tagline: 'Le plus populaire pour doubler son stock ou partager',
    details: '20 boxers (2 lots de 10) — La formule la plus économique',
    imageLabel: 'Pack Duo — 20 Boxers',
  },
};

export const OFFER_LIST: Offer[] = [OFFERS.solo, OFFERS.duo];

export const TRUST_BADGES = [
  {
    title: 'Paiement à la livraison',
    desc: 'Payez en espèces directement au livreur après vérification.',
  },
  {
    title: 'Livraison 24h à 48h',
    desc: 'Expédition express gratuite dans tout le Royaume du Maroc.',
  },
  {
    title: 'Échange de taille facile',
    desc: 'Assistance rapide sous 7 jours si la taille ne vous convient pas.',
  },
  {
    title: 'Emballage discret',
    desc: 'Colis opaque et sécurisé livré directement chez vous.',
  },
];

export interface SizeGuideItem {
  size: string;
  heightCm: string;
  weightKg: string;
  waistCm: string;
  jeansSize: string;
}

export const SIZE_CHART: SizeGuideItem[] = [
  { size: 'S', heightCm: '150 - 165 cm', weightKg: '50 - 62 kg', waistCm: '70 - 76 cm', jeansSize: '28 - 30' },
  { size: 'M', heightCm: '165 - 175 cm', weightKg: '63 - 74 kg', waistCm: '76 - 83 cm', jeansSize: '30 - 32' },
  { size: 'L', heightCm: '175 - 182 cm', weightKg: '75 - 84 kg', waistCm: '84 - 90 cm', jeansSize: '32 - 34' },
  { size: 'XL', heightCm: '180 - 188 cm', weightKg: '85 - 94 kg', waistCm: '91 - 98 cm', jeansSize: '34 - 36' },
  { size: 'XXL', heightCm: '185 - 195 cm', weightKg: '95 - 110 kg', waistCm: '99 - 108 cm', jeansSize: '36 - 38' },
];

export const PRODUCT_SPECS = [
  {
    label: 'Type de produit',
    value: 'Boxers homme coupe moderne confort',
  },
  {
    label: 'Contenu du colis',
    value: '10 boxers (Pack Solo) ou 20 boxers (Pack Duo)',
  },
  {
    label: 'Coloris inclus',
    value: 'Assortiment sobre polyvalent : Noir, Gris chiné, Bleu marine',
  },
  {
    label: 'Ceinture',
    value: 'Élastique souple sans irritation, maintien optimal',
  },
  {
    label: 'Tailles',
    value: 'S, M, L, XL, XXL (taille standard marocaine)',
  },
  {
    label: 'Entretien',
    value: 'Lavage en machine à 30°C / 40°C recommandé',
  },
];
