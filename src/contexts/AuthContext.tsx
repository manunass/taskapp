import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { createUser } from '@/clients/users_client';

/**
 * User metadata interface for signup
 * This data is stored in Supabase Auth user metadata
 */
interface UserMetadata {
  firstName: string;
  lastName: string;
}

/**
 * Auth context interface
 * Provides authentication functions including custom user table integration
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any;
    data: any;
  }>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<{
    error: any;
    data: any;
  }>;
  signOut: () => Promise<void>;
  syncUserToCustomTable: (email: string, firstName: string, lastName: string) => Promise<{
    error: any;
    success: boolean;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session instead of clearing it
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes (this will handle new sign-ins)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, metadata?: UserMetadata) => {
    try {
      // First, create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata ? {
            first_name: metadata.firstName,
            last_name: metadata.lastName,
            full_name: `${metadata.firstName} ${metadata.lastName}`,
          } : undefined,
        },
      });

      if (error) {
        return { data, error };
      }

      // If signup was successful and we have metadata, insert into custom Users table
      if (data.user && metadata) {
        
        try {
          console.log(metadata)
          await createUser(email, metadata.firstName, metadata.lastName);
        } catch (rpcError) {
          console.error('Error creating user in custom table:', rpcError);
          
          // Option 1: Continue with auth user creation (current behavior)
          // The auth user was created successfully, but the custom table insert failed
          // You might want to handle this differently based on your requirements
          
          // Option 2: Rollback auth user creation (uncomment if you want this behavior)
          // Note: This requires admin privileges and might not be the best UX
          /*
          try {
            // Delete the auth user if custom table insert failed
            const { error: deleteError } = await supabase.auth.admin.deleteUser(data.user.id);
            if (deleteError) {
              console.error('Error deleting auth user after rollback:', deleteError);
            }
            return { 
              data: null, 
              error: { message: 'Failed to create user profile. Please try again.' } 
            };
          } catch (deleteErr) {
            console.error('Error during rollback:', deleteErr);
          }
          */
          
          // For now, we'll continue with the auth user creation
          // You can implement a retry mechanism or admin cleanup process
        }
      }

      return { data, error: null };
    } catch (err) {
      console.error('Signup error:', err);
      return { 
        data: null, 
        error: { message: 'An unexpected error occurred during signup' } 
      };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const syncUserToCustomTable = async (email: string, firstName: string, lastName: string) => {
    try {
      await createUser(email, firstName, lastName);
      return { 
        error: null, 
        success: true 
      };
    } catch (error) {
      return { 
        error, 
        success: false 
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    syncUserToCustomTable,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 