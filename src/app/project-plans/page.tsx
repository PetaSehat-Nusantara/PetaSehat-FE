'use client';

import { useAuthUser } from "@/hooks/use-auth-user";
import { useState } from "react";
import LoadingComponent from '@/components/elements/LoadingComponent';

export default function ProjectPlanDemo() {
  const { user, loading } = useAuthUser();
  type ProjectPlan = { id: string | number; name: string; description: string };
  const [plans, setPlans] = useState<ProjectPlan[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchPlans = async () => {
    setFetching(true);
    const res = await fetch("/api/project-plan");
    const data = await res.json();
    setPlans(data);
    setFetching(false);
  };

  const createPlan = async () => {
    if (!name) return;
    await fetch("/api/project-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc }),
    });
    setName("");
    setDesc("");
    fetchPlans();
  };

  if (loading) return <LoadingComponent />;
  if (!user) return <div>Silakan login untuk mengelola project plan.</div>;

  return (
    <div>
      <h2>Project Plans</h2>
      <button onClick={fetchPlans} disabled={fetching}>Load My Project Plans</button>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <b>{plan.name}</b> - {plan.description}
          </li>
        ))}
      </ul>
      <h3>Create New Project Plan</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" />
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <button onClick={createPlan} disabled={!name}>Create</button>
    </div>
  );
}
