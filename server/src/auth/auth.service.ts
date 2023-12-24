import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { OtpCode } from './entities/otpCode.entity';
import { EmailService } from '../email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatus } from '../Types/user.types';
import { ResetOtpCode } from './entities/reset.otpCode.enitity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(OtpCode.name) private readonly otpCodeModel: Model<OtpCode>,
    @InjectModel(ResetOtpCode.name)
    private readonly resetOtpCodeModel: Model<ResetOtpCode>,
    private readonly emailService: EmailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signJwt(user: any): Promise<string> {
    if (!user || !user.email || !user._id) {
      throw new Error('Invalid user data for JWT signing.');
    }
    const payload = { username: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  async signUp(userDetails: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findOne({
      email: userDetails.email,
    });
    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }
    const user = await this.usersService.create(userDetails);
    return user;
  }

  async signIn(signInDto: LoginDto): Promise<string | null> {
    const user = await this.usersService.findOne({
      email: signInDto.email,
    });
    if (!user) {
      return null;
    }
    if (user.status === UserStatus.Unverified) {
      throw new BadRequestException('User not Verified');
    }
    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  async generateOtp(userId: string): Promise<any> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP

    const otpCode = new this.otpCodeModel({
      userId,
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60000), // Set expiration time (5 minutes)
    });
    await otpCode.save();

    const user = await this.usersService.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const emailHtml = await this.emailService.renderTemplate(
      'verify-code.hbs',
      {
        code: otp,
        user: user,
      },
    );

    try {
      await this.emailService.sendEmail(
        [user.email],
        'Your OTP Code',
        emailHtml,
      );
    } catch (error) {
      throw new BadRequestException('Email could not be sent');
    }

    return HttpStatus.OK;
  }

  async validateOtp(otp: string): Promise<boolean> {
    try {
      const otpCode = await this.otpCodeModel.findOne({
        code: otp,
        expiresAt: { $gt: new Date() },
      });
      if (!otpCode) {
        throw new HttpException(
          'OTP code is invalid or has expired',
          HttpStatus.BAD_REQUEST,
        );
      }
      await otpCode.deleteOne();
      const user = await this.usersService.findOne({ _id: otpCode.userId });
      if (user) {
        user.status = UserStatus.Verified;
        await user.save();
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return true;
    } catch (error) {
      throw new HttpException(
        'Error in OTP validation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generatePasswordResetOtp(email: string): Promise<any> {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await this.resetOtpCodeModel.create({
      email,
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60000),
    });

    const emailHtml = await this.emailService.renderTemplate(
      'verify-code.hbs',
      {
        code: otp,
        user: email,
      },
    );

    try {
      await this.emailService.sendEmail(
        [email],
        'Your Password Reset OTP Code',
        emailHtml,
      );
    } catch (error) {
      throw new BadRequestException('Email could not be sent');
    }

    return 'OTP sent successfully';
  }

  async resetPassword(otp: string, newPassword: string): Promise<any> {
    const otpCode = await this.resetOtpCodeModel.findOne({
      code: otp,
      expiresAt: { $gt: new Date() },
    });
    if (!otpCode) {
      throw new HttpException(
        'OTP code is invalid or has expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.findOne({ email: otpCode.email });
    if (user) {
      user.password = newPassword;
      await user.save();
    }
    await otpCode.deleteOne();

    return 'Password reset successful';
  }
}
