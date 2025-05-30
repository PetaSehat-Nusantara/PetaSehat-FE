"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { login, loginWithGoogle, logout, register } from "@/lib/firebase/auth/auth";
import { auth } from "@/lib/firebase/firebaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = isRegistering
      ? await register(email, password)
      : await login(email, password);

    if (result.error) setError(result.error);
    else {
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (result.error) setError(result.error);
    else {
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h1>

      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {isRegistering ? "Register" : "Login"}
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            Continue with Google
          </button>
          <p className="text-sm text-center text-gray-600">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
