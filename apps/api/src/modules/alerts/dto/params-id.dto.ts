import { IsNotEmpty, IsString } from "class-validator";

export class ParamsWithIdDto {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
