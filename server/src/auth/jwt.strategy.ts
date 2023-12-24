import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ClsService } from 'nestjs-cls';
import { AppClsStore } from 'src/Types/user.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly cls: ClsService,
    private readonly configService: ConfigService, // Inject the ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use ConfigService to access environment variable
    });
  }

  async validate(payload: any): Promise<any> {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    this.cls.set<AppClsStore>('user', {
      id: payload.sub,
      email: payload.email,
    });
    return { userId: payload.sub, email: payload.email };
  }
}
