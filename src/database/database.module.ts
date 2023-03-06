import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        schema: configService.get('database.schema'),
        entities: ['dist/**/*.entity{.js,.ts}'],
        migrationsTableName: 'typeorm_migrations',
        migrations: ['dist/**/*.migration{.ts,.js}'],
        cli: {
          migrationsDir: 'dist/migration'
        },
        synchronize: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy()
      })
    })
  ]
})
export class DatabaseModule {}
