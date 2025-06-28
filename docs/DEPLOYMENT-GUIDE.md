# 🚀 TaiVideoNhanh - Complete Deployment Guide

## 📋 Overview

Hướng dẫn triển khai hoàn chỉnh cho ứng dụng TaiVideoNhanh trên EasyPanel với kiến trúc monorepo và các tính năng nâng cao.

## 🏗️ Architecture

```
EasyPanel Services:
├── taivideonhanh-db (PostgreSQL)
├── taivideonhanh-redis (Redis)  
└── taivideonhanh (Main App)
    ├── Frontend (Next.js) :3000
    ├── Backend (Node.js) :5000
    └── Nginx Proxy :80
```

## ✅ Pre-Deployment Checklist

- [ ] EasyPanel account setup
- [ ] Domain taivideonhanh.vn configured
- [ ] GitHub repository access
- [ ] Stripe account for payments (optional)
- [ ] Email service for notifications (optional)

## 🚀 Quick Deployment (5 minutes)

### Step 1: EasyPanel Setup

1. **Login to EasyPanel**
   ```
   URL: https://your-easypanel-domain.com
   ```

2. **Create New Project**
   - Project Name: `taivideonhanh`
   - Repository: `https://github.com/tuanadr/taivideonhanh`
   - Branch: `main`

### Step 2: Service Configuration

#### Main Application Service
```yaml
Name: taivideonhanh
Type: Docker
Build: Dockerfile.monorepo
Port: 3000 (exposed)

Domains:
  - taivideonhanh.vn
  - www.taivideonhanh.vn
```

#### Database Service
```yaml
Name: taivideonhanh-db
Type: PostgreSQL
Database: taivideonhanh
User: postgres
Password: [SECURE_PASSWORD]
```

#### Redis Service
```yaml
Name: taivideonhanh-redis
Type: Redis
Password: [SECURE_PASSWORD]
```

## 🔧 Environment Variables

### Core Configuration
```bash
# Database Configuration
DB_HOST=taivideonhanh-db
DB_USER=postgres
DB_PASSWORD=[SECURE_PASSWORD]
DB_NAME=taivideonhanh

# Redis Configuration
REDIS_HOST=taivideonhanh-redis
REDIS_PORT=6379
REDIS_PASSWORD=[SECURE_PASSWORD]
REDIS_DB=0

# JWT Configuration
JWT_ACCESS_SECRET=[GENERATE_SECURE_SECRET]
JWT_REFRESH_SECRET=[GENERATE_SECURE_SECRET]
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Admin Configuration
DEFAULT_ADMIN_EMAIL=admin@taivideonhanh.vn
DEFAULT_ADMIN_PASSWORD=[SECURE_PASSWORD]

# API Configuration
NEXT_PUBLIC_API_URL=https://taivideonhanh.vn/api
NEXT_PUBLIC_BACKEND_URL=https://taivideonhanh.vn
CORS_ORIGIN=https://taivideonhanh.vn

# Security
SESSION_SECRET=[GENERATE_SECURE_SECRET]
ENABLE_SECURITY_HEADERS=true
TRUST_PROXY=true

# Performance
ENABLE_RATE_LIMITING=true
PERFORMANCE_MONITORING_ENABLED=true
HEALTH_CHECK_ENABLED=true

# Environment
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Optional Services
```bash
# Stripe Payment (Optional)
STRIPE_SECRET_KEY=sk_live_[YOUR_STRIPE_SECRET]
STRIPE_WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]

# Email Service (Optional)
EMAIL_SERVICE_API_KEY=[YOUR_EMAIL_API_KEY]
EMAIL_FROM=noreply@taivideonhanh.vn

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 🍪 YouTube Cookie Authentication (Optional)

### Method 1: Manual Cookie File (Recommended)

1. **Export cookies from browser:**
   ```bash
   # Use browser extension "Get cookies.txt LOCALLY"
   # Or use provided script
   chmod +x setup-youtube-cookies.sh
   ./setup-youtube-cookies.sh
   ```

