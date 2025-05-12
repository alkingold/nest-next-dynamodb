import { CreateAlertDto } from "../dto/create-alert.dto";

export type Severity = 'low' | 'medium' | 'high';

export class Alert {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly message: string,
    public readonly severity: Severity,
    public readonly reminderAt: string | null,
    public readonly deadline: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: CreateAlertDto): Alert {
    const date = new Date();
    const id = Date.now().toString();

    return new Alert(
      id,
      props.title,
      props.message,
      props.severity ?? 'low',
      props.reminderAt ?? null,
      props.deadline ?? null,
      date,
      date,
    );
  }
}
