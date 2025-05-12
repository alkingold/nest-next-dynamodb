'use client';

import { useAlert } from "@/app/lib/hooks/use-alerts";
import { EditAlertForm } from "@/app/ui/components/form/EditAlertForm";

export default function EditAlertPageClient({ id }: { id: string; }) {
  const { data: alert, isLoading, error } = useAlert(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error: {(error as Error).message}</p>;
  if (!alert) return <div>Not found</div>

  const editFormProps = {
    initialTitle: alert.title,
    initialMessage: alert.message,
    initialSeverity: alert.severity,
    initialReminderAt: alert?.reminderAt,
    initialDeadline: alert?.deadline,
  }

  return <EditAlertForm id={id} {...editFormProps} />
}
