import { Module } from '@nestjs/common'
import { CatService } from './cat.service'
import { CatController } from './cat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from './entities/cat.entity'
import { DynoMetadataModule } from 'src/metadata/dyno-metada.module'
import { Deneme } from './entities/deneme.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Deneme]), DynoMetadataModule.forFeature([Cat, Deneme])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
