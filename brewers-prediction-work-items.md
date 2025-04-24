# Brewers Prediction Game - Work Items

## Frontend Components

### 1. Base Layout (WI-001)
**Description:** Create the foundational layout including header and footer that will be consistent across all pages.

#### 1.1 Project Structure Setup (WI-001.1)
**Description:** Set up the initial folder structure for the frontend components.
**Tasks:**
- Create a `/components` directory for reusable UI components
- Set up a `/components/layout` directory for layout-specific components
- Create a `/styles` directory for any custom CSS beyond Tailwind
- Set up a `/types` directory for TypeScript type definitions
- Create a `/utils` directory for helper functions
- Set up a `/lib` directory for API client code

**Acceptance Criteria:**
- Folder structure follows Next.js best practices
- Structure allows for clear organization of components
- Import paths are configured properly

#### 1.2 Layout Component (WI-001.2)
**Description:** Create the main layout wrapper component that will include the header and footer.
**Tasks:**
- Create a `Layout.tsx` component in the `/components/layout` directory
- Implement the component to accept children props
- Set up the basic page structure with header and footer placement
- Configure layout to handle different page widths appropriately
- Add container constraints for content width

**Acceptance Criteria:**
- Layout component properly wraps all page content
- Component correctly positions header and footer
- Content area has appropriate width constraints and padding
- Layout works correctly on all device sizes

