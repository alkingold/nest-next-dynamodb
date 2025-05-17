import { Alert, CreateAlertDto, UpdateAlertDto } from "@/app/domain/alert/alert";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function createAlert(data: CreateAlertDto) {
  console.log('CALL CREATE API DATA', data);
  const res = await fetch(`${BASE_URL}/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creating alert');
  return res.json();
}

export async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch(`${BASE_URL}/alerts`);
  if (!res.ok) throw new Error('Error loading alerts');
  return res.json();
}

export async function fetchAlertById(id: string): Promise<Alert> {
  const res = await fetch(`${BASE_URL}/alerts/${id}`);
  if (!res.ok) throw new Error('Error loading alert');
  return res.json();
}

export async function updateAlert(id: string, data: UpdateAlertDto) {
  const res = await fetch(`${BASE_URL}/alerts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error updating alert');
  return res.json();
}

export async function deleteAlert(id: string) {
  const res = await fetch(`${BASE_URL}/alerts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting alert');
}
