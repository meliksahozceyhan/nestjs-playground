import { Module } from '@nestjs/common'
import { CatModule } from './cat/cat.module'
import { PostModule } from './post/post.module'

@Module({
  imports: [CatModule, PostModule]
})
export class ApiModule {}
