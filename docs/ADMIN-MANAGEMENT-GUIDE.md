# 🔐 TaiVideoNhanh - Complete Admin Management Guide

## 📋 Overview

Comprehensive guide for managing the TaiVideoNhanh admin system, including user management, cookie management, and system administration.

## 🚀 Quick Start

### 1. **Access Admin Panel**

#### Method 1: Direct Login (Recommended)
```
URL: https://taivideonhanh.vn/admin/direct-login
Email: admin@taivideonhanh.com
Password: admin123456
```

#### Method 2: Setup Wizard
```
URL: https://taivideonhanh.vn/admin/setup
```

#### Method 3: Simple Dashboard
```
URL: https://taivideonhanh.vn/admin/simple-dashboard
```

### 2. **Create New Admin User**

#### Via Script (Recommended)
```bash
node create-admin-user.js
```

#### Via SQL Script
```bash
bash run-admin-sql.sh
```

## 🎯 Admin Roles & Permissions

### **Roles**
- **super_admin**: Full system access
- **admin**: User and subscription management
- **moderator**: View-only access

### **Permissions**
- `user_management` - User administration
- `subscription_management` - Subscription management
- `payment_management` - Payment processing
- `system_settings` - System configuration (including cookie upload)
- `analytics_view` - Analytics and reporting

## 👥 User Management System

### **Features**
- ✅ User list with pagination and search
- ✅ Advanced filtering by status and subscription
- ✅ Real-time statistics and analytics
- ✅ User actions (view, edit, suspend, delete)
- ✅ Subscription tier management

### **API Endpoints**

#### Get Users List
```http
GET /api/admin/users?page=1&limit=20&search=query&status=active&subscription=premium&sortBy=created_at&sortOrder=desc
```

#### Get User Details
```http
GET /api/admin/users/:userId
```

#### Update User Subscription
```http
PUT /api/admin/users/:userId/subscription-tier
Content-Type: application/json

{
  "subscriptionTier": "premium"
}
```

#### Get User Statistics
```http
GET /api/admin/users/stats/overview
```

### **Frontend Dashboard**
```
URL: https://taivideonhanh.vn/admin/users

Features:
- Real-time user statistics cards
- Advanced search and filtering
- Sortable table columns
- Pagination controls
- User action dropdown menus
- Responsive design
```

## 🍪 Cookie Management System

### **Multi-Platform Cookie Support**

**Key Feature:** ONE COOKIE FILE for ALL platforms (YouTube, TikTok, Facebook, Instagram, Twitter, Twitch, Vimeo, etc.)

#### **Cookie File Format**
```
# Netscape HTTP Cookie File
.youtube.com	TRUE	/	FALSE	1735689600	session_token	youtube_token_here
.tiktok.com	TRUE	/	FALSE	1735689600	sessionid	tiktok_session_here
.facebook.com	TRUE	/	FALSE	1735689600	c_user	facebook_user_here
.instagram.com	TRUE	/	FALSE	1735689600	sessionid	instagram_session_here
.twitter.com	TRUE	/	FALSE	1735689600	auth_token	twitter_token_here
```

### **Cookie Management Features**
- ✅ Upload cookie files (.txt, .json)
- ✅ Validate cookie format and content
- ✅ Platform-specific categorization
- ✅ Backup and versioning
- ✅ Real-time testing and validation
- ✅ Drag & drop upload interface
- ✅ Automatic backup before replacement
- ✅ File permissions security (600)

### **API Endpoints**

#### Upload Cookie File
```http
POST /api/admin/cookie/upload
Content-Type: multipart/form-data

file: [cookie_file.txt]
```

#### Test Cookie File
```http
POST /api/admin/cookie/test
Content-Type: application/json

{
  "testUrl": "https://www.youtube.com/watch?v=example"
}
```

#### Get Cookie Status
```http
GET /api/admin/cookie/status
```

#### Get Cookie Information
```http
GET /api/admin/cookie/info
```

#### Delete Cookie
```http
DELETE /api/admin/cookie/:cookieId
```

### **Cookie Setup Methods**

#### Method 1: Browser Extension (Recommended)
1. Install "Get cookies.txt LOCALLY" extension on Chrome
2. Navigate to target platforms and login
3. Export cookies using extension
4. Upload via admin panel drag & drop interface

#### Method 2: Developer Tools Manual
1. Open YouTube.com and login
2. Open Developer Tools (F12)
3. Go to Application > Storage > Cookies
4. Copy cookies in Netscape format
5. Create .txt file and upload

#### Method 3: Browser Profile
```bash
# Environment variables
ENABLE_COOKIE_AUTH=true
CHROME_USER_DATA_DIR=/app/chrome-profile
```

#### Method 4: Manual Setup Script
```bash
# Use provided script
chmod +x setup-youtube-cookies.sh
./setup-youtube-cookies.sh
```

