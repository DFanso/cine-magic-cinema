import { PartialType } from '@nestjs/swagger';
import { CreateOTPDto } from './create-otp.dto';

export class updateOTPDto extends PartialType(CreateOTPDto) {}
