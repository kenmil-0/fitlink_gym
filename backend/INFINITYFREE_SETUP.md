# 🚀 InfinityFree Laravel Deployment Guide

## 📋 Prerequisites
- InfinityFree account (free)
- FileZilla or any FTP client
- Your Laravel backend code

## 🔧 Step-by-Step Setup

### 1. Create InfinityFree Account
1. Go to [infinityfree.net](https://infinityfree.net)
2. Click "Sign Up" and create account
3. Verify your email

### 2. Create Hosting Account
1. Login to InfinityFree
2. Click "New Account"
3. Choose subdomain: `fitlink-api.infinityfreeapp.com`
4. Select **PHP 8.1**
5. Create account

### 3. Create MySQL Database
1. In control panel → "MySQL Databases"
2. Create new database:
   - **Database name:** `fitlink`
   - **Username:** `fitlink_user`
   - **Password:** (create strong password)
3. **Save these details!**

### 4. Prepare Laravel Files

#### Files to Upload:
```
backend/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/          ← Document root
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env             ← Rename from env.infinityfree
├── artisan
└── composer.json
```

#### Important Notes:
- **Document root:** `public/` folder
- **Upload everything** except `node_modules/` and `.git/`

### 5. Configure Environment

#### Edit `.env` file:
```env
APP_NAME=Fitlink
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://your-subdomain.infinityfreeapp.com

DB_CONNECTION=mysql
DB_HOST=your-mysql-host.infinityfree.com
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-username
DB_PASSWORD=your-password

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

### 6. Upload Files via FTP
1. **Download FileZilla** (free FTP client)
2. **Connect to your InfinityFree server:**
   - Host: `your-subdomain.infinityfreeapp.com`
   - Username: (from InfinityFree)
   - Password: (from InfinityFree)
   - Port: 21

3. **Upload files:**
   - Upload all Laravel files to `htdocs/`
   - Make sure `public/` is your document root

### 7. Set Permissions
Set these folder permissions to **755**:
- `storage/`
- `bootstrap/cache/`

### 8. Generate App Key
1. **SSH into your server** (if available)
2. **Run:** `php artisan key:generate`
3. **Or manually generate** and add to `.env`

### 9. Run Migrations
1. **SSH into server**
2. **Run:** `php artisan migrate --force`

### 10. Test Your API
Visit: `https://your-subdomain.infinityfreeapp.com/api/v1/test`

## 🔗 Update Frontend
Update your React Native app:
```typescript
const API_BASE_URL = 'https://your-subdomain.infinityfreeapp.com/api/v1';
```

## ⚠️ Important Notes

### Limitations:
- **No SSH access** (use phpMyAdmin for database)
- **Limited file operations**
- **No cron jobs**
- **No Redis** (use file cache)

### Solutions:
- **Database:** Use phpMyAdmin in control panel
- **File operations:** Use Laravel's file driver
- **Cron jobs:** Use external services
- **Cache:** Use file cache instead of Redis

## 🎯 Quick Test
After setup, test with:
```
GET https://your-subdomain.infinityfreeapp.com/api/v1/test
```

Should return:
```json
{
  "message": "Fitlink API is working!",
  "timestamp": "2025-08-27T...",
  "status": "success"
}
```

## 🆘 Troubleshooting

### Common Issues:
1. **500 Error:** Check `.env` file and permissions
2. **Database Error:** Verify MySQL credentials
3. **404 Error:** Ensure document root is `public/`
4. **Permission Error:** Set storage folder to 755

### Support:
- InfinityFree forums
- Laravel documentation
- Check error logs in control panel
