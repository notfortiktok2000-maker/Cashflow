import { Offer } from '../config/offers';

export type TrackingStatus =
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingStep {
  status: TrackingStatus;
  label: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface StoredOrder {
  orderId: string;
  createdAt: string;
  offer: Offer;
  size: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
  };
  tracking: {
    status: TrackingStatus;
    carrier: string;
    trackingCode: string;
    estimatedDelivery: string;
    history: TrackingStep[];
  };
}
