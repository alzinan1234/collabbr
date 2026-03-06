// data.ts

export type Campaign = {
  id: string;
  name: string;
  thumbnail: string;
  expiredInDays: number;
  expiredInHours: number;
  budget: number;
  status: 'In Progress' | 'Completed' | 'Upcoming';
};

export type InfluencerStats = {
  profile: {
    name: string;
    username: string;
    location: string;
    profileImage: string;
    badge: 'Verified' | 'Unverified';
    fraudScore: number; // Out of 100
    rating: number; // Out of 5
  };
  earnings: {
    earnedThisMonth: number;
    availableBalance: number;
  };
};

export const mockInfluencerStats: InfluencerStats = {
  profile: {
    name: 'Sara Afrin',
    username: '@sana_afrin03',
    location: 'Dhaka, Bangladesh',
    profileImage: 'https://i.pravatar.cc/300?u=afrin', // Placeholder image URL
    badge: 'Verified',
    fraudScore: 25,
    rating: 4.8,
  },
  earnings: {
    earnedThisMonth: 235,
    availableBalance: 525,
  },
};

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign_01',
    name: 'Urban Fit Collection 2025',
    thumbnail: 'https://example.com/urban-fit.jpg', // Replace with real thumbnail
    expiredInDays: 5,
    expiredInHours: 4,
    budget: 250,
    status: 'In Progress',
  },
  // ... Add 3 more mock campaigns to match the image
];