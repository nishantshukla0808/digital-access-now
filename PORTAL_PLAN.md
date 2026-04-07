# Digital Access Now - Multi-Role Portal System
## Technical Implementation Plan

---

## 1. SYSTEM OVERVIEW

### Purpose
Multi-role portal for managing Digital Access Now operations with role-based access control for Admins, Volunteers, and Chapters.

### Technology Stack
- **Frontend**: Next.js 14+ (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (or separate Node.js/Express if preferred)
- **Database**: PostgreSQL (recommended) or MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3 / Azure Blob Storage / Local Storage
- **ORM**: Prisma (for PostgreSQL) or Mongoose (for MongoDB)

---

## 2. USER ROLES & PERMISSIONS

### Role Hierarchy
```
ADMIN (Highest Access)
├── Full system control
├── Manage all users (create, edit, delete, suspend)
├── View all documents and reports
├── Control resource visibility per role
├── Access analytics dashboard
└── Configure system settings

CHAPTERS
├── Upload documents, data, and reports
├── View own chapter data
├── Access assigned resources
├── Submit activity reports
└── View public resources

VOLUNTEERS
├── View assigned resources
├── Download training materials
├── Submit volunteer hours/reports
├── View event information
└── Access public resources
```

---

## 3. AUTHENTICATION SYSTEM

### 3.1 JWT Token Structure
```javascript
{
  userId: string,           // Unique user ID
  email: string,            // User email
  role: 'ADMIN' | 'CHAPTER' | 'VOLUNTEER',
  credentialId: string,     // Custom ID (CH-XXXX or VOL-XXXX)
  name: string,
  chapterId?: string,       // For chapter users
  iat: number,              // Issued at
  exp: number               // Expiration (24 hours)
}
```

### 3.2 ID/Credential System
```
ADMIN:     ADM-0001, ADM-0002, ...
CHAPTERS:  CH-USA-001, CH-IND-001, CH-PAK-001, ...
           Format: CH-[COUNTRY CODE]-[NUMBER]
VOLUNTEERS: VOL-0001, VOL-0002, ...
```

### 3.3 Authentication Flow
1. User enters credential ID + password
2. System validates credentials
3. JWT token generated (24-hour expiry)
4. Token stored in httpOnly cookie + localStorage
5. Refresh token for extended sessions (7 days)
6. Auto-logout on token expiry

### 3.4 Password Requirements
- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number, 1 special character
- Password reset via email (with OTP)
- Password change on first login (for admin-created accounts)

---

## 4. DATABASE SCHEMA

### 4.1 Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id VARCHAR(50) UNIQUE NOT NULL,  -- ADM-0001, CH-USA-001, VOL-0001
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,  -- ADMIN, CHAPTER, VOLUNTEER
  
  -- Profile Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  country VARCHAR(100),
  
  -- Chapter-specific
  chapter_id UUID REFERENCES chapters(id),
  chapter_name VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  require_password_change BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);
```

### 4.2 Chapters Table
```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credential_id VARCHAR(50) UNIQUE NOT NULL,  -- CH-USA-001
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  
  -- Contact
  primary_contact_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  
  -- Status
  status VARCHAR(50) DEFAULT 'active',  -- active, inactive, suspended
  established_date DATE,
  
  -- Stats
  member_count INTEGER DEFAULT 0,
  events_conducted INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.3 Documents Table
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,  -- in bytes
  file_type VARCHAR(50),  -- pdf, docx, xlsx, etc.
  
  -- Categorization
  category VARCHAR(100),  -- training, report, resource, template
  tags TEXT[],
  
  -- Ownership
  uploaded_by UUID REFERENCES users(id),
  chapter_id UUID REFERENCES chapters(id),
  
  -- Access Control
  visibility VARCHAR(50) DEFAULT 'private',  -- public, private, role-based
  allowed_roles TEXT[],  -- ['ADMIN', 'CHAPTER', 'VOLUNTEER']
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',  -- pending, approved, rejected
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  
  download_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.4 Reports Table
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type VARCHAR(100) NOT NULL,  -- monthly, quarterly, event, activity
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Data
  report_date DATE NOT NULL,
  data JSONB,  -- Flexible data storage
  
  -- Files
  file_path VARCHAR(500),
  
  -- Ownership
  submitted_by UUID REFERENCES users(id),
  chapter_id UUID REFERENCES chapters(id),
  
  -- Status
  status VARCHAR(50) DEFAULT 'submitted',  -- submitted, under_review, approved, rejected
  reviewed_by UUID REFERENCES users(id),
  review_notes TEXT,
  reviewed_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.5 Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(100),  -- workshop, training, community_outreach
  
  -- Schedule
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  is_virtual BOOLEAN DEFAULT false,
  meeting_link VARCHAR(500),
  
  -- Organization
  chapter_id UUID REFERENCES chapters(id),
  organizer_id UUID REFERENCES users(id),
  
  -- Participation
  max_participants INTEGER,
  registered_count INTEGER DEFAULT 0,
  attended_count INTEGER DEFAULT 0,
  
  -- Visibility
  visibility VARCHAR(50) DEFAULT 'public',
  
  -- Status
  status VARCHAR(50) DEFAULT 'upcoming',  -- upcoming, ongoing, completed, cancelled
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.6 Volunteer Hours Table
```sql
CREATE TABLE volunteer_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID REFERENCES users(id),
  
  -- Activity
  activity_type VARCHAR(100) NOT NULL,  -- training, event, outreach
  activity_description TEXT,
  hours DECIMAL(5,2) NOT NULL,
  
  -- Date
  activity_date DATE NOT NULL,
  
  -- Verification
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 4.7 Activity Logs Table
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,  -- login, upload, download, delete, update
  resource_type VARCHAR(100),  -- document, report, user, event
  resource_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. API ENDPOINTS

### 5.1 Authentication APIs
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/change-password
GET    /api/auth/verify-token
```

