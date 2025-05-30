import { auth } from "@/lib/firebase/firebaseClient";

export async function getUserProfile() {
  if (!auth.currentUser) return;

  const token = await auth.currentUser.getIdToken();

  const res = await fetch("/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log("User profile from server:", data);
  } else {
    console.error("Failed to fetch user profile");
  }
}
