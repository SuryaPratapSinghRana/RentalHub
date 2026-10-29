# RentHub — Apartment Rental Application

RentHub is an apartment rental web application built with **Angular 21**. It allows landlords to manage property listings and renters to discover apartments, save favourites, contact landlords, and interact through comments and replies.

## 🔗 Links
- **GitHub:** https://github.com/SuryaPratapSinghRana/RentalHub.git
- **Live Demo:** https://rental-hub-beryl.vercel.app

## 🔐 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Landlord | landlord@test.com | Test@1234 |
| Renter | renter@test.com | Test@1234 |

## ✨ Features
- User registration, login, and form validation.
- Route guards and owner-based listing management.
- Property search, filtering, sorting, and pagination.
- Create, edit, and delete apartment listings.
- Preview and Submit screen before publishing a listing (bonus).
- Upload up to 3 property images.
- Add or remove favourites.
- Send inquiries and post comments with replies.
- Manage listings, favourites, and inquiries through the profile page.

## 🎁 Bonus Features
- **Preview and Submit screen (attempted):** after filling the Create Post form, users see a preview page showing the property type, address, rent, description, amenities and photos. From there they can go back to edit or confirm and submit the listing.

## 🛠️ Tech Stack
- **Framework:** Angular 21, TypeScript
- **UI:** Bootstrap 5, Custom CSS
- **State Management:** Angular Signals
- **Forms:** Reactive Forms
- **Navigation:** Angular Router, Route Guards
- **Storage:** Browser localStorage

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/SuryaPratapSinghRana/RentalHub.git
cd RentalHub
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the application**
```bash
npm start
```

Open `http://localhost:4200/` in your browser.

## 🌐 Deployment

The app is deployed on Vercel. Build command: `npm run build`. Output directory: `dist/renthub/browser`. A `vercel.json` rewrite sends all routes to `index.html`, so refreshing any page works.

## 🧪 Testing

The project includes **17 tests** covering authentication, listing services, route guards, components, and routing configuration.

Run tests using:
```bash
npm test
```

## ⚠️ Limitations

- Data is stored in browser `localStorage` and is not shared across devices.
- Authentication and authorization are client-side only.
- Demo passwords are stored in plain text.
- Image uploads are stored as Base64 data, subject to browser storage limits.
- No backend API or centralized database is used.

## 🔮 Future Enhancements

- Integrate a backend and database.
- Implement secure authentication and authorization.
- Add cloud-based image storage.
- Introduce integration and end-to-end testing.

## 🎯 Project Objective

Demonstrate Angular development skills through standalone components, signals, reactive forms, routing, route guards, reusable components, and client-side data persistence.