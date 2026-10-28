export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Listing {
  id: number;
  ownerId: number;
  ownerName: string;
  title: string;
  description: string;
  propertyType: string;
  buildingName: string;
  shared: boolean;
  address: string;
  city: string;
  sqft: number;
  leaseType: string;
  rent: number;
  negotiable: boolean;
  priceMode: string;
  furnished: boolean;
  vegetarian: string;
  amenities: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  photos: string[];
  featured: boolean;
}

export interface Comment {
  id: number;
  listingId: number;
  parentId: number | null;
  userId: number;
  userName: string;
  text: string;
  date: string;
}

export interface Inquiry {
  id: number;
  listingId: number;
  listingTitle: string;
  ownerId: number;
  fromName: string;
  fromEmail: string;
  message: string;
  date: string;
}

export const AMENITY_LIST: string[] = [
  'Gym/Fitness Center', 'Swimming Pool', 'Car Park', 'Visitors Parking',
  'Power Backup', 'Garbage Disposal', 'Private Lawn', 'Water Heater',
  'Plant Security System', 'Laundry Service', 'Elevator', 'Club House'
];

export const PROPERTY_TYPES: string[] = ['Apartment', 'Independent House', 'Villa', 'Studio', 'Room'];