2. **Upload cookie file:**
   ```bash
   # Create cookies directory in project
   mkdir -p cookies
   cp /tmp/cookies/youtube-cookies.txt ./cookies/
   ```

3. **Environment variables:**
   ```bash
   ENABLE_COOKIE_AUTH=true
   YOUTUBE_COOKIES_PATH=/app/cookies/youtube-cookies.txt
   ```

### Method 2: Browser Profile (Advanced)
```bash
ENABLE_COOKIE_AUTH=true
CHROME_USER_DATA_DIR=/app/chrome-profile
```

## 🛠️ Deployment Steps

### Step 1: Generate Secrets
```bash
# Use provided script to generate secure secrets
./generate-secrets.sh

# Copy output to EasyPanel environment variables
```

### Step 2: Deploy Services

1. **Create Database Service**
   - Go to Services → Create Service
   - Choose PostgreSQL
   - Configure database name and credentials

2. **Create Redis Service**
   - Go to Services → Create Service
   - Choose Redis
   - Set password

3. **Create Main Application**
   - Go to Services → Create Service
   - Choose Git Repository
   - Set Dockerfile to `Dockerfile.monorepo`
   - Configure environment variables
   - Add domains

### Step 3: Post-Deployment Setup

1. **Database Migration**
   ```bash
   # Access application container
   cd /app/backend
   npm run migrate
   ```

2. **Create Admin User**
   ```bash
   node scripts/create-admin-user.js
   # Email: admin@taivideonhanh.vn
   # Password: [SECURE_PASSWORD]
   ```

## 🔍 Verification

### Health Checks
```bash
# Test main site
curl -I https://taivideonhanh.vn

# Test API
curl -I https://taivideonhanh.vn/api/health

# Test admin routes
curl -I https://taivideonhanh.vn/admin/login

# All should return 200 OK
```

### Functional Tests
```bash
# Test video download
curl -X POST https://taivideonhanh.vn/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw"}'

# Test admin login
curl -X POST https://taivideonhanh.vn/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@taivideonhanh.vn", "password": "[PASSWORD]"}'
```

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check database service status in EasyPanel
# Verify environment variables
# Check network connectivity between services
```

#### Redis Connection Failed
```bash
# Check Redis service status
# Verify REDIS_URL format
# Check memory limits
```

#### Build Failed
```bash
# Check Dockerfile.monorepo syntax
# Verify all dependencies in package.json
# Check build logs in EasyPanel
```

#### YouTube Authentication Issues
```bash
# Check cookie file exists and format
# Verify cookie file permissions
# Update cookies (may expire)
# Check environment variables
```

## 🔄 Maintenance

### Regular Tasks

1. **Cookie Updates** (Monthly)
   ```bash
   ./setup-youtube-cookies.sh
   # Upload new cookie file via admin panel
   ```

2. **Security Updates**
   ```bash
   # Update dependencies
   npm audit fix
   
   # Regenerate JWT secrets periodically
   ./generate-secrets.sh
   ```

3. **Database Backup**
   ```bash
   # EasyPanel provides automatic backups
   # Configure backup retention policy
   ```

## 📊 Monitoring

### Key Metrics
- Response time < 3 seconds
- Success rate > 95%
- Memory usage < 80%
- CPU usage < 70%

### Alerts Setup
- High error rates (>20%)
- Authentication failures
- Long response times (>10s)
- Service downtime

## 🔐 Security Checklist

- [ ] All environment variables secured
- [ ] Database passwords strong
- [ ] JWT secrets generated securely
- [ ] Admin passwords changed from defaults
- [ ] HTTPS enforced everywhere
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Security headers enabled

## 📞 Support

For deployment issues:
1. Check EasyPanel service logs
2. Verify environment variables
3. Run health checks
4. Check network connectivity
5. Review configuration files

---

**🎉 Deployment Complete! Your TaiVideoNhanh application is now live at https://taivideonhanh.vn**
