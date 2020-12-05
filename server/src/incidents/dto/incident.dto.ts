import {IsNotEmpty, IsString} from "class-validator";

export class IncidentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  
  @IsNotEmpty()
  @IsString()
  readonly status: string;
  
  @IsNotEmpty()
  @IsString()
  readonly priority: string;
  
  @IsNotEmpty()
  @IsString()
  readonly country: string;
}
