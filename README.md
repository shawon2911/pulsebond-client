# 🩸 Pulse Bond — Client
 
A full-stack blood donation platform that connects donors with people in need. Built with Next.js App Router, featuring role-based dashboards, real-time donation request management, and donor search by location and blood group.
 
---
 
## 🌐 Live Demo
 
- **Frontend:** [https://pulse-bond-client.vercel.app](https://pulse-bond-client.vercel.app)
- **Backend:** [https://pulse-bond-server.vercel.app](https://pulse-bond-server.vercel.app)
---
 
## ✨ Features
 
- 🔐 Authentication with Better Auth (JWT-based)
- 👥 Role-based access control — Admin, Donor, Volunteer
- 🩸 Create, edit, and manage blood donation requests
- 🔎 Search donors by blood group, district, and upazila
- 📊 Admin dashboard with full user & request management
- 📍 Bangladesh geodata — district & upazila dropdowns
- 📱 Responsive UI with dark-themed design
- 🔒 Protected routes via Next.js middleware
---
 
## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | HeroUI |
| Authentication | Better Auth + JWT |
| Database | MongoDB |
| Backend | Express.js |
| Deployment | Vercel |
 
---
 
## 📁 Project Structure
 
```
pulse-bond-client/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── admin/
│   │   │   ├── all-requests/
│   │   │   └── all-users/
│   │   ├── donor/
│   │   └── volunteer/
│   ├── donation-requests/
│   │   └── [id]/
│   └── layout.js
├── Components/
│   └── Dashboard/
├── data/
│   ├── districts.json
│   └── upazilas.json
├── lib/
│   ├── auth.js
│   ├── auth-client.js
│   └── api/
│       └── action.js
└── middleware.js
```
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- Node.js 18+
- MongoDB Atlas account
- Vercel account (for deployment)
### Installation
 
1. Clone the repository
```bash
git clone https://github.com/shawon2911/pulsebond-client
cd pulse-bond-client
```
 
2. Install dependencies
```bash
npm install
```
 
3. Create a `.env.local` file in the root directory
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
```
 
4. Run the development server
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## 🔐 Role-Based Access
 
| Role | Access |
|---|---|
| **Admin** | Full access — manage all users and donation requests |
| **Donor** | Create and manage own donation requests |
| **Volunteer** | View and assist with donation requests |
 
Route protection is handled via `middleware.js` using Better Auth session validation.
 
---
 
## 🌍 Environment Variables
 
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | Backend API base URL |
| `BETTER_AUTH_SECRET` | Secret key for Better Auth |
| `BETTER_AUTH_URL` | Frontend base URL |
 
---
 
## 📦 Related Repository
 
- **Backend (Express.js):** [pulse-bond-server](https://github.com/shawon2911/pulsebond-server)
---
 
## 📄 License
 
This project is open source and available under the [MIT License](LICENSE).