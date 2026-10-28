# RentHub — Apartment Rental Application

RentHub is an apartment rental web application built with **Angular 21**. It allows landlords to manage property listings and renters to discover apartments, save favourites, contact landlords, and interact through comments and replies.

## 🔗 Links
- **GitHub:** https://github.com/SuryaPratapSinghRana/RentalHub.git
- **Live Demo:** https://<your-app>.vercel.app

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
- Upload up to 3 property images.
- Add or remove favourites.
- Send inquiries and post comments with replies.
- Manage listings, favourites, and inquiries through the profile page.

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
cd RentHub
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



## 🧪 Testing

The project includes **15 tests** covering authentication, listing services, route guards, components, and routing configuration.

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
