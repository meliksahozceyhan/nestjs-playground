import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { DynoMetadataModule } from 'src/metadata/dyno-metada.module'
import { User } from './entity/user.entity'

@Module({
  imports: [DynoMetadataModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
