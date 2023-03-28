import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import databaseConfig from './config/database.config'
import { DatabaseModule } from './database/database.module'
//import { MetadataModule } from './metadata/metadata.module'
import { ApiModule } from './api/api.module'
import { AuthModule } from './auth/auth.module'
import secretConfig from './config/secret.config'
import { WinstonLoggerModule } from './winston-logger/winston-logger.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig, secretConfig], isGlobal: true }),
    DatabaseModule,
    DevtoolsModule.register({
      port: 3001,
      http: process.env.NODE_ENV !== 'production'
    }),
    ApiModule,
    AuthModule,
    WinstonLoggerModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
