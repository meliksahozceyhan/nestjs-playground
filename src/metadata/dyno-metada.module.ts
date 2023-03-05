import { DynamicModule, Module, Provider } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { MetadataController } from './metadata.controller'
import { MetadataService } from './metadata.service'

@Module({})
export class DynoMetadataModule {
  static entities: any[] = []
  static forFeature(entities: any[]): DynamicModule {
    this.entities.push(...entities)
    const providers = this.createProviders()
    return {
      module: DynoMetadataModule,
      providers: providers,
      controllers: [MetadataController],
      exports: [MetadataService]
    }
  }
  private static createProviders(): Provider[] {
    const metadataProvider = {
      provide: 'VALUES',
      useValue: this.entities
    }
    const metadataService = {
      provide: MetadataService,
      useFactory: (reflector: Reflector, values: any[]) => new MetadataService(reflector, values),
      inject: [Reflector, 'VALUES']
    }
    return [metadataProvider, metadataService]
  }
}
