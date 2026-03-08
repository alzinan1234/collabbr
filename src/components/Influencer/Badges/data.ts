export const BADGE_TIERS = [
  { id: 'starter', name: 'Starter', price: 9.99, color: 'text-green-500', bg: 'bg-green-500', icon: 'ArrowUp' },
  { id: 'verified', name: 'Verified', price: 19.99, color: 'text-blue-500', bg: 'bg-blue-500', icon: 'CheckCircle2' },
  { id: 'pro', name: 'Pro', price: 29.99, color: 'text-yellow-500', bg: 'bg-yellow-500', icon: 'Star' },
  { id: 'elite', name: 'Elite', price: 49.99, color: 'text-black', bg: 'bg-black', icon: 'Diamond' },
  { id: 'impact', name: 'Impact Leader', price: 79.99, color: 'text-purple-600', bg: 'bg-purple-600', icon: 'Crown' },
];

export type UserBadgeState = {
  currentBadgeId: string | null;
  status: 'active' | 'canceled' | 'none';
  earnedBadgeIds: string[]; // Progression tracking
  autoRenew: boolean;
};