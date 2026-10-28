import { Listing } from '../models/models';

// listings shown the first time the app opens
export const SAMPLE_LISTINGS: Listing[] = [
  {
    "id": 1,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "Sunny 2BHK near Cyber Hub",
    "description": "Sunny 2BHK near Cyber Hub in Gurugram. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Apartment",
    "buildingName": "Skyline Heights",
    "shared": false,
    "address": "Sector 54, Golf Course Road",
    "city": "Gurugram",
    "sqft": 1150,
    "leaseType": "long",
    "rent": 1400,
    "negotiable": true,
    "priceMode": "per-month",
    "furnished": true,
    "vegetarian": "no-preference",
    "amenities": [
      "Gym/Fitness Center",
      "Swimming Pool",
      "Car Park",
      "Power Backup",
      "Elevator"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": true
  },
  {
    "id": 2,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "Furnished studio in Indiranagar",
    "description": "Furnished studio in Indiranagar in Bengaluru. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Studio",
    "buildingName": "Leaf Residency",
    "shared": false,
    "address": "12th Main, Indiranagar",
    "city": "Bengaluru",
    "sqft": 450,
    "leaseType": "both",
    "rent": 650,
    "negotiable": false,
    "priceMode": "per-month",
    "furnished": true,
    "vegetarian": "no-preference",
    "amenities": [
      "Power Backup",
      "Water Heater",
      "Laundry Service"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": true
  },
  {
    "id": 3,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "Villa with private lawn",
    "description": "Villa with private lawn in Pune. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Villa",
    "buildingName": "Palm Grove",
    "shared": false,
    "address": "Koregaon Park, Lane 6",
    "city": "Pune",
    "sqft": 2600,
    "leaseType": "long",
    "rent": 3200,
    "negotiable": true,
    "priceMode": "per-month",
    "furnished": false,
    "vegetarian": "no-preference",
    "amenities": [
      "Private Lawn",
      "Car Park",
      "Visitors Parking"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": true
  },
  {
    "id": 4,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "Room in shared flat",
    "description": "Room in shared flat in Gurugram. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Room",
    "buildingName": "Maple Court",
    "shared": true,
    "address": "Sector 49, Sohna Road",
    "city": "Gurugram",
    "sqft": 180,
    "leaseType": "short",
    "rent": 320,
    "negotiable": true,
    "priceMode": "per-month",
    "furnished": true,
    "vegetarian": "no-preference",
    "amenities": [
      "Water Heater",
      "Laundry Service"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": false
  },
  {
    "id": 5,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "3BHK with lake view",
    "description": "3BHK with lake view in Hyderabad. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Apartment",
    "buildingName": "Lakeside Residency",
    "shared": false,
    "address": "Gachibowli, ISB Road",
    "city": "Hyderabad",
    "sqft": 1650,
    "leaseType": "long",
    "rent": 1900,
    "negotiable": true,
    "priceMode": "per-month",
    "furnished": false,
    "vegetarian": "no-preference",
    "amenities": [
      "Gym/Fitness Center",
      "Swimming Pool",
      "Club House",
      "Elevator"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": false
  },
  {
    "id": 6,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "1BHK with balcony",
    "description": "1BHK with balcony in Bengaluru. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Apartment",
    "buildingName": "Aster Park",
    "shared": false,
    "address": "Whitefield Main Road",
    "city": "Bengaluru",
    "sqft": 700,
    "leaseType": "long",
    "rent": 900,
    "negotiable": false,
    "priceMode": "per-month",
    "furnished": true,
    "vegetarian": "no-preference",
    "amenities": [
      "Elevator",
      "Car Park"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": false
  },
  {
    "id": 7,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "Independent house in Aundh",
    "description": "Independent house in Aundh in Pune. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Independent House",
    "buildingName": "Green Nest",
    "shared": false,
    "address": "Aundh Road, Sanewadi",
    "city": "Pune",
    "sqft": 1300,
    "leaseType": "both",
    "rent": 1100,
    "negotiable": true,
    "priceMode": "per-month",
    "furnished": false,
    "vegetarian": "no-preference",
    "amenities": [
      "Car Park",
      "Private Lawn"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": false
  },
  {
    "id": 8,
    "ownerId": 1,
    "ownerName": "Landlord Demo",
    "title": "4BHK penthouse",
    "description": "4BHK penthouse in Hyderabad. Well maintained, close to market, schools and public transport. Contact the owner to arrange a visit.",
    "propertyType": "Apartment",
    "buildingName": "Crest Towers",
    "shared": false,
    "address": "Jubilee Hills, Road 36",
    "city": "Hyderabad",
    "sqft": 3100,
    "leaseType": "long",
    "rent": 4800,
    "negotiable": false,
    "priceMode": "per-month",
    "furnished": true,
    "vegetarian": "no-preference",
    "amenities": [
      "Gym/Fitness Center",
      "Swimming Pool",
      "Elevator",
      "Club House",
      "Visitors Parking"
    ],
    "contactName": "Landlord Demo",
    "contactEmail": "landlord@test.com",
    "contactPhone": "9810000000",
    "photos": [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
    ],
    "featured": false
  }
];
