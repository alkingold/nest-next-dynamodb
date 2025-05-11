import EditAlertPageClient from "@/app/ui/components/EditAlertPageClient";

export default async function EditAlertPage({ params }: {params: { id: string; }}) {
  const { id } = await params;
  return <EditAlertPageClient id={id} />
}
