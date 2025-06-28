# 🍪 TaiVideoNhanh - Complete Cookie Management Guide

## 📋 Overview

Comprehensive guide for managing cookies in TaiVideoNhanh to resolve YouTube authentication issues and support multiple streaming platforms.

## 🎯 Problem Statement

YouTube has implemented anti-bot measures that require authentication cookies for certain videos. The error message typically appears as:

```
ERROR: [youtube] VIDEO_ID: Sign in to confirm you're not a bot. 
Use --cookies-from-browser or --cookies for the authentication.
```

## ✨ Key Features

### 🔐 **Security**
- ✅ Only admins with `system_settings` permission can upload cookies
- ✅ Strict file validation (.txt only, max 5MB)
- ✅ Automatic backup of old cookies before replacement
- ✅ File permissions 600 (owner read/write only)

### 🚀 **Cookie Management**
- ✅ Upload cookies via web interface (drag & drop)
- ✅ Automatic cookie format validation
- ✅ Real-time cookie testing with yt-dlp
- ✅ View detailed current cookie information
- ✅ Delete cookies when necessary

### 🌐 **Multi-Platform Support**
- ✅ ONE COOKIE FILE for ALL platforms
- ✅ YouTube, TikTok, Facebook, Instagram, Twitter, Twitch, Vimeo
- ✅ Automatic platform detection
- ✅ Smart cookie selection per platform

## 🔧 API Endpoints

### Authentication Required
All endpoints require admin authentication:
```
Authorization: Bearer <admin_token>
Permission: system_settings
```

### Cookie Management

#### **Get Cookie Information**
```http
GET /api/admin/cookie/info
```

**Response:**
```json
{
  "message": "Cookie information retrieved successfully",
  "cookieInfo": {
    "filename": "youtube-cookies.txt",
    "size": 2048,
    "uploadedAt": "2024-01-01T00:00:00.000Z",
    "isValid": true,
    "lastValidated": "2024-01-01T00:00:00.000Z"
  },
  "hasActiveCookie": true
}
```

#### **Upload Cookie File**
```http
POST /api/admin/cookie/upload
Content-Type: application/json

{
  "content": "base64_encoded_cookie_content",
  "filename": "youtube-cookies.txt"
}
```

**Response:**
```json
{
  "message": "Cookie uploaded successfully",
  "cookieInfo": {
    "filename": "youtube-cookies.txt",
    "size": 2048,
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Test Cookie**
```http
POST /api/admin/cookie/test
Content-Type: application/json

{
  "testUrl": "https://www.youtube.com/watch?v=jNQXAC9IVRw"
}
```

**Response:**
```json
{
  "message": "Cookie test completed",
  "testResult": {
    "success": true,
    "responseTime": 2500,
    "videoTitle": "Me at the zoo",
    "error": null
  }
}
```

#### **Get Cookie Status**
```http
GET /api/admin/cookie/status
```

**Response:**
```json
{
  "message": "Cookie system status retrieved",
  "status": {
    "totalCookieFiles": 1,
    "activeCookieFile": "youtube_cookies.txt",
    "lastUpload": "2025-06-27T04:30:00.000Z",
    "fileSize": 2048,
    "isValid": true,
    "supportedPlatforms": ["YouTube", "TikTok", "Facebook", "Instagram"],
    "backupCount": 3
  }
}
```

#### **Delete Cookie**
```http
DELETE /api/admin/cookie/delete
```

## 🎯 Cookie File Formats

### Netscape Format (.txt) - Recommended
```
# Netscape HTTP Cookie File
.youtube.com	TRUE	/	FALSE	1735689600	session_token	your_session_token
.youtube.com	TRUE	/	FALSE	1735689600	VISITOR_INFO1_LIVE	your_visitor_info
.tiktok.com	TRUE	/	FALSE	1735689600	sessionid	tiktok_session_here
.facebook.com	TRUE	/	FALSE	1735689600	c_user	facebook_user_here
.instagram.com	TRUE	/	FALSE	1735689600	sessionid	instagram_session_here
.twitter.com	TRUE	/	FALSE	1735689600	auth_token	twitter_token_here
```

### Multi-Platform Cookie Structure
```
# Single file supports multiple platforms
.youtube.com	TRUE	/	FALSE	1735689600	session_token	youtube_value
.googlevideo.com	TRUE	/	FALSE	1735689600	__Secure-3PSID	google_value
.tiktok.com	TRUE	/	FALSE	1735689600	sessionid	tiktok_value
.facebook.com	TRUE	/	FALSE	1735689600	c_user	facebook_value
.instagram.com	TRUE	/	FALSE	1735689600	sessionid	instagram_value
.twitter.com	TRUE	/	FALSE	1735689600	auth_token	twitter_value
.x.com	TRUE	/	FALSE	1735689600	auth_token	x_value
.twitch.tv	TRUE	/	FALSE	1735689600	auth-token	twitch_value
.vimeo.com	TRUE	/	FALSE	1735689600	vimeo	vimeo_value
```

## 🛠️ Cookie Setup Methods

### **Method 1: Browser Extension (Recommended)**

1. **Install Extension**
   - Install "Get cookies.txt LOCALLY" extension on Chrome
   - Available in Chrome Web Store

2. **Login to Platforms**
   - Navigate to YouTube.com and login
   - Navigate to other platforms (TikTok, Facebook, etc.) and login
   - Ensure you're logged in to all platforms you want to support

3. **Export Cookies**
   - Click on the extension icon
   - Select "Export cookies.txt"
   - Save the file to your computer

4. **Upload via Admin Panel**
   - Go to Admin Panel → Cookie Management
   - Drag and drop the cookies.txt file
   - Click "Upload Cookie File"

### **Method 2: Developer Tools Manual**

1. **Open Browser Developer Tools**
   - Open YouTube.com and login
   - Press F12 to open Developer Tools
   - Go to Application tab → Storage → Cookies

2. **Extract Cookie Data**
   - Copy cookie values for YouTube domains
   - Format according to Netscape format
   - Include all relevant domains (.youtube.com, .googlevideo.com)

3. **Create Cookie File**
   - Create a .txt file with proper format
   - Upload via admin panel

### **Method 3: Browser Profile (Advanced)**

1. **Setup Chrome Profile**
   ```bash
   # Create dedicated Chrome profile
   mkdir -p /opt/chrome-profile
   chmod 755 /opt/chrome-profile
   ```

2. **Environment Configuration**
   ```bash
   ENABLE_COOKIE_AUTH=true
   CHROME_USER_DATA_DIR=/opt/chrome-profile
   ```

3. **Manual Login**
   ```bash
   # Login to YouTube using Chrome profile
   google-chrome --user-data-dir=/opt/chrome-profile
   ```

### **Method 4: Automated Script**

```bash
# Use provided setup script
chmod +x setup-youtube-cookies.sh
./setup-youtube-cookies.sh
```

## 🖥️ Frontend Interface

### **Cookie Management Page**
```
URL: https://taivideonhanh.vn/admin/cookie-management

