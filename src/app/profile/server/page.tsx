// app/profile/page.tsx (or any server component)
import { getUserFromCookie } from '@/lib/getUserServer';

export default async function ProfilePage() {
  const user = await getUserFromCookie();

  if (!user) {
    // If no user, you can redirect to login or dashboard (server-side redirect)
    // import redirect from 'next/navigation'
    // redirect('/dashboard');

    return <p>User not logged in. Please login first.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.email}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
