// types.ts

export interface SocialMediaStats {
  instagram?: { followers: string; link: string };
  tiktok?: { followers: string; link: string };
  youtube?: { subscribers: string; link: string };
  twitch?: { followers: string; link: string };
}

export interface Review {
  id: string;
  authorName: string;
  authorUsername: string;
  authorLocation: string;
  authorAvatarUrl: string;
  rating: number; // 0-5
  date: string; // e.g., '3 months ago'
  comment: string;
  replies?: string[]; // e.g., ['reply1', 'reply2']
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  location: string;
  avatarUrl: string;
  onlineStatus: 'Online' | 'Offline';
  category: string;
  specialties: string[];
  bio: string;
  pricePerPost: string;
  fraudScore: number;
  engagementRate: number;
  badge: 'Verified' | 'Impact Leader' | 'Macro' | 'None';
  ratings: {
    average: number;
    count: number;
    distribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
  };
  myPortfolio: string[]; // URLs or links to portfolio work
  reviews: Review[];
  socialMedia: SocialMediaStats;
}

export interface FilterOptions {
  platform?: string[];
  location?: string[];
  followersRange?: string; // e.g., '10k-50k'
  priceRange?: string; // e.g., '100-200'
  badgeLevel?: string[];
  engagementRate?: string; // e.g., '5+'
  fraudScore?: string; // e.g., '80+'
  sortOption?: 'Ratings' | 'Audience' | 'Newest' | 'Lowest Price' | 'Highest Followers' | 'Highest Engagement' | 'Lowest Fraud Risk' | 'Best Price-to-Engagement' | 'AI Best Match';
}