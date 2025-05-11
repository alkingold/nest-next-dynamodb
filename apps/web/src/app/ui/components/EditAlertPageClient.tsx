'use client';

import { useAlert } from "@/app/lib/hooks/use-alerts";
import { EditAlertForm } from "@/app/ui/components/form/EditAlertForm";

export default function EditAlertPageClient({ id }: { id: string; }) {
  const { data: alert = {
	title: '',
	message: '',
  }, isLoading, error } = useAlert(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return <EditAlertForm id={id} initialTitle={alert.title} initialMessage={alert.message} />
}
