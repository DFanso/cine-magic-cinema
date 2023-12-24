import { PartialType } from '@nestjs/swagger';
import { CreateShowTimeDto } from './create-show-time.dto';

export class UpdateShowTimeDto extends PartialType(CreateShowTimeDto) {}
