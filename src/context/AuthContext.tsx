import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
}

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  isSeller?: boolean;
  storeInfo?: {
    storeName: string;
    description: string;
    address: string;
  };
  subscription?: {
    planId: string;
    status: 'active' | 'inactive' | 'cancelled';
    startDate: string;
    endDate: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  subscriptionPlans: SubscriptionPlan[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  continueAsGuest: () => Promise<void>;
  becomeSeller: (storeInfo: User['storeInfo'], planId: string) => Promise<void>;
  updateSubscription: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999.99,
    features: [
      'List up to 10 products',
      'Basic analytics',
      'Standard support',
    ],
    billingCycle: 'monthly',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2999.99,
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      'Featured listings',
      'Custom store branding',
    ],
    billingCycle: 'monthly',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement auth state listener
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement login logic
      setUser({
        id: '1',
        email,
        displayName: 'Test User',
        photoURL: null,
        phoneNumber: null,
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // TODO: Implement registration logic
      setUser({
        id: '1',
        email,
        displayName: name,
        photoURL: null,
        phoneNumber: null,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // TODO: Implement logout logic
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      // TODO: Implement profile update logic
      if (user) {
        setUser({ ...user, ...data });
      }
    } catch (error) {
      throw error;
    }
  };

  const continueAsGuest = async () => {
    try {
      setUser({
        id: 'guest',
        email: null,
        displayName: 'Guest User',
        photoURL: null,
        phoneNumber: null,
      });
    } catch (error) {
      throw error;
    }
  };

  const becomeSeller = async (storeInfo: User['storeInfo'], planId: string) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to become a seller');
      }
      // TODO: Implement seller registration with backend
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Invalid subscription plan');
      }

      setUser({
        ...user,
        isSeller: true,
        storeInfo,
        subscription: {
          planId,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const updateSubscription = async (planId: string) => {
    try {
      if (!user) {
        throw new Error('User must be logged in to update subscription');
      }
      // TODO: Implement subscription update with backend
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new Error('Invalid subscription plan');
      }

      setUser({
        ...user,
        subscription: {
          planId,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      if (!user?.subscription) {
        throw new Error('No active subscription to cancel');
      }
      // TODO: Implement subscription cancellation with backend
      setUser({
        ...user,
        subscription: {
          ...user.subscription,
          status: 'cancelled',
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        subscriptionPlans: SUBSCRIPTION_PLANS,
        login,
        register,
        logout,
        updateProfile,
        continueAsGuest,
        becomeSeller,
        updateSubscription,
        cancelSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 