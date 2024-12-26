import { Module } from '@nestjs/common';
import { SupertokensService } from './supertokens/supertokens.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DynamicModule } from '@nestjs/common';
import { ConfigInjectionToken, AuthModuleConfig } from './config.interface';

@Module({
  providers: [SupertokensService, AuthService],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {
  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
}
