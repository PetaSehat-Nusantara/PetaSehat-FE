import { NextRequest } from "next/server";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getUserFromCookie } from "@/lib/getUserServer";
import { db } from "@/lib/firebase/firebaseClient";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await req.json();
  const { name, description } = body;

  if (!name) {
    return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });
  }

  try {
    const docRef = await addDoc(collection(db, "projectPlans"), {
      userId: user.uid,
      name,
      description: description || "",
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
  } catch (error) {
    console.error("Failed to create project plan:", error);
    return new Response(JSON.stringify({ error: "Failed to create project plan" }), { status: 500 });
  }
}

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const q = query(collection(db, "projectPlans"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const plans = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(plans), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch project plans:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch project plans" }), { status: 500 });
  }
}
