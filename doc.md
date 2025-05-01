# BugSense Frontend Documentation

## Overview

BugSense is a comprehensive bug tracking and project management application designed to help development teams track, manage, and resolve software issues. This application provides an intuitive interface for reporting bugs, organizing projects, managing team collaboration, and analyzing bug metrics.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```

### Running the Application
Start the development server:
```bash
npm run dev
```

The application will be available at:
- Local: http://localhost:5173/ (may use alternative ports like 5174, 5175 if the default is already in use)

## Application Architecture

BugSense is built using SvelteKit and follows a modern frontend architecture:

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS with custom theme variables
- **State Management**: Svelte stores and context API
- **Routing**: SvelteKit file-based routing system

### Directory Structure

```
BugSense-FE/
├── src/
│   ├── lib/                 # Shared components and utilities
│   │   ├── components/      # UI components
│   │   │   ├── atoms/       # Basic UI elements
│   │   │   ├── molecules/   # Compound components
│   │   │   ├── organisms/   # Complex components
│   │   │   ├── templates/   # Layout templates
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── features/        # Feature-specific logic
│   │   ├── hooks/           # Custom hooks
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── routes/              # Application routes/pages
│       ├── bugs/            # Bug tracking pages
│       ├── dashboard/       # Dashboard page
│       ├── developer/       # Developer settings
│       ├── documentation/   # Documentation pages
│       ├── help-support/    # Help and support
│       ├── login/           # Authentication
│       ├── projects/        # Project management
│       ├── reports/         # Reporting functionality
│       ├── sdk/             # SDK integration
│       ├── settings/        # User settings
│       ├── signup/          # User registration
│       └── team/            # Team management
├── static/                  # Static assets
└── public/                  # Public assets
```

## Page Structure and Navigation Flow

### Authentication Flow

1. **Root Page (`/`)**: Entry point that redirects unauthenticated users to the login page
2. **Login (`/login`)**: Authentication with email/password or OAuth providers
3. **Signup (`/signup`)**: New user registration
4. **Forgot Password (`/forgot-password`)**: Password recovery workflow

### Main Application Sections

#### Dashboard (`/dashboard`)

**Purpose**: Main overview providing key metrics and recent activity

**Features**:
- Bug statistics (total, open, resolved, average resolution time)
- Recent bug activity and status charts
- Project overview with bug counts
- Activity feed showing recent actions

**UI Components**:
- Statistical cards
- Bug status distribution chart
- Weekly activity line chart
- Recent bugs list
- Project overview cards

#### Projects (`/projects`)

**Purpose**: Project management and organization

**Features**:
- List and grid view of all projects
- Filtering by status and type
- Search functionality
- Project creation

**Sub-routes**:
- `/projects/new`: Project creation form
- `/projects/[id]`: Individual project details and project-specific bugs

#### Bugs (`/bugs`)

**Purpose**: Bug tracking and management

**Features**:
- Bug listing with list/board views
- Advanced filtering (status, priority, project)
- Search functionality
- Bug assignment and status updates

**Sub-routes**:
- `/bugs/report`: Bug reporting form with detailed fields
- `/bugs/[id]`: Individual bug details with comments and activity tracking

#### SDK Integration (`/sdk`)

**Purpose**: Documentation for integrating BugSense SDK into applications

**Features**:
- Quick start guide
- Framework-specific integration examples:
  - JavaScript
  - React
  - Vue
  - Angular
  - Node.js
- Configuration options and key features

#### Reports (`/reports`)

**Purpose**: Data visualization and analytics

**Sub-routes**:
- `/reports/custom`: Custom report builder
- `/reports/saved`: Access to saved reports
- `/reports/schedule`: Scheduled report generation

#### Team (`/team`)

**Purpose**: Team management and collaboration

**Features**:
- Team member listing and management
- Role assignment
- Team invitation

**Sub-routes**:
- `/team/invite`: Member invitation workflow

#### Developer (`/developer`)

**Purpose**: Developer tools and API access

**Features**:
- API key management
- Webhook configuration
- OAuth application registration
- SDK documentation

#### Settings

**Purpose**: User and application configuration

**Sub-routes**:
- `/settings/profile`: Personal user information
- `/settings/account-security`: Security settings
- `/settings/appearance`: UI customization
- `/settings/notifications`: Notification preferences
- `/settings/billing`: Subscription management

#### Help & Support (`/help-support`)

**Purpose**: User assistance and documentation

**Features**:
- FAQs
- Documentation sections
- Contact form for support

## Detailed Page Descriptions

### Authentication Pages

#### Login Page (`/login`)

**UI Elements:**
- Brand logo and information panel on the left side (hidden on mobile)
- Login form with email and password fields
- "Remember me" checkbox
- Forgot password link
- Submit button with loading state
- OAuth login options (Google, Facebook, GitHub)
- Link to signup page for new users

**Functionality:**
- Form validation for email format and required fields
- Error handling for invalid credentials
- Redirects to dashboard on successful login
- Responsive layout that adapts to mobile devices
- Light/dark mode support
- Session persistence through "Remember me" option

#### Signup Page (`/signup`)

**UI Elements:**
- Brand information panel (similar to login page)
- Registration form with name, email, password fields
- Password strength indicator
- Terms of service acceptance checkbox
- Submit button with loading state
- OAuth signup options
- Link to login page for existing users

**Functionality:**
- Real-time validation of form fields
- Password strength requirements enforcement
- Terms of service agreement tracking
- Account creation process with confirmation
- Redirects to onboarding or dashboard based on configuration

#### Forgot Password Page (`/forgot-password`)

**UI Elements:**
- Email input field
- Submit button
- Back to login link
- Success/error message area

**Functionality:**
- Validates email format
- Sends password reset instructions to provided email
- Shows success message after submission
- Provides clear instructions for next steps

### Core Application Pages

#### Dashboard Page (`/dashboard`)

**UI Elements:**
- Four statistical cards showing key metrics:
  - Total bugs count with trend indicator
  - Open bugs count with trend indicator
  - Resolved bugs this week with trend indicator
  - Average resolution time with trend indicator
- Bug status distribution chart (pie chart)
- Weekly activity chart (line chart) showing new vs. resolved bugs
- Recent bugs table with status, priority, and project information
- Project overview cards with bug counts
- Recent activity feed showing user actions

**Functionality:**
- Real-time updates of metrics (simulated in the current implementation)
- Interactive charts with tooltips showing detailed information
- Quick navigation to specific bugs through clickable bug IDs
- Filtering options for the activity feed
- Responsive layout that reorganizes elements based on screen size

#### Projects Page (`/projects`)

**UI Elements:**
- Page header with title and create project button
- Search bar for finding projects
- Filter options for status and project type
- View toggle between grid and list modes
- Project cards/rows showing:
  - Project name
  - Description
  - Status badge
  - Type badge
  - Bug counts
  - Team member count
  - Last update timestamp

**Functionality:**
- Real-time search filtering as you type
- Multiple filter combinations (status + type)
- View preference that persists across sessions
- Quick access to project details through clickable cards
- Create project button that navigates to project creation form

#### Project Detail Page (`/projects/[id]`)

**UI Elements:**
- Project header with name, description, and key metrics
- Status badge and type indicator
- Tab navigation for different sections:
  - Overview: Summary of project status
  - Bugs: Project-specific bug list
  - Activity: Timeline of project-related actions
  - Team: Members assigned to the project
  - Settings: Project configuration options
- Project stats cards and charts
- Bug list table with filtering options

**Functionality:**
- Tab-based navigation within the project context
- Filtering specific to project bugs
- Quick navigation to bug details
- Team management functionality
- Project settings and configuration options

#### Bugs Page (`/bugs`)

**UI Elements:**
- Page header with title and create bug button
- View toggle between list and board views
- Search bar for finding specific bugs
- Filter dropdowns for status, priority, and project
- In list view:
  - Table with columns for ID, title, status, priority, project, assignee, and created date
  - Status indicators with color coding
  - Priority indicators with icons
- In board view:
  - Kanban-style columns for each status (Open, In Progress, Under Review, Resolved, Closed)
  - Draggable bug cards in each column
  - Quick-view information on cards

**Functionality:**
- Real-time filtering and search
- View preference persistence
- In board view, drag-and-drop functionality for changing bug status
- Clickable bug IDs/titles for navigating to bug details
- Column-based metrics showing bug counts per status

#### Bug Detail Page (`/bugs/[id]`)

**UI Elements:**
- Bug header with ID, title, and main actions (edit, assign, change status)
- Status badge and priority indicator
- Bug details panel showing:
  - Description
  - Steps to reproduce
  - Expected vs. actual behavior
  - Environment information
  - Assignment and reporter information
- Attachments and screenshots area
- Comments section with threaded replies
- Activity timeline showing status changes and updates

**Functionality:**
- Status updates with confirmation dialogs
- Priority adjustment options
- Assignment functionality with user selector
- Rich text editing for comments
- File attachment capability
- Chronological activity tracking
- Relationship management (linked bugs, dependencies)

#### Bug Report Page (`/bugs/report`)

**UI Elements:**
- Multi-step form with sections for:
  - Basic information (title, project, type)
  - Bug details (description, steps to reproduce)
  - Expected vs. actual behavior
  - Environment details (browser, OS, etc.)
  - Severity and priority selection
  - Attachments and screenshots
- Progress indicator showing completion status
- Preview and submit buttons

**Functionality:**
- Form validation for required fields
- File upload capability for screenshots and attachments
- Auto-save functionality for form progress
- Preview mode before submission
- Success confirmation after submission

#### SDK Integration Page (`/sdk`)

**UI Elements:**
- Introduction section explaining SDK purpose
- Quick start guide with installation instructions
- Code examples tabs for different frameworks:
  - JavaScript
  - React
  - Vue
  - Angular
  - Node.js
- Features section showing key SDK capabilities
- Configuration options table with descriptions
- Help section linking to documentation

**Functionality:**
- Tabbed interface for switching between framework examples
- Syntax-highlighted code blocks
- Copyable code snippets
- Interactive configuration examples
- Links to detailed documentation sections

#### Reports Page (`/reports`)

**UI Elements:**
- Dashboard-style layout with report cards
- Quick access buttons for common report types
- Recent reports section
- Scheduled reports overview

**Functionality:**
- Navigation to specific report types
- Report preview capabilities
- Export options (PDF, CSV, etc.)
- Scheduling interface for automated reports

#### Custom Report Builder (`/reports/custom`)

**UI Elements:**
- Report configuration panel with:
  - Metrics selection
  - Time range picker
  - Grouping options
  - Filtering criteria
- Chart type selection (bar, line, pie, etc.)
- Preview area showing report visualization
- Save and export buttons

**Functionality:**
- Dynamic report generation based on selected parameters
- Real-time preview updates as options change
- Multiple visualization options
- Save functionality for reusing report configurations
- Export capabilities to various formats

#### Team Page (`/team`)

**UI Elements:**
- Team member cards/list showing:
  - Name and avatar
  - Role and department
  - Assigned bugs count
  - Last active timestamp
- Invite button and member management options
- Role management section
- Activity overview

**Functionality:**
- Member filtering and search
- Role assignment and permissions management
- Invitation workflow for new members
- Quick navigation to member details
- Team analytics and performance metrics

#### Developer Page (`/developer`)

**UI Elements:**
- API keys section with:
  - Existing keys table
  - Create key form
  - Key details and restrictions
- Webhooks configuration area
- OAuth applications registration
- SDK integration examples
- API documentation links

**Functionality:**
- API key generation with scope selection
- API key revocation capabilities
- Webhook event selection and URL configuration
- OAuth application management
- Testing tools for API endpoints and webhooks

#### Settings Pages

**Profile Settings (`/settings/profile`)**
- Personal information form
- Avatar upload and management
- Contact details and preferences

**Account Security (`/settings/account-security`)**
- Password change functionality
- Two-factor authentication setup
- Session management
- Login history

**Appearance (`/settings/appearance`)**
- Theme selection (light/dark/system)
- Color scheme customization
- Layout preferences
- Font size adjustments

**Notifications (`/settings/notifications`)**
- Email notification preferences
- In-app notification settings
- Digest frequency configuration
- Custom alert setup

**Billing (`/settings/billing`)**
- Subscription plan information
- Payment method management
- Invoice history
- Usage statistics

#### Help & Support Page (`/help-support`)

**UI Elements:**
- Tab navigation between FAQs, Documentation, and Contact
- FAQ accordion with expandable questions and answers
- Documentation cards organized by category
- Contact form with fields for:
  - Name
  - Email
  - Subject
  - Message
- Support information sidebar with:
  - Contact details
  - Support hours
  - Links to resources

**Functionality:**
- Searchable FAQs and documentation
- Expandable/collapsible FAQ items
- Form validation for contact submissions
- Success confirmation after form submission
- Tab-based navigation between different support options

## Core Components

### Layout Components

#### `DashboardLayout`
Main application layout with:
- Responsive header with app logo
- Notification system with dropdown
- User profile menu
- Collapsible sidebar navigation
- Content area

#### `DashboardSidebar`
Navigation sidebar with:
- Main app navigation
- Collapse/expand functionality
- Active page indication

### UI Components

#### Basic Components
- `Button`: Multi-variant button component
- `Input`: Form input component
- `Textarea`: Multi-line text input
- `Card`: Container component with various styles

#### Complex Components
- `Avatar`: User avatar with image or initials fallback
- `BugChart`: Data visualization component
- `FormField`: Form field with label and validation
- `DropdownMenu`: Menu component for navigation and actions

## Theme and Styling

The application uses:
- Tailwind CSS for utility-based styling
- Custom CSS variables for theme consistency
- Dark/light mode support via the `mode-toggle` component
- Responsive design for all screen sizes

## Data Flow

1. **SvelteKit Routing**: Handles page navigation and URL parameters
2. **Svelte Stores**: Manages application state (notifications, sidebar state)
3. **Context API**: Facilitates component-to-component communication
4. **TypeScript**: Ensures type safety throughout the application

*Note: The current implementation uses mock data. In a production environment, these would be replaced with API calls to a backend service.*

## Best Practices

### SEO Optimization
- Server-side redirects (e.g., `/help` to `/help-support`)
- Proper page titles and metadata

### Accessibility
- Semantic HTML
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast conformance

### Performance
- Code splitting via SvelteKit routes
- Optimized component rendering
- Lazy loading where appropriate

## Development Guidelines

### Adding New Pages
1. Create a new directory in `src/routes/`
2. Add a `+page.svelte` file for the page content
3. Optionally add `+page.server.ts` for server-side logic
4. Update navigation if needed

### Component Development
1. Place new components in the appropriate directory based on complexity:
   - `atoms`: Basic UI elements
   - `molecules`: Compound components
   - `organisms`: Complex components
   - `templates`: Layout templates
2. Follow existing naming and styling conventions
3. Ensure components are responsive and accessible

## Future Development Areas

Potential areas for enhancement:
- Backend API integration
- Real-time updates for bug status changes
- Enhanced reporting capabilities
- Team collaboration features
- Mobile application options
- Integration with version control systems

---

This documentation provides a comprehensive overview of the BugSense frontend application architecture, components, and usage guidelines. 