export const SEVERITIES = ['low', 'medium', 'high'] as const;
export type Severity  = typeof SEVERITIES[number];

export function isSeverity(value: string): value is Severity {
  return SEVERITIES.includes(value as Severity);
}
