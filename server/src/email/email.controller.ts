import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactFormDto } from './dto/contact-form.dto';

@ApiTags('email')
@Controller({ path: 'email', version: '1' })
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send contact form via email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Form data sent successfully.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  async sendContactEmail(
    @Body() contactFormDto: ContactFormDto,
  ): Promise<{ message: string }> {
    await this.emailService.sendContactEmail(contactFormDto);
    return { message: 'Contact form submitted successfully.' };
  }
}
