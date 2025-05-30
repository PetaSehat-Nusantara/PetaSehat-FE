'use client';

import { useAuthUser } from '@/hooks/use-auth-user';

export default function ProfilePage() {
  const { user, loading } = useAuthUser();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div>
      <p>Welcome, {user.displayName || user.email}</p>
      <p>UID: {user.uid}</p>
    </div>
  ) : (
    <p>Please log in.</p>
  );
}