### 5.2 User Management APIs (Admin Only)
```
GET    /api/users                    -- List all users (with filters)
GET    /api/users/:id                -- Get user details
POST   /api/users                    -- Create new user
PUT    /api/users/:id                -- Update user
DELETE /api/users/:id                -- Delete user
PATCH  /api/users/:id/status         -- Activate/Deactivate
PATCH  /api/users/:id/role           -- Change role
GET    /api/users/generate-id        -- Generate next credential ID
```

### 5.3 Chapter Management APIs
```
GET    /api/chapters                 -- List all chapters
GET    /api/chapters/:id             -- Get chapter details
POST   /api/chapters                 -- Create chapter (Admin)
PUT    /api/chapters/:id             -- Update chapter
DELETE /api/chapters/:id             -- Delete chapter (Admin)
GET    /api/chapters/:id/members     -- Get chapter members
GET    /api/chapters/:id/statistics  -- Get chapter stats
```

### 5.4 Document Management APIs
```
GET    /api/documents                -- List documents (filtered by role)
GET    /api/documents/:id            -- Get document details
POST   /api/documents                -- Upload document
PUT    /api/documents/:id            -- Update document metadata
DELETE /api/documents/:id            -- Delete document
GET    /api/documents/:id/download   -- Download document
PATCH  /api/documents/:id/approve    -- Approve document (Admin)
PATCH  /api/documents/:id/reject     -- Reject document (Admin)
PATCH  /api/documents/:id/visibility -- Update visibility (Admin)
```

### 5.5 Report Management APIs
```
GET    /api/reports                  -- List reports
GET    /api/reports/:id              -- Get report details
POST   /api/reports                  -- Submit report (Chapter)
PUT    /api/reports/:id              -- Update report
DELETE /api/reports/:id              -- Delete report
PATCH  /api/reports/:id/review       -- Review report (Admin)
GET    /api/reports/templates        -- Get report templates
```

### 5.6 Event Management APIs
```
GET    /api/events                   -- List events
GET    /api/events/:id               -- Get event details
POST   /api/events                   -- Create event (Chapter/Admin)
PUT    /api/events/:id               -- Update event
DELETE /api/events/:id               -- Delete event
POST   /api/events/:id/register      -- Register for event
GET    /api/events/:id/participants  -- Get participants (Admin/Organizer)
```

### 5.7 Volunteer Hours APIs
```
GET    /api/volunteer-hours          -- List volunteer hours
POST   /api/volunteer-hours          -- Log hours (Volunteer)
PUT    /api/volunteer-hours/:id      -- Update hours
DELETE /api/volunteer-hours/:id      -- Delete hours
PATCH  /api/volunteer-hours/:id/verify -- Verify hours (Admin)
GET    /api/volunteer-hours/summary  -- Get volunteer summary
```

### 5.8 Dashboard/Analytics APIs
```
GET    /api/dashboard/admin          -- Admin dashboard data
GET    /api/dashboard/chapter        -- Chapter dashboard data
GET    /api/dashboard/volunteer      -- Volunteer dashboard data
GET    /api/analytics/overview       -- System overview (Admin)
GET    /api/analytics/chapters       -- Chapter analytics (Admin)
GET    /api/analytics/volunteers     -- Volunteer analytics (Admin)
```

### 5.9 Activity Logs APIs
```
GET    /api/logs                     -- View activity logs (Admin)
GET    /api/logs/user/:userId        -- User-specific logs
```

