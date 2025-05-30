'use client';

import { useState } from 'react';
import { logout } from '@/lib/firebase/auth/auth';
import { Button } from '@/components/ui/button';
import router from 'next/router';

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    const { error } = await logout();
    setLoading(false);
    if (error) setError(error);
    router.push("/");
  };

  return (
    <div>
      <Button onClick={handleSignOut} disabled={loading}>
        {loading ? 'Signing out...' : 'Sign Out'}
      </Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
