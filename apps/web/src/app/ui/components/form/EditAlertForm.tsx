'use client';

import { useUpdateAlert } from "@/app/lib/hooks/use-alerts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditAlertForm({
  id,
  initialTitle,
  initialMessage,
}: {
  id: string,
  initialTitle: string;
  initialMessage: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);

  const router = useRouter();
  const mutation = useUpdateAlert({
    onSuccess: () => {
      router.push('/alerts');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({id, data: { title, message }});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 w-full rounded"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border px-2 py-1 w-full rounded"
      />
      {mutation.isError && (
        <p className="text-red-500">Error updating alert</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
}
