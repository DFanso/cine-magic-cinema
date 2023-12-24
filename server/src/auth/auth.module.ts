import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ClsModule } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpCode, OtpCodeSchema } from './entities/otpCode.entity';
import { EmailModule } from '../email/email.module';
import {
  ResetOtpCode,
  ResetOtpCodeSchema,
} from './entities/reset.otpCode.enitity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpCode.name, schema: OtpCodeSchema },
      { name: ResetOtpCode.name, schema: ResetOtpCodeSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60d' },
      }),
    }),
    ClsModule,
    UsersModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Logger],
  exports: [AuthService],
})
export class AuthModule {}
