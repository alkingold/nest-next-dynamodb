'use client';

import Link from "next/link";
import { useAlerts, useDeleteAlert } from "../lib/hooks/use-alerts";

export default function AlertsPage() {
  const { data: alerts, isLoading, error } = useAlerts();
  const deleteAlert = useDeleteAlert();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Alerts List</h1>
      <Link href="/alerts/new" className="text-blue-600 underline">
        Create a new alert
      </Link>
      <ul className="space-y-3">
        {alerts?.map(alert => (
          <li key={alert.id} className="border p-3 rounded shadow bg-white">
            <h2 className="font-semibold">{alert.title}</h2>
            <p>{alert.message}</p>
            <Link
              href={`/alerts/${alert.id}/edit`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteAlert.mutate(alert.id)}
            >
              Delete
            </button>
        </li>
        ))}
      </ul>
    </main>
  )
}
