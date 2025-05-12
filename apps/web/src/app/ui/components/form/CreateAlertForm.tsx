'use client';

import { CreateAlertDto } from "@/app/domain/alert/alert";
import { useCreateAlert } from "@/app/lib/hooks/use-alerts";
import { toUTCString } from "@/app/utils/date.helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAlertForm() {
  const mutation = useCreateAlert({
    onSuccess: () => {
      router.push('/alerts');
    },
  });
  const router = useRouter();
  const [form, setForm] = useState<CreateAlertDto>({
    title: '',
    message: '',
    severity: 'low',
    reminderAt: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      reminderAt: form.reminderAt ? toUTCString(form.reminderAt) : null,
      deadline: form.deadline ? toUTCString(form.deadline) : null,
    });
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
      <label className="block">
        <select
          value={form.severity}
          onChange={(e) => setForm({
            ...form,
            severity: e.target.value as CreateAlertDto["severity"]
          })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <input
        type="datetime-local"
        value={form.reminderAt ?? ''}
        onChange={(e) => setForm({
          ...form,
          reminderAt: e.target.value,
        })}
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        value={form.deadline ?? ''}
        onChange={(e) => setForm({
          ...form,
          deadline: e.target.value,
        })}
        className="border p-2 rounded"
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
