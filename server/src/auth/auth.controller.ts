import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ClsService } from 'nestjs-cls';
import { ValidateOTPDto } from './dto/validate.otp';
import { UserStatus, UserType } from 'src/Types/user.types';
import { UsersService } from 'src/users/users.service';
import { RequestOTPDto } from './dto/request.otp.dto';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly clsService: ClsService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.signUp(createUserDto);
      return { user };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User Already Exits');
      }
    }
    const user = await this.authService.signUp(createUserDto);
    return { user };
  }

  @Post('admin/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  async signUpAdmin(@Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.type = UserType.Admin;
      const user = await this.authService.signUp(createUserDto);
      return { user };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User Already Exits');
      }
    }
    const user = await this.authService.signUp(createUserDto);
    return { user };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully signed in.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials.',
  })
  async signIn(@Body() signInDto: LoginDto) {
    const token = await this.authService.signIn(signInDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { accessToken: token };
  }

  @ApiOkResponse({ status: 200 })
  @Post('/otp-req')
  async otpReq(@Body() requestOTPDto: RequestOTPDto) {
    const user = await this.usersService.findOne({
      email: requestOTPDto.Email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    } else if (user.status === UserStatus.Verified) {
      throw new HttpException('User Already Verified', HttpStatus.BAD_REQUEST);
    }

    return this.authService.generateOtp(user._id);
  }

  @ApiBody({ type: ValidateOTPDto })
  @ApiOkResponse({ status: 200 })
  @Post('/otp-validate')
  async otpValidate(@Body() validateOtpDto: ValidateOTPDto) {
    try {
      return (
        await this.authService.validateOtp(validateOtpDto.code), HttpStatus.OK
      );
    } catch (error) {
      throw new HttpException('Error validating OTP', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/password-reset-request')
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiBody({ type: RequestResetDto })
  async requestPasswordReset(@Body() requestResetDto: RequestResetDto) {
    return this.authService.generatePasswordResetOtp(requestResetDto.email);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.otp,
      resetPasswordDto.newPassword,
    );
  }
}
