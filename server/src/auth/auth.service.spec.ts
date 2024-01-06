/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { OtpCode } from './entities/otpCode.entity';
import { ResetOtpCode } from './entities/reset.otpCode.enitity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

export enum UserType {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
}

export enum UserStatus {
  Verified = 'VERIFIED',
  Unverified = 'UNVERIFIED',
}

jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  // Mocks
  const mockUsersService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockEmailService = {
    // Add methods if used in the signUp method
  };

  const mockOtpCodeModel = Model; // Mock accordingly
  const mockResetOtpCodeModel = Model; // Mock accordingly

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: 'OtpCodeModel',
          useValue: mockOtpCodeModel,
        },
        {
          provide: 'ResetOtpCodeModel',
          useValue: mockResetOtpCodeModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should successfully create a user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        type: UserType.Customer,
        status: UserStatus.Unverified,
      };

      mockUsersService.findOne.mockResolvedValue(null); // Assume no user exists
      mockUsersService.create.mockResolvedValue(createUserDto);

      const result = await service.signUp(createUserDto);
      expect(result).toEqual(createUserDto);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw a conflict exception if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
        email: 'john.doe@example.com',
        type: UserType.Customer,
        status: UserStatus.Unverified,
      };

      mockUsersService.findOne.mockResolvedValue(createUserDto); // User exists

      await expect(service.signUp(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('signIn', () => {
    beforeEach(() => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return a JWT token for valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'john.doe@example.com',
        password: 'password123',
      };
      const user = {
        ...loginDto,
        _id: 'someUserId',
        status: UserStatus.Verified,
      };
      const expectedJwt = 'some.jwt.token';

      mockUsersService.findOne.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(expectedJwt);

      const result = await service.signIn(loginDto);
      expect(result).toEqual(expectedJwt);
    });

    it('should return null if user is not found', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockUsersService.findOne.mockResolvedValue(null);

      const result = await service.signIn(loginDto);
      expect(result).toBeNull();
    });

    it('should throw BadRequestException if user is unverified', async () => {
      const loginDto: LoginDto = {
        email: 'unverified@example.com',
        password: 'password123',
      };
      const user = {
        ...loginDto,
        _id: 'someUserId',
        status: UserStatus.Unverified,
      };

      mockUsersService.findOne.mockResolvedValue(user);

      await expect(service.signIn(loginDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const loginDto: LoginDto = {
        email: 'john.doe@example.com',
        password: 'invalidPassword',
      };
      const user = {
        ...loginDto,
        _id: 'someUserId',
        status: UserStatus.Verified,
      };

      mockUsersService.findOne.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
