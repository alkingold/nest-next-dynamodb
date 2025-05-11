'use client';

import { useCreateAlert } from "@/app/lib/hooks/use-alerts";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAlertForm() {
  const mutation = useCreateAlert({
    onSuccess: () => {
      router.push('/alerts');
    },
  });
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="Alert Title"
        value={form.title}
        onChange={e => setForm({
          ...form,
          title: e.target.value,
        })}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Alert Message"
        value={form.message}
        onChange={e => setForm({
          ...form,
          message: e.target.value,
        })}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
