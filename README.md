# Visiting Angels Inc. - Healthcare Management Portal

A modern, professional healthcare agency management system designed for **Visiting Angels Inc.**, providing comprehensive tools for managing staff, clients, appointments, and team communication in the healthcare industry.

![Healthcare Portal](https://img.shields.io/badge/Healthcare-Management%20Portal-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.2-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-38b2ac.svg)

## 🏥 Overview

This application serves as a centralized management platform for healthcare agencies, specifically designed for organizations like Visiting Angels that provide both elderly care services and babysitting services. The platform enables staff to efficiently manage appointments, client information, team communications, and administrative tasks through an intuitive, accessible interface.

### 🎯 Target Users

- **Healthcare Operations Managers**: Oversee daily operations and staff coordination
- **Clinical Staff** (PSW, RN, RPN): Manage patient care and appointments
- **Administrative Staff**: Handle scheduling, client management, and communications
- **Babysitting Coordinators**: Manage childcare services and staff

## ✨ Key Features

### 📅 **Calendar Management**

- **Multi-view Calendar**: Weekly and monthly appointment views
- **Color-coded Services**: Blue for Visiting Angels, Pink for Babysitting Angels
- **Interactive Appointments**: Clickable cards with detailed information
- **Status Tracking**: Visual indicators for appointment status (confirmed, scheduled, in-progress, completed, cancelled)
- **Quick Navigation**: Easy date navigation with "Today" button

### 👥 **Staff Directory**

- **Comprehensive Staff Profiles**: Contact information, roles, specializations
- **Advanced Filtering**: Filter by role (PSW, RN, RPN, Babysitter) and employment status
- **Search Functionality**: Quick search by name, email, or phone
- **Status Management**: Track active, inactive, and on-leave staff
- **Quick Actions**: Direct contact and profile management

### 🏠 **Client Directory**

- **Detailed Client Profiles**: Contact info, service history, emergency contacts
- **Service-based Organization**: Separate tracking for different service types
- **Visit History**: Track and display last visit information
- **Emergency Contacts**: Quick access to family/emergency contact information
- **Scheduling Integration**: Direct appointment scheduling from client profiles

### 📝 **Team Communication**

- **Real-time Messaging**: Group and direct message capabilities
- **Priority-based Notes**: High/Medium/Low priority communication system
- **Team Collaboration**: Shared notes and updates visible to relevant staff
- **Message History**: Complete audit trail of communications
- **Notification System**: Unread message indicators and alerts

### ⚙️ **Settings & Administration**

- **User Profile Management**: Personal information, contact details, role management
- **Notification Preferences**: Customizable email, push, and SMS notifications
- **Application Preferences**: Theme, language, timezone, and date format settings
- **Security Controls**: Password management, two-factor authentication, data export

### 📱 **Appointment Management**

- **Detailed Appointment Views**: Complete client, staff, and service information
- **Action Buttons**: Send staff invites, confirm appointments
- **Notes Integration**: Appointment-specific notes and instructions
- **Service Documentation**: Track specific services provided during visits

## 🏗️ Technology Stack

### **Frontend Framework**

- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.5.3**: Full type safety and enhanced developer experience
- **Vite 6.2.2**: Lightning-fast build tool and development server

### **Styling & UI**

- **TailwindCSS 3.4.11**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Lucide React**: Beautiful, customizable icon library
- **Class Variance Authority**: Type-safe variant API for component styling

### **Routing & State Management**

- **React Router 6.26.2**: Client-side routing with modern patterns
- **TanStack Query 5.56.2**: Powerful data fetching and caching
- **React Hook Form 7.53.0**: Performant forms with easy validation

### **Development Tools**

- **ESLint & Prettier**: Code quality and formatting
- **Vitest**: Fast unit testing framework
- **PostCSS & Autoprefixer**: CSS processing and browser compatibility

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components (40+ components)
│   │   ├── button.tsx          # Button variants and styles
│   │   ├── card.tsx            # Card layouts
│   │   ├── dialog.tsx          # Modal dialogs
│   │   ├── input.tsx           # Form inputs
│   │   └── ...                 # Additional UI primitives
│   ├── layout/                 # Layout components
│   │   ├── Layout.tsx          # Main application layout
│   │   ├── Sidebar.tsx         # Navigation sidebar with user profile
│   │   └── Header.tsx          # Mobile header (deprecated)
│   ├── calendar/               # Calendar-specific components
│   │   ├── Calendar.tsx        # Main calendar view
│   │   └── AppointmentCard.tsx # Individual appointment cards
│   ├── directory/              # Directory components
│   │   ├── StaffCard.tsx       # Staff member cards
│   │   └── ClientCard.tsx      # Client information cards
│   ├── modals/                 # Modal dialogs
│   │   └── AppointmentModal.tsx # Appointment detail modal
│   └── notes/                  # Communication components
│       └── NotesPanel.tsx      # Notes and messaging interface
├── pages/                      # Route components
│   ├── Calendar.tsx            # Calendar page
│   ├── StaffDirectory.tsx      # Staff management page
│   ├── ClientDirectory.tsx     # Client management page
│   ├── Notes.tsx               # Team communication page
│   ├── Messages.tsx            # Real-time messaging page
│   ├── Settings.tsx            # User settings page
│   ├── Index.tsx               # Landing page (redirects to calendar)
│   └── NotFound.tsx            # 404 error page
├── types/
│   └── index.ts                # TypeScript type definitions
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
├── hooks/                      # Custom React hooks
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd visiting-angels-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run typecheck` - Validate TypeScript types
- `npm run format.fix` - Format code with Prettier

## 🎨 Design System

### **Color Palette**

- **Primary Blue** (`#2563eb`): Visiting Angels service type
- **Primary Pink** (`#db2777`): Babysitting Angels service type
- **Neutral Grays** (`#f8fafc` to `#1e293b`): UI backgrounds and text
- **Status Colors**: Green (active/confirmed), Yellow (pending), Red (inactive/cancelled)

### **Typography**

- **Headings**: `font-bold` with appropriate sizing (`text-xl`, `text-2xl`)
- **Body Text**: `font-medium` or `font-regular` in slate colors
- **Small Text**: `text-sm` or `text-xs` for secondary information

### **Component Patterns**

- **Cards**: Consistent padding, borders, and hover states
- **Buttons**: Multiple variants (default, outline, ghost) with appropriate sizing
- **Forms**: Consistent labeling, validation, and error handling
- **Navigation**: Clear active states and intuitive grouping

## 👤 User Experience

### **Navigation Flow**

1. **Landing**: Automatic redirect to Calendar (primary workflow)
2. **Sidebar Navigation**: Always-visible navigation with user context
3. **Service Toggle**: Quick switching between Visiting Angels and Babysitting Angels
4. **Quick Actions**: Direct access to common tasks (scheduling, contacting, etc.)

### **Data Management**

- **Mock Data**: Realistic sample data for demonstration and development
- **Type Safety**: Full TypeScript coverage for all data models
- **State Management**: Efficient React state patterns with minimal re-renders
- **Future API Integration**: Clean separation ready for backend integration

### **Responsive Design**

- **Desktop First**: Optimized for healthcare professional workflows
- **Mobile Responsive**: Accessible on tablets and mobile devices
- **Touch Friendly**: Appropriate touch targets and gestures
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🔒 Security & Privacy

### **Data Protection**

- Client information properly handled with consideration for healthcare privacy
- Secure authentication patterns ready for implementation
- Role-based access control structure in place

### **Best Practices**

- Input validation and sanitization
- Secure routing and navigation
- Error boundary implementation
- Performance optimization techniques

## 🚀 Deployment

### **Production Build**

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### **Deployment Options**

- **Vercel**: Optimal for React applications with automatic deployments
- **Netlify**: Simple static site hosting with continuous deployment
- **AWS S3 + CloudFront**: Scalable solution for larger organizations
- **Traditional Web Servers**: Apache, Nginx with standard static file serving

## 🔮 Future Enhancements

### **Planned Features**

- **Real-time Updates**: WebSocket integration for live data synchronization
- **Advanced Reporting**: Analytics dashboard for operational insights
- **Mobile App**: React Native companion application
- **Integration APIs**: EHR system integrations, payment processing
- **Advanced Scheduling**: Recurring appointments, availability management
- **Document Management**: File uploads, document sharing, digital signatures

### **Technical Improvements**

- **Performance**: Code splitting, lazy loading, service workers
- **Testing**: Comprehensive test coverage, E2E testing
- **Monitoring**: Error tracking, performance monitoring, user analytics
- **Internationalization**: Multi-language support for diverse teams

## 🤝 Contributing

### **Development Guidelines**

1. Follow the existing code style and patterns
2. Write meaningful commit messages
3. Add appropriate TypeScript types for new features
4. Test new functionality thoroughly
5. Update documentation for significant changes

### **Code Style**

- Use TypeScript for all new code
- Follow the established component patterns
- Maintain consistent naming conventions
- Write self-documenting code with clear variable names

## 📄 License

This project is proprietary software developed for Visiting Angels Inc. All rights reserved.

## 📞 Support

For technical support or questions about the healthcare management portal:

- **Development Team**: Contact your development team lead
- **Operations Support**: Reach out to your IT administrator
- **Feature Requests**: Submit through your organization's standard channels

---

**Built with ❤️ for healthcare professionals making a difference in people's lives.**
