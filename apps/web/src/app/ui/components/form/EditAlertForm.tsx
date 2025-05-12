'use client';

import { isSeverity, Severity } from "@/app/domain/alert/guards/is-severity";
import { useUpdateAlert } from "@/app/lib/hooks/use-alerts";
import { fromUTCToLocalInputValue, toUTCString } from "@/app/utils/date.helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditAlertForm({
  id,
  initialTitle,
  initialMessage,
  initialSeverity,
  initialReminderAt,
  initialDeadline,
}: {
  id: string,
  initialTitle: string;
  initialMessage: string;
  initialSeverity: Severity;
  initialReminderAt?: string | null;
  initialDeadline?: string | null;
}) {
  const [form, setForm] = useState({
    title: initialTitle,
    message: initialMessage,
    severity: initialSeverity,
    reminderAt: initialReminderAt ? fromUTCToLocalInputValue(initialReminderAt) : '',
    deadline: initialDeadline ? fromUTCToLocalInputValue(initialDeadline) : '',
  });

  const router = useRouter();
  const mutation = useUpdateAlert({
    onSuccess: () => {
      router.push('/alerts');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      id,
      data: {
        ...form,
        reminderAt: form.reminderAt !== '' ? toUTCString(form.reminderAt) : null,
        deadline: form.deadline !== '' ? toUTCString(form.deadline) : null,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({
          ...form,
          title: e.target.value,
        })}
        className="border px-2 py-1 w-full rounded"
      />
      <textarea
        value={form.message}
        onChange={(e) => setForm({
          ...form,
          message: e.target.value,
        })}
        className="border px-2 py-1 w-full rounded"
      />
      <label className="block">
        <select
          value={form.severity}
          onChange={(e) => {
            if (isSeverity(e.target.value)) {
              setForm({
                ...form,
                severity: e.target.value,
              });
            }
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <input
        type="datetime-local"
        value={form.reminderAt || ''}
        onChange={(e) => setForm({
          ...form,
          reminderAt: e.target.value,
        })}
      />
      <input
        type="datetime-local"
        value={form.deadline || ''}
        onChange={(e) => setForm({
          ...form,
          deadline: e.target.value,
        })}
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
