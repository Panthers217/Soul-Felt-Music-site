import React, { useState } from 'react';

export default function ProjectStructureViewer() {
  const [isOpen, setIsOpen] = useState(false);

  const projectStructure = `
# 📁 Soul Felt Music - Project Structure

## 📊 Complete Folder Structure Diagram

\`\`\`
Soul-Felt-Music-site/
│
├── 📂 backend/                          # Node.js/Express Backend
│   ├── 📂 config/                       # Configuration files
│   │   ├── db.js                        # MySQL database connection
│   │   ├── firebaseAdmin.js             # Firebase Admin SDK setup
│   │   ├── Cloudinary.text              # Cloudinary config notes
│   │   └── statsSchedule.json           # Scheduled stats config
│   │
│   ├── 📂 controllers/                  # Business logic layer
│   │   ├── 📂 admin/                    # Admin-specific controllers
│   │   ├── albumController.js           # Album CRUD operations
│   │   ├── artistController.js          # Artist CRUD operations
│   │   ├── authController.js            # Authentication logic
│   │   ├── cloudinaryAsyncUploadController.js  # Media uploads
│   │   ├── contactController.js         # Contact form handling
│   │   ├── eventController.js           # Events management
│   │   ├── paymentController.js         # Stripe payment processing
│   │   └── trackController.js           # Track CRUD operations
│   │
│   ├── 📂 routes/                       # API endpoint definitions
│   │   ├── admin.js                     # Admin dashboard routes
│   │   ├── album.js                     # Album API routes
│   │   ├── artist.js                    # Artist API routes
│   │   ├── auth.js                      # Authentication routes
│   │   ├── contact.js                   # Contact form routes
│   │   ├── downloads.js                 # Secure download routes
│   │   ├── events.js                    # Events routes
│   │   ├── faq.js                       # FAQ routes
│   │   ├── follow.js                    # Artist follow system
│   │   ├── genre.js                     # Genre management
│   │   ├── newsletter.js                # Newsletter subscription
│   │   ├── newsletter-campaigns.js      # Email campaigns
│   │   ├── payments.js                  # Payment processing routes
│   │   ├── purchase-history.js          # Order history routes
│   │   ├── settings.js                  # Website settings API
│   │   ├── statsSchedule.js             # Stats automation routes
│   │   └── track.js                     # Track API routes
│   │
│   ├── 📂 models/                       # Database models
│   ├── 📂 services/                     # External service integrations
│   │   └── emailService.js              # Nodemailer email service
│   │
│   ├── 📂 scripts/                      # Database migration & utility scripts
│   │   └── [50+ migration scripts]      # Various SQL migrations
│   │
│   ├── server.js                        # Main Express server entry point
│   └── package.json                     # Node dependencies & scripts
│
│
├── 📂 frontend/                         # React 19 + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/               # Reusable React components
│   │   │   ├── 📂 adminComponents/      # Admin dashboard components
│   │   │   ├── AdminDashboard.jsx       # Main admin panel
│   │   │   ├── ResponsiveNavbar.jsx     # Responsive nav system
│   │   │   ├── Footer.jsx               # Site footer
│   │   │   └── [30+ components]
│   │   │
│   │   ├── 📂 pages/                    # Full page components
│   │   │   ├── Home.jsx                 # Homepage
│   │   │   ├── Cart.jsx                 # Shopping cart
│   │   │   ├── Checkout.jsx             # Stripe checkout
│   │   │   └── [10+ pages]
│   │   │
│   │   ├── 📂 context/                  # React Context API
│   │   │   ├── ApiDataContext.jsx       # Global data state
│   │   │   ├── CartContext.jsx          # Shopping cart state
│   │   │   └── [4 context providers]
│   │   │
│   │   ├── 📂 hooks/                    # Custom React hooks
│   │   ├── 📂 utils/                    # Utility functions
│   │   ├── App.jsx                      # Main app component
│   │   └── main.jsx                     # React entry point
│   │
│   ├── index.html                       # HTML entry point
│   ├── vite.config.js                   # Vite bundler config
│   └── package.json                     # Frontend dependencies
│
│
├── 📂 database/                         # Database management
│   ├── 📂 schemas/                      # Database schema definitions
│   ├── 📂 migrations/                   # Database migrations
│   ├── 📂 seeds/                        # Sample/test data
│   └── 📂 backups/                      # Database backups
│
│
├── 📂 docs/                             # Project documentation
│   ├── 📂 features/
│   ├── 📂 seo/
│   └── 📂 setup/
│
│
├── 📄 Configuration Files
│   ├── netlify.toml                     # Netlify deployment config
│   ├── render.yaml                      # Render backend deployment
│   └── README.md                        # Main project documentation
│
└── 📄 Documentation
    ├── DEPLOYMENT_GUIDE.md
    ├── VIDEO_RECORDING_ACTIONS.md
    ├── PROJECT_STRUCTURE.md
    └── [10+ guide files]
\`\`\`

---

## 🏗️ Architecture Overview

### Backend Architecture (MVC Pattern)
\`\`\`
Request Flow:
Client → Routes → Controllers → Services → Database
                    ↓
                 Response
\`\`\`

### Frontend Architecture (Component-Based)
\`\`\`
User Interaction → Components → Context API → API Calls → Backend
                                    ↓
                               Local State
\`\`\`

---

## 🛠️ Technology Stack

### Backend Stack
- Node.js (Runtime)
- Express.js (Server framework)
- MySQL (Database - Aiven hosted)
- Firebase Admin SDK (Authentication)
- Stripe API (Payments)
- Cloudinary SDK (Media storage)
- Nodemailer (Email service)
- Node-cron (Scheduled tasks)

### Frontend Stack
- React 19 (UI framework)
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Navigation)
- Context API (State management)
- Firebase Auth (User authentication)
- Stripe Elements (Payment UI)
- Axios (HTTP client)

---

## 📊 File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| Backend Routes | 18 | API endpoint files |
| Backend Controllers | 8+ | Business logic files |
| Frontend Components | 30+ | React components |
| Frontend Pages | 10+ | Full page layouts |
| Context Providers | 4 | Global state managers |
| Database Schemas | 15+ | Table definitions |
| Migration Scripts | 50+ | Database migrations |

---

## 🎯 Navigation Cheat Sheet

| Looking for... | Navigate to... |
|----------------|----------------|
| API endpoints | backend/routes/*.js |
| Business logic | backend/controllers/*Controller.js |
| React components | frontend/src/components/*.jsx |
| Full pages | frontend/src/pages/*.jsx |
| Global state | frontend/src/context/*Context.jsx |
| Database schema | database/schemas/*.sql |
| Authentication | backend/routes/auth.js |
| Admin panel | frontend/src/components/adminComponents/ |

---

## 🎓 For Employers

This structure demonstrates:

✅ Professional Organization: Clear separation of concerns
✅ Scalability: Easy to extend and maintain
✅ Best Practices: MVC pattern, component-based architecture
✅ Production-Ready: Environment configs, deployment files
✅ Documentation: Comprehensive guides and READMEs
✅ Security: Environment variables, authentication middleware
`;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-[#f7c900] to-[#c90036] hover:from-[#c90036] hover:to-[#f7c900] text-white rounded-full p-4 shadow-2xl hover:shadow-[0_0_30px_rgba(247,201,0,0.6)] transition-all duration-300 hover:scale-110 group"
        aria-label="View Project Structure"
      >
        <svg 
          className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
          />
        </svg>
        <span className="absolute -top-10 right-0 bg-black/90 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Project Structure
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a0b0d] border-2 border-[#f7c900] rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#c90036]">
              <div className="flex items-center gap-3">
                <svg 
                  className="w-8 h-8 text-[#f7c900]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
                  />
                </svg>
                <h2 className="text-2xl font-bold text-[#e6cfa7]">
                  Project Structure
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#e6cfa7] hover:text-[#f7c900] transition-colors p-2 hover:bg-[#c90036]/20 rounded-full"
                aria-label="Close"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                <pre className="bg-[#0c0504] border border-[#c90036]/30 rounded-lg p-6 text-[#e6cfa7] text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
                  {projectStructure}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#c90036] bg-[#0c0504]">
              <div className="flex flex-wrap gap-4 justify-between items-center text-xs text-[#e6cfa7]">
                <div className="flex gap-4">
                  <span>📂 Backend: Node.js + Express</span>
                  <span>⚛️ Frontend: React 19 + Vite</span>
                  <span>🗄️ Database: MySQL (Aiven)</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-[#c90036] hover:bg-[#f7c900] text-white rounded-md transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0c0504;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #f7c900, #c90036);
          border-radius: 6px;
          border: 2px solid #0c0504;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c90036, #f7c900);
        }
      `}</style>
    </>
  );
}
