import { Module } from '@nestjs/common'
import { CatService } from './cat.service'
import { CatController } from './cat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cat } from './entities/cat.entity'
import { MetadataModule } from '@meliksahozceyhan/metadata'

@Module({
  imports: [TypeOrmModule.forFeature([Cat]), MetadataModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [CatService]
})
export class CatModule {}
