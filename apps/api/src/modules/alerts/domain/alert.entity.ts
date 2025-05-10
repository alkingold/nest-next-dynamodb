import { CreateAlertDto } from "../dto/create-alert.dto";

export class Alert {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly message: string,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateAlertDto): Alert {
    const id = Date.now().toString();
    return new Alert(id, props.title, props.message, new Date());
  }
}