Features:
- Drag & drop file upload
- Real-time cookie validation
- Cookie testing interface
- Current cookie information display
- Upload history and backup management
```

### **Dashboard Components**
- **Upload Area**: Drag & drop interface with file validation
- **Cookie Info Card**: Current cookie status and details
- **Test Interface**: Real-time cookie testing with results
- **Management Actions**: Delete, backup, and restore options

## 🔒 Security Implementation

### **File Security**
- Cookie files stored with 600 permissions (owner only)
- Secure directory permissions (700)
- Automatic backup before replacement
- Input validation and sanitization
- Admin-only access with proper permissions

### **API Security**
- JWT authentication required
- Role-based permission checking
- Request rate limiting
- Input validation middleware
- Secure error handling

## 🚨 Troubleshooting

### **Common Issues**

#### Upload Issues
```
Problem: File upload fails
Solutions:
- Check file size (max 5MB)
- Verify file format (.txt only)
- Ensure admin has system_settings permission
- Check disk space and permissions
```

#### Validation Errors
```
Problem: Cookie file invalid
Solutions:
- Verify Netscape format
- Check cookie expiration dates
- Ensure proper domain formatting
- Validate cookie content structure
```

#### Test Failures
```
Problem: Cookie test fails
Solutions:
- Check network connectivity
- Verify cookie validity and expiration
- Ensure target URL is accessible
- Check yt-dlp installation
```

#### Permission Errors
```
Problem: "Insufficient admin permission"
Solutions:
- Admin needs 'system_settings' permission
- Verify JWT token validity
- Check admin role and permissions
- Re-authenticate if necessary
```

## 📈 Performance Optimization

### **File Operations**
- Asynchronous file operations
- Stream processing for large files
- Compression for backup files
- Automatic cleanup of old backups

### **API Performance**
- Response caching for cookie info
- Rate limiting protection
- Request validation middleware
- Optimized error handling

## 🔄 Maintenance

### **Regular Tasks**
- [ ] Update cookies monthly or when authentication errors occur
- [ ] Clean backup files quarterly
- [ ] Monitor success rates weekly
- [ ] Review error patterns monthly
- [ ] Update user-agents quarterly

### **Emergency Procedures**
```bash
# Reset cookies
rm /tmp/cookies/youtube-cookies.txt

# Restore from backup
cp /tmp/cookies/backup/latest.txt /tmp/cookies/youtube-cookies.txt

# Test cookie functionality
node test-cookie-upload-system.js
```

## 📊 Monitoring

### **Key Metrics**
- Cookie authentication success rate
- Video extraction success rate with cookies
- Response time with cookie authentication
- Error rate reduction after cookie implementation

### **Health Checks**
```bash
# Check cookie file exists
ls -la /tmp/cookies/youtube-cookies.txt

# Check supported platforms
grep -E "\.(youtube|tiktok|facebook|instagram|twitter|x|twitch|vimeo)\.com" /tmp/cookies/youtube-cookies.txt

# Test cookie functionality
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://taivideonhanh.vn/api/admin/cookie/test \
  -d '{"testUrl": "https://www.youtube.com/watch?v=jNQXAC9IVRw"}'
```

## 🎯 Best Practices

### **Cookie Strategy**
1. **Single Source**: Use one browser profile for all platform cookies
2. **Regular Updates**: Update cookies when authentication errors occur
3. **Platform Coverage**: Ensure login to all necessary platforms
4. **Backup Strategy**: Keep backup of working cookies before updates

### **Security Practices**
1. **Dedicated Accounts**: Use dedicated accounts for cookie extraction
2. **Regular Rotation**: Rotate cookies monthly
3. **Monitor Usage**: Track cookie authentication usage
4. **Secure Storage**: Maintain proper file permissions

---

**🎉 Cookie Management System Complete! Comprehensive cookie authentication ready for all supported platforms.**
