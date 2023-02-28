import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatModule } from './cat/cat.module'
import databaseConfig from './config/database.config'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    CatModule,
    DevtoolsModule.register({
      port: 3001,
      http: process.env.NODE_ENV !== 'production'
    }),
    ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
