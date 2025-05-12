export function toUTCString(localDateTime: string): string {
  const localDate = new Date(localDateTime);
  return localDate.toISOString();
}

export function fromUTCToLocalInputValue(utcString: string): string {
  const utcDate = new Date(utcString);
  const offsetDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000)
  return offsetDate.toISOString().slice(0, 16);
}

export function formatDateReadable(utcString: string): string {
  const date = new Date(utcString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
