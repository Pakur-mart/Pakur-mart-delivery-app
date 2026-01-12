import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { signIn, signOutUser, getAuthErrorMessage, type AuthError } from "@/lib/auth";
import type { DeliveryPartner } from "@shared/schema";

interface AuthState {
  user: User | null;
  deliveryPartner: DeliveryPartner | null;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): AuthState & AuthActions {
  const [state, setState] = useState<AuthState>({
    user: null,
    deliveryPartner: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set up real-time listener for delivery partner data
        const docRef = doc(db, "deliveryPartners", user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const partnerData = { ...data, id: docSnap.id } as DeliveryPartner;
            setState(prev => ({
              ...prev,
              user,
              deliveryPartner: partnerData,
              loading: false,
              error: null
            }));
          } else {
            setState(prev => ({
              ...prev,
              user,
              deliveryPartner: null,
              loading: false,
              error: "Delivery partner profile not found"
            }));
          }
        }, (error) => {
          console.error("Error fetching delivery partner:", error);
          setState(prev => ({
            ...prev,
            user,
            loading: false,
            error: "Failed to load delivery partner data"
          }));
        });

        // Store unsubscribe function to clean up later if needed
        return () => unsubscribeSnapshot();
      } else {
        setState({
          user: null,
          deliveryPartner: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      await signIn(email, password);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: getAuthErrorMessage(error as AuthError),
      }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      await signOutUser();
      // User state will be updated via onAuthStateChanged
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Failed to sign out",
      }));
      throw error;
    }
  };

  const clearError = (): void => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    login,
    logout,
    clearError,
  };
}
