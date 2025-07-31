import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, FileText, Lock, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Card, { CardHeader, CardBody } from '../shared/Card';
import { Button, Input } from '../shared';

const UserProfileSettings = () => {
  const { user, updateUser, changePassword } = useAuth();
  const { showNotification } = useNotification();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Profile form
  const profileForm = useForm({
    defaultValues: {
      firstName: user?.firstName || user?.name?.split(' ')[0] || '',
      lastName: user?.lastName || user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      district: user?.district || '',
      province: user?.province || ''
    }
  });

  // Password form
  const passwordForm = useForm();

  const onProfileSubmit = async (data) => {
    setIsUpdating(true);
    try {
      await updateUser(data);
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Profile update error:', error);
      showNotification(error.message || 'Failed to update profile', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(data.currentPassword, data.newPassword);
      showNotification('Password changed successfully!', 'success');
      passwordForm.reset();
    } catch (error) {
      console.error('Password change error:', error);
      showNotification(error.message || 'Failed to change password', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <Card>
          <CardHeader title="Personal Information" />
          <CardBody>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...profileForm.register('firstName', {
                    required: 'First name is required'
                  })}
                  error={profileForm.formState.errors.firstName?.message}
                  leftIcon={<User className="w-4 h-4" />}
                />
                <Input
                  label="Last Name"
                  {...profileForm.register('lastName', {
                    required: 'Last name is required'
                  })}
                  error={profileForm.formState.errors.lastName?.message}
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                {...profileForm.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={profileForm.formState.errors.email?.message}
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <Input
                label="Phone Number"
                {...profileForm.register('phone', {
                  required: 'Phone number is required'
                })}
                error={profileForm.formState.errors.phone?.message}
                leftIcon={<Phone className="w-4 h-4" />}
                placeholder="+94 77 123 4567"
              />

              <Input
                label="Address"
                {...profileForm.register('address')}
                placeholder="Street address, city"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="District"
                  {...profileForm.register('district')}
                  placeholder="e.g., Colombo"
                />
                <Input
                  label="Province"
                  {...profileForm.register('province')}
                  placeholder="e.g., Western"
                />
              </div>

              <Button
                type="submit"
                loading={isUpdating}
                className="w-full"
                leftIcon={<Save className="w-4 h-4" />}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Account Security */}
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader title="Account Information" />
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Account Type</p>
                    <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user?.role === 'admin' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Citizen'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">NIC Number</p>
                    <p className="text-sm text-gray-600">{user?.nic}</p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-sm text-gray-600">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader title="Change Password" />
            <CardBody>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showPasswords.current ? 'text' : 'password'}
                    {...passwordForm.register('currentPassword', {
                      required: 'Current password is required'
                    })}
                    error={passwordForm.formState.errors.currentPassword?.message}
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="focus:outline-none"
                      >
                        {showPasswords.current ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                  />
                </div>

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPasswords.new ? 'text' : 'password'}
                    {...passwordForm.register('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    error={passwordForm.formState.errors.newPassword?.message}
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="focus:outline-none"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                  />
                </div>

                <div className="relative">
                  <Input
                    label="Confirm New Password"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    {...passwordForm.register('confirmPassword', {
                      required: 'Please confirm your new password'
                    })}
                    error={passwordForm.formState.errors.confirmPassword?.message}
                    leftIcon={<Lock className="w-4 h-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="focus:outline-none"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    }
                  />
                </div>

                <Button
                  type="submit"
                  loading={isChangingPassword}
                  className="w-full"
                  variant="secondary"
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  {isChangingPassword ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;
