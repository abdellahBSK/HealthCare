export interface UserProfile {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    address?: string;
    profileImage?: string;
    userType: string;
    isVerified: boolean;
  };
  profile?: {
    bloodType?: string;
    height?: string;
    weight?: string;
    emergencyContact?: {
      name: string;
      relationship: string;
      phoneNumber: string;
    };
    insuranceProvider?: {
      name: string;
      policyNumber: string;
    };
    preferredPharmacy?: {
      name: string;
      address: string;
    };
    primaryCarePhysician?: string;
  };
}