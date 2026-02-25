# Holidays Care - Travel Agency Website

![Holidays Care](https://img.shields.io/badge/Travel-Agency-blue)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Status](https://img.shields.io/badge/Status-Ready-success)

**"We Take Care of Your Memories"**

A full-stack travel agency website built with the MERN stack (MongoDB, Express, React, Node.js) and Material-UI for a modern, professional design.

## 🌟 Features

### Public Features
- **Home Page**
  - Dynamic hero section with carousel
  - Why Choose Us section
  - Featured tours showcase
  - Customer testimonials
  - Call-to-action banner
  
- **About Us Page**
  - Mission & Vision
  - Why We Are Different
  - Team section
  - Company statistics

- **Tours Page**
  - Domestic and International tour categories
  - Beautiful tour cards with images
  - Price and duration information
  - WhatsApp enquiry integration

- **Contact Page**
  - Contact information cards
  - Enquiry form with validation
  - WhatsApp integration
  - Google Maps integration
  - Email notifications

- **WhatsApp Integration**
  - Sticky floating button on all pages
  - Direct enquiry from tour cards
  - Automated message templates

### Admin Features
- **Secure Authentication**
  - JWT-based login system
  - Protected routes
  
- **Tours Management**
  - Create, edit, delete tours
  - Upload multiple images
  - Set pricing and duration
  - Mark tours as featured
  - Domestic/International categorization

- **Hero Images Management**
  - Upload hero banner images
  - Set titles and subtitles
  - Manage carousel images

- **Enquiry Management**
  - View all customer enquiries
  - Update enquiry status (New/Contacted/Closed)
  - Full contact details

## 🚀 Tech Stack

### Frontend
- React 18.2
- Material-UI (MUI) 5.15
- React Router DOM 6.20
- Axios
- Emotion (for styling)

### Backend
- Node.js
- Express 4.18
- MongoDB with Mongoose
- JWT Authentication
- Multer (file uploads)
- bcryptjs (password hashing)
- CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd holidays-care
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/holidays-care
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
WHATSAPP_NUMBER=+919999999999
```

Start MongoDB:
```bash
# On macOS/Linux
sudo systemctl start mongodb

# On Windows
net start MongoDB
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 👤 Default Admin Credentials

**First-time setup:**
1. Register an admin account at `http://localhost:5173/admin/login`
2. Use the following default credentials:
   - Email: `admin@holidayscare.com`
   - Password: `admin123`

**To create the first admin account via API:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@holidayscare.com",
  "password": "admin123"
}
```


## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create tour (protected)
- `PUT /api/tours/:id` - Update tour (protected)
- `DELETE /api/tours/:id` - Delete tour (protected)

### Hero Images
- `GET /api/hero` - Get all hero images
- `POST /api/hero` - Create hero image (protected)
- `PUT /api/hero/:id` - Update hero image (protected)
- `DELETE /api/hero/:id` - Delete hero image (protected)

### Contact
- `POST /api/contact` - Submit enquiry
- `GET /api/contact` - Get all enquiries (protected)
- `PUT /api/contact/:id` - Update status (protected)
- `DELETE /api/contact/:id` - Delete enquiry (protected)

---

**Holidays Care - We Take Care of Your Memories** ✈️🌍
