# 📋 RSVP System

A comprehensive RSVP system to track and manage attendees of sessions and workshops. Built with React, Node.js, and MongoDB, implementing all required web development concepts.

## ✨ Features Implemented

### Frontend (React/JSX)
- ✅ **Semantic HTML Tags**: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<fieldset>`, `<legend>`
- ✅ **Input Tags**: Various input types with proper validation
- ✅ **Forms**: Controlled components with comprehensive form handling
- ✅ **Anchor Tags**: React Router `Link` and `NavLink` components
- ✅ **React Router**: Client-side routing with active state management
- ✅ **Responsive Design**: Mobile-first approach with media queries

### CSS/Styling
- ✅ **CSS Selectors**: Comprehensive class-based styling
- ✅ **Box Model**: Proper padding, margins, and borders
- ✅ **Typography, Colors, and Backgrounds**: Consistent design system
- ✅ **Layout and Positioning**: Flexbox and CSS Grid layouts
- ✅ **Responsive Web Design**: Mobile-responsive with breakpoints
- ✅ **Contact Form**: Styled contact form with validation
- ✅ **CSS Grid**: Grid layouts for responsive design
- ✅ **Media Queries**: Comprehensive responsive breakpoints

### JavaScript/React Features
- ✅ **ES6+ Features**: Arrow functions, destructuring, template literals, async/await
- ✅ **React Component Lifecycle**: useEffect hooks for side effects
- ✅ **Props and State**: Comprehensive state management
- ✅ **Event Handling**: Form submissions, button clicks, navigation
- ✅ **Conditional Rendering**: Dynamic UI based on state
- ✅ **Forms and Controlled Components**: Full form validation
- ✅ **Routing**: React Router with active states
- ✅ **API Calls**: Axios for HTTP requests
- ✅ **Error Handling**: Comprehensive error states and validation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **React Router v6** - Client-side routing with NavLink
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure environment variables**
   ```bash
   # In server/config.env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/rsvp-system
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
rsvp-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── RSVPForm.jsx        # Main RSVP form
│   │   │   ├── AttendeeList.jsx    # Attendee management
│   │   │   └── ContactForm.jsx     # Contact form
│   │   ├── App.jsx         # Main app with routing
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Comprehensive styling
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   ├── seed-data.js       # Sample data
│   └── package.json
└── README.md
```

## 🎯 Core Components

### Frontend Components
- **RSVPForm**: Comprehensive form with validation, conditional rendering, and error handling
- **AttendeeList**: Data display with search, filtering, and CRUD operations
- **ContactForm**: Contact form with validation and accessibility features
- **App**: Main component with routing and responsive navigation

### Backend
- **RSVP Model**: MongoDB schema for attendee data
- **RSVP Routes**: RESTful API endpoints
- **Server**: Express.js server with CORS and middleware

### API Endpoints
- `GET /api/rsvp` - Get all attendees
- `POST /api/rsvp` - Create new RSVP
- `DELETE /api/rsvp/:id` - Delete RSVP

## 🎨 Implemented Features

### RSVP Form
- ✅ **Form Validation**: Real-time and submit-time validation
- ✅ **Controlled Components**: All form inputs are controlled
- ✅ **Conditional Rendering**: Advanced fields toggle
- ✅ **Error Handling**: Comprehensive error states
- ✅ **Accessibility**: ARIA labels and proper form structure
- ✅ **Responsive Design**: Mobile-friendly layout

### Attendee Management
- ✅ **Data Display**: Responsive table with search
- ✅ **CRUD Operations**: Create, read, delete functionality
- ✅ **Search & Filter**: Real-time search functionality
- ✅ **Status Indicators**: Visual status badges
- ✅ **Responsive Table**: Mobile-optimized data display

### Contact Form
- ✅ **Form Validation**: Email validation and required fields
- ✅ **Error States**: Visual error indicators
- ✅ **Success Feedback**: User feedback on submission
- ✅ **Accessibility**: Proper form labels and ARIA attributes

### Navigation & Routing
- ✅ **React Router**: Client-side routing
- ✅ **NavLink**: Active state management
- ✅ **Responsive Navigation**: Mobile hamburger menu
- ✅ **Semantic HTML**: Proper header, main, footer structure

### Styling & Design
- ✅ **Tailwind CSS**: Utility-first styling
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **CSS Grid**: Grid layouts for responsive design
- ✅ **Flexbox**: Flexible layouts
- ✅ **Media Queries**: Comprehensive breakpoints
- ✅ **Accessibility**: Focus states and keyboard navigation
- ✅ **Animations**: Smooth transitions and hover effects

## 🔧 Technical Implementation

### React Features
- **Hooks**: useState, useEffect for state and side effects
- **Event Handling**: Form submissions, button clicks, navigation
- **Conditional Rendering**: Dynamic UI based on state
- **Controlled Components**: Form inputs with state management
- **Error Boundaries**: Error handling and user feedback

### CSS Features
- **Responsive Design**: Mobile-first with breakpoints
- **CSS Grid**: Grid layouts for complex arrangements
- **Flexbox**: Flexible layouts and alignment
- **Media Queries**: Device-specific styling
- **Accessibility**: Focus states and keyboard navigation
- **Animations**: Smooth transitions and micro-interactions

### JavaScript Features
- **ES6+**: Arrow functions, destructuring, template literals
- **Async/Await**: Promise handling for API calls
- **Error Handling**: Try-catch blocks and error states
- **Form Validation**: Client-side validation with feedback

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy server directory
3. Update frontend API URLs

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** using CSS Grid and Flexbox
- **Touch-friendly** interface elements
- **Optimized typography** for all screen sizes

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** and descriptions
- **Keyboard navigation** support
- **Focus management** with visible focus indicators
- **Screen reader** friendly content
- **High contrast** mode support
- **Reduced motion** preferences

---

**A comprehensive RSVP system meeting all web development requirements! 📋** 