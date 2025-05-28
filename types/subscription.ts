export type SubscriptionStatus = 'active' | 'trialing' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid';

export interface SubscriptionData {
  status: SubscriptionStatus;
  customerId: string;
  subscriptionId: string;
  priceId: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

export interface UserMetadata {
  subscription?: SubscriptionData;
} 