---

## 6. FRONTEND PAGES & COMPONENTS

### 6.1 Public Pages (No Auth Required)
```
/portal                          -- Portal landing page
/portal/login                    -- Login page
/portal/forgot-password          -- Forgot password
/portal/reset-password           -- Reset password
```

### 6.2 Dashboard Pages (Auth Required)
```
/portal/dashboard                -- Role-based dashboard redirect

Admin:
/portal/admin/dashboard          -- Admin overview
/portal/admin/users              -- User management
/portal/admin/chapters           -- Chapter management
/portal/admin/documents          -- Document management
/portal/admin/reports            -- Reports management
/portal/admin/events             -- Events management
/portal/admin/analytics          -- Analytics & insights
/portal/admin/settings           -- System settings
/portal/admin/logs               -- Activity logs

Chapter:
/portal/chapter/dashboard        -- Chapter overview
/portal/chapter/documents        -- View/upload documents
/portal/chapter/reports          -- Submit reports
/portal/chapter/events           -- Manage events
/portal/chapter/members          -- Chapter members
/portal/chapter/profile          -- Chapter profile

Volunteer:
/portal/volunteer/dashboard      -- Volunteer overview
/portal/volunteer/resources      -- View resources
/portal/volunteer/events         -- View/register events
/portal/volunteer/hours          -- Log volunteer hours
/portal/volunteer/profile        -- Volunteer profile
```

### 6.3 Shared Components
```
<PortalLayout>                   -- Main portal layout with sidebar
<DashboardCard>                  -- Statistics card
<DataTable>                      -- Reusable data table with sorting/filtering
<FileUploader>                   -- Drag-and-drop file uploader
<DocumentViewer>                 -- Preview documents
<RoleGuard>                      -- Protect routes by role
<LoadingSpinner>                 -- Loading states
<ConfirmDialog>                  -- Confirmation modals
<NotificationToast>              -- Success/error notifications
```

---

## 7. SECURITY FEATURES

### 7.1 Authentication Security
- JWT tokens with short expiry (24 hours)
- Refresh tokens with longer expiry (7 days)
- HttpOnly cookies for token storage
- CSRF protection
- Rate limiting on login attempts (5 attempts per 15 minutes)
- Account lockout after failed attempts
- Password hashing with bcrypt (12 salt rounds)

### 7.2 Authorization Security
- Role-based access control (RBAC)
- Route protection with middleware
- API endpoint authorization checks
- Resource ownership verification
- Admin approval for sensitive actions

### 7.3 Data Security
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection
- File upload validation (type, size, content)
- Secure file storage with access control
- Encrypted sensitive data at rest

### 7.4 Audit & Monitoring
- Activity logging for all critical actions
- Login/logout tracking
- File access logs
- Failed authentication attempts
- Suspicious activity alerts

---

## 8. FILE UPLOAD SYSTEM

### 8.1 Supported File Types
```
Documents: .pdf, .doc, .docx, .txt
Spreadsheets: .xls, .xlsx, .csv
Presentations: .ppt, .pptx
Images: .jpg, .jpeg, .png, .gif
Archives: .zip
```

### 8.2 Upload Restrictions
- Max file size: 10MB per file
- Max files per upload: 5
- Virus scanning before storage
- File type validation (MIME type + extension)

### 8.3 Storage Structure
```
/uploads
  /documents
    /2026
      /03
        /{userId}_{timestamp}_{filename}
  /reports
    /2026
      /03
        /{chapterId}_{timestamp}_{filename}
  /avatars
    /{userId}_{timestamp}.jpg
```

---

## 9. ADMIN DASHBOARD FEATURES

### 9.1 Overview Section
- Total users (Admin, Chapters, Volunteers)
- Total documents uploaded
- Pending approvals (documents, reports)
- Recent activity timeline
- System health status

### 9.2 User Management
- View all users in data table
- Filter by role, status, country
- Search by name, email, credential ID
- Create new users with auto-generated IDs
- Edit user details
- Suspend/activate accounts
- Delete users (with confirmation)
- Reset user passwords

### 9.3 Document Management
- View all uploaded documents
- Filter by category, status, uploader
- Preview documents
- Approve/reject pending documents
- Set visibility permissions per document
- Control which roles can access documents
- Download/delete documents
- View download statistics

### 9.4 Resource Visibility Control
```javascript
Example Controls:
- Training Materials: [ADMIN, CHAPTER, VOLUNTEER]
- Chapter Reports: [ADMIN, CHAPTER]
- Admin Documents: [ADMIN]
- Public Resources: [ADMIN, CHAPTER, VOLUNTEER]
```

---

## 10. CHAPTER DASHBOARD FEATURES

