import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MetadataModule } from '@meliksahozceyhan/metadata'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [MetadataModule.forFeature([User]), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
