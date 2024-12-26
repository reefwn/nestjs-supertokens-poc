import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: 'http://localhost:3567',
      apiKey: 'your-api-key-here',
      appInfo: {
        appName: 'YourApp',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/api/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