### 10.1 Overview
- Chapter statistics
- Upcoming events
- Recent documents
- Report submission deadlines
- Chapter member list

### 10.2 Document Upload
- Upload reports, data, documents
- Add title, description, category
- Track upload status (pending/approved)
- View own uploaded documents
- Download documents

### 10.3 Report Submission
- Submit monthly/quarterly reports
- Use structured templates
- Attach supporting documents
- Track submission status
- View feedback from admin

---

## 11. VOLUNTEER DASHBOARD FEATURES

### 11.1 Overview
- Volunteer statistics
- Upcoming events
- Total volunteer hours
- Recent resources

### 11.2 Resources Access
- View assigned training materials
- Download resources
- View public documents

### 11.3 Volunteer Hours
- Log volunteer hours
- Activity type and description
- View hours history
- Track verification status

---

## 12. NOTIFICATION SYSTEM

### 12.1 Email Notifications
- New account creation (with credentials)
- Password reset
- Document approval/rejection
- Report submission confirmation
- Event registration confirmation
- Admin alerts for pending approvals

### 12.2 In-App Notifications
- Real-time notification bell icon
- Unread count badge
- Notification list with timestamps
- Mark as read functionality

---

## 13. DEVELOPMENT PHASES

### Phase 1: Foundation (Week 1-2)
- [ ] Database setup and schema
- [ ] Authentication system (JWT)
- [ ] User registration and login
- [ ] Basic admin dashboard
- [ ] Role-based routing

### Phase 2: Core Features (Week 3-4)
- [ ] User management (Admin)
- [ ] Chapter management
- [ ] Document upload system
- [ ] File storage setup
- [ ] Basic CRUD operations

### Phase 3: Advanced Features (Week 5-6)
- [ ] Report submission system
- [ ] Admin approval workflow
- [ ] Visibility control system
- [ ] Event management
- [ ] Volunteer hours tracking

### Phase 4: Polish & Testing (Week 7-8)
- [ ] Dashboard analytics
- [ ] Activity logging
- [ ] Email notifications
- [ ] UI/UX refinement
- [ ] Security hardening
- [ ] Testing (unit, integration, E2E)

### Phase 5: Deployment (Week 9)
- [ ] Production environment setup
- [ ] Database migration
- [ ] SSL certificate
- [ ] Performance optimization
- [ ] User training documentation

---

## 14. TECHNICAL CONSIDERATIONS

### 14.1 Next.js API Routes Structure
```
app/
  api/
    auth/
      login/route.ts
      logout/route.ts
      refresh/route.ts
    users/
      route.ts              -- GET, POST
      [id]/route.ts         -- GET, PUT, DELETE
    documents/
      route.ts
      [id]/
        route.ts
        download/route.ts
    reports/
      route.ts
      [id]/route.ts
```

### 14.2 Middleware for Auth
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/portal/dashboard')) {
    return NextResponse.redirect('/portal/login')
  }
  
  // Role-based access control
  const user = verifyToken(token)
  if (user.role !== 'ADMIN' && request.nextUrl.pathname.startsWith('/portal/admin')) {
    return NextResponse.redirect('/portal/dashboard')
  }
}
```

### 14.3 Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dan_portal

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB in bytes

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@digitalaccessnow.org
SMTP_PASSWORD=your-password

# App
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 15. COLOR THEME (Maintain Consistency)

```css
/* Primary Colors */
--primary-blue: #00BCD4 (Aqua/Cyan)
--cyan-600: (Darker hover state)
--primary-purple: #6633CC
--footer-black: (Dark backgrounds)

/* UI Elements */
Buttons: bg-primary-blue hover:bg-cyan-600
Borders: border-primary-blue
Text Accents: text-primary-blue
Gradients: from-primary-blue via-primary-purple to-cyan-600
```

---

## 16. NEXT STEPS

1. Choose database (PostgreSQL recommended)
2. Set up Next.js API routes
3. Implement authentication system
4. Design database schema
5. Build admin user management
6. Implement file upload system
7. Create role-based dashboards
8. Add document approval workflow
9. Build reporting system
10. Test and deploy

---

## QUESTIONS TO CLARIFY

1. **Database Preference**: PostgreSQL or MongoDB?
2. **File Storage**: Local storage, AWS S3, or Azure Blob?
3. **Email Service**: Which SMTP provider for notifications?
4. **Deployment**: Vercel, AWS, Azure, or self-hosted?
5. **Chapter Credential Format**: Need specific country codes list?
6. **Report Templates**: What specific data fields for reports?
7. **Initial Admin Account**: How to create first admin user?

---

**Ready to start implementation once you confirm the technical choices above!**