#### 1.3 Header Component (WI-001.3)
- [x] **Description:** Create the header component with Brewers branding.
- [x] **Tasks:**
- [x] - Create a `Header.tsx` component in the `/components/layout` directory
- [x] - Implement centered logo using the Milwaukee Brewers logo
- [x] - Add application title with appropriate typography
- [x] - Use Brewers-themed colors (navy blue #0A2351, gold #B6922E)
- [x] - Ensure responsive design that works well on mobile and desktop
- [x] - Add subtle background pattern or texture for visual interest

- [x] **Acceptance Criteria:**
- [x] - Header displays centered Brewers logo
- [x] - Title text is clearly visible and properly styled
- [x] - Header uses appropriate Brewers brand colors
- [x] - Component is responsive and adapts to different screen sizes
- [x] - Design is visually appealing and consistent with Brewers branding

#### 1.4 Footer Component (WI-001.4)
- [x] **Description:** Create the footer component with necessary links.
- [x] **Tasks:**
- [x] - Create a `Footer.tsx` component in the `/components/layout` directory
- [x] - Implement 5 evenly-spaced href links
- [x] - Use Brewers-themed colors matching the header
- [x] - Add copyright information or attribution as needed
- [x] - Ensure responsive design with appropriate spacing on all devices
- [x] - Include subtle visual separation from main content

- [x] **Acceptance Criteria:**
- [x] - Footer displays 5 evenly-spaced links
- [x] - Links are properly styled and have hover states
- [x] - Footer uses consistent Brewers brand colors
- [x] - Component is responsive and maintains proper spacing on all devices
- [x] - Footer remains at the bottom of the page regardless of content height

#### 1.5 Responsive Design Implementation (WI-001.5)
- [x] **Description:** Ensure all layout components work properly on various device sizes.
- [x] **Tasks:**
- [x] - Implement responsive breakpoints using Tailwind's screen sizes
- [x] - Test layout on mobile, tablet, and desktop viewports
- [x] - Ensure content remains readable and properly spaced at all sizes
- [x] - Implement any necessary mobile-specific adjustments
- [x] - Test navigation and layout flow on touch devices

- [x] **Acceptance Criteria:**
- [x] - Layout renders correctly on mobile devices (320px and up)
- [x] - Layout adapts appropriately to tablet devices (768px and up)
- [x] - Layout renders optimally on desktop screens (1024px and up)
- [x] - No horizontal scrolling occurs on any standard device size
- [x] - All interactive elements are properly sized for touch interaction on mobile

#### 1.6 Theme Configuration (WI-001.6)
- [x] **Description:** Set up Tailwind theme configuration for Brewers colors and typography.
- [x] **Tasks:**
- [x] - Configure Tailwind's theme in `tailwind.config.js`
- [x] - Add Brewers color palette as custom colors
- [x] - Set up typography scale and font family configuration
- [x] - Create any necessary custom utilities for repeated patterns
- [x] - Document theme configuration for consistent usage

- [x] **Acceptance Criteria:**
- [x] - Tailwind configuration includes Brewers brand colors
- [x] - Color names are intuitive and follow consistent naming pattern
- [x] - Typography is configured for optimal readability
- [x] - Configuration enables consistent design implementation across components
- [x] - Documentation provides clear guidance on usage

---

### 2. Home Page - Main Home Layout - Banner, Form, Leaderboard (WI-002)
**Description:** Implement the home page layout as it will appear before the prediction submission deadline.
**Tasks:**
- [] - Added banner indicating prediction deadline (this will be hardcoded within the component)
- [] - Create prediction submission form with validation (first name, last name, wins). Disable prediction form after deadline
- [] - Implement form submission functionality to backend (use API Endpoint) - for now use https://localhost:7226/api for the base url.
- [] - set up base api hook or lib function class to implement. Please see backend-development-plan.md for details.
- [] - Create full leaderboard component showing all predictions. Ensure leaderboard is sortable and has clear visual hierarchy
- [] - Add notification system for successful submissions (toastr notifications or something similar and native to React/Tailwind)
- [] - Handle duplicate entry error message returned from api (see backend-development-plan.md for details about the exception returned)
- [] - Handle other error messages returned from api

**Acceptance Criteria:**
- Users can submit predictions via a clean, intuitive form
- Users cannot submit multiple predictions with same name combination
- Submission status is clearly communicated to user
---

### 3. Game Results Display Section (WI-004)
**Description:** Create the section displaying previous game results or upcoming/current game information.
**Tasks:**
- Implement API integration with MLB data source
- Create responsive game display component for left half of top section
- Design different views for:
  - Previous game results with key stats
  - Upcoming game with start time and basic info
  - Current game with live score (if applicable)
- Implement proper error handling for API failures

**Acceptance Criteria:**
- Component correctly displays appropriate game information based on timing
- Live scores refresh at appropriate intervals during games
- Display is visually appealing and consistent with site design
- Component gracefully handles API failures
- Display is responsive and works well on mobile devices

---

### 5. NL Central Standings Section (WI-005)
**Description:** Create the section displaying current NL Central Division standings.
**Tasks:**
- Implement API integration with MLB standings data
- Create responsive standings table/display for right half of top section
- Highlight Brewers position in the standings
- Include relevant team stats (wins, losses, etc.)

**Acceptance Criteria:**
- Standings display correctly and highlight Brewers position
- Component includes relevant team statistics
- Display is visually appealing and consistent with site design
- Standings update at appropriate intervals
- Component flexes properly to display below game information on mobile

---

### 6. Brewers Content Section (WI-006)
**Description:** Create the section displaying Brewers-related content/articles at the bottom of the page.
**Tasks:**
- Design article card grid layout
- Implement API integration with news/content source
- Create responsive card components with appropriate content preview
- Add proper linking to full articles
- Implement image optimization for article thumbnails

**Acceptance Criteria:**
- Article cards display in an attractive grid layout
- Cards contain appropriate preview content and images
- Layout is responsive and adjusts appropriately on different devices
- Clicking cards correctly navigates to full articles
- Content refreshes at appropriate intervals

---

### 7. Admin Messages Screen (WI-007)
**Description:** Create the admin page for viewing user messages.
**Tasks:**
- Design paginated grid layout for messages
- Implement display of user name, email address, and message content
- Add "responded" checkbox functionality with state persistence
- Create sorting and filtering capabilities
- Implement pagination system

**Acceptance Criteria:**
- Grid displays all user messages with relevant information
- Admin can mark messages as "responded to"
- Grid supports sorting and filtering
- Pagination works correctly for large message volumes
- Page is only accessible via admin URL

---

### 8. Admin Predictions Approval Screen (WI-008)
**Description:** Create the admin page for approving user predictions.
**Tasks:**
- Design grid layout for prediction approvals
- Implement display of user name and prediction value
- Add approval checkbox functionality with state persistence
- Implement bulk approval capabilities
- Create sorting and filtering options

**Acceptance Criteria:**
- Grid displays all user predictions with relevant information
- Admin can approve individual or multiple predictions
- Grid supports sorting and filtering
- Approved status persists and syncs with backend
- Page is only accessible via admin URL

---

### 9. Rules Section (WI-009)
**Description:** Create a section explaining the rules of the prediction game.
**Tasks:**
- Design rules section layout
- Create clear, concise explanation of prediction game rules
- Add visual elements to enhance understanding
- Ensure responsive design for all devices

**Acceptance Criteria:**
- Rules are clearly explained and easy to understand
- Section is visually consistent with overall site design
- Content is responsive and readable on all devices

---

## Backend Components

### 10. Prediction API Endpoints (WI-010)
**Description:** Implement backend API endpoints for prediction functionality.
**Tasks:**
- Create endpoint for submitting new predictions
- Implement endpoint for retrieving approved predictions
- Add validation logic for prediction submissions
- Implement duplicate checking based on name combinations
- Create endpoint for admin approval functionality

**Acceptance Criteria:**
- All endpoints function correctly with proper error handling
- Validation prevents invalid predictions
- Duplicate checking works correctly
- Admin approval process functions as expected

---

### 11. Message API Endpoints (WI-011)
**Description:** Implement backend API endpoints for user messages.
**Tasks:**
- Create endpoint for submitting new messages
- Implement endpoint for retrieving all messages
- Add validation logic for message submissions
- Create endpoint for updating message response status

**Acceptance Criteria:**
- All endpoints function correctly with proper error handling
- Messages are properly stored and retrievable
- Admin can update response status

---

### 12. External Data Integration (WI-012)
**Description:** Implement integration with external MLB data sources.
**Tasks:**
- Create Next.js API routes for MLB standings data
- Implement API routes for game results and schedules
- Add caching mechanism to reduce external API calls
- Implement error handling for external API failures
- Create fallback displays for when data is unavailable

**Acceptance Criteria:**
- Application successfully retrieves and displays MLB data
- Caching reduces unnecessary API calls
- Application gracefully handles API failures
- Data refreshes at appropriate intervals

---

### 13. News/Article Integration (WI-013)
**Description:** Implement integration with Brewers news/article sources.
**Tasks:**
- Create Next.js API routes for retrieving news content
- Implement caching mechanism for article data
- Add filtering for relevant Brewers content
- Create error handling for API failures

**Acceptance Criteria:**
- Application successfully retrieves and displays relevant articles
- Caching reduces unnecessary API calls
- Content is filtered to focus on Brewers-related articles
- Application gracefully handles API failures

---

## TypeScript Types

### 14. Type Definitions (WI-014)
**Description:** Create TypeScript type definitions for the application.
**Tasks:**
- Define types for user prediction data
- Create types for standings and game data
- Implement types for user messages
- Define admin-related types
- Create article/content types

**Types to Define:**
- `Prediction`: User prediction data
- `User`: Basic user information
- `Message`: User message structure
- `Standing`: Team standing information
- `Game`: Game information structure
- `Article`: News/content article structure
- `Admin`: Admin-related types

**Acceptance Criteria:**
- All types are properly defined and used throughout the application
- Types provide appropriate validation and autocomplete support
- Type definitions enhance code readability and maintainability

---


## Dependencies and Relationships

- WI-010 and WI-011 (API Endpoints) should be completed before their corresponding frontend components
- WI-014 (Type Definitions) should be completed early to support development
- WI-002 (Pre-Deadline Layout) and WI-003 (Post-Deadline Layout) have shared components and should be developed together
- WI-012 (External Data Integration) is required for WI-004 (Game Results) and WI-005 (Standings)
- WI-013 (News Integration) is required for WI-006 (Content Section)
