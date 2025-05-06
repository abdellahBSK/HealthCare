'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/api/api';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/types/user';
import { Input } from "@/components/ui/input";
// Remove toast import
// import { toast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  // Add notification state
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({ show: false, type: 'success', message: '' });
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    bloodType: '',
    height: '',
    weight: '',
    primaryCarePhysician: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    insuranceProviderName: '',
    insurancePolicyNumber: '',
    preferredPharmacyName: '',
    preferredPharmacyAddress: ''
  });
  const router = useRouter();

  // Get user ID from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (!token || !storedUserId) {
      router.push('/login');
      return;
    }

    setUserId(storedUserId);
  }, [router]);

  // Fetch user profile when userId is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      
      try {
        const response = await api.get(`/users/${userId}/profile`);
        setUserProfile(response.data);
        
        // Initialize form data with user profile data
        const { user, profile } = response.data;
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phoneNumber: user.phoneNumber || '',
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
          address: user.address || '',
          bloodType: profile?.bloodType || '',
          height: profile?.height || '',
          weight: profile?.weight || '',
          primaryCarePhysician: profile?.primaryCarePhysician || '',
          emergencyContactName: profile?.emergencyContact?.name || '',
          emergencyContactRelationship: profile?.emergencyContact?.relationship || '',
          emergencyContactPhone: profile?.emergencyContact?.phoneNumber || '',
          insuranceProviderName: profile?.insuranceProvider?.name || '',
          insurancePolicyNumber: profile?.insuranceProvider?.policyNumber || '',
          preferredPharmacyName: profile?.preferredPharmacy?.name || '',
          preferredPharmacyAddress: profile?.preferredPharmacy?.address || ''
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update handleSaveChanges to use our custom notification
  const handleSaveChanges = async () => {
    if (!userId) return;
    
    try {
      // Prepare user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address
      };

      // Prepare profile data
      const profileData = {
        bloodType: formData.bloodType,
        height: formData.height,
        weight: formData.weight,
        primaryCarePhysician: formData.primaryCarePhysician,
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phoneNumber: formData.emergencyContactPhone
        },
        insuranceProvider: {
          name: formData.insuranceProviderName,
          policyNumber: formData.insurancePolicyNumber
        },
        preferredPharmacy: {
          name: formData.preferredPharmacyName,
          address: formData.preferredPharmacyAddress
        }
      };

      // Update user info
      await api.put(`/users/${userId}`, userData);
      
      // Update patient profile
      await api.put(`/patients/${userId}`, profileData);
      
      // Fetch updated profile
      const response = await api.get(`/users/${userId}/profile`);
      setUserProfile(response.data);
      
      setEditMode(false);
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: 'Your profile has been updated successfully.'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: 'success', message: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      
      // Show error notification
      setNotification({
        show: true,
        type: 'error',
        message: 'There was an error updating your profile. Please try again.'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, type: 'error', message: '' });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[500px] col-span-1 rounded-lg" />
          <Skeleton className="h-[500px] col-span-1 md:col-span-2 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <div className="p-6">Failed to load profile data. Please try again later.</div>;
  }

  const { user: userData, profile } = userProfile!;
  
  // Format date of birth if available
  const formattedDOB = userData.dateOfBirth 
    ? format(new Date(userData.dateOfBirth), 'MMMM d, yyyy')
    : 'Not provided';

  // Create initials for avatar fallback
  const initials = `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`;

  return (
    <div className="p-6">
      {/* Add notification display */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
        {editMode ? (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-900 hover:bg-blue-800"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="border-blue-900 text-blue-900 hover:bg-blue-50"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userData.profileImage || "/placeholder.svg?height=96&width=96"} alt={`${userData.firstName} ${userData.lastName}`} />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-900">{initials}</AvatarFallback>
            </Avatar>
            {editMode ? (
              <div className="space-y-2 w-full">
                <Input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="text-center"
                />
                <Input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="text-center"
                />
              </div>
            ) : (
              <h2 className="text-xl font-bold text-blue-900">{`${userData.firstName} ${userData.lastName}`}</h2>
            )}
            <p className="text-gray-500 mb-4">Patient ID: {userData._id}</p>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 mb-2">Upload New Photo</Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="text-blue-900">{userData.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              {editMode ? (
                <Input 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
              ) : (
                <p className="text-blue-900">{userData.phoneNumber || 'Not provided'}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              {editMode ? (
                <Input 
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-blue-900">{formattedDOB}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              {editMode ? (
                <Input 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              ) : (
                <p className="text-blue-900">{userData.address || 'Not provided'}</p>
              )}
            </div>
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2 p-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Primary Care Physician</h3>
                {editMode ? (
                  <Input 
                    name="primaryCarePhysician"
                    value={formData.primaryCarePhysician}
                    onChange={handleInputChange}
                    placeholder="Primary Care Physician"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">{profile?.primaryCarePhysician || 'Not specified'}</p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">Blood Type</h3>
                {editMode ? (
                  <Input 
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    placeholder="Blood Type"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">{profile?.bloodType || 'Not specified'}</p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">Height</h3>
                {editMode ? (
                  <Input 
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">{profile?.height || 'Not specified'}</p>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">Weight</h3>
                {editMode ? (
                  <Input 
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    className="mb-4"
                  />
                ) : (
                  <p className="text-blue-900 mb-4">{profile?.weight || 'Not specified'}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</h3>
                {editMode ? (
                  <div className="space-y-2 mb-4">
                    <Input 
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleInputChange}
                      placeholder="Contact Name"
                    />
                    <Input 
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleInputChange}
                      placeholder="Relationship"
                    />
                    <Input 
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                    />
                  </div>
                ) : (
                  profile?.emergencyContact ? (
                    <>
                      <p className="text-blue-900">{`${profile.emergencyContact.name} (${profile.emergencyContact.relationship})`}</p>
                      <p className="text-blue-900 mb-4">{profile.emergencyContact.phoneNumber}</p>
                    </>
                  ) : (
                    <p className="text-blue-900 mb-4">Not specified</p>
                  )
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">Insurance Provider</h3>
                {editMode ? (
                  <div className="space-y-2 mb-4">
                    <Input 
                      name="insuranceProviderName"
                      value={formData.insuranceProviderName}
                      onChange={handleInputChange}
                      placeholder="Provider Name"
                    />
                    <Input 
                      name="insurancePolicyNumber"
                      value={formData.insurancePolicyNumber}
                      onChange={handleInputChange}
                      placeholder="Policy Number"
                    />
                  </div>
                ) : (
                  profile?.insuranceProvider ? (
                    <>
                      <p className="text-blue-900">{profile.insuranceProvider.name}</p>
                      <p className="text-blue-900 mb-4">Policy #: {profile.insuranceProvider.policyNumber}</p>
                    </>
                  ) : (
                    <p className="text-blue-900 mb-4">Not specified</p>
                  )
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Pharmacy</h3>
                {editMode ? (
                  <div className="space-y-2">
                    <Input 
                      name="preferredPharmacyName"
                      value={formData.preferredPharmacyName}
                      onChange={handleInputChange}
                      placeholder="Pharmacy Name"
                    />
                    <Input 
                      name="preferredPharmacyAddress"
                      value={formData.preferredPharmacyAddress}
                      onChange={handleInputChange}
                      placeholder="Pharmacy Address"
                    />
                  </div>
                ) : (
                  profile?.preferredPharmacy ? (
                    <>
                      <p className="text-blue-900">{profile.preferredPharmacy.name}</p>
                      <p className="text-blue-900">{profile.preferredPharmacy.address}</p>
                    </>
                  ) : (
                    <p className="text-blue-900">Not specified</p>
                  )
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-bold text-blue-900 mb-4">Account Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Notification Preferences</h3>
                  <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Privacy Settings</h3>
                  <p className="text-sm text-gray-500">Control your data and privacy preferences</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