## 🔧 System Administration

### **API Endpoints**

#### Admin Authentication
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@taivideonhanh.vn",
  "password": "admin123456"
}
```

#### Verify Admin Token
```http
GET /api/admin/verify
Authorization: Bearer <admin_token>
```

#### Get Admin Status
```http
GET /api/admin/status
```

#### Create VN Admin
```http
POST /api/admin/create-vn-admin
```

### **Dashboard Analytics**
```http
GET /api/admin/dashboard/stats
GET /api/admin/analytics/subscriptions
```

## 📊 Analytics & Monitoring

### **User Analytics**
- Total users and categorization
- Subscription tier distribution
- New users by day/week/month
- Top countries and demographics
- Average session time

### **System Health Monitoring**
```bash
# Check admin activity
SELECT email, last_login, created_at FROM admins ORDER BY last_login DESC;

# Check cookie status
ls -la /tmp/cookies/platform-cookies.txt

# Test cookie functionality
node test-cookie-upload-system.js

# Check admin access
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:5000/api/admin/cookie/info
```

## 🔒 Security Best Practices

### **Password Security**
- Use bcrypt with 12 salt rounds
- Change default passwords in production
- Implement password complexity requirements

### **Token Security**
- JWT tokens with expiration time
- Secure token storage (httpOnly cookies)
- Token rotation for long sessions

### **Access Control**
- Role-based permissions
- IP whitelisting for admin routes
- Rate limiting for login attempts

### **Audit Logging**
- Log all admin actions
- Monitor failed login attempts
- Track permission changes

## 🚨 Troubleshooting

### **Common Issues**

#### Admin Login Issues
```
Error: "Invalid credentials"
Solution: Run node create-admin-user.js to reset password
```

#### Cookie Upload Issues
```
Error: "No supported platforms found"
Solution: Ensure cookie file contains at least one supported domain
```

#### Permission Issues
```
Error: "Insufficient admin permission"
Solution: Admin needs 'system_settings' permission to upload cookies
```

#### Redirect Loop Issues
```
Cause: Missing /api/admin/verify endpoint
Solution: Use /admin/direct-login
```

### **Debug Commands**
```bash
# Check user count
curl -H "Authorization: Bearer <token>" \
  https://taivideonhanh.vn/api/admin/users/stats/overview

# Test admin login
curl -X POST https://taivideonhanh.vn/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@taivideonhanh.vn", "password": "admin123456"}'

# Check system health
curl https://taivideonhanh.vn/api/health
```

## 🛠️ Management Scripts

### **Available Scripts**
- `quick-setup-admin.js` - Complete automatic setup
- `create-admin-user.js` - Interactive admin user management
- `test-cookie-upload-system.js` - Test entire cookie system

### **Database Tools**
- `backend/migrations/001-create-default-admin.sql` - Migration script
- Admin management functions in PostgreSQL

## 🚀 Production Deployment

### **Environment Variables**
```bash
# Admin Configuration
DEFAULT_ADMIN_EMAIL=admin@taivideonhanh.vn
DEFAULT_ADMIN_PASSWORD=your_secure_password
ADMIN_JWT_EXPIRES_IN=8h
JWT_ACCESS_SECRET=your_jwt_secret

# Cookie Configuration
COOKIES_PATH=/tmp/cookies/platform-cookies.txt
ENABLE_COOKIE_AUTH=true
```

### **Production Checklist**
- [ ] Change default admin password
- [ ] Configure HTTPS
- [ ] Setup monitoring alerts
- [ ] Backup database regularly
- [ ] Configure rate limiting
- [ ] Setup audit logging

## 📞 Support & Emergency Access

### **Contact Information**
- **Email**: admin@taivideonhanh.vn
- **Documentation**: /docs/admin-system
- **Health Check**: https://taivideonhanh.vn/api/health

### **Emergency Access**
- **Direct Login**: https://taivideonhanh.vn/admin/direct-login
- **Setup Wizard**: https://taivideonhanh.vn/admin/setup
- **SQL Scripts**: `run-admin-sql.sh`

## 🎯 Best Practices

### **Cookie Strategy**
1. **Single Source**: Use one browser profile for all cookies
2. **Regular Updates**: Update cookies when authentication errors occur
3. **Platform Coverage**: Ensure login to all necessary platforms
4. **Backup Strategy**: Keep backup of working cookies before updates

### **Admin Management**
1. **Principle of Least Privilege**: Only grant necessary permissions
2. **Regular Audits**: Review admin accounts and permissions
3. **Strong Passwords**: Enforce password complexity
4. **Activity Monitoring**: Track admin actions and login patterns

---

**🎉 Complete Admin Management System Ready! All tools and features are available for comprehensive system administration.**
