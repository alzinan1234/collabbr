// data/mockInfluencers.ts

import { Influencer } from "./types";


export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Sana Ullah',
    username: 'sana.672',
    location: 'Dhaka, Bangladesh',
    avatarUrl: 'https://i.pravatar.cc/150?u=sana',
    onlineStatus: 'Online',
    category: 'Tech & Gaming',
    specialties: ['Tech', 'Gaming'],
    bio: 'Professional tech reviewer and gamer.',
    pricePerPost: '$150.00',
    fraudScore: 95,
    engagementRate: 4.5,
    badge: 'Impact Leader',
    ratings: {
      average: 4.9,
      count: 128,
      distribution: { 5: 100, 4: 20, 3: 5, 2: 2, 1: 1 }
    },
    myPortfolio: [],
    reviews: [],
    socialMedia: {
      instagram: { followers: '120k', link: '#' },
      tiktok: { followers: '500k', link: '#' }
    }
  },
  {
    id: '2',
    name: 'Tanvir Ahmed',
    username: 'tanvir.dev',
    location: 'London, UK',
    avatarUrl: 'https://i.pravatar.cc/150?u=tanvir',
    onlineStatus: 'Online',
    category: 'Lifestyle',
    specialties: ['Vlog', 'Fashion'],
    bio: 'Lifestyle and travel enthusiast.',
    pricePerPost: '$250.00',
    fraudScore: 88,
    engagementRate: 3.2,
    badge: 'Verified',
    ratings: {
      average: 4.7,
      count: 85,
      distribution: { 5: 60, 4: 15, 3: 5, 2: 3, 1: 2 }
    },
    myPortfolio: [],
    reviews: [],
    socialMedia: {
      youtube: { subscribers: '1M', link: '#' },
      instagram: { followers: '300k', link: '#' }
    }
  }
];