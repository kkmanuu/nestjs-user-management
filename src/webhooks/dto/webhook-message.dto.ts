import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class WebhookMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @Matches(/^\+\d{10,15}$/, {
    message: 'phone must be a valid phone number (E.164 format)',
  })
  phone: string;
}
