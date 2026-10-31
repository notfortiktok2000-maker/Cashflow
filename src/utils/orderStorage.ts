import { StoredOrder } from '../types/order';
import { Offer, OFFERS } from '../config/offers';
import { CustomerFormData, validateAndNormalizeMoroccanPhone } from './whatsapp';

const STORAGE_KEY = 'essentiels_ma_orders_v1';

const DEMO_ORDERS: StoredOrder[] = [
  {
    orderId: 'MA-8492',
    createdAt: 'Hier, 14:30',
    offer: OFFERS.duo,
    size: 'L',
    customer: {
      firstName: 'Youssef',
      lastName: 'El Idrissi',
      phone: '0661234567',
      city: 'Casablanca',
      address: 'Quartier Maârif, Rue Abou El Kacem Kotbari, Imm. 12',
    },
    tracking: {
      status: 'out_for_delivery',
      carrier: 'Cathedis Express Maroc',
      trackingCode: 'CTH-982144-MA',
      estimatedDelivery: "Aujourd'hui entre 14h et 18h",
      history: [
        {
          status: 'confirmed',
          label: 'Commande confirmée',
          description: 'Commande validée avec le client sur WhatsApp',
          date: 'Hier, 14:35',
          completed: true,
        },
        {
          status: 'preparing',
          label: 'Préparation en entrepôt',
          description: 'Colis Pack Duo vérifié et emballé au Hub Casablanca',
          date: 'Hier, 17:15',
          completed: true,
        },
        {
          status: 'shipped',
          label: 'Expédié avec le transporteur',
          description: 'Prise en charge par Cathedis Express',
          date: "Aujourd'hui, 08:30",
          completed: true,
        },
        {
          status: 'out_for_delivery',
          label: 'En cours de livraison',
          description: 'Le livreur est en route vers votre adresse',
          date: "Aujourd'hui, 11:20",
          completed: true,
          current: true,
        },
        {
          status: 'delivered',
          label: 'Livraison & Paiement',
          description: 'Paiement de 269 DH à remettre au livreur',
          date: 'Prévu cet après-midi',
          completed: false,
        },
      ],
    },
  },
  {
    orderId: 'MA-3104',
    createdAt: 'Il y a 2 jours, 11:00',
    offer: OFFERS.solo,
    size: 'XL',
    customer: {
      firstName: 'Hamza',
      lastName: 'Tazi',
      phone: '0672981122',
      city: 'Rabat',
      address: 'Agdal, Avenue de France, Résidence Les Fleurs',
    },
    tracking: {
      status: 'delivered',
      carrier: 'Amana Express',
      trackingCode: 'AMN-441209-MA',
      estimatedDelivery: 'Colis remis avec succès',
      history: [
        {
          status: 'confirmed',
          label: 'Commande confirmée',
          description: 'Commande enregistrée',
          date: 'Il y a 2 jours, 11:05',
          completed: true,
        },
        {
          status: 'preparing',
          label: 'Préparation terminée',
          description: 'Contrôle qualité effectué',
          date: 'Il y a 2 jours, 15:40',
          completed: true,
        },
        {
          status: 'shipped',
          label: 'Expédié',
          description: 'Colis acheminé vers le centre de tri Rabat',
          date: 'Hier, 09:10',
          completed: true,
        },
        {
          status: 'out_for_delivery',
          label: 'Tournée de livraison',
          description: 'Attribué au coursier Rabat Agdal',
          date: 'Hier, 13:00',
          completed: true,
        },
        {
          status: 'delivered',
          label: 'Colis livré et encaissé',
          description: 'Montant de 199 DH réglé en espèces',
          date: 'Hier, 16:25',
          completed: true,
          current: true,
        },
      ],
    },
  },
];

export function getStoredOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ORDERS));
      return DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_ORDERS;
  } catch {
    return DEMO_ORDERS;
  }
}

export function saveNewOrder(
  offer: Offer,
  size: string,
  customer: CustomerFormData
): StoredOrder {
  const existing = getStoredOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `MA-${randomSuffix}`;

  const now = new Date();
  const formattedDate = `${now.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })}, ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

  const newOrder: StoredOrder = {
    orderId,
    createdAt: formattedDate,
    offer,
    size,
    customer,
    tracking: {
      status: 'confirmed',
      carrier: 'Cathedis Express Maroc',
      trackingCode: `CTH-${Math.floor(100000 + Math.random() * 900000)}-MA`,
      estimatedDelivery: 'Sous 24h à 48h ouvrées',
      history: [
        {
          status: 'confirmed',
          label: 'Commande reçue & transmise',
          description: 'Message de commande généré pour WhatsApp',
          date: formattedDate,
          completed: true,
          current: true,
        },
        {
          status: 'preparing',
          label: 'Préparation en entrepôt',
          description: `Pack ${offer.name} (${size}) en cours d'emballage`,
          date: 'En attente',
          completed: false,
        },
        {
          status: 'shipped',
          label: 'Pris en charge transporteur',
          description: 'Colis remis à Cathedis Express',
          date: 'Sous 24h',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          label: 'En cours de livraison',
          description: `Livraison à ${customer.city}`,
          date: 'Sous 48h',
          completed: false,
        },
        {
          status: 'delivered',
          label: 'Paiement à la livraison',
          description: `Règlement de ${offer.price} DH au livreur`,
          date: 'À la réception',
          completed: false,
        },
      ],
    },
  };

  const updated = [newOrder, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }

  return newOrder;
}

export function findOrderByQuery(query: string): StoredOrder | null {
  const orders = getStoredOrders();
  const cleanQuery = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (!cleanQuery) return null;

  // Exact or partial orderId match
  const matchById = orders.find((o) => {
    const cleanId = o.orderId.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return cleanId === cleanQuery || cleanId.endsWith(cleanQuery) || cleanQuery.endsWith(cleanId);
  });
  if (matchById) return matchById;

  // Phone match
  const phoneNormalized = validateAndNormalizeMoroccanPhone(query).normalized.replace(/\D/g, '');
  if (phoneNormalized && phoneNormalized.length >= 8) {
    const matchByPhone = orders.find((o) => {
      const cleanPhone = o.customer.phone.replace(/\D/g, '');
      return cleanPhone.includes(phoneNormalized) || phoneNormalized.includes(cleanPhone);
    });
    if (matchByPhone) return matchByPhone;
  }

  return null;
}
