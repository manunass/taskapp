import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Admin component for manually syncing users to custom table
 * This is useful for handling edge cases where the automatic sync failed
 */
const AdminUserSync: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const { syncUserToCustomTable } = useAuth();

  const handleSync = async () => {
    if (!email || !firstName || !lastName) {
      setResult({ success: false, message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const { error, success } = await syncUserToCustomTable(
        email,
        firstName,
        lastName
      );

      if (success) {
        setResult({
          success: true,
          message: 'User synced successfully to custom table',
        });
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        setResult({
          success: false,
          message: error?.message || 'Failed to sync user',
        });
      }
    } catch (err) {
      setResult({ success: false, message: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sync User to Custom Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
          />
        </div>

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>

        <Button onClick={handleSync} disabled={isLoading} className="w-full">
          {isLoading ? 'Syncing...' : 'Sync User'}
        </Button>

        {result && (
          <div
            className={`p-3 rounded-md ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {result.message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserSync;
