// Test Credentials for TransferEase Application

## Admin Login
- **URL**: `/admin`
- **Email**: `admin@transferease.com`
- **Password**: `admin123`
- **Dashboard**: `/admin/dashboard`

## Regular User Login  
- **URL**: `/login`
- **Email**: `john.doe@email.com`
- **Password**: `password123`
- **Dashboard**: `/dashboard`

## Testing Steps for Admin Dashboard Access:

1. **Navigate to Admin Login**:
   - Go to `/admin` 
   - Use credentials: `admin@transferease.com` / `admin123`

2. **Verify Admin Role**:
   - After login, should redirect to `/admin/dashboard`
   - Check that user role is 'admin' in browser dev tools

3. **Test Protection**:
   - Try accessing `/admin/dashboard` without login
   - Should redirect to `/admin` login page

## Common Issues Fixed:
- ✅ Role mismatch: Changed 'citizen' to 'user' in ProtectedRoute
- ✅ Redirect URL: Fixed `/admin/login` to `/admin`  
- ✅ AuthContext: Updated role checking functions
- ✅ Route protection: Corrected admin/user role validation

## Debug Commands:
```javascript
// Check current user in browser console
console.log('Current user:', localStorage.getItem('transferease_user'));
console.log('Current token:', localStorage.getItem('transferease_token'));

// Parse user data
const userData = JSON.parse(localStorage.getItem('transferease_user') || '{}');
console.log('User role:', userData.role);
```
